// Archivo: netlify/functions/chat.js

import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';

// Accede a tu API key desde las variables de entorno de Netlify
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- PASO 2: "EL BIBLIOTECARIO" - LEER LA BASE DE CONOCIMIENTOS ---
// Esta parte del código lee todos los archivos .txt de tu "biblioteca"
// y los carga en memoria para poder buscarlos después.
const knowledgeBasePath = path.join(process.cwd(), 'knowledge_base');
const knowledgeBase = [];

try {
    const files = fs.readdirSync(knowledgeBasePath);
    files.forEach(file => {
        if (file.endsWith('.txt')) {
            const content = fs.readFileSync(path.join(knowledgeBasePath, file), 'utf-8');
            knowledgeBase.push(content);
        }
    });
    console.log(`Biblioteca cargada: ${knowledgeBase.length} documentos encontrados.`);
} catch (error) {
    console.error("Error al cargar la biblioteca de conocimientos:", error);
}

// --- PASO 3: "EL BUSCADOR" - ENCONTRAR LA INFORMACIÓN RELEVANTE ---
// Esta función es un buscador simple basado en palabras clave.
// Busca en la biblioteca los fragmentos que mejor coincidan con la pregunta.
function searchKnowledgeBase(query) {
    const queryWords = query.toLowerCase().split(/\s+/);
    let bestMatch = { content: null, score: 0 };

    knowledgeBase.forEach(content => {
        let score = 0;
        const contentLower = content.toLowerCase();
        queryWords.forEach(word => {
            if (contentLower.includes(word)) {
                score++;
            }
        });

        if (score > bestMatch.score) {
            bestMatch = { content, score };
        }
    });

    // Solo devolvemos el contenido si tiene una puntuación mínima para ser relevante.
    return bestMatch.score > 1 ? bestMatch.content : null;
}


// --- PASO 4: JUNTAR TODO EN EL MANEJADOR PRINCIPAL ---
export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { message } = JSON.parse(event.body);

    // 1. Buscar contexto relevante en nuestra biblioteca
    const relevantContext = searchKnowledgeBase(message);

    // 2. Crear el prompt para Gemini.
    // Le damos instrucciones claras: usa el contexto que encontramos para responder.
    let augmentedPrompt = `
      Eres un asistente experto en sistemas SCADA y automatización industrial.
      Responde la pregunta del usuario de forma clara y concisa.
    `;

    if (relevantContext) {
        // Si encontramos contexto, lo añadimos al prompt.
        augmentedPrompt = `
          Usa el siguiente CONTEXTO para responder la PREGUNTA DEL USUARIO.
          Si la respuesta no está en el contexto, indica que no tienes esa información específica,
          pero puedes responder con tu conocimiento general.

          ---
          CONTEXTO:
          ${relevantContext}
          ---
        `;
    }
    
    // Añadimos la pregunta del usuario al final del prompt
    augmentedPrompt += `
      PREGUNTA DEL USUARIO:
      ${message}
    `;

    // 3. Llamar a la API de Gemini con el prompt mejorado
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent(augmentedPrompt);
    const response = await result.response;
    const text = response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: text }),
    };

  } catch (error) {
    console.error("Error en la función del handler:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "No se pudo obtener una respuesta del asistente." }),
    };
  }
}


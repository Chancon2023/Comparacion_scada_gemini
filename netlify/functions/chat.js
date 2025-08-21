// Archivo: netlify/functions/chat.js

import { GoogleGenerativeAI, TaskType } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';

// --- CONFIGURACIÓN INICIAL ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });
const generativeModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

// --- BIBLIOTECA INTELIGENTE (VECTOR STORE) ---
// Aquí guardaremos los textos de nuestros documentos y sus "coordenadas" (embeddings).
let knowledgeBase = []; 

// --- FUNCIÓN PARA CALCULAR LA "DISTANCIA" ENTRE IDEAS ---
// Esto nos ayuda a ver qué tan relacionadas están la pregunta y un párrafo.
function calculateCosineSimilarity(vecA, vecB) {
    let dotProduct = 0.0;
    let normA = 0.0;
    let normB = 0.0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// --- FUNCIÓN PARA PREPARAR LA BIBLIOTECA (SE EJECUTA UNA VEZ) ---
async function setupKnowledgeBase() {
    // Si la biblioteca ya está llena, no hacemos nada.
    if (knowledgeBase.length > 0) return;

    try {
        const knowledgeBasePath = path.join(process.cwd(), 'knowledge_base');
        const files = fs.readdirSync(knowledgeBasePath);
        
        console.log(`Iniciando la creación de la biblioteca con ${files.length} archivos...`);
        
        for (const file of files) {
            if (file.endsWith('.txt')) {
                const content = fs.readFileSync(path.join(knowledgeBasePath, file), 'utf-8');
                // 1. Dividimos el documento en párrafos (chunks)
                const chunks = content.split(/\n\s*\n/).filter(chunk => chunk.trim().length > 10);
                
                // 2. Creamos un embedding para cada párrafo
                const result = await embeddingModel.batchEmbedContents({
                    requests: chunks.map(chunk => ({
                        content: { parts: [{ text: chunk }] },
                        taskType: TaskType.RETRIEVAL_DOCUMENT
                    }))
                });
                
                const embeddings = result.embeddings;
                embeddings.forEach((embedding, index) => {
                    // 3. Guardamos el párrafo y su "coordenada" en nuestra biblioteca
                    knowledgeBase.push({
                        text: chunks[index],
                        embedding: embedding.values,
                    });
                });
            }
        }
        console.log(`Biblioteca creada con éxito. Contiene ${knowledgeBase.length} párrafos indexados.`);
    } catch (error) {
        console.error("Error crítico al construir la biblioteca de conocimientos:", error);
    }
}

// --- FUNCIÓN DE BÚSQUEDA INTELIGENTE ---
async function searchKnowledgeBase(query) {
    if (knowledgeBase.length === 0) {
        console.log("La biblioteca está vacía. No se puede buscar.");
        return [];
    }
    
    // 1. Creamos una "coordenada" para la pregunta del usuario
    const queryEmbeddingResult = await embeddingModel.embedContent(
        { content: { parts: [{ text: query }] }, taskType: TaskType.RETRIEVAL_QUERY }
    );
    const queryEmbedding = queryEmbeddingResult.embedding.values;

    // 2. Calculamos la similitud entre la pregunta y cada párrafo de la biblioteca
    const similarities = knowledgeBase.map(item => ({
        text: item.text,
        similarity: calculateCosineSimilarity(queryEmbedding, item.embedding)
    }));

    // 3. Ordenamos los resultados para obtener los más relevantes
    similarities.sort((a, b) => b.similarity - a.similarity);

    // 4. Devolvemos los 3 párrafos más relevantes
    return similarities.slice(0, 3).map(item => item.text);
}

// --- MANEJADOR PRINCIPAL DE LA FUNCIÓN ---
export async function handler(event) {
    // Nos aseguramos de que la biblioteca esté lista antes de continuar.
    await setupKnowledgeBase();

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { message } = JSON.parse(event.body);

        // 1. Buscar el contexto más relevante usando la búsqueda inteligente
        const relevantContexts = await searchKnowledgeBase(message);
        
        // 2. Construimos el prompt para Gemini
        const contextString = relevantContexts.join("\n\n---\n\n");
        const prompt = `
            Eres un asistente experto en sistemas SCADA y normativas eléctricas.
            Usando el siguiente CONTEXTO, responde la PREGUNTA DEL USUARIO de forma clara y concisa.
            Si la respuesta no se encuentra en el CONTEXTO, indica amablemente que no tienes información sobre ese tema específico en tus documentos.
            No inventes información.

            ---
            CONTEXTO:
            ${contextString}
            ---

            PREGUNTA DEL USUARIO:
            ${message}
        `;

        // 3. Generar la respuesta
        const result = await generativeModel.generateContent(prompt);
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

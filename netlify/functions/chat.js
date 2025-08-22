// Archivo: netlify/functions/chat.js

import { GoogleGenerativeAI } from "@google/generative-ai";

// --- CONFIGURACIÓN INICIAL ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const generativeModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" }); // Modelo corregido y actualizado

// --- FUNCIÓN DE BÚSQUEDA EN INTERNET ---
// Se conecta a la API de Google Search para obtener resultados en tiempo real.
async function performInternetSearch(query) {
    console.log(`Iniciando búsqueda en internet para: "${query}"`);
    
    // Accede a las claves desde las variables de entorno de Netlify
    const API_KEY = process.env.GOOGLE_SEARCH_API_KEY;
    const SEARCH_ID = process.env.SEARCH_ENGINE_ID;

    // Si faltan las claves, la función no puede continuar.
    if (!API_KEY || !SEARCH_ID) {
        console.error("Faltan las variables de entorno para la búsqueda en Google.");
        return "Error de configuración: Faltan las claves de la API de búsqueda.";
    }

    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ID}&q=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error("Error en la respuesta de la API de Google Search:", await response.text());
            return "Hubo un error al intentar buscar en internet.";
        }
        const data = await response.json();

        // Si no hay resultados, devuelve un mensaje claro.
        if (!data.items || data.items.length === 0) {
            return "No se encontraron resultados relevantes en internet.";
        }
        
        // Formateamos los resúmenes (snippets) de los primeros 4 resultados para usarlos como contexto.
        const snippets = data.items.slice(0, 4).map(item => `- ${item.snippet}`).join("\n");
        console.log("Contexto encontrado en internet:", snippets);
        return snippets;

    } catch (error) {
        console.error("Error fatal al realizar la búsqueda en internet:", error);
        return "No se pudo completar la búsqueda en internet debido a un error.";
    }
}

// --- MANEJADOR PRINCIPAL DE LA FUNCIÓN ---
export async function handler(event) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { message } = JSON.parse(event.body);

        // 1. Obtener contexto relevante buscando la pregunta del usuario en internet.
        const internetContext = await performInternetSearch(message);

        // 2. Construir el prompt para Gemini, incluyendo el contexto de internet.
        const prompt = `
            Eres un asistente de inteligencia artificial útil y conciso.
            Basándote EXCLUSIVAMENTE en el siguiente CONTEXTO obtenido de una búsqueda en internet, responde la PREGUNTA DEL USUARIO.
            Resume la información de manera clara y directa. Si el contexto no es suficiente para responder, indícalo amablemente.

            ---
            CONTEXTO:
            ${internetContext}
            ---

            PREGUNTA DEL USUARIO:
            ${message}
        `;

        // 3. Generar la respuesta usando el modelo de Gemini.
        const result = await generativeModel.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return {
            statusCode: 200,
            body: JSON.stringify({ reply: text }),
        };

    } catch (error) {
        console.error("Error en el handler de la función:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "No se pudo obtener una respuesta del asistente." }),
        };
    }
}




// Archivo: netlify/functions/chat.js

import { GoogleGenerativeAI } from "@google/generative-ai";

// Accede a tu API key desde las variables de entorno de Netlify
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function handler(event) {
  // Solo permitir peticiones POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { message } = JSON.parse(event.body);

    // Usa el modelo gemini-pro para chat
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Un poco de contexto para que yo sepa de qué hablar
    const chatContext = `
      Eres un asistente experto en sistemas SCADA. Tu conocimiento se basa en la 
      información de una aplicación web que compara 7 plataformas: 
      Zenon COPADATA, ZEE600 ABB, MicroScada X, EcoStruxure ADMS, 
      Siemens Spectrum Power, EPAS Gateway y Power Operation.
      Responde las preguntas de los usuarios de forma concisa y amigable, 
      basándote en los datos que tienes de esas plataformas.
    `;

    const chat = model.startChat({
        history: [{ role: "user", parts: [{ text: chatContext }] },
                  { role: "model", parts: [{ text: "Entendido. Soy un asistente experto en SCADA. ¿En qué puedo ayudarte?" }] }]
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: text }),
    };

  } catch (error) {
    console.error("Error al llamar la API de Gemini:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "No se pudo obtener una respuesta del asistente." }),
    };
  }
}

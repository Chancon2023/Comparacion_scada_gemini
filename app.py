import os
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS

# --- Configuración del Servidor ---
app = Flask(__name__)
CORS(app)

# --- CONFIGURACIÓN DE LA API DE GOOGLE AI ---
# En proyectos reales se debe usar una variable de entorno para la API key
API_KEY = os.getenv('API_KEY', 'AQUI_VA_TU_API_KEY_DE_GOOGLE_AI_STUDIO')
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')  # Modelo rápido y eficiente

# --- CONTEXTO EXTRAÍDO DE TUS DOCUMENTOS ---
# Esta cadena resume las fortalezas y debilidades de las plataformas incluidas.
documentacion_tecnica = """
Resumen de Análisis de Plataformas SCADA:

1. **Zenon COPADATA:**
   * Fortalezas: Arquitectura distribuida robusta, redundancia nativa (PRP/HSR), alta escalabilidad, interfaz moderna (HTML5), excelente adaptación a minería (integración MES/ERP), bajo TCO.
   * Debilidades: Curva de aprendizaje para funciones avanzadas.

2. **Power Operation Schneider:**
   * Fortalezas: Flexibilidad de acceso remoto.
   * Debilidades: Fallas críticas en redundancia, inestabilidad del sistema, HMI deficiente y dependencia de software obsoleto. Considerado de alto riesgo.

"""

# --- FUNCIÓN DE IA MEJORADA ---
def get_ai_response(question):
    """
    Construye un prompt con el contexto técnico y envía la consulta al modelo Gemini.
    """
    prompt = f"""
    Eres un asistente virtual especialista en sistemas SCADA y normativas técnicas.
    Tu conocimiento se basa principalmente en la siguiente documentación interna.
    Responde a la pregunta del usuario de manera formal, técnica y precisa, utilizando la información proporcionada.

    --- INICIO DE LA DOCUMENTACIÓN ---
    {documentacion_tecnica}
    --- FIN DE LA DOCUMENTACIÓN ---

    Pregunta del usuario: "{question}"

    Respuesta de experto:
    """
    try:
        response = model.generate_content(prompt)
        return response.text.replace('•', '<br>•').replace('*', '<br>*')
    except Exception as e:
        print(f"Error al llamar a la API de Google AI: {e}")
        return "Se ha producido un error al procesar la solicitud con el servicio de IA. Por favor, verifique la configuración de la API Key."


# --- API Endpoint ---
@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.get_json()
    question = data.get('question')
    if not question:
        return jsonify({'error': 'No se recibió ninguna pregunta.'}), 400
    ai_answer = get_ai_response(question)
    return jsonify({'answer': ai_answer})

# --- Ejecución del Servidor ---
if __name__ == '__main__':
    app.run(debug=True, port=5000)
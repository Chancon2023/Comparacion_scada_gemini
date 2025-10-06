import os
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS

# --- Configuración del Servidor ---
app = Flask(__name__)
CORS(app)

# --- CONFIGURACIÓN DE LA API DE GOOGLE AI ---
# Pega tu API Key aquí. 
# En un proyecto real, es MEJOR usar variables de entorno: os.getenv("API_KEY")
API_KEY = 'AQUI_VA_TU_API_KEY_DE_GOOGLE_AI_STUDIO'
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash') # Usamos el modelo más rápido y eficiente

# --- CONTEXTO EXTRAÍDO DE TUS DOCUMENTOS ---
# Esta es la información que la IA "leerá" para dar respuestas expertas.
# Le damos un resumen de las fortalezas y debilidades de cada SCADA.
documentacion_tecnica = """
Resumen de Análisis de Plataformas SCADA:

1.  **Zenon COPADATA:**
    * Fortalezas: Arquitectura distribuida robusta, redundancia nativa (PRP/HSR), alta escalabilidad, interfaz moderna (HTML5), excelente adaptación a minería (integración MES/ERP), bajo TCO.
    * Debilidades: Curva de aprendizaje para funciones avanzadas.

2.  **ZEE600 ABB (basado en Zenon):**
    * Fortalezas: Hereda la robustez y escalabilidad de Zenon.
    * Debilidades: Opera con una versión de software desfasada respecto a Zenon, el soporte es canalizado a través de COPA-DATA.

3.  **MicroScada X HITACHI:**
    * Fortalezas: Muy alta fiabilidad en redundancia (Shadowing), arquitectura validada en misión crítica.
    * Debilidades: Interfaz menos flexible, adaptación a minería requiere personalización, TCO y tiempo de implementación elevados.

4.  **Siemens Spectrum Power:**
    * Fortalezas: Arquitectura robusta, altos estándares de ciberseguridad, soporte global.
    * Debilidades: TCO y tiempo de implementación muy altos, enfocado en utilities más que en minería.

5.  **EcoStruxure ADMS:**
    * Fortalezas: Interfaz unificada, modular.
    * Debilidades: Documentación técnica incompleta, soporte reactivo, baja adaptación a minería.

6.  **Power Operation Schneider:**
    * Fortalezas: Flexibilidad de acceso remoto.
    * Debilidades: Fallas críticas en redundancia, inestabilidad del sistema, HMI deficiente, dependencia de software obsoleto. Considerado de alto riesgo.

7.  **EPAS Gateway Schneider:**
    * Fortalezas: Excelente como concentrador de protocolos.
    * Debilidades: No es un SCADA completo, es un gateway. Carece de funciones de control y HMI avanzadas. No soporta HSR/PRP.

8.  **iFIX GE Vernova:**
    * Fortalezas: Arquitectura cliente/servidor distribuida con failover y redundancia SCADA, entorno de configuración web centralizado con orientación a objetos:contentReference[oaicite:12]{index=12}, clientes HTML5 mediante Proficy Webspace y Operations Hub:contentReference[oaicite:13]{index=13} e integración nativa con Proficy Historian:contentReference[oaicite:14]{index=14}.
    * Debilidades: No soporta IEC 61850 ni PRP/HSR de forma nativa; la conectividad depende de drivers OPC/IGS; no dispone de módulos específicos para minería; ICCP/TASE 2 no es nativo.

"""

# --- FUNCIÓN DE IA MEJORADA ---
def get_ai_response(question):
    """
    Esta función construye un prompt, lo envía a la API de Gemini y devuelve la respuesta.
    """
    # Creamos un "prompt" que le da instrucciones y contexto a la IA
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
        # Usamos .replace para evitar problemas de formato con Markdown
        return response.text.replace('•', '<br>•').replace('*', '<br>*')
    except Exception as e:
        print(f"Error al llamar a la API de Google AI: {e}")
        return "Se ha producido un error al procesar la solicitud con el servicio de IA. Por favor, verifique la configuración de la API Key."


# --- API Endpoint (sin cambios) ---
@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.get_json()
    question = data.get('question')
    if not question:
        return jsonify({'error': 'No se recibió ninguna pregunta.'}), 400
    
    ai_answer = get_ai_response(question)
    return jsonify({'answer': ai_answer})

# --- Ejecución del Servidor (sin cambios) ---
if __name__ == '__main__':
    app.run(debug=True, port=5000)

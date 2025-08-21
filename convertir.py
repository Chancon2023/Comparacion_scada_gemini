import pdfplumber
import os

# --- Configuración ---
# Carpeta donde pones tus PDFs
pdf_input_folder = 'pdfs_originales'
# Carpeta donde se guardarán los .txt (la biblioteca de tu chatbot)
txt_output_folder = 'knowledge_base'

# Crear la carpeta de salida si no existe
if not os.path.exists(txt_output_folder):
    os.makedirs(txt_output_folder)

# --- Proceso de Conversión ---
print("Iniciando conversión de PDFs...")

# Recorrer cada archivo en la carpeta de entrada
for file_name in os.listdir(pdf_input_folder):
    if file_name.lower().endswith('.pdf'):
        pdf_path = os.path.join(pdf_input_folder, file_name)
        txt_file_name = os.path.splitext(file_name)[0] + '.txt'
        txt_path = os.path.join(txt_output_folder, txt_file_name)

        print(f"Convirtiendo: {file_name} -> {txt_file_name}")

        full_text = ""
        with pdfplumber.open(pdf_path) as pdf:
            # Extraer texto de cada página
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    full_text += text + "\n"

        # Guardar el texto extraído en un archivo .txt
        with open(txt_path, 'w', encoding='utf-8') as txt_file:
            txt_file.write(full_text)

print("\n¡Conversión completada! Revisa la carpeta 'knowledge_base'.")
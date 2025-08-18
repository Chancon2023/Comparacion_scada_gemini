document.addEventListener('DOMContentLoaded', function() {
    const scadaData = [
        {
            "CRITERIO": "--- Diseño de Arquitectura ---",
            "EcoStruxure™ Grid Operation ADMS Schenider": "- Interfaz Común para Todas las Aplicaciones\n- Panel de Control Unificado (Single Pane of Glass HMI).\n- Gestión de Conmutación Integrada.\n- Configuración de Modelos Templatizados.\n- Análisis de Protocolos Incorporado-\n- Operaciones Móviles en Tiempo Real.\n-Notificaciones Proactivas de Apagones.",
            "Zenon COPADATA": "Terminal Server Client (RDP).\nzenon Webclient.\nHTML5 Client.\nInterfaz HMI/SCADA avanzada: Visualización en tiempo real, control y análisis de datos.\nMulti-touch: Proyectos con pantallas de multitáctil​​​​.",
            "MicroScada X HITACHI ENERGY": "Interfaz Web: Acceso basado en navegador para control y monitoreo.\nHMI (Human-Machine Interface): Personalizable, con soporte para gráficos, listas de alarmas y eventos, y visualización de tendencias.\nAplicaciones Móviles: Acceso remoto a través de dispositivos móviles.\nInterfaz de Configuración: Herramientas para la personalización y configuración del sistema según las necesidades del operador.",
            "Power Operation Schneider": "Thick Client (Cliente Pesado): Proporciona una interfaz completa para configuración y operación.\nWeb Client (Cliente Web): Acceso mediante navegador web usando HTML5, ideal para acceso remoto y movilidad.\nPower SCADA Anywhere: Permite acceso remoto a través de navegadores web.",
            "EPAS Gateway Schneider": "El sistema utiliza la herramienta WebGAT para la administración, que proporciona una interfaz de usuario amigable y permite una gestión eficiente del sistema. La interfaz de usuario incluye menús organizados y descripciones detalladas de los LEDs, así como opciones de configuración y ajuste.\n\nAmigable para el desarrollo de pantallas HMI locales.",
            "ZEE600 ABB (Zenon)": "Terminal Server Client (RDP).\nzenon Webclient.\nHTML5 Client.\nInterfaz HMI/SCADA avanzada: Visualización en tiempo real, control y análisis de datos.\nMulti-touch: Proyectos con pantallas de multitáctil​​​​."
        },
        // ... (rest of the data from the CSV)
        // NOTE: I've truncated the data here for brevity, but you should include all rows from your CSV.
        // I will add a few more rows for a complete example.
        {
            "CRITERIO": "Arquitectura",
            "EcoStruxure™ Grid Operation ADMS Schenider": "- Arquitectura Ethernet Conmutada\n- Arquitectura Ethernet Segregada\n- Protocolos de Redundancia (HSR y PRP)",
            "Zenon COPADATA": "Arquitectura Soportada:\nCliente-Servidor: Distribución de funciones y datos entre servidores y clientes.\nArquitectura Redundante: Soporte para múltiples modos de redundancia.\nDistribuida: Múltiples ingenieros pueden trabajar simultáneamente.",
            "MicroScada X HITACHI ENERGY": "Solución de Automatización Básica, Mejorada y Avanzada.\nNivel de Proceso, Bahía y Estación: Integración desde dispositivos de campo hasta el control centralizado.",
            "Power Operation Schneider": "Arquitectura Simple: Sin redundancia.\nArquitectura Redundante: Servidores primarios y secundarios.\nArquitectura Distribuida y Multi-Sitio.",
            "EPAS Gateway Schneider": "La arquitectura del EPAS Gateway es modular y escalable. Soporta topologías IEC 61850-90-1 y IEC 61850-90-2.",
            "ZEE600 ABB (Zenon)": "Arquitectura Soportada:\nCliente-Servidor.\nArquitectura Redundante.\nDistribuida."
        },
        {
            "CRITERIO": "Redundancia",
            "EcoStruxure™ Grid Operation ADMS Schenider": "- Redundancia de Servidores\n- Redundancia de Datos.\n- Redundancia de Protocolos de Comunicación",
            "Zenon COPADATA": "Modos de Redundancia:\nModo Dominante, No Dominante y Clasificado.\nRedundancia de Comunicaciones (HSR y PRP).",
            "MicroScada X HITACHI ENERGY": "Redundancia de Comunicación: Soporte para PRP y HSR.\nRedundancia de Servidores.",
            "Power Operation Schneider": "Redundancia del Servidor: Servidores primarios y de respaldo sincronizados.\nRedundancia de Red Ethernet.",
            "EPAS Gateway Schneider": "Soporta configuraciones de redundancia en hardware y software, ofreciendo alta disponibilidad.",
            "ZEE600 ABB (Zenon)": "Modos de Redundancia: Dominante, No Dominante, Clasificado.\nRedundancia de Comunicaciones (HSR y PRP)."
        }
    ];

    const scadaSystems = Object.keys(scadaData[0]).filter(key => key !== 'CRITERIO');
    const selectorsContainer = document.getElementById('scada-selectors');
    const compareBtn = document.getElementById('compare-btn');
    const tableContainer = document.getElementById('comparison-table-container');

    // Create checkboxes for each SCADA system
    scadaSystems.forEach(system => {
        const label = document.createElement('label');
        label.className = 'selector-label';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = system;
        checkbox.checked = true; // Default to checked
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(system));
        selectorsContainer.appendChild(label);
    });

    // Function to generate and display the comparison table
    function generateTable() {
        const selectedSystems = Array.from(document.querySelectorAll('#scada-selectors input:checked')).map(cb => cb.value);

        if (selectedSystems.length === 0) {
            tableContainer.innerHTML = '<p>Por favor, selecciona al menos un sistema SCADA para comparar.</p>';
            return;
        }

        let tableHTML = '<table>';
        // Table Header
        tableHTML += '<thead><tr><th>CRITERIO</th>';
        selectedSystems.forEach(system => {
            tableHTML += `<th>${system}</th>`;
        });
        tableHTML += '</tr></thead>';

        // Table Body
        tableHTML += '<tbody>';
        scadaData.forEach(row => {
            tableHTML += '<tr>';
            tableHTML += `<td><strong>${row.CRITERIO}</strong></td>`;
            selectedSystems.forEach(system => {
                // Replace newlines with <br> for HTML display
                const cellContent = row[system] ? row[system].replace(/\n/g, '<br>') : 'N/A';
                tableHTML += `<td>${cellContent}</td>`;
            });
            tableHTML += '</tr>';
        });
        tableHTML += '</tbody></table>';

        tableContainer.innerHTML = tableHTML;
    }

    compareBtn.addEventListener('click', generateTable);

    // Initial table generation on page load
    generateTable();
});
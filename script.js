document.addEventListener('DOMContentLoaded', function() {

    // --- DATOS DEL CSV ---
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
            "CRITERIO": "Comentarios sobre Redundancia",
            "EcoStruxure™ Grid Operation ADMS Schenider": "A comprobar funcionalidad de redundancia",
            "Zenon COPADATA": "Implementación exitosa en clientes mineros.",
            "MicroScada X HITACHI ENERGY": "La redundancia funciona de forma correcta mediante Shadowing.",
            "Power Operation Schneider": "La redundancia no funciona, no se logra configurar, fabrica envía parches de los cuales ninguno funciona.",
            "EPAS Gateway Schneider": "No posee protocolos de redundancia HSR o PRP.",
            "ZEE600 ABB (Zenon)": "Implementación exitosa."
        }
        // ... (DEBES AGREGAR EL RESTO DE TUS DATOS DEL CSV AQUÍ)
    ];
    
    // --- NAVEGACIÓN Y VISTAS ---
    const views = document.querySelectorAll('.view');
    const navButtons = document.querySelectorAll('.nav-btn');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Manejar el estado activo del botón
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Mostrar la vista correspondiente
            const targetViewId = button.id.replace('btn-', '') + '-view';
            views.forEach(view => {
                view.classList.remove('active');
                if (view.id === targetViewId) {
                    view.classList.add('active');
                }
            });
        });
    });

    // --- LÓGICA PARA CADA VISTA ---
    const scadaSystems = Object.keys(scadaData[0]).filter(key => key !== 'CRITERIO');

    // VISTA 1: TABLA COMPARATIVA
    const selectorsContainer = document.getElementById('scada-selectors');
    const generateTableBtn = document.getElementById('generate-table-btn');
    const tableContainer = document.getElementById('comparison-table-container');

    scadaSystems.forEach(system => {
        const label = document.createElement('label');
        label.className = 'selector-label';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = system;
        checkbox.checked = true;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(system));
        selectorsContainer.appendChild(label);
    });

    function generateComparisonTable() {
        const selectedSystems = Array.from(document.querySelectorAll('#scada-selectors input:checked')).map(cb => cb.value);
        if (selectedSystems.length === 0) {
            tableContainer.innerHTML = '<p>Por favor, selecciona al menos un sistema SCADA.</p>';
            return;
        }
        let tableHTML = '<table><thead><tr><th>CRITERIO</th>';
        selectedSystems.forEach(system => tableHTML += `<th>${system}</th>`);
        tableHTML += '</tr></thead><tbody>';
        scadaData.forEach(row => {
            tableHTML += `<tr><td><strong>${row.CRITERIO}</strong></td>`;
            selectedSystems.forEach(system => {
                const cellContent = row[system] ? row[system].replace(/\n/g, '<br>') : 'N/A';
                tableHTML += `<td>${cellContent}</td>`;
            });
            tableHTML += '</tr>';
        });
        tableHTML += '</tbody></table>';
        tableContainer.innerHTML = tableHTML;
    }
    generateTableBtn.addEventListener('click', generateComparisonTable);
    

    // VISTA 2: PROS Y CONTRAS
    const prosConsContainer = document.getElementById('pros-cons-container');

    function generateProsCons() {
        // Análisis simplificado de texto para pros y contras
        const analysis = {
            "EcoStruxure™ Grid Operation ADMS Schenider": { pros: ["Interfaz Unificada", "Móvil en tiempo real", "Protocolos HSR y PRP"], cons: ["Funcionalidad de redundancia a comprobar"] },
            "Zenon COPADATA": { pros: ["Cliente HTML5", "Multi-touch", "Implementación exitosa de redundancia"], cons: [] },
            "MicroScada X HITACHI ENERGY": { pros: ["Interfaz Web", "Aplicaciones Móviles", "Redundancia funciona correctamente"], cons: [] },
            "Power Operation Schneider": { pros: ["Cliente Web HTML5"], cons: ["La redundancia NO funciona", "No se logra configurar"] },
            "EPAS Gateway Schneider": { pros: ["Interfaz amigable", "Modular y escalable"], cons: ["No posee HSR o PRP"] },
            "ZEE600 ABB (Zenon)": { pros: ["Cliente HTML5", "Implementación exitosa"], cons: [] }
        };

        let cardsHTML = '';
        scadaSystems.forEach(system => {
            const pros = analysis[system].pros.map(p => `<li>${p}</li>`).join('');
            const cons = analysis[system].cons.map(c => `<li>${c}</li>`).join('');
            
            cardsHTML += `
                <div class="scada-card">
                    <h3>${system}</h3>
                    <div class="pros"><strong>Pros:</strong> <ul>${pros || "<li>No especificados</li>"}</ul></div>
                    <div class="cons"><strong>Contras:</strong> <ul>${cons || "<li>No especificados</li>"}</ul></div>
                    <div class="normativa">
                        <strong>Cumplimiento NTSyCS Chile:</strong>
                        <p>No se encontró documentación pública que confirme el cumplimiento directo. La certificación bajo NTSyCS generalmente depende de la arquitectura y configuración final del proyecto. Se recomienda consultar directamente al proveedor.</p>
                    </div>
                </div>
            `;
        });
        prosConsContainer.innerHTML = cardsHTML;
    }

    // VISTA 3: RANKING
    const rankingChartContainer = document.getElementById('ranking-chart-container');
    
    function generateRanking() {
        const scores = scadaSystems.map(system => {
            let score = 0;
            // Definir reglas de puntuación simples
            const positiveKeywords = /éxito|funciona de forma correcta|amigable|escalable|html5|móvil|hsr|prp/gi;
            const negativeKeywords = /no funciona|no se logra configurar|deficiente|poca informacion|no posee/gi;
            
            scadaData.forEach(row => {
                const text = row[system] || "";
                score += (text.match(positiveKeywords) || []).length;
                score -= (text.match(negativeKeywords) || []).length * 2; // Penalizar más los negativos
            });
            return { system, score };
        });

        scores.sort((a, b) => b.score - a.score);
        const maxScore = Math.max(...scores.map(s => s.score), 1);

        let chartHTML = '';
        scores.forEach(({ system, score }) => {
            const barWidth = (score / maxScore) * 100;
            chartHTML += `
                <div class="chart-bar-container">
                    <div class="chart-label">${system}</div>
                    <div class="chart-bar" style="width: ${barWidth}%;">
                        ${score}
                    </div>
                </div>
            `;
        });
        rankingChartContainer.innerHTML = chartHTML;
    }

    // --- INICIALIZACIÓN ---
    // Generar contenido de todas las vistas al cargar
    generateComparisonTable();
    generateProsCons();
    generateRanking();
});

document.addEventListener('DOMContentLoaded', function() {

    // --- ANÁLISIS Y EXTRACCIÓN DE DATOS DEL DOCUMENTO ---
    const scadaAnalysis = {
        "EcoStruxure™ Grid Operation ADMS Schenider": {
            scores: { "Interfaz": 3, "Arquitectura": 4, "Redundancia": 3, "Escalabilidad": 4, "Compatibilidad": 3 },
            pros: [],
            cons: ["Funcionalidad de redundancia está 'A comprobar', lo que es una bandera de incertidumbre."]
        },
        "Zenon COPADATA": {
            scores: { "Interfaz": 5, "Arquitectura": 5, "Redundancia": 5, "Escalabilidad": 5, "Compatibilidad": 5 },
            pros: [
                "Alta disponibilidad en escritorios remotos (RDP) integrados.",
                "Implementación de arquitectura redundante en clientes mineros con éxito.",
                "Redundancia de redes mediante PRP con éxito en subestaciones digitales.",
                "Implementación exitosa en Centros de Control complejos."
            ],
            cons: []
        },
        "MicroScada X HITACHI ENERGY": {
            scores: { "Interfaz": 4, "Arquitectura": 4, "Redundancia": 5, "Escalabilidad": 4, "Compatibilidad": 4 },
            pros: [
                "HMI fácil de implementar mediante plantillas y pop-ups personalizables.",
                "Implementación exitosa de soluciones redundantes HSB en ambientes mineros y de transmisión.",
                "La redundancia funciona de forma correcta mediante Shadowing.",
                "Implementación exitosa en Centros de Control mineros y de transmisión."
            ],
            cons: []
        },
        "Power Operation Schneider": {
            scores: { "Interfaz": 3, "Arquitectura": 2, "Redundancia": 1, "Escalabilidad": 2, "Compatibilidad": 2 },
            pros: [],
            cons: [
                "¡La redundancia no funciona y no se logra configurar!",
                "Fábrica envía parches que no solucionan el problema.",
                "La gran cantidad de logs llena los discos y provoca que el sistema falle y deje de funcionar."
            ]
        },
        "EPAS Gateway Schneider": {
            scores: { "Interfaz": 2, "Arquitectura": 3, "Redundancia": 2, "Escalabilidad": 3, "Compatibilidad": 1 },
            pros: ["Arquitectura redundante fácil de aplicar entre servidores."],
            cons: [
                "La herramienta para HMI es deficiente, arroja errores y no permite modificar pop-ups correctamente.",
                "Los comandos IEC61850 no funcionan desde la HMI.",
                "El desarrollo de la base de datos requiere una aplicación externa de pago (extensión DMF).",
                "Se debe modificar la base de datos en Microsoft Excel 2016, una versión descontinuada.",
                "Poca información disponible en los manuales de usuario.",
                "Agregar nuevas señales consume mucho tiempo al requerir el software PACIS.",
                "No posee protocolos de redundancia HSR o PRP, quedándose atrás frente a otros SCADA."
            ]
        },
        "ZEE600 ABB (Zenon)": {
            scores: { "Interfaz": 5, "Arquitectura": 5, "Redundancia": 5, "Escalabilidad": 5, "Compatibilidad": 5 },
            pros: ["(Hereda de Zenon) Alta disponibilidad en escritorios remotos (RDP).", "(Hereda de Zenon) Implementación de arquitectura redundante con éxito."],
            cons: []
        }
    };

    // Datos completos para la tabla (simulados del CSV)
    const fullTableData = [
        {"CRITERIO": "Interfaces de usuario", "EcoStruxure™...": "Panel Unificado, Móvil", "Zenon COPADATA": "HTML5, Multi-touch", "MicroScada X...": "Interfaz Web, HMI Personalizable", "Power Operation...": "Thick Client, Web Client", "EPAS Gateway...": "WebGAT amigable, HMI local", "ZEE600 ABB...": "HTML5, Multi-touch"},
        {"CRITERIO": "Arquitectura", "EcoStruxure™...": "Ethernet Conmutada/Segregada", "Zenon COPADATA": "Cliente-Servidor, Redundante, Distribuida", "MicroScada X...": "Básica, Mejorada y Avanzada", "Power Operation...": "Simple, Redundante, Distribuida", "EPAS Gateway...": "Modular y escalable, soporta IEC 61850", "ZEE600 ABB...": "Cliente-Servidor, Redundante"},
        {"CRITERIO": "Redundancia", "EcoStruxure™...": "Servidores, Datos, Protocolos", "Zenon COPADATA": "Modos Dominante/No Dominante, HSR/PRP", "MicroScada X...": "PRP/HSR, Servidores (Shadowing)", "Power Operation...": "Servidor Primario/Respaldo", "EPAS Gateway...": "Redundancia hardware y software", "ZEE600 ABB...": "Modos Dominante/No Dominante, HSR/PRP"},
        {"CRITERIO": "Comentarios de Implementación", "EcoStruxure™...": "A comprobar", "Zenon COPADATA": "Éxito en minería", "MicroScada X...": "Funciona correctamente", "Power Operation...": "NO FUNCIONA", "EPAS Gateway...": "HMI deficiente", "ZEE600 ABB...": "Éxito en minería"}
    ];

    const scadaSystems = Object.keys(scadaAnalysis);
    const criteria = Object.keys(scadaAnalysis[scadaSystems[0]].scores);

    // --- LÓGICA DE NAVEGACIÓN POR PESTAÑAS ---
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(item => item.classList.remove('active'));
            contents.forEach(item => item.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    // --- PESTAÑA 1: GENERAR TABLA COMPARATIVA ---
    function generateFullTable() {
        const container = document.getElementById('full-comparison-table');
        let tableHTML = '<table><thead><tr><th>CRITERIO</th>';
        scadaSystems.forEach(system => tableHTML += `<th>${system}</th>`);
        tableHTML += '</tr></thead><tbody>';
        fullTableData.forEach(row => {
            tableHTML += `<tr><td><strong>${row.CRITERIO}</strong></td>`;
            scadaSystems.forEach(system => {
                const key = Object.keys(row).find(k => system.startsWith(k.replace('...', '')));
                tableHTML += `<td>${row[key] || 'N/A'}</td>`;
            });
            tableHTML += '</tr>';
        });
        tableHTML += '</tbody></table>';
        container.innerHTML = tableHTML;
    }

    // --- PESTAÑA 2: GENERAR DASHBOARD VISUAL ---
    const selectorsContainer = document.getElementById('scada-selectors-chart');
    const ctx = document.getElementById('scada-radar-chart').getContext('2d');
    let radarChart;
    const chartColors = ['rgba(0, 92, 151, 0.7)', 'rgba(255, 111, 0, 0.7)', 'rgba(46, 125, 50, 0.7)', 'rgba(198, 40, 40, 0.7)', 'rgba(123, 31, 162, 0.7)', 'rgba(0, 121, 107, 0.7)'];

    scadaSystems.forEach(system => {
        const label = document.createElement('label');
        label.className = 'selector-label';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = system;
        if (system.includes("Zenon") || system.includes("MicroScada") || system.includes("Power Operation")) {
            checkbox.checked = true;
        }
        checkbox.addEventListener('change', updateRadarChart);
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(system));
        selectorsContainer.appendChild(label);
    });
    
    function updateRadarChart() {
        const selectedSystems = Array.from(document.querySelectorAll('#scada-selectors-chart input:checked')).map(cb => cb.value);
        const datasets = selectedSystems.map((system, index) => ({
            label: system,
            data: criteria.map(c => scadaAnalysis[system].scores[c]),
            backgroundColor: chartColors[index % chartColors.length].replace('0.7', '0.2'),
            borderColor: chartColors[index % chartColors.length],
            borderWidth: 2,
            pointBackgroundColor: chartColors[index % chartColors.length]
        }));

        if (radarChart) radarChart.destroy();
        radarChart = new Chart(ctx, {
            type: 'radar',
            data: { labels: criteria, datasets: datasets },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: { r: { suggestedMin: 0, suggestedMax: 5, ticks: { stepSize: 1 } } }
            }
        });
    }

    // --- PESTAÑA 3: GENERAR RANKING Y ANÁLISIS ---
    function generateRanking() {
        const container = document.getElementById('ranking-container');
        const scores = scadaSystems.map(system => ({
            system,
            score: (scadaAnalysis[system].pros.length * 2) - (scadaAnalysis[system].cons.length * 3) // Penaliza más los contras
        })).sort((a, b) => b.score - a.score);
        const maxScore = Math.max(...scores.map(s => s.score), 1);
        
        let chartHTML = '';
        scores.forEach(({ system, score }) => {
            const barWidth = Math.max((score / maxScore) * 100, 5); // Ancho mínimo
            chartHTML += `
                <div class="rank-bar-container">
                    <div class="rank-label">${system}</div>
                    <div class="rank-bar" style="width: ${barWidth}%;">
                        ${score} Pts
                    </div>
                </div>`;
        });
        container.innerHTML = chartHTML;
    }

    function generateProsCons() {
        const container = document.getElementById('pros-cons-container');
        let cardsHTML = '';
        scadaSystems.forEach(system => {
            const { pros, cons } = scadaAnalysis[system];
            if (pros.length > 0) {
                cardsHTML += `
                    <div class="analysis-card pros-card">
                        <h3>${system}</h3>
                        <ul>${pros.map(p => `<li>${p}</li>`).join('')}</ul>
                    </div>`;
            }
            if (cons.length > 0) {
                cardsHTML += `
                    <div class="analysis-card cons-card">
                        <h3>${system}</h3>
                        <ul>${cons.map(c => `<li>${c}</li>`).join('')}</ul>
                    </div>`;
            }
        });
        container.innerHTML = cardsHTML;
    }

    // --- INICIALIZACIÓN DE LA PÁGINA ---
    generateFullTable();
    updateRadarChart();
    generateRanking();
    generateProsCons();
});

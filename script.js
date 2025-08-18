document.addEventListener('DOMContentLoaded', function() {
    
    // --- DATOS COMPLETOS (simulados a partir del CSV) ---
    // NOTA: Es crucial que estos datos reflejen fielmente tu archivo CSV.
    const scadaData = {
        "EcoStruxure™ Grid Operation ADMS Schenider": {
            "Interfaz y Versatilidad": 3, "Arquitectura": 4, "Redundancia": 3, "Escalabilidad": 4, "Ciberseguridad": 4, "Compatibilidad": 3,
            "RedFlags": ["Funcionalidad de redundancia 'a comprobar', lo cual genera incertidumbre."]
        },
        "Zenon COPADATA": {
            "Interfaz y Versatilidad": 5, "Arquitectura": 5, "Redundancia": 5, "Escalabilidad": 5, "Ciberseguridad": 4, "Compatibilidad": 5,
            "RedFlags": ["No se mencionan puntos negativos significativos en el documento; se destaca su éxito en implementaciones complejas."]
        },
        "MicroScada X HITACHI ENERGY": {
            "Interfaz y Versatilidad": 4, "Arquitectura": 4, "Redundancia": 5, "Escalabilidad": 4, "Ciberseguridad": 5, "Compatibilidad": 4,
            "RedFlags": ["Aunque es robusto, la HMI puede ser menos intuitiva que competidores como Zenon."]
        },
        "Power Operation Schneider": {
            "Interfaz y Versatilidad": 3, "Arquitectura": 2, "Redundancia": 1, "Escalabilidad": 2, "Ciberseguridad": 3, "Compatibilidad": 2,
            "RedFlags": [
                "¡La redundancia NO funciona y no se logra configurar!",
                "Los parches de fábrica no solucionan los problemas.",
                "Genera una gran cantidad de logs que llenan los discos y provocan fallas en el sistema."
            ]
        },
        "EPAS Gateway Schneider": {
            "Interfaz y Versatilidad": 2, "Arquitectura": 3, "Redundancia": 2, "Escalabilidad": 3, "Ciberseguridad": 3, "Compatibilidad": 2,
            "RedFlags": [
                "La herramienta de desarrollo HMI es deficiente y arroja errores.",
                "Los comandos IEC61850 no funcionan desde la HMI.",
                "Requiere una versión descontinuada y de pago de Microsoft Excel (2016) para la base de datos.",
                "No posee protocolos de redundancia modernos como HSR o PRP."
            ]
        },
        "ZEE600 ABB (Zenon)": {
            "Interfaz y Versatilidad": 5, "Arquitectura": 5, "Redundancia": 5, "Escalabilidad": 5, "Ciberseguridad": 4, "Compatibilidad": 5,
            "RedFlags": ["Al ser una variante de Zenon, comparte su robustez. No se detallan puntos débiles específicos."]
        }
    };

    const scadaSystems = Object.keys(scadaData);
    const criteria = Object.keys(scadaData[scadaSystems[0]]).filter(k => k !== 'RedFlags');
    
    const selectorsContainer = document.getElementById('scada-selectors');
    const redFlagsContainer = document.getElementById('red-flags-container');
    const ctx = document.getElementById('scada-radar-chart').getContext('2d');
    let radarChart;

    // --- Colores para el Gráfico ---
    const chartColors = [
        'rgba(0, 180, 216, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(255, 99, 132, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(54, 162, 235, 0.7)'
    ];

    // --- INICIALIZACIÓN ---
    
    // 1. Crear Selectores
    scadaSystems.forEach((system, index) => {
        const label = document.createElement('label');
        label.className = 'selector-label';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = system;
        // Zenon y MicroScada seleccionados por defecto para mostrar el poder del gráfico
        if (system.includes("Zenon") || system.includes("MicroScada")) {
            checkbox.checked = true;
        }
        checkbox.addEventListener('change', updateRadarChart);
        
        label.innerHTML = `
            <input type="checkbox" value="${system}" ${checkbox.checked ? 'checked' : ''}>
            <span class="custom-checkbox"></span>
            ${system}
        `;
        label.querySelector('input').addEventListener('change', updateRadarChart);
        selectorsContainer.appendChild(label);
    });

    // 2. Generar Tarjetas de Red Flags
    function generateRedFlags() {
        let cardsHTML = '';
        scadaSystems.forEach(system => {
            const flags = scadaData[system].RedFlags;
            if (flags && flags.length > 0 && !flags[0].includes("No se mencionan")) {
                cardsHTML += `
                    <div class="flag-card">
                        <h3>${system}</h3>
                        <ul>
                            ${flags.map(flag => `<li>${flag}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
        });
        redFlagsContainer.innerHTML = cardsHTML;
    }

    // 3. Crear y Actualizar Gráfico de Araña
    function updateRadarChart() {
        const selectedSystems = Array.from(document.querySelectorAll('#scada-selectors input:checked')).map(cb => cb.value);
        
        const datasets = selectedSystems.map((system, index) => {
            return {
                label: system,
                data: criteria.map(c => scadaData[system][c]),
                backgroundColor: chartColors[index % chartColors.length].replace('0.7', '0.2'),
                borderColor: chartColors[index % chartColors.length],
                pointBackgroundColor: chartColors[index % chartColors.length],
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: chartColors[index % chartColors.length],
                borderWidth: 2
            };
        });

        if (radarChart) {
            radarChart.destroy();
        }

        radarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: criteria,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
                        grid: { color: 'rgba(0, 0, 0, 0.1)' },
                        pointLabels: { font: { size: 14 } },
                        suggestedMin: 0,
                        suggestedMax: 5,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            }
        });
    }

    // Llamadas iniciales
    generateRedFlags();
    updateRadarChart();
});

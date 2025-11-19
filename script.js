document.addEventListener('DOMContentLoaded', function () {
    // --- ESTRUCTURA DE DATOS COMPLETA Y DEFINITIVA ---
    // Esta versión solo incluye dos plataformas para la comparación: Zenon y Power Operation.
    const scadaData = [
        {
            id: 'zenon',
            name: 'Zenon COPADATA',
            logo_text: 'ZN',
            color: '#00FF7F',
            summary:
                'Plataforma SCADA caracterizada por su arquitectura abierta y configuración basada en parámetros, lo que reduce la carga de ingeniería y facilita la integración en entornos industriales complejos.',
            pros: [
                'Alta escalabilidad, validada en Centros de Control.',
                'Soporte nativo para protocolos de redundancia (PRP/HSR).',
                'Interfaz de usuario moderna (HTML5, Multitouch).',
                'Integración profunda con sistemas MES y ERP.',
                'Bajo Costo Total de Propiedad (TCO).'
            ],
            cons: [
                'El modelo de soporte para la versión ZEE600 (ABB) depende de COPA-DATA.',
                'Curva de aprendizaje inicial para funcionalidades avanzadas.'
            ],
            scores: {
                arquitectura: {
                    score: 5,
                    compliance: 'Cumple',
                    detail: 'Arquitectura distribuida y redundante, probada en campo.'
                },
                redundancia: {
                    score: 5,
                    compliance: 'Cumple',
                    detail: 'Soporte nativo para PRP/HSR, muy fiable.'
                },
                escalabilidad: {
                    score: 5,
                    compliance: 'Cumple',
                    detail: 'Excelente, desde sistemas locales a centros de control.'
                },
                ciberseguridad: {
                    score: 4,
                    compliance: 'Cumple',
                    detail: 'Soporte para IEC 62443 y Active Directory.'
                },
                normaNTSyCS: {
                    score: 5,
                    compliance: 'Cumple',
                    detail: 'Totalmente alineado a los requerimientos de la norma.'
                },
                interfaz: {
                    score: 5,
                    compliance: 'Cumple',
                    detail: 'Moderna y flexible (HTML5, Web, Multitouch).'
                },
                adaptacionMineria: {
                    score: 5,
                    compliance: 'Cumple',
                    detail: 'Integración nativa con sistemas MES/ERP.'
                },
                integracionSubs: {
                    score: 5,
                    compliance: 'Cumple',
                    detail: 'Soporte nativo para todos los protocolos estándar.'
                },
                funcionalidadesNativas: {
                    score: 5,
                    compliance: 'Cumple',
                    detail: 'Plataforma unificada con GIS, Historian, etc.'
                },
                tco: {
                    score: 4,
                    compliance: 'Cumple',
                    detail: 'Bajo a medio, por ingeniería eficiente.'
                },
                tiempoImplementacion: {
                    score: 4,
                    compliance: 'Cumple',
                    detail: 'Medio a corto, por configuración paramétrica.'
                }
            }
        },
        {
            id: 'poweroperation',
            name: 'Power Operation Schneider',
            logo_text: 'PSO',
            color: '#DE3163',
            summary:
                'Plataforma SCADA de Schneider Electric para gestión de energía. Los datos analizados revelan deficiencias significativas en fiabilidad y usabilidad, constituyendo una opción de alto riesgo.',
            pros: ['Flexibilidad de acceso remoto.'],
            cons: [
                'Fallas críticas reportadas en la configuración de la redundancia.',
                'Inestabilidad del sistema atribuida a la generación excesiva de logs.',
                'Herramienta de desarrollo HMI deficiente y con errores.',
                'Dependencia crítica de software obsoleto (MS Excel 2016).'
            ],
            scores: {
                arquitectura: {
                    score: 1,
                    compliance: 'No Cumple',
                    detail: 'Presenta problemas críticos de redundancia.'
                },
                redundancia: {
                    score: 1,
                    compliance: 'No Cumple',
                    detail: 'Fallas reportadas, no se logra configurar. No fiable.'
                },
                escalabilidad: {
                    score: 2,
                    compliance: 'No Cumple',
                    detail: 'Problemática, generación excesiva de logs causa fallas.'
                },
                ciberseguridad: {
                    score: 3,
                    compliance: 'Cumple',
                    detail: 'Nivel estándar, pero la inestabilidad es un riesgo.'
                },
                normaNTSyCS: {
                    score: 2,
                    compliance: 'No Cumple',
                    detail: 'Alineamiento parcial; la inestabilidad es un riesgo.'
                },
                interfaz: {
                    score: 1,
                    compliance: 'No Cumple',
                    detail: 'Herramienta de desarrollo HMI deficiente y con errores.'
                },
                adaptacionMineria: {
                    score: 2,
                    compliance: 'No Cumple',
                    detail: 'Baja, opción riesgosa por su inestabilidad.'
                },
                integracionSubs: {
                    score: 3,
                    compliance: 'Cumple',
                    detail: 'Integración estándar con protocolos comunes.'
                },
                funcionalidadesNativas: {
                    score: 2,
                    compliance: 'No Cumple',
                    detail: 'Set de funciones básico, con limitaciones reportadas.'
                },
                tco: {
                    score: 2,
                    compliance: 'No Cumple',
                    detail: 'Medio-Alto, considerando costos de mitigación.'
                },
                tiempoImplementacion: {
                    score: 2,
                    compliance: 'No Cumple',
                    detail: 'Largo, por dificultades en configuración.'
                }
            }
        }
    ];

    // Definición de características (no cambia aunque el número de plataformas sea menor)
    const features = {
        arquitectura: 'Arquitectura',
        redundancia: 'Redundancia',
        escalabilidad: 'Escalabilidad',
        ciberseguridad: 'Ciberseguridad',
        normaNTSyCS: 'Cumplimiento Norma NTSyCS',
        interfaz: 'Interfaz de Usuario',
        adaptacionMineria: 'Adaptación a Minería',
        integracionSubs: 'Integración de Subs.',
        funcionalidadesNativas: 'Funcionalidades Nativas',
        tco: 'Costo Total (TCO)',
        tiempoImplementacion: 'Tiempo de Implementación'
    };

    // --- LÓGICA DE LA APLICACIÓN ---

    // Calcula el promedio de cada plataforma y ordena de mayor a menor
    const rankedScada = scadaData
        .map((scada) => {
            const scores = Object.values(scada.scores).map((s) => s.score);
            const averageScore =
                scores.reduce((sum, score) => sum + score, 0) / scores.length;
            return { ...scada, averageScore };
        })
        .sort((a, b) => b.averageScore - a.averageScore);

    let radarChart = null;

    function initialize() {
        initNavigation();
        initMatrix();
        initAnalisis();
        initRanking();
        initChatbot(); // El chatbot se conecta a la función de Netlify
    }

    // Inicializa la navegación entre las secciones
    function initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const pages = document.querySelectorAll('.page');
        navLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.getAttribute('data-page');
                pages.forEach((p) => p.classList.remove('active'));
                document.getElementById(pageId).classList.add('active');
                navLinks.forEach((n) => n.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // Construye la matriz comparativa y el filtrado
    function initMatrix() {
        const matrixTable = document.getElementById('comparison-matrix');
        const filterContainer = document.getElementById('scada-filter-container');
        matrixTable.innerHTML = '';
        filterContainer.innerHTML = '';

        // Cabecera de la matriz
        let headerRow = '<tr><th>Criterio</th>';
        scadaData.forEach((scada) => {
            headerRow += `<th data-scada-id="${scada.id}">${scada.name}</th>`;
            filterContainer.innerHTML += `<label class="checkbox-wrapper"><input type="checkbox" class="scada-filter-cb" value="${scada.id}" checked> ${scada.name}</label>`;
        });
        headerRow += '</tr>';

        // Cuerpo de la matriz
        let bodyHtml = '';
        Object.keys(features).forEach((featureKey) => {
            bodyHtml += `<tr data-feature-key="${featureKey}"><td>${features[featureKey]}</td>`;
            scadaData.forEach((scada) => {
                const item = scada.scores[featureKey] || {
                    score: 0,
                    compliance: 'No Cumple',
                    detail: 'N/A'
                };
                const complianceClass =
                    item.compliance === 'Cumple'
                        ? 'compliance-cumple'
                        : 'compliance-no-cumple';
                bodyHtml += `<td data-scada-id="${scada.id}">
                    <div class="matrix-cell-content">
                        <div class="compliance-indicator ${complianceClass}">${item.compliance}</div>
                        <div class="score-value">Puntuación: ${item.score}/5</div>
                        <div class="cell-detail">${item.detail}</div>
                    </div>
                </td>`;
            });
            bodyHtml += '</tr>';
        });

        matrixTable.innerHTML = `<thead>${headerRow}</thead><tbody>${bodyHtml}</tbody>`;

        // Filtro por sistema (checkboxes)
        document
            .querySelectorAll('.scada-filter-cb')
            .forEach((cb) => cb.addEventListener('change', updateMatrixVisibility));

        // Selección de fila para mostrar detalles
        document
            .querySelectorAll('#comparison-matrix tbody tr')
            .forEach((row) => {
                row.addEventListener('click', () => {
                    document
                        .querySelectorAll('#comparison-matrix tbody tr')
                        .forEach((r) => r.classList.remove('selected'));
                    row.classList.add('selected');
                    updateFeaturesSidebar(row.getAttribute('data-feature-key'));
                });
            });
    }

    // Actualiza la visibilidad de la matriz cuando se aplica el filtro
    function updateMatrixVisibility() {
        const visibleScadaIds = Array.from(
            document.querySelectorAll('.scada-filter-cb:checked')
        ).map((cb) => cb.value);
        document
            .querySelectorAll('#comparison-matrix th, #comparison-matrix td')
            .forEach((cell) => {
                const scadaId = cell.getAttribute('data-scada-id');
                if (scadaId) {
                    cell.style.display = visibleScadaIds.includes(scadaId)
                        ? ''
                        : 'none';
                }
            });
        const selectedRow = document.querySelector(
            '#comparison-matrix tbody tr.selected'
        );
        if (selectedRow) {
            updateFeaturesSidebar(selectedRow.getAttribute('data-feature-key'));
        } else {
            document.getElementById('features-content').innerHTML =
                '<p>Seleccione una fila para visualizar detalles.</p>';
        }
    }

    // Muestra detalles en la barra lateral en función de la característica seleccionada
    function updateFeaturesSidebar(featureKey) {
        const contentEl = document.getElementById('features-content');
        if (!featureKey) {
            contentEl.innerHTML =
                '<p>Seleccione una fila para visualizar detalles.</p>';
            return;
        }
        let content = `<h3><span class="accent">//</span> ${features[featureKey]}</h3>`;
        const visibleScadaIds = Array.from(
            document.querySelectorAll('.scada-filter-cb:checked')
        ).map((cb) => cb.value);
        scadaData
            .filter((s) => visibleScadaIds.includes(s.id))
            .forEach((scada) => {
                const item = scada.scores[featureKey];
                content += `<h4>${scada.name}</h4>
                        <p><strong>Puntuación: ${item.score}/5 (${item.compliance})</strong></p>
                        <p>${item.detail}</p>`;
            });
        contentEl.innerHTML = content;
    }

    // Inicializa la página de análisis detallado
    function initAnalisis() {
        const platformPillsContainer = document.getElementById('platform-selector-pills');
        const criteriaPillsContainer = document.getElementById('criteria-selector-pills');
        platformPillsContainer.innerHTML = '';
        criteriaPillsContainer.innerHTML = '';

        // Pildoras para seleccionar la plataforma
        scadaData.forEach((scada) => {
            const pill = document.createElement('div');
            pill.className = 'platform-pill';
            pill.dataset.id = scada.id;
            pill.style.setProperty('--platform-color', scada.color);
            pill.innerHTML = `<span class="color-dot" style="background-color: ${scada.color};"></span> ${scada.name}`;
            platformPillsContainer.appendChild(pill);
        });

        // Pildoras para seleccionar los criterios
        Object.keys(features).forEach((key) => {
            const pill = document.createElement('div');
            pill.className = 'criteria-pill active';
            pill.dataset.key = key;
            pill.textContent = features[key];
            criteriaPillsContainer.appendChild(pill);
        });

        // Lógica de selección de plataformas (máximo 3)
        platformPillsContainer.addEventListener('click', (e) => {
            const pill = e.target.closest('.platform-pill');
            if (!pill) return;

            const selectedCount = platformPillsContainer.querySelectorAll(
                '.platform-pill.active'
            ).length;
            if (!pill.classList.contains('active') && selectedCount >= 3) {
                return;
            }
            pill.classList.toggle('active');
            updateAnalisisPage();
        });

        // Lógica de selección de criterios
        criteriaPillsContainer.addEventListener('click', (e) => {
            const pill = e.target.closest('.criteria-pill');
            if (pill) {
                pill.classList.toggle('active');
                updateAnalisisPage();
            }
        });

        // Selecciona la primera plataforma por defecto
        if (platformPillsContainer.firstChild) {
            platformPillsContainer.firstChild.classList.add('active');
        }
        updateAnalisisPage();
    }

    // Actualiza el análisis con las plataformas y criterios seleccionados
    function updateAnalisisPage() {
        const selectedSystemIds = Array.from(
            document.querySelectorAll('.platform-pill.active')
        ).map((pill) => pill.dataset.id);
        const selectedCriteriaKeys = Array.from(
            document.querySelectorAll('.criteria-pill.active')
        ).map((pill) => pill.dataset.key);

        updateRadarChart(selectedSystemIds, selectedCriteriaKeys);

        if (selectedSystemIds.length > 0) {
            updateFichaTecnica(selectedSystemIds[0]);
        } else {
            document.getElementById('ficha-tecnica').innerHTML =
                '<p style="text-align: center; padding: 2rem;">Seleccione una plataforma para visualizar su ficha técnica.</p>';
        }
    }

    // Actualiza el gráfico tipo radar con los valores seleccionados
    function updateRadarChart(systemIds, criteriaKeys) {
        if (radarChart) {
            radarChart.destroy();
        }
        if (systemIds.length === 0 || criteriaKeys.length === 0) return;

        const ctx = document.getElementById('radar-chart').getContext('2d');
        const datasets = scadaData
            .filter((s) => systemIds.includes(s.id))
            .map((scada) => ({
                label: scada.name,
                data: criteriaKeys.map((key) => scada.scores[key].score),
                backgroundColor: hexToRgba(scada.color, 0.4),
                borderColor: scada.color,
                borderWidth: 2,
                pointBackgroundColor: scada.color
            }));

        radarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: criteriaKeys.map((key) => features[key]),
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: '#FFF', font: { size: 14 } }
                    }
                },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
                        grid: { color: 'rgba(255, 255, 255, 0.2)' },
                        pointLabels: { color: '#FFF', font: { size: 12 } },
                        suggestedMin: 0,
                        suggestedMax: 5,
                        ticks: {
                            backdropColor: 'transparent',
                            color: '#FFF',
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    // Muestra la ficha técnica de la plataforma seleccionada en análisis
    function updateFichaTecnica(scadaId) {
        const scada = scadaData.find((s) => s.id === scadaId);
        const fichaEl = document.getElementById('ficha-tecnica');
        const prosHtml = scada.pros.map((p) => `<li>${p}</li>`).join('');
        const consHtml = scada.cons.map((c) => `<li>${c}</li>`).join('');
        fichaEl.style.setProperty('--platform-color', scada.color);

        fichaEl.innerHTML = `
            <div class="ficha-header">
                <div class="ficha-logo">${scada.logo_text}</div>
                <h2>${scada.name}</h2>
            </div>
            <p class="ficha-summary">${scada.summary}</p>
            <div class="ficha-section">
                <h4><span class="accent">//</span> Ventajas Clave</h4>
                <ul class="pros-list">${prosHtml}</ul>
            </div>
            <div class="ficha-section">
                <h4><span class="accent">//</span> Puntos a Considerar</h4>
                <ul class="cons-list">${consHtml}</ul>
            </div>`;
    }

    // Inicializa la sección de ranking
    function initRanking() {
        const listContainer = document.getElementById('ranked-list');
        listContainer.innerHTML = '';
        rankedScada.forEach((scada, index) => {
            let analysis = '';
            if (index <= 1) {
                analysis =
                    'Líder en rendimiento, destacando en flexibilidad, fiabilidad y adaptación.';
            } else if (scada.averageScore >= 3.5) {
                analysis =
                    'Competidor robusto con fortalezas en áreas específicas como la redundancia.';
            } else if (scada.averageScore >= 2.5) {
                analysis =
                    'Opción de nivel medio, requiere análisis de costo-beneficio para casos de uso específicos.';
            } else {
                analysis =
                    'Presenta deficiencias o limitaciones funcionales, considerado de alto riesgo para operaciones críticas.';
            }

            listContainer.innerHTML += `
                <div class="ranked-item">
                    <div class="rank-position">#${index + 1}</div>
                    <div class="rank-details">
                        <h4>${scada.name}</h4>
                        <div class="score">Puntuación Promedio: ${scada.averageScore.toFixed(
                            2
                        )} / 5.00</div>
                        <p>${analysis}</p>
                    </div>
                </div>`;
        });

        // Exporta la clasificación a PDF
        document.getElementById('export-pdf-btn').addEventListener('click', () => {
            const element = document.getElementById('ranking-export-container');
            const opt = {
                margin: 0.5,
                filename: 'Conclusion_Ejecutiva_SCADA.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, backgroundColor: '#1A1A1A' },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().set(opt).from(element).save();
        });
    }

    // ===================================================================
    // --- SECCIÓN DEL CHATBOT CONECTADO A GEMINI VIA NETLIFY FUNCTION ---
    // ===================================================================
    function initChatbot() {
        const chatOpenBtn = document.getElementById('chat-open-btn');
        const chatCloseBtn = document.getElementById('chat-close-btn');
        const chatWindow = document.getElementById('chat-window');
        const chatSendBtn = document.getElementById('chat-send-btn');
        const chatInput = document.getElementById('chat-input');
        const chatBody = document.getElementById('chat-body');

        chatOpenBtn.addEventListener('click', () => chatWindow.classList.add('open'));
        chatCloseBtn.addEventListener('click', () => chatWindow.classList.remove('open'));

        // Función para enviar mensajes al backend (Netlify Function)
        const sendMessage = async () => {
            const userInput = chatInput.value.trim();
            if (userInput === '') return;

            addMessage(userInput, 'user');
            chatInput.value = '';
            chatInput.disabled = true;
            chatSendBtn.disabled = true;

            try {
                const response = await fetch('/.netlify/functions/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: userInput })
                });

                if (!response.ok) {
                    throw new Error(`Error del servidor: ${response.status}`);
                }

                const data = await response.json();
                const botResponse = data.reply;

                // Pequeño delay para que la respuesta sea más natural
                setTimeout(() => {
                    addMessage(botResponse, 'bot');
                }, 300);
            } catch (error) {
                console.error('Error al contactar al asistente:', error);
                addMessage(
                    'Lo siento, estoy teniendo problemas para conectarme. Inténtalo de nuevo más tarde.',
                    'bot'
                );
            } finally {
                chatInput.disabled = false;
                chatSendBtn.disabled = false;
                chatInput.focus();
            }
        };

        chatSendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });

        function addMessage(text, sender) {
            const messageElement = document.createElement('div');
            messageElement.className = `chat-message ${sender}`;
            messageElement.innerHTML = text;
            chatBody.appendChild(messageElement);
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }

    // Utilidad para convertir un color hexadecimal a RGBA con transparencia
    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // Llamada inicial para arrancar la aplicación
    initialize();
});
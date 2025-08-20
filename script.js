document.addEventListener('DOMContentLoaded', function () {
    // --- ESTRUCTURA DE DATOS - VERSIÓN PROFESIONAL ---
    const scadaData = [
        {
            id: 'zenon', name: 'Zenon COPADATA', logo_text: 'ZN',
            summary: 'Plataforma SCADA caracterizada por su arquitectura abierta y configuración basada en parámetros, lo que reduce la carga de ingeniería y facilita la integración en entornos industriales complejos.',
            pros: ['Alta escalabilidad, validada en Centros de Control de gran envergadura.', 'Soporte nativo para protocolos de redundancia de alta disponibilidad (PRP/HSR).', 'Interfaz de usuario moderna con soporte para HTML5 y tecnología Multitouch.', 'Integración profunda con sistemas de gestión de producción (MES) y planificación de recursos (ERP).', 'Bajo Costo Total de Propiedad (TCO) debido a la eficiencia en la ingeniería y compatibilidad inter-versiones.'],
            cons: ['El modelo de soporte para la versión ZEE600 (ABB) depende directamente de COPA-DATA.', 'Requiere una curva de aprendizaje inicial para maximizar la explotación de sus funcionalidades avanzadas.'],
            scores: { arquitectura: 5, redundancia: 5, escalabilidad: 5, ciberseguridad: 4, interfaz: 5, adaptacionMineria: 5, integracionSubs: 5, funcionalidadesNativas: 5, tco: 4, tiempoImplementacion: 4 }
        },
        {
            id: 'zee600', name: 'ZEE600 ABB (Zenon)', logo_text: 'Z600',
            summary: 'Implementación de ABB de la plataforma Zenon. Comparte el núcleo tecnológico de COPA-DATA, beneficiándose de su robustez, aunque con consideraciones específicas de ciclo de vida y soporte.',
            pros: ['Hereda la arquitectura robusta, escalabilidad y la excelente interfaz de Zenon.', 'Alta disponibilidad para acceso remoto (RDP), adecuado para operaciones distribuidas.', 'Capacidad comprobada para implementar arquitecturas de alta redundancia.'],
            cons: ['El ciclo de vida de las versiones opera con un desfase respecto a la versión principal de Zenon, implicando un posible retraso en la adopción de nuevas funcionalidades y parches.', 'El soporte técnico es canalizado a través de COPA-DATA, sin un service desk primario de ABB.', 'Ausencia de métricas de rendimiento (KPIs) o casos de estudio publicados por ABB.'],
            scores: { arquitectura: 5, redundancia: 5, escalabilidad: 5, ciberseguridad: 4, interfaz: 4, adaptacionMineria: 5, integracionSubs: 5, funcionalidadesNativas: 4, tco: 4, tiempoImplementacion: 4 }
        },
        {
            id: 'microscada', name: 'MicroScada X HITACHI', logo_text: 'MSX',
            summary: 'Solución SCADA consolidada en el sector de utilities para la gestión de redes eléctricas. Destaca por su alta fiabilidad.',
            pros: ['Alta fiabilidad en mecanismos de redundancia (Shadowing).', 'Arquitectura validada en entornos de misión crítica (transmisión y generación eléctrica).', 'Capacidad de escalamiento adecuada para sistemas de gran tamaño.', 'Estandarización de HMI facilitada por el uso de plantillas.'],
            cons: ['Flexibilidad y modernidad de la interfaz de usuario inferior a la de competidores directos.', 'La adaptación a procesos mineros no es nativa y requiere personalización e integración adicional.', 'Mayor complejidad de ingeniería y mantenimiento asociado.', 'Potencial dependencia de proveedores terceros para ciertos protocolos de comunicación.'],
            scores: { arquitectura: 4, redundancia: 5, escalabilidad: 4, ciberseguridad: 4, interfaz: 3, adaptacionMineria: 3, integracionSubs: 4, funcionalidadesNativas: 3, tco: 2, tiempoImplementacion: 2 }
        },
        {
            id: 'adms', name: 'EcoStruxure ADMS', logo_text: 'ADMS',
            summary: 'Plataforma de Schneider Electric para la gestión avanzada de redes de distribución (ADMS). Su principal fortaleza son las aplicaciones analíticas, pero presenta carencias en documentación y soporte.',
            pros: ['Interfaz de control unificada (Single Pane of Glass HMI).', 'Gestión de conmutación y notificaciones de interrupciones integradas.', 'Arquitectura modular orientada a empresas de servicios públicos (utilities).'],
            cons: ['La documentación técnica es incompleta, lo que genera una alta dependencia de personal especializado.', 'El modelo de soporte técnico es reactivo, incrementando el riesgo de paradas no programadas.', 'Bajo nivel de adaptación a procesos mineros.', 'Riesgos en la puesta en marcha y mantenimiento debido a la falta de información detallada.'],
            scores: { arquitectura: 3, redundancia: 3, escalabilidad: 3, ciberseguridad: 3, interfaz: 3, adaptacionMineria: 2, integracionSubs: 3, funcionalidadesNativas: 3, tco: 3, tiempoImplementacion: 3 }
        },
        {
            id: 'spectrum', name: 'Siemens Spectrum Power', logo_text: 'SP',
            summary: 'Solución integral de clase enterprise para la gestión de redes eléctricas, con un fuerte enfoque en Transmisión y Distribución. Es una plataforma potente pero de alta complejidad y costo.',
            pros: ['Arquitectura modular, robusta y altamente escalable.', 'Elevados estándares de disponibilidad y ciberseguridad.', 'Capacidad gráfica avanzada y soporte global de Siemens.'],
            cons: ['La adaptación a la industria minera requiere un alto grado de personalización.', 'Costo Total de Propiedad (TCO) y tiempo de implementación elevados.', 'Interfaz de usuario estándar, menos configurable para procesos industriales específicos.', 'Alta complejidad de ingeniería que demanda servicios altamente especializados.'],
            scores: { arquitectura: 4, redundancia: 4, escalabilidad: 4, ciberseguridad: 4, interfaz: 3, adaptacionMineria: 3, integracionSubs: 4, funcionalidadesNativas: 4, tco: 1, tiempoImplementacion: 1 }
        },
        {
            id: 'poweroperation', name: 'Power Operation Schneider', logo_text: 'PSO',
            summary: 'Plataforma SCADA de Schneider Electric para gestión de energía. Los datos analizados revelan deficiencias significativas en fiabilidad y usabilidad, constituyendo una opción de alto riesgo.',
            pros: ['Flexibilidad de acceso remoto mediante cliente pesado, cliente web y Power SCADA Anywhere.'],
            cons: ['Fallas críticas reportadas en la configuración de la redundancia.', 'Inestabilidad del sistema atribuida a la generación excesiva de logs.', 'Herramienta de desarrollo HMI calificada como deficiente y propensa a errores.', 'Dependencia crítica de software obsoleto (MS Excel 2016) para la administración de la base de datos.', 'Documentación técnica insuficiente.'],
            scores: { arquitectura: 1, redundancia: 1, escalabilidad: 2, ciberseguridad: 3, interfaz: 1, adaptacionMineria: 2, integracionSubs: 3, funcionalidadesNativas: 2, tco: 2, tiempoImplementacion: 2 }
        }
    ];
    const features = {
        arquitectura: 'Arquitectura', redundancia: 'Redundancia', escalabilidad: 'Escalabilidad', ciberseguridad: 'Ciberseguridad',
        interfaz: 'Interfaz de Usuario', adaptacionMineria: 'Adaptación a Minería', integracionSubs: 'Integración de Subs.',
        funcionalidadesNativas: 'Funcionalidades Nativas', tco: 'Costo Total (TCO)', tiempoImplementacion: 'Tiempo de Implementación'
    };

    // --- CÁLCULO DE RANKING ---
    const rankedScada = scadaData.map(scada => {
        const scores = Object.values(scada.scores);
        const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        return { ...scada, averageScore };
    }).sort((a, b) => b.averageScore - a.averageScore);
    
    // --- LÓGICA DE NAVEGACIÓN ---
    function initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const pages = document.querySelectorAll('.page');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.getAttribute('data-page');
                pages.forEach(p => p.classList.remove('active'));
                document.getElementById(pageId).classList.add('active');
                navLinks.forEach(n => n.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // --- PÁGINA: MATRIZ ---
    function initMatrix() {
        const matrixTable = document.getElementById('comparison-matrix');
        const filterContainer = document.getElementById('scada-filter-container');
        matrixTable.innerHTML = '';
        filterContainer.innerHTML = '';

        let headerRow = '<tr><th>Criterio</th>';
        scadaData.forEach(scada => {
            headerRow += `<th data-scada-id="${scada.id}">${scada.name}</th>`;
            filterContainer.innerHTML += `<label class="checkbox-wrapper"><input type="checkbox" class="scada-filter-cb" value="${scada.id}" checked> ${scada.name}</label>`;
        });
        headerRow += '</tr>';

        let bodyHtml = '';
        Object.keys(features).forEach(featureKey => {
            bodyHtml += `<tr data-feature-key="${featureKey}"><td>${features[featureKey]}</td>`;
            scadaData.forEach(scada => {
                const score = scada.scores[featureKey] || 0;
                bodyHtml += `<td class="score-cell score-${score}" data-scada-id="${scada.id}">${score}/5</td>`;
            });
            bodyHtml += '</tr>';
        });

        matrixTable.innerHTML = `<thead>${headerRow}</thead><tbody>${bodyHtml}</tbody>`;

        document.querySelectorAll('.scada-filter-cb').forEach(cb => cb.addEventListener('change', updateMatrixVisibility));
        document.querySelectorAll('#comparison-matrix tbody tr').forEach(row => {
            row.addEventListener('click', () => {
                document.querySelectorAll('#comparison-matrix tbody tr').forEach(r => r.classList.remove('selected'));
                row.classList.add('selected');
                updateFeaturesSidebar(row.getAttribute('data-feature-key'));
            });
        });
    }

    function updateMatrixVisibility() {
        const visibleScadaIds = Array.from(document.querySelectorAll('.scada-filter-cb:checked')).map(cb => cb.value);
        document.querySelectorAll('#comparison-matrix th, #comparison-matrix td').forEach(cell => {
            const scadaId = cell.getAttribute('data-scada-id');
            if (scadaId) {
                cell.style.display = visibleScadaIds.includes(scadaId) ? '' : 'none';
            }
        });
        const selectedRow = document.querySelector('#comparison-matrix tbody tr.selected');
        if (selectedRow) {
            updateFeaturesSidebar(selectedRow.getAttribute('data-feature-key'));
        }
    }

    function updateFeaturesSidebar(featureKey) {
        const contentEl = document.getElementById('features-content');
        if (!featureKey) {
            contentEl.innerHTML = '<p>Seleccione una fila para visualizar detalles.</p>';
            return;
        }
        let content = `<h3><span class="accent">//</span> ${features[featureKey]}</h3>`;
        const visibleScadaIds = Array.from(document.querySelectorAll('.scada-filter-cb:checked')).map(cb => cb.value);
        scadaData.filter(s => visibleScadaIds.includes(s.id)).forEach(scada => {
            content += `<h4>${scada.name}</h4><p>Puntuación: ${scada.scores[featureKey]}/5.</p>`;
        });
        contentEl.innerHTML = content;
    }

    // --- PÁGINA: ANÁLISIS DETALLADO ---
    let radarChart = null;
    function initAnalisis() {
        const radarSystemsSelector = document.getElementById('radar-systems-selector');
        const criteriaCheckboxesContainer = document.getElementById('criteria-checkboxes');
        
        scadaData.forEach(s => {
            radarSystemsSelector.innerHTML += `<option value="${s.id}">${s.name}</option>`;
        });
        Object.keys(features).forEach(key => {
            criteriaCheckboxesContainer.innerHTML += `<label><input type="checkbox" class="criteria-cb" value="${key}" checked> ${features[key]}</label>`;
        });

        radarSystemsSelector.addEventListener('change', updateAnalisisPage);
        document.querySelectorAll('.criteria-cb').forEach(cb => cb.addEventListener('change', updateAnalisisPage));
        
        radarSystemsSelector.options[0].selected = true;
        updateAnalisisPage();
    }

    function updateAnalisisPage() {
        const selectedSystemIds = Array.from(document.getElementById('radar-systems-selector').selectedOptions).map(opt => opt.value).slice(0, 3);
        const selectedCriteriaKeys = Array.from(document.querySelectorAll('.criteria-cb:checked')).map(cb => cb.value);
        
        updateRadarChart(selectedSystemIds, selectedCriteriaKeys);
        
        if (selectedSystemIds.length > 0) {
            updateFichaTecnica(selectedSystemIds[0]);
        } else {
            document.getElementById('ficha-tecnica').innerHTML = '<p style="text-align: center; padding: 2rem;">Seleccione un sistema para visualizar su ficha técnica.</p>';
        }
    }
    
    function updateRadarChart(systemIds, criteriaKeys) {
        const ctx = document.getElementById('radar-chart').getContext('2d');
        const radarColors = ['rgba(0, 255, 127, 0.4)', 'rgba(0, 191, 255, 0.4)', 'rgba(255, 215, 0, 0.4)'];
        const radarBorderColors = ['#00FF7F', '#00BFFF', '#FFD700'];

        if (radarChart) {
            radarChart.destroy();
        }

        if (systemIds.length === 0 || criteriaKeys.length === 0) {
            return;
        }

        const datasets = scadaData.filter(s => systemIds.includes(s.id)).map((scada, index) => ({
            label: scada.name,
            data: criteriaKeys.map(key => scada.scores[key]),
            backgroundColor: radarColors[index],
            borderColor: radarBorderColors[index],
            borderWidth: 2,
            pointBackgroundColor: radarBorderColors[index]
        }));
        
        radarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: criteriaKeys.map(key => features[key]),
                datasets: datasets
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'top', labels: { color: '#FFF', font: { size: 14 } } } },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
                        grid: { color: 'rgba(255, 255, 255, 0.2)' },
                        pointLabels: { color: '#FFF', font: { size: 12 } },
                        suggestedMin: 0, suggestedMax: 5,
                        ticks: { backdropColor: 'transparent', color: '#FFF', stepSize: 1 }
                    }
                }
            }
        });
    }
    
    function updateFichaTecnica(scadaId) {
        const scada = scadaData.find(s => s.id === scadaId);
        const fichaEl = document.getElementById('ficha-tecnica');
        const prosHtml = scada.pros.map(p => `<li>${p}</li>`).join('');
        const consHtml = scada.cons.map(c => `<li>${c}</li>`).join('');

        fichaEl.innerHTML = `
            <div class="ficha-header">
                <div class="ficha-logo">${scada.logo_text}</div>
                <h2>${scada.name}</h2>
            </div>
            <p class="ficha-summary">${scada.summary}</p>
            <div class="ficha-section">
                <h4><span class="accent">//</span> Ventajas Clave</h4>
                <ul class="pros-list">${prosHtml}</ul>
            </div>
            <div class="ficha-section">
                <h4><span class="accent">//</span> Puntos a Considerar</h4>
                <ul class="cons-list">${consHtml}</ul>
            </div>`;
    }

    // --- PÁGINA: RANKING ---
    function initRanking() {
        const listContainer = document.getElementById('ranked-list');
        listContainer.innerHTML = '';
        rankedScada.forEach((scada, index) => {
            let analysis = '';
            if (index === 0) analysis = 'Líder en rendimiento general, destacando en flexibilidad y fiabilidad.';
            else if (scada.averageScore > 3.5) analysis = 'Competidor robusto con fortalezas en áreas específicas como la redundancia.';
            else if (scada.averageScore > 2.5) analysis = 'Opción de nivel medio, requiere análisis de costo-beneficio para casos de uso específicos.';
            else analysis = 'Presenta deficiencias críticas en áreas clave, considerado de alto riesgo operativo.';

            listContainer.innerHTML += `
                <div class="ranked-item">
                    <div class="rank-position">#${index + 1}</div>
                    <div class="rank-details">
                        <h4>${scada.name}</h4>
                        <div class="score">Puntuación Promedio: ${scada.averageScore.toFixed(2)} / 5.00</div>
                        <p>${analysis}</p>
                    </div>
                </div>`;
        });

        document.getElementById('export-pdf-btn').addEventListener('click', () => {
             const element = document.getElementById('ranking-export-container');
             const opt = {
                 margin: 0.5, filename: 'Conclusion_Ejecutiva_SCADA.pdf', image: { type: 'jpeg', quality: 0.98 },
                 html2canvas: { scale: 2, backgroundColor: '#1A1A1A' }, jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
             };
             html2pdf().set(opt).from(element).save();
        });
    }

    // --- INICIALIZACIÓN GENERAL ---
    initialize();
    function initialize() {
        initNavigation();
        initMatrix();
        initAnalisis();
        initRanking();
    }
});

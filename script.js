document.addEventListener('DOMContentLoaded', function () {
    // --- ESTRUCTURA DE DATOS AMPLIADA ---
    const scadaData = [
        {
            id: 'zenon', name: 'Zenon COPADATA',
            summary: 'Plataforma SCADA robusta y altamente versátil, con un fuerte enfoque en la automatización industrial y energética. Reconocida por su arquitectura abierta y su facilidad de configuración sin programación.',
            pros: [
                'Excelente escalabilidad, probada en Centros de Control mineros.',
                'Redundancia nativa muy fiable (PRP/HSR).',
                'Interfaz de usuario moderna y personalizable (HTML5, Multitouch).',
                'Integración nativa y profunda con sistemas MES y ERP.',
                'Bajo Costo Total de Propiedad (TCO) gracias a la ingeniería basada en parámetros.'
            ],
            cons: [
                'El soporte para la versión ZEE600 (ABB) se canaliza a través de COPA-DATA, sin un service desk propio de ABB.',
                'Curva de aprendizaje inicial puede ser moderada para aprovechar todo su potencial.'
            ],
            scores: { arquitectura: 5, redundancia: 5, escalabilidad: 5, ciberseguridad: 4, interfaz: 5, adaptacionMineria: 5, integracionSubs: 5, funcionalidadesNativas: 5, tco: 4, tiempoImplementacion: 4 }
        },
        {
            id: 'microscada', name: 'MicroScada X HITACHI',
            summary: 'Solución SCADA de Hitachi Energy, consolidada en el sector de utilities para la gestión de redes eléctricas. Ofrece alta fiabilidad y un conjunto de herramientas potente para el control de subestaciones.',
            pros: [
                'Muy alta fiabilidad en redundancia (Shadowing).',
                'Arquitectura probada en entornos de alta exigencia (transmisión, generación).',
                'Buena capacidad de escalamiento para grandes sistemas.',
                'HMI personalizable mediante plantillas que facilitan la estandarización.'
            ],
            cons: [
                'Interfaz de usuario menos flexible y moderna en comparación con competidores.',
                'Adaptación a minería no es nativa y requiere personalización adicional.',
                'Mayor complejidad de ingeniería y mantenimiento.',
                'Algunos protocolos de comunicación pueden depender de proveedores terceros.'
            ],
            scores: { arquitectura: 4, redundancia: 5, escalabilidad: 4, ciberseguridad: 4, interfaz: 3, adaptacionMineria: 3, integracionSubs: 4, funcionalidadesNativas: 3, tco: 2, tiempoImplementacion: 2 }
        },
        {
            id: 'poweroperation', name: 'Power Operation Schneider',
            summary: 'Plataforma SCADA de Schneider Electric orientada a la gestión de energía. Presenta serios problemas de fiabilidad y usabilidad según los datos analizados, siendo una opción de alto riesgo.',
            pros: [
                'Acceso remoto flexible a través de cliente pesado, web y Power SCADA Anywhere.'
            ],
            cons: [
                'Fallas críticas reportadas en la configuración de la redundancia.',
                'Inestabilidad del sistema por generación excesiva de logs.',
                'Herramienta de desarrollo HMI deficiente, con errores y poco intuitiva.',
                'Dependencia crítica de software obsoleto (Excel 2016) para la gestión de la base de datos.',
                'Documentación pobre y poco detallada.'
            ],
            scores: { arquitectura: 1, redundancia: 1, escalabilidad: 2, ciberseguridad: 3, interfaz: 1, adaptacionMineria: 2, integracionSubs: 3, funcionalidadesNativas: 2, tco: 2, tiempoImplementacion: 2 }
        },
        {
            id: 'spectrum', name: 'Siemens Spectrum Power',
            summary: 'Solución integral de clase enterprise para la gestión de redes eléctricas, con un fuerte enfoque en T&D. Es una plataforma muy potente pero compleja y costosa, más orientada a grandes utilities.',
            pros: [
                'Arquitectura muy robusta y escalable, diseño modular.',
                'Alta disponibilidad y ciberseguridad de alto nivel.',
                'Capacidad gráfica avanzada y respaldo global de Siemens.'
            ],
            cons: [
                'Adaptación a minería requiere alta personalización.',
                'Costo Total de Propiedad (TCO) y tiempo de implementación muy elevados.',
                'Interfaz de usuario estándar, menos configurable para procesos industriales.',
                'Ingeniería compleja que requiere servicios altamente especializados.'
            ],
            scores: { arquitectura: 4, redundancia: 4, escalabilidad: 4, ciberseguridad: 4, interfaz: 3, adaptacionMineria: 3, integracionSubs: 4, funcionalidadesNativas: 4, tco: 1, tiempoImplementacion: 1 }
        }
    ];

    const features = {
        arquitectura: 'Arquitectura', redundancia: 'Redundancia', escalabilidad: 'Escalabilidad',
        ciberseguridad: 'Ciberseguridad', interfaz: 'Interfaz de Usuario', adaptacionMineria: 'Adaptación a Minería',
        integracionSubs: 'Integración de Subestaciones', funcionalidadesNativas: 'Funcionalidades Clave (Nativas)',
        tco: 'Costo Total (TCO)', tiempoImplementacion: 'Tiempo de Implementación'
    };

    // --- LÓGICA DE NAVEGACIÓN ---
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

    // --- PÁGINA: MATRIZ ---
    function initMatrix() {
        const matrixTable = document.getElementById('comparison-matrix');
        const filterContainer = document.getElementById('scada-filter-container');
        matrixTable.innerHTML = ''; // Limpiar
        filterContainer.innerHTML = ''; // Limpiar

        // Crear Header y Filtros
        let headerRow = '<tr><th>Criterio</th>';
        scadaData.forEach(scada => {
            headerRow += `<th data-scada-id="${scada.id}">${scada.name}</th>`;
            filterContainer.innerHTML += `<label class="checkbox-wrapper"><input type="checkbox" class="scada-filter-cb" value="${scada.id}" checked> ${scada.name}</label>`;
        });
        headerRow += '</tr>';
        
        // Crear Body
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
        addMatrixEventListeners();
    }

    function addMatrixEventListeners() {
        document.querySelectorAll('.scada-filter-cb').forEach(cb => cb.addEventListener('change', updateMatrixVisibility));
        document.querySelectorAll('#comparison-matrix tbody tr').forEach(row => row.addEventListener('click', () => {
            document.querySelectorAll('#comparison-matrix tbody tr').forEach(r => r.classList.remove('selected'));
            row.classList.add('selected');
            updateFeaturesSidebar(row.getAttribute('data-feature-key'));
        }));
    }
    
    function updateMatrixVisibility() {
        const visibleScadaIds = Array.from(document.querySelectorAll('.scada-filter-cb:checked')).map(cb => cb.value);
        document.querySelectorAll('#comparison-matrix th, #comparison-matrix td').forEach(cell => {
            const scadaId = cell.getAttribute('data-scada-id');
            if (scadaId) cell.style.display = visibleScadaIds.includes(scadaId) ? '' : 'none';
        });
        // Actualizar sidebar por si el sistema seleccionado se oculta
        const selectedRow = document.querySelector('#comparison-matrix tbody tr.selected');
        if(selectedRow) updateFeaturesSidebar(selectedRow.getAttribute('data-feature-key'));
    }

    function updateFeaturesSidebar(featureKey) {
        const contentEl = document.getElementById('features-content');
        if (!featureKey) { contentEl.innerHTML = '<p>Selecciona una fila.</p>'; return; }
        let content = `<h3><span class="accent">//</span> ${features[featureKey]}</h3>`;
        const visibleScadaIds = Array.from(document.querySelectorAll('.scada-filter-cb:checked')).map(cb => cb.value);
        scadaData.filter(s => visibleScadaIds.includes(s.id)).forEach(scada => {
            // Se necesita el detalle completo por criterio que no está en la data actual, se usa un placeholder
            content += `<h4>${scada.name}</h4><p>Detalle del rendimiento de ${scada.name} en ${features[featureKey]}.</p>`;
        });
        contentEl.innerHTML = content;
    }

    // --- PÁGINA: ANÁLISIS DETALLADO ---
    let radarChart;
    const analisisSelector = document.getElementById('analisis-selector');
    
    function initAnalisis() {
        scadaData.forEach(s => {
            analisisSelector.innerHTML += `<option value="${s.id}">${s.name}</option>`;
        });

        const ctx = document.getElementById('radar-chart').getContext('2d');
        radarChart = new Chart(ctx, {
            type: 'radar',
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'top', labels: { color: '#FFF' } } },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
                        grid: { color: 'rgba(255, 255, 255, 0.2)' },
                        pointLabels: { color: '#FFF', font: { size: 12 } },
                        suggestedMin: 0, suggestedMax: 5,
                        ticks: { backdropColor: 'transparent', color: '#FFF' }
                    }
                }
            }
        });
        
        analisisSelector.addEventListener('change', updateAnalisisPage);
        updateAnalisisPage();
    }

    function updateAnalisisPage() {
        const selectedId = analisisSelector.value;
        updateRadarChart(selectedId);
        updateFichaTecnica(selectedId);
    }

    function updateRadarChart(selectedId) {
        const selectedScada = scadaData.find(s => s.id === selectedId);
        radarChart.data.labels = Object.values(features);
        radarChart.data.datasets = [{
            label: selectedScada.name,
            data: Object.keys(features).map(f => selectedScada.scores[f]),
            backgroundColor: 'rgba(0, 255, 127, 0.4)',
            borderColor: '#00FF7F',
            borderWidth: 2
        }];
        radarChart.update();
    }

    function updateFichaTecnica(selectedId) {
        const scada = scadaData.find(s => s.id === selectedId);
        const fichaEl = document.getElementById('ficha-tecnica');
        const prosHtml = scada.pros.map(p => `<li>${p}</li>`).join('');
        const consHtml = scada.cons.map(c => `<li>${c}</li>`).join('');

        fichaEl.innerHTML = `
            <div class="ficha-header">
                <h2>${scada.name}</h2>
            </div>
            <p class="ficha-summary">${scada.summary}</p>
            <div class="ficha-section">
                <h4><span class="accent">//</span> Ventajas Clave</h4>
                <ul class="pros-list">${prosHtml}</ul>
            </div>
            <div class="ficha-section">
                <h4><span class="accent">//</span> Puntos de Mejora</h4>
                <ul class="cons-list">${consHtml}</ul>
            </div>
        `;
    }

    // --- PÁGINA: RANKING ---
    document.getElementById('export-pdf-btn').addEventListener('click', () => {
        const element = document.getElementById('conclusion-content');
        const opt = {
            margin: 1, filename: 'Veredicto_SCADA_Mineria.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, backgroundColor: '#1A1A1A', useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    });

    // --- INICIALIZACIÓN GENERAL ---
    initMatrix();
    initAnalisis();
});

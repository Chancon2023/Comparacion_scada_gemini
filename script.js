document.addEventListener('DOMContentLoaded', function () {
    // --- ESTRUCTURA DE DATOS FINAL Y COMPLETA ---
    const scadaData = [
        {
            id: 'zenon', name: 'Zenon COPADATA', logo_text: 'ZN',
            summary: 'Plataforma SCADA robusta y versátil, reconocida por su arquitectura abierta y su configuración sin programación, ideal para automatización industrial y energética.',
            pros: ['Excelente escalabilidad, probada en Centros de Control mineros.', 'Redundancia nativa muy fiable (PRP/HSR).', 'Interfaz de usuario moderna y personalizable (HTML5, Multitouch).', 'Integración nativa y profunda con sistemas MES y ERP.', 'Bajo Costo Total de Propiedad (TCO) por ingeniería basada en parámetros.'],
            cons: ['El soporte para la versión ZEE600 (ABB) se canaliza a través de COPA-DATA.', 'Curva de aprendizaje inicial puede ser moderada para aprovechar su potencial.'],
            scores: { arquitectura: 5, redundancia: 5, escalabilidad: 5, ciberseguridad: 4, interfaz: 5, adaptacionMineria: 5, integracionSubs: 5, funcionalidadesNativas: 5, tco: 4, tiempoImplementacion: 4 }
        },
        {
            id: 'microscada', name: 'MicroScada X HITACHI', logo_text: 'MSX',
            summary: 'Solución SCADA consolidada en el sector de utilities para la gestión de redes eléctricas. Ofrece alta fiabilidad y un potente control de subestaciones.',
            pros: ['Muy alta fiabilidad en redundancia (Shadowing).', 'Arquitectura probada en entornos de alta exigencia (transmisión, generación).', 'Buena capacidad de escalamiento para grandes sistemas.', 'HMI personalizable mediante plantillas que facilitan la estandarización.'],
            cons: ['Interfaz de usuario menos flexible y moderna.', 'Adaptación a minería no es nativa y requiere personalización.', 'Mayor complejidad de ingeniería y mantenimiento.', 'Protocolos pueden depender de proveedores terceros.'],
            scores: { arquitectura: 4, redundancia: 5, escalabilidad: 4, ciberseguridad: 4, interfaz: 3, adaptacionMineria: 3, integracionSubs: 4, funcionalidadesNativas: 3, tco: 2, tiempoImplementacion: 2 }
        },
        {
            id: 'poweroperation', name: 'Power Operation Schneider', logo_text: 'PSO',
            summary: 'Plataforma SCADA de Schneider Electric orientada a la gestión de energía. Presenta serios problemas de fiabilidad y usabilidad, siendo una opción de alto riesgo.',
            pros: ['Acceso remoto flexible a través de cliente pesado, web y Power SCADA Anywhere.'],
            cons: ['Fallas críticas reportadas en la configuración de la redundancia.', 'Inestabilidad del sistema por generación excesiva de logs.', 'Herramienta de desarrollo HMI deficiente y con errores.', 'Dependencia crítica de software obsoleto (Excel 2016).', 'Documentación pobre y poco detallada.'],
            scores: { arquitectura: 1, redundancia: 1, escalabilidad: 2, ciberseguridad: 3, interfaz: 1, adaptacionMineria: 2, integracionSubs: 3, funcionalidadesNativas: 2, tco: 2, tiempoImplementacion: 2 }
        },
        {
            id: 'spectrum', name: 'Siemens Spectrum Power', logo_text: 'SP',
            summary: 'Solución integral de clase enterprise para la gestión de redes eléctricas. Plataforma muy potente pero compleja y costosa, orientada a grandes utilities.',
            pros: ['Arquitectura muy robusta y escalable, diseño modular.', 'Alta disponibilidad y ciberseguridad de alto nivel.', 'Capacidad gráfica avanzada y respaldo global de Siemens.'],
            cons: ['Adaptación a minería requiere alta personalización.', 'Costo Total de Propiedad (TCO) y tiempo de implementación muy elevados.', 'Interfaz de usuario estándar, menos configurable para industria.', 'Ingeniería compleja que requiere servicios altamente especializados.'],
            scores: { arquitectura: 4, redundancia: 4, escalabilidad: 4, ciberseguridad: 4, interfaz: 3, adaptacionMineria: 3, integracionSubs: 4, funcionalidadesNativas: 4, tco: 1, tiempoImplementacion: 1 }
        },
        {
            id: 'adms', name: 'EcoStruxure ADMS', logo_text: 'ADMS',
            summary: 'Plataforma avanzada de Schneider para la gestión de redes de distribución. Su fortaleza reside en las aplicaciones analíticas, pero presenta debilidades en documentación y soporte.',
            pros: ['Panel de Control Unificado (Single Pane of Glass HMI).', 'Gestión de conmutación y notificaciones de apagones integradas.', 'Arquitectura modular diseñada para utilities.'],
            cons: ['Documentación técnica incompleta que genera dependencia de expertos.', 'Soporte técnico reactivo, aumentando riesgos de paradas.', 'Adaptación a minería es baja; foco principal en utilities.', 'Riesgos en puesta en servicio y mantenimiento por falta de información.'],
            scores: { arquitectura: 3, redundancia: 3, escalabilidad: 3, ciberseguridad: 3, interfaz: 3, adaptacionMineria: 2, integracionSubs: 3, funcionalidadesNativas: 3, tco: 3, tiempoImplementacion: 3 }
        },
        {
            id: 'zee600', name: 'ZEE600 ABB (Zenon)', logo_text: 'Z600',
            summary: 'Es la implementación de ABB de la plataforma Zenon de COPA-DATA. Hereda la mayoría de sus fortalezas, pero con consideraciones importantes en soporte y versionado.',
            pros: ['Hereda la robustez, escalabilidad y excelente interfaz de Zenon.', 'Alta disponibilidad en escritorios remotos (RDP), ideal para minería.', 'Implementación exitosa de arquitecturas redundantes.'],
            cons: ['Suele operar una versión por detrás de la última de Zenon (riesgo de falta de features/parches).', 'Soporte canalizado a través de COPA-DATA, sin un service desk propio de ABB.', 'Falta de KPIs o estudios de caso específicos de ABB que validen mejoras o diferencias.'],
            scores: { arquitectura: 5, redundancia: 5, escalabilidad: 5, ciberseguridad: 4, interfaz: 4, adaptacionMineria: 5, integracionSubs: 5, funcionalidadesNativas: 4, tco: 4, tiempoImplementacion: 4 }
        }
    ];
    const features = {
        arquitectura: 'Arquitectura', redundancia: 'Redundancia', escalabilidad: 'Escalabilidad', ciberseguridad: 'Ciberseguridad',
        interfaz: 'Interfaz de Usuario', adaptacionMineria: 'Adaptación a Minería', integracionSubs: 'Integración de Subs.',
        funcionalidadesNativas: 'Funcionalidades Nativas', tco: 'Costo Total (TCO)', tiempoImplementacion: 'Tiempo de Implementación'
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

    // --- PÁGINA: MATRIZ (Lógica completa) ---
    function initMatrix() {
        const matrixTable = document.getElementById('comparison-matrix');
        const filterContainer = document.getElementById('scada-filter-container');
        matrixTable.innerHTML = ''; filterContainer.innerHTML = '';
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
        const selectedRow = document.querySelector('#comparison-matrix tbody tr.selected');
        if(selectedRow) updateFeaturesSidebar(selectedRow.getAttribute('data-feature-key'));
    }

    function updateFeaturesSidebar(featureKey) {
        const contentEl = document.getElementById('features-content');
        if (!featureKey) { contentEl.innerHTML = '<p>Selecciona una fila para ver detalles.</p>'; return; }
        let content = `<h3><span class="accent">//</span> ${features[featureKey]}</h3>`;
        const visibleScadaIds = Array.from(document.querySelectorAll('.scada-filter-cb:checked')).map(cb => cb.value);
        scadaData.filter(s => visibleScadaIds.includes(s.id)).forEach(scada => {
            content += `<h4>${scada.name}</h4><p>Puntuación: ${scada.scores[featureKey]}/5. (Aquí iría el detalle textual del CSV si estuviera procesado)</p>`;
        });
        contentEl.innerHTML = content;
    }

    // --- PÁGINA: ANÁLISIS DETALLADO ---
    let radarChart = null; // Declarar la variable del gráfico globalmente en este scope
    const radarSystemsSelector = document.getElementById('radar-systems-selector');
    const criteriaCheckboxesContainer = document.getElementById('criteria-checkboxes');
    const radarColors = ['rgba(0, 255, 127, 0.4)', 'rgba(0, 191, 255, 0.4)', 'rgba(255, 215, 0, 0.4)'];
    const radarBorderColors = ['#00FF7F', '#00BFFF', '#FFD700'];

    function initAnalisis() {
        scadaData.forEach(s => radarSystemsSelector.innerHTML += `<option value="${s.id}">${s.name}</option>`);
        Object.keys(features).forEach(key => {
            criteriaCheckboxesContainer.innerHTML += `<label><input type="checkbox" class="criteria-cb" value="${key}" checked> ${features[key]}</label>`;
        });
        
        radarSystemsSelector.addEventListener('change', updateAnalisisPage);
        document.querySelectorAll('.criteria-cb').forEach(cb => cb.addEventListener('change', updateAnalisisPage));
        
        radarSystemsSelector.options[0].selected = true; // Seleccionar el primero por defecto
        updateAnalisisPage(); // Llamada inicial para dibujar el gráfico y la ficha
    }

    function updateAnalisisPage() {
        const selectedSystemIds = Array.from(radarSystemsSelector.selectedOptions).map(opt => opt.value).slice(0, 3);
        const selectedCriteriaKeys = Array.from(document.querySelectorAll('.criteria-cb:checked')).map(cb => cb.value);
        
        updateRadarChart(selectedSystemIds, selectedCriteriaKeys);
        
        if (selectedSystemIds.length > 0) {
            updateFichaTecnica(selectedSystemIds[0]);
        } else {
            document.getElementById('ficha-tecnica').innerHTML = '<p style="text-align: center; padding: 2rem;">Selecciona un sistema para ver su ficha técnica.</p>';
        }
    }
    
    function updateRadarChart(systemIds, criteriaKeys) {
        const ctx = document.getElementById('radar-chart').getContext('2d');

        // **LA CORRECCIÓN CLAVE ESTÁ AQUÍ**
        // Destruir la instancia anterior del gráfico si existe
        if (radarChart) {
            radarChart.destroy();
        }

        if (systemIds.length === 0 || criteriaKeys.length === 0) {
            return; // No dibujar nada si no hay selecciones
        }

        const filteredData = scadaData.filter(s => systemIds.includes(s.id));
        
        const datasets = filteredData.map((scada, index) => ({
            label: scada.name,
            data: criteriaKeys.map(key => scada.scores[key]),
            backgroundColor: radarColors[index],
            borderColor: radarBorderColors[index],
            borderWidth: 2,
            pointBackgroundColor: radarBorderColors[index]
        }));

        // Crear una nueva instancia del gráfico
        radarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: criteriaKeys.map(key => features[key]),
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { color: '#FFF', font: { size: 14 } } }
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
            </div>
        `;
    }

    // --- PÁGINA: RANKING ---
    document.getElementById('export-pdf-btn').addEventListener('click', () => {
        const element = document.getElementById('conclusion-content');
        const opt = {
            margin: 1, filename: 'Veredicto_SCADA.pdf',
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

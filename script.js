document.addEventListener('DOMContentLoaded', function () {
    // --- ESTRUCTURA DE DATOS DETALLADA ---
    const scadaData = [
        {
            id: 'zenon', name: 'Zenon COPADATA', logo_text: 'ZN',
            summary: 'Plataforma SCADA caracterizada por su arquitectura abierta y configuración basada en parámetros, lo que reduce la carga de ingeniería y facilita la integración en entornos industriales complejos.',
            pros: ['Alta escalabilidad, validada en Centros de Control.', 'Soporte nativo para protocolos de redundancia (PRP/HSR).', 'Interfaz de usuario moderna (HTML5, Multitouch).', 'Integración profunda con sistemas MES y ERP.', 'Bajo Costo Total de Propiedad (TCO).'],
            cons: ['El modelo de soporte para la versión ZEE600 (ABB) depende de COPA-DATA.', 'Curva de aprendizaje inicial para funcionalidades avanzadas.'],
            scores: {
                arquitectura: { score: 5, compliance: 'Cumple', detail: 'Arquitectura distribuida y redundante, probada en campo.' },
                redundancia: { score: 5, compliance: 'Cumple', detail: 'Soporte nativo para PRP/HSR, muy fiable.' },
                escalabilidad: { score: 5, compliance: 'Cumple', detail: 'Excelente, desde sistemas locales a centros de control.' },
                ciberseguridad: { score: 4, compliance: 'Cumple', detail: 'Soporte para IEC 62443 y Active Directory.' },
                normaNTSyCS: { score: 5, compliance: 'Cumple', detail: 'Totalmente alineado a los requerimientos de la norma.' },
                interfaz: { score: 5, compliance: 'Cumple', detail: 'Moderna y flexible (HTML5, Web, Multitouch).' },
                adaptacionMineria: { score: 5, compliance: 'Cumple', detail: 'Integración nativa con sistemas MES/ERP.' },
                integracionSubs: { score: 5, compliance: 'Cumple', detail: 'Soporte nativo para todos los protocolos estándar.' },
                funcionalidadesNativas: { score: 5, compliance: 'Cumple', detail: 'Plataforma unificada con GIS, Historian, etc.' },
                tco: { score: 4, compliance: 'Cumple', detail: 'Bajo a medio, por ingeniería eficiente y licencias escalables.' },
                tiempoImplementacion: { score: 4, compliance: 'Cumple', detail: 'Medio a corto, gracias a su configuración por parámetros.' }
            }
        },
        {
            id: 'microscada', name: 'MicroScada X HITACHI', logo_text: 'MSX',
            summary: 'Solución SCADA consolidada en el sector de utilities para la gestión de redes eléctricas. Destaca por su alta fiabilidad.',
            pros: ['Alta fiabilidad en mecanismos de redundancia (Shadowing).', 'Arquitectura validada en entornos de misión crítica.', 'Capacidad de escalamiento adecuada para grandes sistemas.'],
            cons: ['Interfaz de usuario menos flexible y moderna.', 'Adaptación a minería no es nativa y requiere personalización.', 'Mayor complejidad de ingeniería y mantenimiento.'],
            scores: {
                arquitectura: { score: 4, compliance: 'Cumple', detail: 'Soluciones redundantes (HSB) probadas en el sector.' },
                redundancia: { score: 5, compliance: 'Cumple', detail: 'Operación muy fiable mediante Shadowing.' },
                escalabilidad: { score: 4, compliance: 'Cumple', detail: 'Buena escalabilidad, implementado en Centros de Control.' },
                ciberseguridad: { score: 4, compliance: 'Cumple', detail: 'Seguridad robusta de alto nivel.' },
                normaNTSyCS: { score: 4, compliance: 'Cumple', detail: 'Cumple con los estándares de ciberseguridad del sector eléctrico.' },
                interfaz: { score: 3, compliance: 'Cumple', detail: 'Personalizable vía plantillas, pero menos flexible.' },
                adaptacionMineria: { score: 3, compliance: 'Cumple', detail: 'Requiere personalización para integración completa.' },
                integracionSubs: { score: 4, compliance: 'Cumple', detail: 'Alta compatibilidad con protocolos estándar de utilities.' },
                funcionalidadesNativas: { score: 3, compliance: 'Cumple', detail: 'Set de funciones estándar para operación de redes.' },
                tco: { score: 2, compliance: 'No Cumple', detail: 'Alto, debido a la necesidad de servicios especializados.' },
                tiempoImplementacion: { score: 2, compliance: 'No Cumple', detail: 'Largo, por su alta complejidad de ingeniería.' }
            }
        },
        {
            id: 'poweroperation', name: 'Power Operation Schneider', logo_text: 'PSO',
            summary: 'Plataforma SCADA de Schneider Electric para gestión de energía. Los datos analizados revelan deficiencias significativas en fiabilidad y usabilidad, constituyendo una opción de alto riesgo.',
            pros: ['Flexibilidad de acceso remoto mediante cliente pesado, cliente web y Power SCADA Anywhere.'],
            cons: ['Fallas críticas reportadas en la configuración de la redundancia.', 'Inestabilidad del sistema atribuida a la generación excesiva de logs.', 'Herramienta de desarrollo HMI calificada como deficiente y propensa a errores.', 'Dependencia crítica de software obsoleto (MS Excel 2016).'],
            scores: {
                arquitectura: { score: 1, compliance: 'No Cumple', detail: 'Presenta problemas críticos de redundancia.' },
                redundancia: { score: 1, compliance: 'No Cumple', detail: 'Fallas reportadas, no se logra configurar. No fiable.' },
                escalabilidad: { score: 2, compliance: 'No Cumple', detail: 'Problemática, generación excesiva de logs causa fallas.' },
                ciberseguridad: { score: 3, compliance: 'Cumple', detail: 'Nivel estándar, pero la inestabilidad es un riesgo.' },
                normaNTSyCS: { score: 2, compliance: 'No Cumple', detail: 'Alineamiento parcial; la inestabilidad del sistema es un riesgo.' },
                interfaz: { score: 1, compliance: 'No Cumple', detail: 'Herramienta de desarrollo HMI deficiente y con errores.' },
                adaptacionMineria: { score: 2, compliance: 'No Cumple', detail: 'Baja, opción riesgosa por su inestabilidad.' },
                integracionSubs: { score: 3, compliance: 'Cumple', detail: 'Integración estándar con protocolos comunes.' },
                funcionalidadesNativas: { score: 2, compliance: 'No Cumple', detail: 'Set de funciones básico, con limitaciones reportadas.' },
                tco: { score: 2, compliance: 'No Cumple', detail: 'Medio-Alto, considerando los costos de mitigación de riesgos.' },
                tiempoImplementacion: { score: 2, compliance: 'No Cumple', detail: 'Largo, por dificultades en configuración y desarrollo.' }
            }
        }
        // ... (resto de los objetos de datos omitidos por brevedad, pero seguirían la misma estructura) ...
    ];
    const features = {
        arquitectura: 'Arquitectura', redundancia: 'Redundancia', escalabilidad: 'Escalabilidad', ciberseguridad: 'Ciberseguridad', normaNTSyCS: 'Cumplimiento Norma NTSyCS',
        interfaz: 'Interfaz de Usuario', adaptacionMineria: 'Adaptación a Minería', integracionSubs: 'Integración de Subs.',
        funcionalidadesNativas: 'Funcionalidades Nativas', tco: 'Costo Total (TCO)', tiempoImplementacion: 'Tiempo de Implementación'
    };

    // --- CÁLCULO DE RANKING ---
    const rankedScada = scadaData.map(scada => {
        const scores = Object.values(scada.scores).map(s => s.score);
        const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        return { ...scada, averageScore };
    }).sort((a, b) => b.averageScore - a.averageScore);

    // --- INICIALIZACIÓN GENERAL ---
    function initialize() {
        initNavigation();
        initMatrix();
        initAnalisis();
        initRanking();
    }
    
    // --- PÁGINA: MATRIZ (Lógica Actualizada) ---
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
                const item = scada.scores[featureKey] || { score: 0, compliance: 'No Cumple', detail: 'N/A' };
                const complianceClass = item.compliance === 'Cumple' ? 'compliance-cumple' : 'compliance-no-cumple';
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
        
        // Adjuntar event listeners después de crear el contenido
        document.querySelectorAll('.scada-filter-cb').forEach(cb => cb.addEventListener('change', updateMatrixVisibility));
        document.querySelectorAll('#comparison-matrix tbody tr').forEach(row => {
            row.addEventListener('click', () => {
                document.querySelectorAll('#comparison-matrix tbody tr').forEach(r => r.classList.remove('selected'));
                row.classList.add('selected');
                updateFeaturesSidebar(row.getAttribute('data-feature-key'));
            });
        });
    }

    // --- PÁGINA: ANÁLISIS DETALLADO (Lógica Actualizada) ---
    function updateRadarChart(systemIds, criteriaKeys) {
        if(radarChart) radarChart.destroy();
        if (systemIds.length === 0 || criteriaKeys.length === 0) return;
        const ctx = document.getElementById('radar-chart').getContext('2d');
        const datasets = scadaData.filter(s => systemIds.includes(s.id)).map((scada, index) => ({
            label: scada.name,
            data: criteriaKeys.map(key => scada.scores[key].score), // **Acceso al score anidado**
            backgroundColor: ['rgba(0, 255, 127, 0.4)', 'rgba(0, 191, 255, 0.4)', 'rgba(255, 215, 0, 0.4)'][index],
            borderColor: ['#00FF7F', '#00BFFF', '#FFD700'][index],
            borderWidth: 2,
        }));
        radarChart = new Chart(ctx, { type: 'radar', data: { labels: criteriaKeys.map(key => features[key]), datasets }, options: { /* Opciones... */ } });
    }

    // El resto de las funciones (initNavigation, initAnalisis, initRanking, etc.) permanecen sin cambios estructurales
    // Se omite su código duplicado por brevedad, pero la lógica completa de la versión anterior sigue siendo válida.
    // La única corrección crítica es el acceso a `scada.scores[key].score` en el radar.
    
    // El código completo de la versión anterior, con esta corrección, es lo que se debe usar.
    // Esta respuesta se enfoca en mostrar los cambios solicitados.

    // Llamada a la inicialización
    initialize();

    // Declaraciones completas de funciones omitidas para brevedad
    function initNavigation() { /* ... */ }
    let radarChart = null;
    function initAnalisis() { /* ... */ }
    function updateAnalisisPage() { /* ... */ }
    function updateFichaTecnica(scadaId) { /* ... */ }
    function initRanking() { /* ... */ }
    function updateMatrixVisibility() { /* ... */ }
    function updateFeaturesSidebar(featureKey) { /* ... */ }
});

document.addEventListener('DOMContentLoaded', function () {
    // --- ESTRUCTURA DE DATOS PROCESADA ---
    // He convertido el texto de los CSV a datos estructurados con puntuaciones del 1 al 5.
    const scadaData = [
        {
            id: 'zenon', name: 'Zenon COPADATA',
            scores: { arquitectura: 5, redundancia: 5, escalabilidad: 5, ciberseguridad: 4, interfaz: 4, adaptacionMineria: 5 },
            details: {
                arquitectura: 'Arquitectura Cliente-Servidor robusta, soporta redundancia y distribución. Éxito probado en minería.',
                redundancia: 'Modos Dominante, No Dominante y Clasificado. Soporta PRP/HSR. Muy fiable.',
                escalabilidad: 'Excelente. Probado desde instalaciones pequeñas hasta Centros de Control completos en minería.',
                ciberseguridad: 'Soporte completo para IEC 62443, encriptación y Active Directory.',
                interfaz: 'Avanzada y moderna. Soporta HTML5, web client y multitouch. Alta disponibilidad en RDP.',
                adaptacionMineria: 'Integración nativa y fuerte con MES, ERP y sistemas de mantenimiento. Considerado ideal para el sector.'
            }
        },
        {
            id: 'microscada', name: 'MicroScada X HITACHI',
            scores: { arquitectura: 4, redundancia: 5, escalabilidad: 4, ciberseguridad: 4, interfaz: 3, adaptacionMineria: 3 },
            details: {
                arquitectura: 'Soluciones avanzadas y redundantes (HSB) probadas en el sector. Flexible.',
                redundancia: 'Funciona de forma muy correcta mediante Shadowing. Fiable.',
                escalabilidad: 'Buena escalabilidad, implementado en Centros de Control de minería y transmisión.',
                ciberseguridad: 'Seguridad robusta de alto nivel, estándar en el sector de utilities.',
                interfaz: 'HMI personalizable basada en plantillas, pero menos flexible que Zenon. Más orientada a operadores de red.',
                adaptacionMineria: 'Adaptación media. Requiere personalización y desarrollos adicionales para integrarse completamente.'
            }
        },
        {
            id: 'poweroperation', name: 'Power Operation Schneider',
            scores: { arquitectura: 1, redundancia: 1, escalabilidad: 2, ciberseguridad: 3, interfaz: 1, adaptacionMineria: 2 },
            details: {
                arquitectura: 'Presenta problemas críticos. La redundancia no se logra configurar según los datos.',
                redundancia: 'Fallas reportadas. Los parches de fábrica no solucionan el problema. No es fiable.',
                escalabilidad: 'Problemática. La generación excesiva de logs puede llenar discos y causar fallas en el sistema.',
                ciberseguridad: 'Nivel de seguridad estándar, pero la inestabilidad del sistema es un riesgo mayor.',
                interfaz: 'Herramienta de desarrollo HMI deficiente, con errores y dependiente de software obsoleto (Excel 2016).',
                adaptacionMineria: 'Baja. La inestabilidad y las dificultades de configuración lo hacen una opción riesgosa.'
            }
        },
        {
            id: 'ecostruxure', name: 'EcoStruxure ADMS Schneider',
            scores: { arquitectura: 3, redundancia: 3, escalabilidad: 3, ciberseguridad: 3, interfaz: 3, adaptacionMineria: 2 },
            details: {
                arquitectura: 'Arquitectura modular pero con documentación deficiente, lo que genera dependencia de expertos.',
                redundancia: 'Funcionalidad de redundancia de servidores y datos, pero no se especifican pruebas de campo.',
                escalabilidad: 'Diseñado para ser modular, pero la falta de documentación puede complicar la expansión.',
                ciberseguridad: 'Estándares de la industria, pero el soporte reactivo puede aumentar los riesgos.',
                interfaz: 'Panel de control unificado, pero la experiencia de usuario no se destaca en los comentarios.',
                adaptacionMineria: 'Baja. Más orientado a utilities y la documentación parcial es un riesgo para operaciones críticas.'
            }
        },
        {
            id: 'epas', name: 'EPAS Gateway Schneider',
            scores: { arquitectura: 3, redundancia: 2, escalabilidad: 3, ciberseguridad: 3, interfaz: 2, adaptacionMineria: 1 },
            details: {
                arquitectura: 'Arquitectura modular y escalable. Redundancia entre servidores fácil de aplicar.',
                redundancia: 'No posee protocolos modernos como HSR o PRP, una desventaja competitiva importante.',
                escalabilidad: 'Altamente escalable para gestionar múltiples protocolos y canales.',
                ciberseguridad: 'Seguridad estándar para un gateway, pero no es una solución SCADA completa.',
                interfaz: 'La configuración de la base de datos es lenta y depende de un software externo (PACIS).',
                adaptacionMineria: 'Muy baja. Es un gateway de comunicación, no un sistema de control de operaciones mineras.'
            }
        },
         {
            id: 'spectrum', name: 'Siemens Spectrum Power',
            scores: { arquitectura: 4, redundancia: 4, escalabilidad: 4, ciberseguridad: 4, interfaz: 3, adaptacionMineria: 3 },
            details: {
                arquitectura: 'Solución integral y de alta ingeniería, muy robusta para redes eléctricas T&D.',
                redundancia: 'Alta disponibilidad, estándar para el sector de utilities.',
                escalabilidad: 'Muy escalable gracias a su diseño modular, pero complejo.',
                ciberseguridad: 'Seguridad de alto nivel, con respaldo global de Siemens.',
                interfaz: 'Estándar, muy enfocada en operadores de red eléctrica, menos personalizable para industria.',
                adaptacionMineria: 'Media. Requiere personalización y está más orientada a utilities que a procesos industriales.'
            }
        }
    ];

    const features = {
        arquitectura: 'Arquitectura',
        redundancia: 'Redundancia',
        escalabilidad: 'Escalabilidad',
        ciberseguridad: 'Ciberseguridad',
        interfaz: 'Interfaz de Usuario',
        adaptacionMineria: 'Adaptación a Minería'
    };

    // --- NAVEGACIÓN DE LA APP ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');

            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(pageId).classList.add('active');

            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // --- INICIALIZACIÓN DE LA MATRIZ Y FILTROS ---
    const matrixBody = document.createElement('tbody');
    const matrixHeader = document.createElement('thead');
    const matrixTable = document.getElementById('comparison-matrix');
    const filterContainer = document.getElementById('scada-filter-container');

    // Crear Header
    let headerRow = '<tr><th>Criterio</th>';
    scadaData.forEach(scada => {
        headerRow += `<th data-scada-id="${scada.id}">${scada.name}</th>`;
    });
    headerRow += '</tr>';
    matrixHeader.innerHTML = headerRow;

    // Crear Body
    Object.keys(features).forEach(featureKey => {
        let rowHtml = `<tr data-feature-key="${featureKey}"><td>${features[featureKey]}</td>`;
        scadaData.forEach(scada => {
            const score = scada.scores[featureKey] || 0;
            rowHtml += `<td class="score-cell score-${score}" data-scada-id="${scada.id}">${score}/5</td>`;
        });
        rowHtml += '</tr>';
        matrixBody.innerHTML += rowHtml;
    });

    matrixTable.appendChild(matrixHeader);
    matrixTable.appendChild(matrixBody);
    
    // Crear Filtros
    scadaData.forEach(scada => {
        filterContainer.innerHTML += `
            <label class="checkbox-wrapper">
                <input type="checkbox" class="scada-filter-cb" value="${scada.id}" checked>
                ${scada.name}
            </label>
        `;
    });

    // --- LÓGICA DE INTERACTIVIDAD DE LA MATRIZ ---
    document.querySelectorAll('.scada-filter-cb').forEach(cb => {
        cb.addEventListener('change', updateMatrixVisibility);
    });

    function updateMatrixVisibility() {
        const visibleScadaIds = Array.from(document.querySelectorAll('.scada-filter-cb:checked')).map(cb => cb.value);
        document.querySelectorAll('#comparison-matrix th, #comparison-matrix td').forEach(cell => {
            const scadaId = cell.getAttribute('data-scada-id');
            if (scadaId) {
                cell.style.display = visibleScadaIds.includes(scadaId) ? '' : 'none';
            }
        });
    }

    const featuresSidebarContent = document.getElementById('features-content');
    matrixBody.querySelectorAll('tr').forEach(row => {
        row.addEventListener('click', () => {
            matrixBody.querySelectorAll('tr').forEach(r => r.classList.remove('selected'));
            row.classList.add('selected');

            const featureKey = row.getAttribute('data-feature-key');
            let content = `<h3><span class="accent">//</span> ${features[featureKey]}</h3>`;
            
            const visibleScadaIds = Array.from(document.querySelectorAll('.scada-filter-cb:checked')).map(cb => cb.value);

            scadaData.filter(s => visibleScadaIds.includes(s.id)).forEach(scada => {
                content += `
                    <h4>${scada.name}</h4>
                    <p>${scada.details[featureKey]}</p>
                `;
            });
            featuresSidebarContent.innerHTML = content;
        });
    });


    // --- LÓGICA DE GRÁFICOS ---
    Chart.defaults.color = '#E0E0E0';
    Chart.defaults.borderColor = '#444';

    const barChartSystems = document.getElementById('bar-chart-systems');
    const barChartFeature = document.getElementById('bar-chart-feature');
    const radarChartSystems = document.getElementById('radar-chart-systems');
    
    // Poblar Selects
    scadaData.forEach(s => {
        barChartSystems.innerHTML += `<option value="${s.id}">${s.name}</option>`;
        radarChartSystems.innerHTML += `<option value="${s.id}">${s.name}</option>`;
    });
    Object.keys(features).forEach(f => {
        barChartFeature.innerHTML += `<option value="${f}">${features[f]}</option>`;
    });
    
    // Colores para el radar
    const radarColors = ['rgba(0, 255, 127, 0.4)', 'rgba(0, 191, 255, 0.4)', 'rgba(255, 215, 0, 0.4)', 'rgba(255, 69, 0, 0.4)'];


    // Crear Gráficos
    const barChart = new Chart('bar-chart', { type: 'bar', options: getChartOptions('Comparativa') });
    const radarChart = new Chart('radar-chart', { type: 'radar', options: getChartOptions('Perfil de Rendimiento') });
    
    function getChartOptions(title) {
        return {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'top' } },
            scales: { r: { suggestedMin: 0, suggestedMax: 5, grid: { color: '#444' } } }
        };
    }

    function updateBarChart() {
        const selectedSystemIds = Array.from(barChartSystems.selectedOptions).map(opt => opt.value);
        const selectedFeature = barChartFeature.value;
        const filteredData = scadaData.filter(s => selectedSystemIds.includes(s.id));

        barChart.data.labels = filteredData.map(s => s.name);
        barChart.data.datasets = [{
            label: features[selectedFeature],
            data: filteredData.map(s => s.scores[selectedFeature]),
            backgroundColor: 'rgba(0, 255, 127, 0.6)',
            borderColor: '#00FF7F',
            borderWidth: 1
        }];
        barChart.update();
    }

    function updateRadarChart() {
        const selectedSystemIds = Array.from(radarChartSystems.selectedOptions).map(opt => opt.value);
        const filteredData = scadaData.filter(s => selectedSystemIds.includes(s.id));
        
        radarChart.data.labels = Object.values(features);
        radarChart.data.datasets = filteredData.map((scada, index) => ({
            label: scada.name,
            data: Object.keys(features).map(f => scada.scores[f]),
            backgroundColor: radarColors[index % radarColors.length],
            borderColor: radarColors[index % radarColors.length].replace('0.4', '1'),
            borderWidth: 2
        }));
        radarChart.update();
    }

    barChartSystems.addEventListener('change', updateBarChart);
    barChartFeature.addEventListener('change', updateBarChart);
    radarChartSystems.addEventListener('change', updateRadarChart);


    // --- LÓGICA DE EXPORTACIÓN A PDF ---
    document.getElementById('export-pdf-btn').addEventListener('click', () => {
        const element = document.getElementById('conclusion-content');
        const opt = {
            margin:       1,
            filename:     'Veredicto_SCADA_Mineria.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, backgroundColor: '#1A1A1A', useCORS: true },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    });

    // --- INICIALIZACIÓN AL CARGAR ---
    // Seleccionar por defecto algunos sistemas para que los gráficos no estén vacíos
    barChartSystems.options[0].selected = true;
    barChartSystems.options[1].selected = true;
    radarChartSystems.options[0].selected = true;
    updateBarChart();
    updateRadarChart();
});

document.addEventListener('DOMContentLoaded', function () {
    // --- ESTRUCTURA DE DATOS COMPLETA Y DETALLADA ---
    const scadaData = [
        {
            id: 'zenon', name: 'Zenon COPADATA', logo_text: 'ZN', color: '#00FF7F',
            summary: 'Plataforma SCADA caracterizada por su arquitectura abierta y configuración basada en parámetros, lo que reduce la carga de ingeniería y facilita la integración en entornos industriales complejos.',
            pros: ['Alta escalabilidad, validada en Centros de Control.', 'Soporte nativo para protocolos de redundancia (PRP/HSR).', 'Interfaz de usuario moderna (HTML5, Multitouch).', 'Integración profunda con sistemas MES y ERP.', 'Bajo Costo Total de Propiedad (TCO).'],
            cons: ['El modelo de soporte para la versión ZEE600 (ABB) depende de COPA-DATA.', 'Curva de aprendizaje inicial para funcionalidades avanzadas.'],
            scores: { /* ... (datos de la versión anterior) ... */ }
        },
        {
            id: 'zee600', name: 'ZEE600 ABB (Zenon)', logo_text: 'Z600', color: '#00BFFF',
            summary: 'Implementación de ABB de la plataforma Zenon. Comparte el núcleo tecnológico de COPA-DATA, beneficiándose de su robustez, aunque con consideraciones específicas de ciclo de vida y soporte.',
            pros: ['Hereda la arquitectura robusta, escalabilidad y la excelente interfaz de Zenon.', 'Alta disponibilidad para acceso remoto (RDP).', 'Capacidad comprobada para implementar arquitecturas de alta redundancia.'],
            cons: ['El ciclo de vida de las versiones opera con un desfase respecto a la versión principal de Zenon.', 'El soporte técnico es canalizado a través de COPA-DATA, sin un service desk primario de ABB.'],
            scores: { /* ... (datos de la versión anterior) ... */ }
        },
        {
            id: 'microscada', name: 'MicroScada X HITACHI', logo_text: 'MSX', color: '#FFD700',
            summary: 'Solución SCADA consolidada en el sector de utilities para la gestión de redes eléctricas. Destaca por su alta fiabilidad.',
            pros: ['Alta fiabilidad en mecanismos de redundancia (Shadowing).', 'Arquitectura validada en entornos de misión crítica.', 'Capacidad de escalamiento adecuada para grandes sistemas.'],
            cons: ['Interfaz de usuario menos flexible y moderna.', 'Adaptación a minería no es nativa y requiere personalización.', 'Mayor complejidad de ingeniería y mantenimiento.'],
            scores: { /* ... (datos de la versión anterior) ... */ }
        }
        // ... (resto de los objetos de datos completos aquí, con sus 'color') ...
    ];
    // Se omiten los datos completos para brevedad, usar los de la versión anterior y añadir la propiedad 'color'.
    
    // --- LÓGICA DE LA APLICACIÓN ---
    let radarChart = null; 

    // PÁGINA: ANÁLISIS DETALLADO (Lógica Actualizada para Píldoras)
    function initAnalisis() {
        const platformPillsContainer = document.getElementById('platform-selector-pills');
        const criteriaPillsContainer = document.getElementById('criteria-selector-pills');

        // Generar píldoras de plataformas
        scadaData.forEach(scada => {
            const pill = document.createElement('div');
            pill.className = 'platform-pill';
            pill.dataset.id = scada.id;
            pill.style.setProperty('--platform-color', scada.color); // Sincronizar color
            pill.innerHTML = `<span class="color-dot" style="background-color: ${scada.color};"></span> ${scada.name}`;
            platformPillsContainer.appendChild(pill);
        });

        // Generar píldoras de criterios
        Object.keys(features).forEach(key => {
            const pill = document.createElement('div');
            pill.className = 'criteria-pill active'; // Activos por defecto
            pill.dataset.key = key;
            pill.textContent = features[key];
            criteriaPillsContainer.appendChild(pill);
        });

        // Event Listeners con delegación
        platformPillsContainer.addEventListener('click', (e) => {
            const pill = e.target.closest('.platform-pill');
            if (!pill) return;
            
            const selectedCount = platformPillsContainer.querySelectorAll('.platform-pill.active').length;
            if (!pill.classList.contains('active') && selectedCount >= 3) {
                // Opcional: mostrar una alerta o simplemente no hacer nada
                return; 
            }
            pill.classList.toggle('active');
            updateAnalisisPage();
        });

        criteriaPillsContainer.addEventListener('click', (e) => {
            const pill = e.target.closest('.criteria-pill');
            if (pill) {
                pill.classList.toggle('active');
                updateAnalisisPage();
            }
        });
        
        // Seleccionar el primero por defecto
        if (platformPillsContainer.firstChild) {
            platformPillsContainer.firstChild.classList.add('active');
        }
        updateAnalisisPage();
    }

    function updateAnalisisPage() {
        const selectedSystemIds = Array.from(document.querySelectorAll('.platform-pill.active')).map(pill => pill.dataset.id);
        const selectedCriteriaKeys = Array.from(document.querySelectorAll('.criteria-pill.active')).map(pill => pill.dataset.key);
        
        updateRadarChart(selectedSystemIds, selectedCriteriaKeys);
        
        if (selectedSystemIds.length > 0) {
            updateFichaTecnica(selectedSystemIds[0]);
        } else {
            document.getElementById('ficha-tecnica').innerHTML = '<p style="text-align: center; padding: 2rem;">Seleccione una plataforma para visualizar su ficha técnica.</p>';
        }
    }
    
    function updateRadarChart(systemIds, criteriaKeys) {
        if (radarChart) {
            radarChart.destroy();
        }

        if (systemIds.length === 0 || criteriaKeys.length === 0) return;

        const ctx = document.getElementById('radar-chart').getContext('2d');
        const datasets = scadaData
            .filter(s => systemIds.includes(s.id))
            .map(scada => ({
                label: scada.name,
                data: criteriaKeys.map(key => scada.scores[key].score),
                backgroundColor: hexToRgba(scada.color, 0.4),
                borderColor: scada.color,
                borderWidth: 2,
                pointBackgroundColor: scada.color
            }));
        
        radarChart = new Chart(ctx, { /* ... (resto de la configuración del gráfico sin cambios) ... */ });
    }
    
    function updateFichaTecnica(scadaId) {
        const scada = scadaData.find(s => s.id === scadaId);
        const fichaEl = document.getElementById('ficha-tecnica');
        // Actualizar color de la ficha
        fichaEl.style.setProperty('--platform-color', scada.color);
        // ... (resto de la lógica para llenar la ficha, sin cambios) ...
    }

    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // El resto de funciones (initialize, initMatrix, initRanking, etc.)
    // deben ser las de la versión anterior, funcional y completa.
    // Esta respuesta se enfoca en los cambios de la interfaz de análisis.
    // ...
    initialize();
});


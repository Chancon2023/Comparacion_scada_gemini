document.addEventListener('DOMContentLoaded', function () {
    
    // --- LÓGICA DE SCROLL SUAVE ---
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // --- LÓGICA DEL DASHBOARD INTERACTIVO ---
    const ctx = document.getElementById('scada-comparison-chart').getContext('2d');
    
    // Configuración de colores para tema oscuro
    Chart.defaults.color = '#E0E0E0';
    Chart.defaults.borderColor = '#444';

    const scadaData = {
        labels: ['Zenon (NCS)', 'Hitachi Network Mgr.', 'Siemens Spectrum P.'],
        metrics: {
            adaptacion: {
                label: 'Adaptación a Minería',
                data: [3, 2, 2],
            },
            escalabilidad: {
                label: 'Escalabilidad',
                data: [3, 3, 3],
            },
            implementacion: {
                label: 'Velocidad de Implementación (Más es Mejor)',
                data: [3, 1, 1], // Invertido: Corto=3, Largo=1
            },
            costo: {
                label: 'Costo Total de Propiedad (Más es Mejor)',
                data: [3, 1, 1], // Invertido: Bajo=3, Alto=1
            },
            integracion: {
                label: 'Poder de Integración',
                data: [3, 3, 3], 
            }
        }
    };

    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: scadaData.labels,
            datasets: [{
                label: scadaData.metrics.adaptacion.label,
                data: scadaData.metrics.adaptacion.data,
                backgroundColor: 'rgba(0, 255, 127, 0.6)',
                borderColor: '#00FF7F',
                borderWidth: 2,
                borderRadius: 5,
                hoverBackgroundColor: 'rgba(0, 255, 127, 0.8)',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 3.5,
                    grid: {
                        color: '#2C2C2C'
                    },
                    ticks: {
                        font: { size: 14 },
                         callback: function(value) {
                             if (value === 1) return 'Bajo';
                             if (value === 2) return 'Medio';
                             if (value === 3) return 'Élite';
                             return '';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                     ticks: {
                        font: { size: 14 },
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // Se oculta porque ya está claro en el selector
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: '#121212',
                    titleFont: { size: 16 },
                    bodyFont: { size: 14 },
                    padding: 15,
                    cornerRadius: 5,
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        }
    });

    // Event listener para el selector
    const metricSelector = document.getElementById('metric-selector');
    metricSelector.addEventListener('change', (event) => {
        const selectedMetric = event.target.value;
        const newMetric = scadaData.metrics[selectedMetric];
        
        myChart.data.datasets[0].label = newMetric.label;
        myChart.data.datasets[0].data = newMetric.data;
        myChart.update();
    });
    
    // --- ANIMACIONES DE SCROLL ---
    const animatedElements = document.querySelectorAll('.animated');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.15 });

    animatedElements.forEach(el => observer.observe(el));
});

document.addEventListener('DOMContentLoaded', function () {
    // ... (todo el código anterior de la aplicación va aquí) ...

    // --- LÓGICA DEL CHATBOT ---

    const chatOpenBtn = document.getElementById('chat-open-btn');
    const chatCloseBtn = document.getElementById('chat-close-btn');
    const chatWindow = document.getElementById('chat-window');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatInput = document.getElementById('chat-input');
    const chatBody = document.getElementById('chat-body');

    // Base de conocimiento del Bot (Basado en reglas y palabras clave)
    const knowledgeBase = [
        { keywords: ['hola', 'saludos', 'buenas'], response: '¡Hola! Soy el asistente virtual de SCADA Analysis. ¿En qué puedo ayudarte hoy?' },
        { keywords: ['mejor', 'recomienda', 'recomendación', 'ganador', 'ranking'], response: 'Según el análisis, <strong>Zenon COPADATA</strong> es la plataforma mejor clasificada, destacando por su alta fiabilidad, escalabilidad y adaptación a la minería. Su Costo Total de Propiedad (TCO) también es muy competitivo.' },
        { keywords: ['redundancia', 'disponibilidad', 'fiabilidad'], response: 'En redundancia, <strong>Zenon</strong> y <strong>MicroScada X</strong> son los líderes. Zenon ofrece soporte nativo para PRP/HSR, mientras que MicroScada es muy fiable con su sistema de Shadowing. Power Operation, en cambio, presentó fallas críticas en esta área.' },
        { keywords: ['costo', 'tco', 'precio', 'caro', 'barato'], response: 'El <strong>Costo Total de Propiedad (TCO)</strong> es más bajo en <strong>Zenon</strong> debido a su ingeniería eficiente. Plataformas como <strong>Siemens Spectrum Power</strong> y <strong>MicroScada X</strong> tienen un TCO más elevado, asociado a soluciones de clase enterprise y necesidad de servicios especializados.' },
        { keywords: ['ntsycs', 'norma', 'ciberseguridad', 'seguridad'], response: 'En cumplimiento de normativas como NTSyCS, <strong>Zenon</strong> muestra un alineamiento total al soportar nativamente IEC 62443. <strong>MicroScada</strong> y <strong>Spectrum Power</strong> también tienen un alto nivel de cumplimiento. Plataformas con inestabilidad, como <strong>Power Operation</strong>, presentan un riesgo de seguridad inherente.' },
        { keywords: ['power operation', 'desventajas', 'problemas'], response: '<strong>Power Operation</strong> presenta varias deficiencias críticas: fallas en la configuración de redundancia, inestabilidad por exceso de logs, y una herramienta de desarrollo HMI deficiente que depende de software obsoleto.' },
        { keywords: ['zenon', 'ventajas'], response: 'Las ventajas clave de <strong>Zenon</strong> son: alta escalabilidad, soporte nativo para redundancia avanzada (PRP/HSR), una interfaz de usuario moderna, y una integración profunda con sistemas MES y ERP, lo que lo hace ideal para la minería.' },
        { keywords: ['gracias', 'adios'], response: 'De nada. Si tienes alguna otra pregunta, no dudes en consultarme. ¡Estoy aquí para ayudar!' }
    ];

    chatOpenBtn.addEventListener('click', () => chatWindow.classList.add('open'));
    chatCloseBtn.addEventListener('click', () => chatWindow.classList.remove('open'));

    const sendMessage = () => {
        const userInput = chatInput.value.trim();
        if (userInput === '') return;

        // Añadir mensaje del usuario a la ventana
        addMessage(userInput, 'user');
        chatInput.value = '';

        // Encontrar y mostrar la respuesta del bot
        setTimeout(() => {
            const botResponse = findResponse(userInput);
            addMessage(botResponse, 'bot');
        }, 500);
    };

    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${sender}`;
        messageElement.innerHTML = text;
        chatBody.appendChild(messageElement);
        // Auto-scroll al último mensaje
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function findResponse(userInput) {
        const lowerCaseInput = userInput.toLowerCase();
        for (const rule of knowledgeBase) {
            for (const keyword of rule.keywords) {
                if (lowerCaseInput.includes(keyword)) {
                    return rule.response;
                }
            }
        }
        return 'No he podido comprender tu pregunta. Intenta reformularla o pregunta por "recomendación", "costo" o "redundancia".';
    }
});

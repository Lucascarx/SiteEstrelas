document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle para dispositivos móveis
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Chat Widget Toggle
    const chatToggle = document.querySelector('.chat-toggle');
    const chatBox = document.querySelector('.chat-box');
    const closeChat = document.querySelector('.close-chat');
    
    if (chatToggle && chatBox && closeChat) {
        chatToggle.addEventListener('click', function() {
            chatBox.style.display = 'flex';
            chatToggle.style.display = 'none';
        });
        
        closeChat.addEventListener('click', function() {
            chatBox.style.display = 'none';
            chatToggle.style.display = 'flex';
        });
    }
    
    // Funcionalidade de envio de mensagem no chat
    const chatInput = document.querySelector('.chat-footer input');
    const sendButton = document.querySelector('.send-message');
    const chatBody = document.querySelector('.chat-body');
    
    if (chatInput && sendButton && chatBody) {
        // Função para enviar mensagem
        function sendMessage() {
            const message = chatInput.value.trim();
            if (message !== '') {
                // Adiciona mensagem do usuário
                addMessage(message, 'user');
                chatInput.value = '';
                
                // Simula resposta do bot após 1 segundo
                setTimeout(function() {
                    const botResponses = [
                        'Olá! Como posso ajudar você hoje?',
                        'Obrigado por entrar em contato com a Estrelas Bartender!',
                        'Você gostaria de agendar uma conversa com um de nossos bartenders?',
                        'Temos diversos drinks exclusivos para seu evento. Gostaria de conhecer nossa carta?',
                        'Para mais informações, você pode visitar nossa página de contato ou agendar uma conversa.',
                        'Nossos agentes Lucas e Sonia estão disponíveis 24h para ajudar você!'
                    ];
                    
                    // Seleciona uma resposta aleatória
                    const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
                    addMessage(randomResponse, 'bot');
                }, 1000);
            }
        }
        
        // Função para adicionar mensagem ao chat
        function addMessage(message, sender) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('chat-message', sender);
            
            const messageContent = document.createElement('div');
            messageContent.classList.add('message-content');
            
            const messageParagraph = document.createElement('p');
            messageParagraph.textContent = message;
            
            messageContent.appendChild(messageParagraph);
            messageElement.appendChild(messageContent);
            chatBody.appendChild(messageElement);
            
            // Rola para a mensagem mais recente
            chatBody.scrollTop = chatBody.scrollHeight;
        }
        
        // Event listeners para envio de mensagem
        sendButton.addEventListener('click', sendMessage);
        
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Animação suave para links de navegação
    const navLinks = document.querySelectorAll('nav a, .hero-content a, .cta-content a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Verifica se o link é interno (começa com #)
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Alternância de agente no chat
    let currentAgent = 'Lucas';
    
    // Função para alternar entre os agentes Lucas e Sonia
    function switchAgent() {
        currentAgent = currentAgent === 'Lucas' ? 'Sonia' : 'Lucas';
        const chatHeader = document.querySelector('.chat-header h4');
        
        if (chatHeader) {
            chatHeader.textContent = 'Atendimento 24h';
            
            // Adiciona mensagem de troca de agente
            const chatBody = document.querySelector('.chat-body');
            if (chatBody) {
                const messageElement = document.createElement('div');
                messageElement.classList.add('chat-message', 'bot');
                
                const messageContent = document.createElement('div');
                messageContent.classList.add('message-content');
                
                const messageParagraph = document.createElement('p');
                messageParagraph.textContent = `Olá! Agora você está falando com ${currentAgent}. Como posso ajudar?`;
                
                messageContent.appendChild(messageParagraph);
                messageElement.appendChild(messageContent);
                chatBody.appendChild(messageElement);
                
                // Rola para a mensagem mais recente
                chatBody.scrollTop = chatBody.scrollHeight;
            }
        }
    }
    
    // Alterna o agente a cada 30 segundos (apenas para demonstração)
    // Em um ambiente real, isso seria controlado pelo backend
    setInterval(switchAgent, 30000);
    
    // Testimonials slider automático
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    
    if (testimonialsSlider && testimonialsSlider.children.length > 1) {
        let scrollAmount = 0;
        const slideWidth = testimonialsSlider.children[0].offsetWidth + 30; // largura + gap
        const maxScroll = testimonialsSlider.scrollWidth - testimonialsSlider.clientWidth;
        
        // Função para rolar o slider
        function autoScroll() {
            scrollAmount += slideWidth;
            
            // Reinicia quando chega ao final
            if (scrollAmount > maxScroll) {
                scrollAmount = 0;
            }
            
            testimonialsSlider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
        
        // Rola automaticamente a cada 5 segundos
        setInterval(autoScroll, 5000);
    }
});
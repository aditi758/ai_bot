// main.js - Core application logic

/**
 * Main application manager
 */
const AppManager = {
    /**
     * Initializes the application
     */
    init: function() {
        // Initialize modules
        const speechRecognitionSupported = SpeechRecognizer.init();
        const speechSynthesisSupported = SpeechSynthesizer.init();
        Personalities.init();
        
        // Set up UI event listeners
        this.setupUI();
        
        // Show warning if speech features are not supported
        if (!speechRecognitionSupported || !speechSynthesisSupported) {
            this.showSupportWarning();
        }
        
        // Add welcome message
        this.addMessageToConversation("Hello! I'm your AI voice assistant. Choose a personality and start talking or typing!", 'assistant');
        
        console.log('AI Voice Assistant initialized');
    },
    
    /**
     * Sets up UI event listeners
     */
    setupUI: function() {
        // Set up text input
        const textInput = document.getElementById('text-input');
        const sendBtn = document.getElementById('send-btn');
        
        sendBtn.addEventListener('click', () => {
            const text = textInput.value.trim();
            if (text) {
                // Detect language
                const detectedLang = LanguageDetector.detect(text);
                
                // Process the text input
                this.processUserInput(text, detectedLang);
                
                // Clear the input field
                textInput.value = '';
            }
        });
        
        // Allow pressing Enter to send
        textInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                sendBtn.click();
            }
        });
    },
    
    /**
     * Shows a warning message for unsupported features
     */
    showSupportWarning: function() {
        const container = document.querySelector('.container');
        const warning = document.createElement('div');
        
        warning.className = 'support-warning';
        warning.innerHTML = `
            <p><strong>Warning:</strong> Your browser may not fully support all voice features. 
            For the best experience, please use Chrome, Edge, or Safari.</p>
            <p>You can still use the text input below.</p>
            <button id="dismiss-warning">Dismiss</button>
        `;
        
        container.insertBefore(warning, container.firstChild);
        
        document.getElementById('dismiss-warning').addEventListener('click', () => {
            warning.remove();
        });
    },
    
    /**
     * Processes user input (from voice or text)
     * @param {string} text - The user's input text
     * @param {string} language - The detected language code
     */
    processUserInput: function(text, language) {
        // Ignore empty input
        if (!text || text.trim() === '') return;
        
        // Add user message to conversation
        this.addMessageToConversation(text, 'user');
        
        // Generate assistant response based on personality
        this.generateResponse(text, language);
    },
    
    /**
     * Adds a message to the conversation UI
     * @param {string} text - The message text
     * @param {string} sender - 'user' or 'assistant'
     */
    addMessageToConversation: function(text, sender) {
        const conversation = document.getElementById('conversation');
        const messageDiv = document.createElement('div');
        
        // Create message element
        messageDiv.className = `message ${sender}`;
        
        // Create message content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;
        
        // Create timestamp
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        const now = new Date();
        timeDiv.textContent = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        // Assemble message
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        
        // Add to conversation
        conversation.appendChild(messageDiv);
        
        // Scroll to bottom
        conversation.scrollTop = conversation.scrollHeight;
    },
    
    /**
     * Generates a response from the assistant
     * @param {string} userInput - The user's input text
     * @param {string} language - The detected language code
     */
    generateResponse: function(userInput, language) {
        // In a real application, you would send the user input to your AI backend
        // along with the current personality settings and receive a response
        
        // For demo purposes, we'll use the personality's built-in response generator
        const response = Personalities.getResponse(userInput, language);
        
        // Add artificial delay to simulate processing
        setTimeout(() => {
            // Add assistant message to conversation
            this.addMessageToConversation(response, 'assistant');
            
            // Speak the response
            SpeechSynthesizer.speak(response, language);
        }, 500);
    },
    
    /**
     * Simulates connecting to an AI backend
     * This would be replaced with actual API calls in a real application
     * @param {string} userInput - The user's input
     * @param {string} personality - The current personality
     * @param {string} language - The detected language
     * @returns {Promise<string>} The AI response
     */
    connectToAIBackend: function(userInput, personality, language) {
        return new Promise((resolve) => {
            // Simulate network delay
            setTimeout(() => {
                // For demo purposes, generate a simple response
                const response = Personalities.getResponse(userInput, language);
                resolve(response);
            }, 800);
        });
    }
};

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    AppManager.init();
});
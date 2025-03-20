// speechRecognition.js - Voice input handling

/**
 * Speech recognition module
 */
const SpeechRecognizer = {
    recognition: null,
    isListening: false,
    language: 'en-US',
    
    /**
     * Initializes the speech recognition
     */
    init: function() {
        // Check if browser supports SpeechRecognition
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Your browser does not support speech recognition. Please try Chrome or Edge.');
            return false;
        }
        
        // Create speech recognition instance
        this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        
        // Configure recognition
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = this.language;
        
        // Set up event handlers
        this.recognition.onstart = this.onStart.bind(this);
        this.recognition.onend = this.onEnd.bind(this);
        this.recognition.onresult = this.onResult.bind(this);
        this.recognition.onerror = this.onError.bind(this);
        
        // Initialize UI
        this.setupUI();
        
        return true;
    },
    
    /**
     * Sets up UI event listeners
     */
    setupUI: function() {
        const startBtn = document.getElementById('start-btn');
        const stopBtn = document.getElementById('stop-btn');
        
        startBtn.addEventListener('click', () => {
            this.start();
        });
        
        stopBtn.addEventListener('click', () => {
            this.stop();
        });
    },
    
    /**
     * Starts speech recognition
     */
    start: function() {
        if (this.isListening) return;
        
        try {
            this.recognition.start();
        } catch (error) {
            console.error('Speech recognition error:', error);
            // In case of error, try restarting
            this.recognition.stop();
            setTimeout(() => this.recognition.start(), 200);
        }
    },
    
    /**
     * Stops speech recognition
     */
    stop: function() {
        if (!this.isListening) return;
        
        try {
            this.recognition.stop();
        } catch (error) {
            console.error('Error stopping speech recognition:', error);
        }
    },
    
    /**
     * Updates the UI to reflect the listening state
     * @param {boolean} isListening - Whether the system is currently listening
     */
    updateUI: function(isListening) {
        const startBtn = document.getElementById('start-btn');
        const stopBtn = document.getElementById('stop-btn');
        const statusText = document.getElementById('status-text');
        
        if (isListening) {
            document.body.classList.add('listening');
            startBtn.disabled = true;
            stopBtn.disabled = false;
            statusText.textContent = 'Listening...';
        } else {
            document.body.classList.remove('listening');
            startBtn.disabled = false;
            stopBtn.disabled = true;
            statusText.textContent = 'Ready to help';
        }
    },
    
    /**
     * Sets the recognition language
     * @param {string} langCode - The language code to set
     */
    setLanguage: function(langCode) {
        if (this.isListening) {
            this.stop();
        }
        
        this.language = langCode;
        this.recognition.lang = langCode;
        
        console.log(`Speech recognition language set to: ${langCode}`);
    },
    
    /**
     * Handler for recognition start event
     */
    onStart: function() {
        this.isListening = true;
        this.updateUI(true);
        console.log('Speech recognition started');
    },
    
    /**
     * Handler for recognition end event
     */
    onEnd: function() {
        this.isListening = false;
        this.updateUI(false);
        console.log('Speech recognition ended');
    },
    
    /**
     * Handler for recognition results
     * @param {SpeechRecognitionEvent} event - The recognition event
     */
    onResult: function(event) {
        let interimTranscript = '';
        let finalTranscript = '';
        
        // Process results
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }
        
        // Handle final results
        if (finalTranscript !== '') {
            // Detect language of the transcript
            const detectedLang = LanguageDetector.detect(finalTranscript);
            
            // Process the user's speech input
            AppManager.processUserInput(finalTranscript, detectedLang);
            
            // Update recognition language for next interaction
            if (detectedLang && detectedLang !== this.language) {
                this.setLanguage(detectedLang);
            }
        }
    },
    
    /**
     * Handler for recognition errors
     * @param {SpeechRecognitionError} event - The error event
     */
    onError: function(event) {
        console.error('Speech recognition error:', event.error);
        
        // Handle specific errors
        switch (event.error) {
            case 'no-speech':
                console.log('No speech detected');
                break;
            case 'aborted':
                console.log('Speech recognition aborted');
                break;
            case 'audio-capture':
                alert('Error: No microphone detected. Please check your microphone settings.');
                break;
            case 'not-allowed':
                alert('Error: Microphone access denied. Please allow microphone access to use speech recognition.');
                break;
            default:
                // For other errors, try restarting recognition
                if (this.isListening) {
                    this.stop();
                    setTimeout(() => this.start(), 1000);
                }
        }
        
        this.isListening = false;
        this.updateUI(false);
    }
};
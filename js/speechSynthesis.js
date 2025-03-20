/**
 * Speech synthesis module
 */
const SpeechSynthesizer = {
    synthesis: window.speechSynthesis,
    speaking: false,
    
    /**
     * Initializes the speech synthesis
     */
    init: function() {
        // Check if browser supports speech synthesis
        if (!('speechSynthesis' in window)) {
            alert('Your browser does not support speech synthesis. Please try Chrome or Edge.');
            return false;
        }
        
        // Pre-load voices
        this.loadVoices();
        
        // Some browsers (like Chrome) load voices asynchronously
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = this.loadVoices.bind(this);
        }
        
        return true;
    },
    
    /**
     * Loads available voices
     */
    loadVoices: function() {
        // This just triggers fetching the voices
        console.log(`Loaded ${this.synthesis.getVoices().length} voices`);
    },
    
    /**
     * Speaks the provided text
     * @param {string} text - The text to speak
     * @param {string} language - The language code
     * @param {Object} personalitySettings - Voice settings from the personality
     */
    speak: function(text, language, personalitySettings) {
        // Cancel any ongoing speech
        this.synthesis.cancel();
        
        // Create a new utterance
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set language
        utterance.lang = language;
        
        // Get voice settings based on personality
        const voiceSettings = personalitySettings || Personalities.getVoiceSettings(language);
        
        // Apply voice settings
        if (voiceSettings.voice) {
            utterance.voice = voiceSettings.voice;
        }
        
        utterance.pitch = voiceSettings.pitch || 1;
        utterance.rate = voiceSettings.rate || 1;
        
        // Set event handlers
        utterance.onstart = () => {
            this.speaking = true;
            document.getElementById('status-text').textContent = 'Speaking...';
        };
        
        utterance.onend = () => {
            this.speaking = false;
            document.getElementById('status-text').textContent = 'Ready to help';
        };
        
        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            this.speaking = false;
            document.getElementById('status-text').textContent = 'Ready to help';
        };
        
        // Speak the text
        this.synthesis.speak(utterance);
    },
    
    /**
     * Stops any ongoing speech
     */
    stop: function() {
        if (this.speaking) {
            this.synthesis.cancel();
            this.speaking = false;
            document.getElementById('status-text').textContent = 'Ready to help';
        }
    },
    
    /**
     * Pauses any ongoing speech
     */
    pause: function() {
        if (this.speaking) {
            this.synthesis.pause();
        }
    },
    
    /**
     * Resumes paused speech
     */
    resume: function() {
        if (this.synthesis.paused) {
            this.synthesis.resume();
        }
    }
};
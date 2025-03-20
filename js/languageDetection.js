/**
 * Language detection module
 */
const LanguageDetector = {
    /**
     * Detects the language of the input text
     * @param {string} text - The text to detect language for
     * @returns {string} The ISO 639-1/2/3 language code
     */
    detect: function(text) {
        // We're using the 'franc' library loaded from CDN
        try {
            // Minimum text length for reliable detection
            if (text.length < 10) {
                return 'en'; // Default to English for very short text
            }
            
            const detectedLang = franc(text, {minLength: 3});
            
            // Map franc's ISO 639-3 codes to ISO 639-1 (needed for speech synthesis)
            const langMap = {
                'eng': 'en', // English
                'fra': 'fr', // French
                'spa': 'es', // Spanish
                'deu': 'de', // German
                'ita': 'it', // Italian
                
                
                'jpn': 'ja', // Japanese
                'kor': 'ko', // Korean
                
                'hin': 'hi', // Hindi
                'ara': 'ar', // Arabic
                'ben': 'bn', // Bengali
                'pan': 'pa', // Punjabi
                'tam': 'ta', // Tamil
                'tel': 'te', // Telugu
                'mar': 'mr', // Marathi
                'urd': 'ur', // Urdu
                'kan': 'kn', // Kannada
                'mal': 'ml', // Malayalam
                'und': 'en'  // Undefined defaults to English
            };
            
            return langMap[detectedLang] || 'en';
        } catch (error) {
            console.error('Language detection error:', error);
            return 'en'; // Default to English on error
        }
    },
    
    /**
     * Gets a voice for the specified language
     * @param {string} langCode - The ISO 639-1 language code
     * @returns {SpeechSynthesisVoice|null} The matching voice or null
     */
    getVoiceForLanguage: function(langCode) {
        // Get all available voices
        const voices = speechSynthesis.getVoices();
        
        // Try to find a voice that matches the language
        const voice = voices.find(voice => voice.lang.startsWith(langCode));
        
        // If no voice found for the specific language, use default
        return voice || voices.find(voice => voice.lang.startsWith('en')) || null;
    }
};
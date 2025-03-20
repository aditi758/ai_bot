/**
 * Personality configurations for the AI assistant
 */
const Personalities = {
    // Current active personality
    current: 'default',
    
    // Personality definitions
    profiles: {
        banker: {
            name: 'Rude Banker',
            icon: 'fa-landmark',
            color: '#2c3e50',
            voiceSettings: {
                pitch: 1.2,
                rate: 0.9,
                // Prefer a deeper, serious voice
                voicePreference: ['en-GB', 'en-US']
            },
            responseModifiers: {
                prefix: ["Let me make this extremely clear.", "Time is money.", "Here's the bottom line."],
                suffix: ["Any other questions? Make it quick.", "That's all I have time for.", "Do you understand, or should I simplify it further?"],
                rude: true,
                formal: true,
                impatient: true
            },
            getResponse: function(input, language) {
                // This function would connect to your AI backend in a real app
                // Here we're simulating different personality responses
                
                const responses = {
                    en: [
                        "Obviously, as I've already implied, the answer is quite straightforward.",
                        "Look, I don't have all day. The simple fact is...",
                        "Let me explain this in terms even you might comprehend.",
                        "My time is valuable, so I'll make this brief.",
                        "Frankly, this question hardly warrants my expertise, but..."
                    ],
                    fr: [
                        "Évidemment, comme je l'ai déjà laissé entendre, la réponse est assez simple.",
                        "Écoutez, je n'ai pas toute la journée. Le fait est que...",
                        "Laissez-moi vous expliquer cela en termes que même vous pourriez comprendre.",
                        "Mon temps est précieux, alors je serai bref.",
                        "Franchement, cette question mérite à peine mon expertise, mais..."
                    ],
                    es: [
                        "Obviamente, como ya he insinuado, la respuesta es bastante sencilla.",
                        "Mira, no tengo todo el día. El simple hecho es...",
                        "Permítame explicarlo en términos que incluso usted podría comprender.",
                        "Mi tiempo es valioso, así que seré breve.",
                        "Francamente, esta pregunta apenas merece mi experiencia, pero..."
                    ]
                    // Add more languages as needed
                };
                
                // Default to English if language not supported
                const availableResponses = responses[language] || responses.en;
                
                // Select a random response from the available ones
                return availableResponses[Math.floor(Math.random() * availableResponses.length)];
            }
        },
        
        bangalore: {
            name: 'Funny Bangalore Accent',
            icon: 'fa-code',
            color: '#e67e22',
            voiceSettings: {
                pitch: 1.1,
                rate: 1.1,
                // Prefer Indian English voices where available
                voicePreference: ['en-IN', 'en-US']
            },
            responseModifiers: {
                prefix: ["Wait wait wait, let me tell you one thing.", "You see, the thing is like this only.", "Actually I am telling you."],
                suffix: ["Isn't it?", "Only no?", "I hope you are understanding, otherwise tell only."],
                useIndianPhrases: true,
                addHumor: true
            },
            getResponse: function(input, language) {
                const responses = {
                    en: [
                        "See, what is happening basically, this thing is working like anything!",
                        "You are asking very difficult question, but I am managing somehow!",
                        "This one is very simple only, let me explain you properly.",
                        "First class question you are asking! Let me do the needful.",
                        "I will solve your problem, don't worry-worry!"
                    ],
                    hi: [
                        "देखिए, बेसिकली क्या हो रहा है, यह चीज़ कैसी भी काम कर रही है!",
                        "आप बहुत कठिन प्रश्न पूछ रहे हैं, लेकिन मैं किसी तरह मैनेज कर रहा हूँ!",
                        "यह वन वेरी सिंपल ही है, मुझे आपको प्रॉपरली समझाने दीजिए।",
                        "फर्स्ट क्लास क्वेश्चन आप पूछ रहे हैं! मुझे आवश्यक कार्रवाई करने दीजिए।",
                        "मैं आपकी समस्या को हल करूंगा, डोंट वरी-वरी!"
                    ],
                    // Add more languages as needed
                };
                
                const availableResponses = responses[language] || responses.en;
                return availableResponses[Math.floor(Math.random() * availableResponses.length)];
            }
        },
        
        french: {
            name: 'Romantic French',
            icon: 'fa-heart',
            color: '#e74c3c',
            voiceSettings: {
                pitch: 0.9,
                rate: 0.85,
                // Prefer French voices
                voicePreference: ['fr-FR', 'fr-CA']
            },
            responseModifiers: {
                prefix: ["Ah mon chéri,", "Mais bien sûr,", "Oh là là,"],
                suffix: ["C'est magnifique, non?", "C'est la vie...", "Je suis à votre service, toujours."],
                romantic: true,
                poetic: true,
                dramatic: true
            },
            getResponse: function(input, language) {
                const responses = {
                    en: [
                        "My heart sings to assist you with such a beautiful question!",
                        "Like a fine wine, your query deserves a thoughtful response...",
                        "The answer, mon ami, is as clear as the waters of the Seine.",
                        "Let me whisper the solution like a sweet melody...",
                        "Your question touches my soul! Allow me to respond with passion."
                    ],
                    fr: [
                        "Mon cœur chante pour vous aider avec une si belle question!",
                        "Comme un bon vin, votre demande mérite une réponse réfléchie...",
                        "La réponse, mon ami, est aussi claire que les eaux de la Seine.",
                        "Laissez-moi murmurer la solution comme une douce mélodie...",
                        "Votre question touche mon âme! Permettez-moi de répondre avec passion."
                    ],
                    // Add more languages as needed
                };
                
                const availableResponses = responses[language] || responses.en;
                return availableResponses[Math.floor(Math.random() * availableResponses.length)];
            }
        },
        
        default: {
            name: 'Default Assistant',
            icon: 'fa-robot',
            color: '#3498db',
            voiceSettings: {
                pitch: 1.0,
                rate: 1.0,
                // No specific preference
                voicePreference: []
            },
            responseModifiers: {
                prefix: ["I'll help you with that.", "Here's what I found:", "Great question."],
                suffix: ["Is there anything else you'd like to know?", "Hope that helps!", "Let me know if you need more information."],
                helpful: true,
                neutral: true
            },
            getResponse: function(input, language) {
                const responses = {
                    en: [
                        "I'm happy to help with your question.",
                        "Here's the information you requested.",
                        "That's an interesting query. Let me assist you.",
                        "I've analyzed your question and here's what I found.",
                        "Based on your request, here's what I can tell you."
                    ],
                    fr: [
                        "Je suis heureux de vous aider avec votre question.",
                        "Voici les informations que vous avez demandées.",
                        "C'est une question intéressante. Permettez-moi de vous aider.",
                        "J'ai analysé votre question et voici ce que j'ai trouvé.",
                        "Selon votre demande, voici ce que je peux vous dire."
                    ],
                    es: [
                        "Estoy feliz de ayudarte con tu pregunta.",
                        "Aquí está la información que solicitaste.",
                        "Esa es una consulta interesante. Permíteme ayudarte.",
                        "He analizado tu pregunta y esto es lo que encontré.",
                        "Según tu solicitud, esto es lo que puedo decirte."
                    ],
                    // Add more languages as needed
                };
                
                const availableResponses = responses[language] || responses.en;
                return availableResponses[Math.floor(Math.random() * availableResponses.length)];
            }
        }
    },
    
    /**
     * Initializes personality selection UI
     */
    init: function() {
        const personalities = document.querySelectorAll('.personality-option');
        
        // Set default personality as active
        document.getElementById('default-personality').classList.add('active');
        
        // Add click event listeners to all personality options
        personalities.forEach(option => {
            option.addEventListener('click', () => {
                // Remove active class from all personalities
                personalities.forEach(p => p.classList.remove('active'));
                
                // Add active class to selected personality
                option.classList.add('active');
                
                // Update current personality
                const personality = option.getAttribute('data-personality');
                this.setPersonality(personality);
            });
        });
    },
    
    /**
     * Sets the active personality
     * @param {string} personality - The personality ID to set
     */
    setPersonality: function(personality) {
        // Update current personality
        this.current = personality;
        
        // Update UI
        document.body.className = ''; // Clear existing personality classes
        document.body.classList.add(`${personality}-mode`);
        
        // Update avatar
        const avatar = document.getElementById('avatar');
        avatar.style.backgroundColor = this.profiles[personality].color;
        
        // Update avatar icon
        const icon = document.createElement('i');
        icon.className = `fas ${this.profiles[personality].icon}`;
        avatar.innerHTML = '';
        avatar.appendChild(icon);
        
        // Announce personality change to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = `Personality changed to ${this.profiles[personality].name}`;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
        
        console.log(`Personality changed to: ${personality}`);
    },
    
    /**
     * Gets a response for the current personality
     * @param {string} input - The user's input text
     * @param {string} language - The detected language code
     * @returns {string} The formatted response
     */
    getResponse: function(input, language) {
        const personalityProfile = this.profiles[this.current];
        
        // Get base response from the personality
        let response = personalityProfile.getResponse(input, language);
        
        // In a real app, you would send the input to your AI backend here
        // along with the personality parameters to get an appropriate response
        
        // Apply personality-specific modifiers
        const modifiers = personalityProfile.responseModifiers;
        
        // Add prefix sometimes
        if (modifiers.prefix && Math.random() > 0.5) {
            const prefix = modifiers.prefix[Math.floor(Math.random() * modifiers.prefix.length)];
            response = `${prefix} ${response}`;
        }
        
        // Add suffix sometimes
        if (modifiers.suffix && Math.random() > 0.5) {
            const suffix = modifiers.suffix[Math.floor(Math.random() * modifiers.suffix.length)];
            response = `${response} ${suffix}`;
        }
        
        // Apply personality-specific transformations
        if (modifiers.rude && this.current === 'banker') {
            response = response.replace(/please/gi, '').replace(/thank you/gi, '');
        }
        
        if (modifiers.useIndianPhrases && this.current === 'bangalore') {
            // Add Indian English phrases like "only", "itself", etc.
            response = response
                .replace(/very/gi, 'very-very')
                .replace(/\./g, ', actually.')
                .replace(/\?/g, ', isn\'t it?');
        }
        
        if (modifiers.romantic && this.current === 'french') {
            // Add romantic phrases
            response = response
                .replace(/I think/gi, 'I feel in my heart')
                .replace(/good/gi, 'magnificent')
                .replace(/nice/gi, 'beautiful');
        }
        
        return response;
    },
    
    /**
     * Gets voice settings for the current personality
     * @param {string} language - The language code
     * @returns {Object} Voice settings
     */
    getVoiceSettings: function(language) {
        const settings = this.profiles[this.current].voiceSettings;
        
        // Get all available voices
        const voices = speechSynthesis.getVoices();
        
        // Try to find a matching voice based on personality preference and language
        let voice = null;
        
        // First try to find a voice that matches both language and personality preference
        if (settings.voicePreference.length > 0) {
            for (const preferred of settings.voicePreference) {
                voice = voices.find(v => v.lang.startsWith(preferred) && v.lang.startsWith(language));
                if (voice) break;
            }
        }
        
        // If no voice found, try just matching the language
        if (!voice) {
            voice = voices.find(v => v.lang.startsWith(language));
        }
        
        // If still no voice, use any voice that matches personality preference
        if (!voice && settings.voicePreference.length > 0) {
            for (const preferred of settings.voicePreference) {
                voice = voices.find(v => v.lang.startsWith(preferred));
                if (voice) break;
            }
        }
        
        // If still no voice, use system default
        if (!voice && voices.length > 0) {
            voice = voices[0];
        }
        
        return {
            voice: voice,
            pitch: settings.pitch,
            rate: settings.rate
        };
    }
};
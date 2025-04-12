/**
 * Speech Recognition Module for Language Detective: Global Chase
 * Handles voice input processing, language detection, and pronunciation feedback
 */

class SpeechRecognitionController {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.currentLanguage = 'fr-FR'; // Default to French
        this.confidenceThreshold = 0.7;
        this.playerLevel = 'beginner';
        this.currentGrade = 5;
        this.onSpeechResult = null;
        this.onSpeechError = null;
        this.onSpeechEnd = null;
        this.commonMistakes = this.loadCommonMistakes();
        this.initialize();
    }

    // Initialize speech recognition
    initialize() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.error('Speech recognition not supported in this browser');
            return;
        }

        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognitionAPI();
        
        // Configure recognition
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = this.currentLanguage;
        
        // Set up event handlers
        this.recognition.onresult = (event) => this.handleSpeechResult(event);
        this.recognition.onerror = (event) => this.handleSpeechError(event);
        this.recognition.onend = () => this.handleSpeechEnd();
    }

    // Start listening for speech
    startListening() {
        if (!this.recognition) {
            console.error('Speech recognition not initialized');
            return false;
        }
        
        try {
            this.recognition.start();
            this.isListening = true;
            console.log('Listening for speech...');
            return true;
        } catch (error) {
            console.error('Error starting speech recognition:', error);
            return false;
        }
    }

    // Stop listening for speech
    stopListening() {
        if (!this.recognition || !this.isListening) {
            return;
        }
        
        try {
            this.recognition.stop();
            this.isListening = false;
            console.log('Stopped listening');
        } catch (error) {
            console.error('Error stopping speech recognition:', error);
        }
    }

    // Set the recognition language
    setLanguage(languageCode) {
        this.currentLanguage = languageCode;
        if (this.recognition) {
            this.recognition.lang = languageCode;
        }
    }

    // Set difficulty based on player's grade level
    setPlayerLevel(grade) {
        this.currentGrade = parseInt(grade);
        
        if (grade <= 6) {
            this.playerLevel = 'beginner';
            this.confidenceThreshold = 0.6; // More lenient for beginners
        } else if (grade <= 8) {
            this.playerLevel = 'intermediate';
            this.confidenceThreshold = 0.7;
        } else {
            this.playerLevel = 'advanced';
            this.confidenceThreshold = 0.8; // Stricter for advanced players
        }
        
        console.log(`Set player level to ${this.playerLevel} (Grade ${grade})`);
    }

    // Handle speech recognition results
    handleSpeechResult(event) {
        if (!event.results || event.results.length === 0) {
            return;
        }
        
        const result = event.results[0];
        if (!result.isFinal) {
            return;
        }
        
        const transcript = result[0].transcript.trim();
        const confidence = result[0].confidence;
        
        console.log(`Speech recognized: "${transcript}" (confidence: ${confidence})`);
        
        // Process the speech
        const processedResult = this.processSpeech(transcript, confidence);
        
        // Call the callback with the result
        if (this.onSpeechResult && typeof this.onSpeechResult === 'function') {
            this.onSpeechResult(processedResult);
        }
    }

    // Process speech input
    processSpeech(transcript, confidence) {
        // Detect language
        const detectedLanguage = this.detectLanguage(transcript);
        
        // Check for common mistakes
        const correctedTranscript = this.correctCommonMistakes(transcript);
        
        // Generate pronunciation feedback
        const pronunciationFeedback = this.generatePronunciationFeedback(transcript, confidence);
        
        // Check if the input matches expected patterns
        const patternMatch = this.checkPatternMatch(transcript);
        
        return {
            original: transcript,
            corrected: correctedTranscript,
            confidence: confidence,
            isAboveThreshold: confidence >= this.confidenceThreshold,
            detectedLanguage: detectedLanguage,
            pronunciationFeedback: pronunciationFeedback,
            patternMatch: patternMatch
        };
    }

    // Simple language detection (French vs. English)
    detectLanguage(text) {
        // List of common French words that indicate French language
        const frenchIndicators = [
            'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'au', 'aux',
            'est', 'sont', 'et', 'ou', 'mais', 'donc', 'car', 'ni',
            'je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles',
            'bonjour', 'merci', 'oui', 'non', 'avez', 'qu\'est', 'quoi', 'qui', 'où',
            'vu', 'été', 'allé', 'fait', 'dit', 'comment'
        ];
        
        // Normalize text
        const normalizedText = text.toLowerCase()
            .replace(/[.,?!;:]/g, '')
            .split(' ');
        
        // Count French indicator words
        let frenchWordCount = 0;
        for (const word of normalizedText) {
            if (frenchIndicators.includes(word)) {
                frenchWordCount++;
            }
        }
        
        // Calculate percentage of French words
        const frenchPercentage = frenchWordCount / normalizedText.length;
        
        // Determine language
        if (frenchPercentage >= 0.3) { // If at least 30% of words are French indicators
            return 'french';
        } else {
            return 'english';
        }
    }

    // Check if speech matches expected patterns
    checkPatternMatch(text) {
        const normalizedText = text.toLowerCase();
        
        // Pattern categories
        const patterns = {
            appearance: [
                /cheveux/i, /yeux/i, /grand/i, /petit/i, /blond/i, /brun/i, 
                /comment.*personne/i, /à quoi.*ressemble/i
            ],
            direction: [
                /où/i, /allé/i, /direction/i, /parti/i, /destination/i, /voyage/i
            ],
            item: [
                /quoi/i, /qu\'est-ce/i, /volé/i, /pris/i, /objet/i, /chose/i
            ],
            greeting: [
                /bonjour/i, /salut/i, /allo/i, /comment.*ça va/i, /comment.*allez/i
            ],
            farewell: [
                /au revoir/i, /adieu/i, /à bientôt/i, /à demain/i, /merci/i
            ],
            smalltalk: [
                /parlez/i, /dites/i, /racont/i, /expliqu/i, /inform/i
            ]
        };
        
        // Check each pattern category
        const matches = {};
        for (const [category, categoryPatterns] of Object.entries(patterns)) {
            matches[category] = false;
            
            for (const pattern of categoryPatterns) {
                if (pattern.test(normalizedText)) {
                    matches[category] = true;
                    break;
                }
            }
        }
        
        // Find the best match (if any)
        const matchedCategories = Object.entries(matches)
            .filter(([, isMatch]) => isMatch)
            .map(([category]) => category);
        
        if (matchedCategories.length === 0) {
            return { matched: false, category: null };
        } else {
            return { 
                matched: true, 
                categories: matchedCategories,
                primaryCategory: matchedCategories[0]
            };
        }
    }

    // Generate feedback on pronunciation
    generatePronunciationFeedback(text, confidence) {
        // Simple feedback based on confidence level
        if (confidence >= 0.9) {
            return {
                quality: 'excellent',
                message: 'Excellent! Ta prononciation est très bonne.',
                tips: null
            };
        } else if (confidence >= 0.75) {
            return {
                quality: 'good',
                message: 'Bien! Ta prononciation est claire.',
                tips: null
            };
        } else if (confidence >= 0.6) {
            return {
                quality: 'fair',
                message: 'Pas mal. Continue à pratiquer.',
                tips: 'Essaie de parler un peu plus lentement.'
            };
        } else {
            return {
                quality: 'needs-improvement',
                message: 'Essaie encore. Ce n\'est pas facile!',
                tips: 'Parle plus lentement et plus fort.'
            };
        }
    }

    // Correct common French pronunciation mistakes
    correctCommonMistakes(text) {
        let corrected = text;
        
        for (const [mistake, correction] of Object.entries(this.commonMistakes)) {
            corrected = corrected.replace(new RegExp(mistake, 'gi'), correction);
        }
        
        return corrected;
    }

    // Load common French pronunciation mistakes
    loadCommonMistakes() {
        return {
            // R sound issues
            'pari': 'paris',
            'mesi': 'merci',
            'poute': 'porte',
            
            // Nasal sounds
            'bong': 'bon',
            'bongour': 'bonjour',
            'bongswah': 'bonsoir',
            
            // U vs OO sounds
            'too': 'tu',
            'voo': 'vous',
            
            // Silent letters
            'petit': 'petit', // often mispronounced with the 't'
            'comment': 'comment', // often mispronounced with the 't'
            
            // Common word mistakes
            'mercy': 'merci',
            'bone-jour': 'bonjour',
            'or-rev-war': 'au revoir',
            'lay': 'les',
            'luh': 'le',
            'avey': 'avez'
        };
    }

    // Handle speech recognition errors
    handleSpeechError(event) {
        console.error('Speech recognition error:', event.error);
        
        let errorMessage = 'There was a problem with speech recognition.';
        
        switch (event.error) {
            case 'no-speech':
                errorMessage = 'Aucune parole détectée. Essayez de parler plus fort.';
                break;
            case 'aborted':
                errorMessage = 'La reconnaissance vocale a été annulée.';
                break;
            case 'audio-capture':
                errorMessage = 'Problème avec le microphone. Vérifiez vos paramètres.';
                break;
            case 'network':
                errorMessage = 'Problème de réseau. Vérifiez votre connexion Internet.';
                break;
            case 'not-allowed':
                errorMessage = 'La permission du microphone a été refusée.';
                break;
            case 'service-not-allowed':
                errorMessage = 'Ce navigateur ne prend pas en charge la reconnaissance vocale.';
                break;
            default:
                errorMessage = `Erreur de reconnaissance vocale: ${event.error}`;
        }
        
        // Call the error callback
        if (this.onSpeechError && typeof this.onSpeechError === 'function') {
            this.onSpeechError(errorMessage);
        }
        
        this.isListening = false;
    }

    // Handle speech recognition end
    handleSpeechEnd() {
        console.log('Speech recognition ended');
        this.isListening = false;
        
        // Call the end callback
        if (this.onSpeechEnd && typeof this.onSpeechEnd === 'function') {
            this.onSpeechEnd();
        }
    }
}

// Create global instance if in browser context
if (typeof window !== 'undefined') {
    window.speechRecognition = new SpeechRecognitionController();
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SpeechRecognitionController;
}
/**
 * Game Controller for Language Detective: Global Chase
 * Manages the core game logic, state, and progression
 */

class GameController {
    constructor() {
        this.playerInfo = {
            name: '',
            grade: 5,
            score: 0,
            rank: 'Débutant',
            detective: {
                outfit: 'basic',
                accessories: [],
                companion: null
            }
        };
        
        this.gameState = {
            currentCase: null,
            currentLocation: null,
            currentCharacter: null,
            visitedLocations: [],
            availableLocations: [],
            cluesFound: [],
            suspectDetails: {
                hair: null,
                height: null,
                clothing: null,
                interests: null,
                nextDestination: null
            },
            learnedVocabulary: [],
            timerInterval: null,
            timeRemaining: 1200, // 20 minutes in seconds
            caseSolved: false,
            isListening: false
        };
        
        // Setup speech recognition handlers
        if (window.speechRecognition) {
            window.speechRecognition.onSpeechResult = (result) => this.handleSpeechResult(result);
            window.speechRecognition.onSpeechError = (error) => this.handleSpeechError(error);
            window.speechRecognition.onSpeechEnd = () => this.handleSpeechEnd();
        }
    }

    // Set player information
    setPlayerInfo(name, grade) {
        this.playerInfo.name = name;
        this.playerInfo.grade = parseInt(grade);
        
        // Determine initial rank based on grade
        if (this.playerInfo.grade <= 6) {
            this.playerInfo.rank = 'Débutant';
        } else if (this.playerInfo.grade <= 8) {
            this.playerInfo.rank = 'Inspecteur';
        } else {
            this.playerInfo.rank = 'Détective';
        }
        
        console.log(`Player set: ${name} (Grade ${grade}, Rank: ${this.playerInfo.rank})`);
    }

    // Set the current case
    setCurrentCase(caseData) {
        this.gameState.currentCase = caseData;
        console.log(`Case set: ${caseData.title}`);
    }

    // Initialize gameplay for the current case
    initializeGameplay() {
        if (!this.gameState.currentCase) {
            console.error('No case selected');
            return;
        }
        
        const caseData = this.gameState.currentCase;
        
        // Reset game state
        this.gameState.visitedLocations = [];
        this.gameState.cluesFound = [];
        this.gameState.suspectDetails = {
            hair: null,
            height: null,
            clothing: null,
            interests: null,
            nextDestination: null
        };
        this.gameState.learnedVocabulary = [];
        this.gameState.caseSolved = false;
        
        // Set initial location
        const startLocationId = caseData.startLocation;
        const startLocation = gameLocations.find(loc => loc.id === startLocationId);
        
        if (!startLocation) {
            console.error(`Start location not found: ${startLocationId}`);
            return;
        }
        
        this.gameState.currentLocation = startLocation;
        this.gameState.visitedLocations.push(startLocationId);
        
        // Determine available locations (initially just the start location)
        this.updateAvailableLocations();
        
        // Update UI with initial location
        window.uiController.updateLocation(startLocation);
        
        // Initialize vocabulary for this case level
        this.initializeVocabulary();
        
        // Start game timer
        this.startTimer();
        
        console.log(`Game initialized at ${startLocation.name}`);
    }

    // Update available locations based on clues found
    updateAvailableLocations() {
        // Initially, only the current location is available
        this.gameState.availableLocations = [this.gameState.currentLocation];
        
        // Add next destination if it's known
        if (this.gameState.suspectDetails.nextDestination) {
            const nextLocation = gameLocations.find(loc => 
                loc.name.toLowerCase().includes(this.gameState.suspectDetails.nextDestination.toLowerCase())
            );
            
            if (nextLocation && !this.gameState.availableLocations.includes(nextLocation)) {
                this.gameState.availableLocations.push(nextLocation);
            }
        }
        
        // Add neighboring locations (simplified for demo)
        // In a full implementation, this would be based on the game's travel rules
        const currentIndex = gameLocations.findIndex(loc => loc.id === this.gameState.currentLocation.id);
        
        if (currentIndex >= 0) {
            // Add previous location if it exists
            if (currentIndex > 0) {
                const prevLocation = gameLocations[currentIndex - 1];
                if (!this.gameState.availableLocations.some(loc => loc.id === prevLocation.id)) {
                    this.gameState.availableLocations.push(prevLocation);
                }
            }
            
            // Add next location if it exists
            if (currentIndex < gameLocations.length - 1) {
                const nextLocation = gameLocations[currentIndex + 1];
                if (!this.gameState.availableLocations.some(loc => loc.id === nextLocation.id)) {
                    this.gameState.availableLocations.push(nextLocation);
                }
            }
        }
    }

    // Initialize vocabulary from the current case
    initializeVocabulary() {
        if (!this.gameState.currentCase || !this.gameState.currentCase.vocabulary) {
            return;
        }
        
        const vocabulary = this.gameState.currentCase.vocabulary;
        
        // Add some vocabulary as already learned (for demo purposes)
        if (vocabulary.appearance && vocabulary.appearance.length > 0) {
            this.addLearnedVocabulary(vocabulary.appearance[0]);
        }
        
        if (vocabulary.questions && vocabulary.questions.length > 0) {
            this.addLearnedVocabulary(vocabulary.questions[0]);
        }
    }

    // Start the game timer
    startTimer() {
        // Clear any existing timer
        if (this.gameState.timerInterval) {
            clearInterval(this.gameState.timerInterval);
        }
        
        // Set time based on difficulty
        switch (this.gameState.currentCase.difficulty) {
            case 'beginner':
                this.gameState.timeRemaining = 1200; // 20 minutes
                break;
            case 'intermediate':
                this.gameState.timeRemaining = 900; // 15 minutes
                break;
            case 'advanced':
                this.gameState.timeRemaining = 600; // 10 minutes
                break;
            default:
                this.gameState.timeRemaining = 1200;
        }
        
        // Update UI
        this.updateTimerDisplay();
        
        // Start interval
        this.gameState.timerInterval = setInterval(() => {
            this.gameState.timeRemaining--;
            this.updateTimerDisplay();
            
            if (this.gameState.timeRemaining <= 0) {
                this.handleTimeUp();
            }
        }, 1000);
    }

    // Update timer display
    updateTimerDisplay() {
        const minutes = Math.floor(this.gameState.timeRemaining / 60);
        const seconds = this.gameState.timeRemaining % 60;
        const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        window.uiController.updatePlayerStats(this.playerInfo.score, formattedTime);
    }

    // Handle time running out
    handleTimeUp() {
        clearInterval(this.gameState.timerInterval);
        alert('Time\'s up! You didn\'t solve the case in time.');
        window.uiController.showScreen('caseSelection');
    }

    // Toggle speech recognition
    toggleSpeech() {
        if (this.gameState.isListening) {
            window.speechRecognition.stopListening();
            this.gameState.isListening = false;
        } else {
            const started = window.speechRecognition.startListening();
            this.gameState.isListening = started;
        }
        
        window.uiController.updateSpeechButton(this.gameState.isListening);
    }

    // Handle speech recognition result
    handleSpeechResult(result) {
        console.log('Speech result:', result);
        
        // Display the result
        window.uiController.displaySpeechResult(result);
        
        // Process the speech for game logic
        this.processSpeech(result.original);
        
        // Award points for attempting to speak French
        if (result.detectedLanguage === 'french') {
            this.awardPoints(5, 'Speaking French');
        }
        
        // Award bonus points for good pronunciation
        if (result.confidence > 0.8) {
            this.awardPoints(3, 'Good pronunciation');
        }
    }

    // Process speech input for game logic
    processSpeech(speech) {
        if (!this.gameState.currentLocation || !this.gameState.currentCharacter) {
            // If no character is selected, try to select one based on speech
            const availableCharacters = this.gameState.currentLocation.characters;
            
            if (availableCharacters && availableCharacters.length > 0) {
                // For demo, just select the first character
                this.selectCharacter(availableCharacters[0]);
            } else {
                window.uiController.displayCharacterDialog(
                    "Veuillez sélectionner un personnage pour parler.",
                    "Please select a character to talk to."
                );
                return;
            }
        }
        
        const character = this.gameState.currentCharacter;
        
        // Check if speech matches any question patterns
        let responseKey = null;
        
        for (const [question, response] of Object.entries(character.questions)) {
            if (speech.toLowerCase().includes(question.toLowerCase())) {
                responseKey = response;
                break;
            }
        }
        
        // If a matching question was found
        if (responseKey && character.dialogues[responseKey]) {
            const response = character.dialogues[responseKey];
            
            // Display the character's response
            window.uiController.displayCharacterDialog(
                response,
                this.translateToEnglish(response) // Simple translation for demo
            );
            
            // Process clue if this is a clue response
            if (responseKey === 'suspect' || responseKey === 'item' || responseKey === 'direction') {
                this.processClue(responseKey, response);
            }
            
            // Award points for getting a response
            this.awardPoints(2, 'Successful conversation');
            return;
        }
        
        // If no matching question, provide a generic response
        window.uiController.displayCharacterDialog(
            "Je ne comprends pas bien. Pouvez-vous reformuler votre question?",
            "I don't quite understand. Can you rephrase your question?"
        );
    }

    // Process a clue from character dialogue
    processClue(clueType, clueText) {
        // Check if this clue was already found
        const clueId = `${this.gameState.currentLocation.id}_${this.gameState.currentCharacter.id}_${clueType}`;
        
        if (this.gameState.cluesFound.includes(clueId)) {
            return; // Clue already found
        }
        
        // Add to found clues
        this.gameState.cluesFound.push(clueId);
        
        // Add to UI clue list
        window.uiController.addClue(clueText);
        
        // Update suspect details based on clue type
        if (clueType === 'suspect') {
            // Extract appearance details (simplified for demo)
            if (clueText.includes('cheveux blonds')) {
                this.gameState.suspectDetails.hair = 'blonde';
            } else if (clueText.includes('cheveux bruns')) {
                this.gameState.suspectDetails.hair = 'brown';
            }
            
            if (clueText.includes('grand')) {
                this.gameState.suspectDetails.height = 'tall';
            } else if (clueText.includes('petit')) {
                this.gameState.suspectDetails.height = 'short';
            }
            
            // Extract clothing
            if (clueText.includes('lunettes')) {
                this.gameState.suspectDetails.clothing = 'glasses';
            } else if (clueText.includes('chapeau')) {
                this.gameState.suspectDetails.clothing = 'hat';
            }
        } else if (clueType === 'item') {
            // For items, update interests
            if (clueText.includes('art')) {
                this.gameState.suspectDetails.interests = 'art';
            } else if (clueText.includes('cuisine')) {
                this.gameState.suspectDetails.interests = 'cooking';
            } else if (clueText.includes('musique')) {
                this.gameState.suspectDetails.interests = 'music';
            }
        } else if (clueType === 'direction') {
            // Extract next destination
            const destinations = ['Paris', 'Lyon', 'Nice', 'Martinique', 'Québec', 'Dakar'];
            
            for (const destination of destinations) {
                if (clueText.includes(destination)) {
                    this.gameState.suspectDetails.nextDestination = destination;
                    break;
                }
            }
            
            // Update available locations
            this.updateAvailableLocations();
        }
        
        // Award points for finding a clue
        this.awardPoints(10, 'Found a clue');
        
        // Check if case is solved
        this.checkCaseSolution();
    }

    // Select a character to interact with
    selectCharacter(character) {
        this.gameState.currentCharacter = character;
        window.uiController.updateCharacter(character);
    }

    // Travel to a new location
    travelToLocation(locationId) {
        const location = gameLocations.find(loc => loc.id === locationId);
        
        if (!location) {
            console.error(`Location not found: ${locationId}`);
            return;
        }
        
        // Update game state
        this.gameState.currentLocation = location;
        this.gameState.currentCharacter = null;
        
        if (!this.gameState.visitedLocations.includes(locationId)) {
            this.gameState.visitedLocations.push(locationId);
            this.awardPoints(5, 'New location visited');
        }
        
        // Update available locations
        this.updateAvailableLocations();
        
        // Update UI
        window.uiController.updateLocation(location);
        
        console.log(`Traveled to ${location.name}`);
    }

    // Award points to the player
    awardPoints(points, reason) {
        this.playerInfo.score += points;
        window.uiController.updatePlayerStats(this.playerInfo.score, null);
        console.log(`Awarded ${points} points: ${reason}`);
    }

    // Add a vocabulary item to learned vocabulary
    addLearnedVocabulary(vocabItem) {
        // Check if already learned
        const alreadyLearned = this.gameState.learnedVocabulary.some(
            item => item.french === vocabItem.french
        );
        
        if (!alreadyLearned) {
            this.gameState.learnedVocabulary.push(vocabItem);
            console.log(`Learned vocabulary: ${vocabItem.french} (${vocabItem.english})`);
        }
    }

    // Simple English translation for demo purposes
    translateToEnglish(frenchText) {
        // This is a very simplified translation for demo
        // In a real implementation, you would use a translation API
        
        const translations = {
            'Bonjour': 'Hello',
            'Au revoir': 'Goodbye',
            'Merci': 'Thank you',
            'Oui': 'Yes',
            'Non': 'No',
            'Je ne comprends pas': 'I don\'t understand',
            'Pouvez-vous répéter': 'Can you repeat',
            'Puis-je vous aider': 'Can I help you',
            'J\'ai vu': 'I saw',
            'une personne': 'a person',
            'suspect': 'suspicious',
            'les cheveux': 'hair',
            'blonds': 'blonde',
            'bruns': 'brown',
            'roux': 'red',
            'grands': 'tall',
            'petits': 'short',
            'allé': 'went',
            'volé': 'stolen'
        };
        
        // Very basic word-by-word translation
        let englishText = frenchText;
        
        for (const [french, english] of Object.entries(translations)) {
            englishText = englishText.replace(new RegExp(french, 'gi'), english);
        }
        
        return englishText;
    }

    // Check if the case is solved
    checkCaseSolution() {
        // For demo purposes, consider case solved if:
        // 1. Visited at least 3 locations
        // 2. Found at least 5 clues
        // 3. Have details about the suspect
        
        if (this.gameState.visitedLocations.length >= 3 &&
            this.gameState.cluesFound.length >= 5 &&
            this.gameState.suspectDetails.hair &&
            this.gameState.suspectDetails.nextDestination) {
            
            this.solveCaseWithThief();
            return true;
        }
        
        return false;
    }

    // Handle case solution with thief
    solveCaseWithThief() {
        if (this.gameState.caseSolved) {
            return; // Already solved
        }
        
        // Mark case as solved
        this.gameState.caseSolved = true;
        
        // Stop the timer
        clearInterval(this.gameState.timerInterval);
        
        // Award bonus points
        this.awardPoints(50, 'Case solved');
        
        // Calculate stats
        const stats = {
            cluesFound: this.gameState.cluesFound.length,
            totalClues: 10, // Placeholder value
            vocabLearned: this.gameState.learnedVocabulary.length,
            pronunciationScore: Math.floor(70 + Math.random() * 30), // Random for demo
            grammarScore: Math.floor(70 + Math.random() * 30), // Random for demo
            timeTaken: this.formatTime(1200 - this.gameState.timeRemaining), // 20 min minus remaining
            thiefImage: 'assets/images/characters/thief.jpg' // Placeholder
        };
        
        // Show case completion screen
        window.uiController.showCaseCompletion(stats);
    }

    // Format time from seconds to MM:SS
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Handle speech recognition error
    handleSpeechError(error) {
        console.error('Speech error:', error);
        this.gameState.isListening = false;
        window.uiController.updateSpeechButton(false);
    }

    // Handle speech recognition end
    handleSpeechEnd() {
        this.gameState.isListening = false;
        window.uiController.updateSpeechButton(false);
    }

    // Getter methods for UI Controller
    getCurrentLocation() {
        return this.gameState.currentLocation;
    }
    
    getVisitedLocations() {
        return this.gameState.visitedLocations;
    }
    
    getAvailableLocations() {
        return this.gameState.availableLocations;
    }
    
    getLearnedVocabulary() {
        return this.gameState.learnedVocabulary;
    }
    
    getSuspectDetails() {
        return this.gameState.suspectDetails;
    }
}

// Create global instance if in browser context
if (typeof window !== 'undefined') {
    window.gameController = new GameController();
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameController;
}
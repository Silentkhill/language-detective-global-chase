/**
 * Main JavaScript file for Language Detective: Global Chase
 * Initializes all game components and sets up event listeners
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Language Detective: Global Chase - Initializing...');
    
    // Initialize Speech Recognition
    const speechRecognition = new SpeechRecognitionController();
    window.speechRecognition = speechRecognition;
    
    // Initialize UI Controller
    const uiController = new UIController();
    window.uiController = uiController;
    
    // Initialize Game Controller
    const gameController = new GameController();
    window.gameController = gameController;
    
    // Setup initial event listeners
    setupEventListeners();
    
    // Show welcome screen
    uiController.showScreen('welcome');
    
    console.log('Game initialization complete');
});

/**
 * Setup event listeners for the game
 */
function setupEventListeners() {
    // Welcome screen events
    document.getElementById('start-game-btn').addEventListener('click', () => {
        const playerName = document.getElementById('player-name').value.trim();
        const gradeLevel = document.getElementById('grade-level').value;
        
        if (!playerName) {
            alert('Please enter your name to continue.');
            return;
        }
        
        // Set player info
        window.gameController.setPlayerInfo(playerName, gradeLevel);
        
        // Show case selection screen
        window.uiController.showScreen('caseSelection');
        window.uiController.updateCaseSelection();
    });
    
    // Case selection events
    document.querySelectorAll('.case-card').forEach(caseCard => {
        caseCard.addEventListener('click', (event) => {
            const caseId = event.currentTarget.dataset.caseId;
            const selectedCase = gameCases.find(c => c.id === caseId);
            
            if (selectedCase) {
                // Set current case and initialize gameplay
                window.gameController.setCurrentCase(selectedCase);
                window.gameController.initializeGameplay();
                
                // Show game screen
                window.uiController.showScreen('gamePlay');
            }
        });
    });
    
    // Game controls
    document.getElementById('microphone-btn').addEventListener('click', () => {
        window.gameController.toggleSpeech();
    });
    
    document.getElementById('translation-toggle').addEventListener('change', (event) => {
        const showTranslations = event.target.checked;
        window.uiController.toggleTranslations(showTranslations);
    });
    
    document.getElementById('clues-btn').addEventListener('click', () => {
        window.uiController.toggleCluesPanel();
    });
    
    document.getElementById('vocabulary-btn').addEventListener('click', () => {
        window.uiController.toggleVocabularyPanel();
    });
    
    document.getElementById('map-btn').addEventListener('click', () => {
        window.uiController.showMapDialog(
            window.gameController.getCurrentLocation(),
            window.gameController.getVisitedLocations(),
            window.gameController.getAvailableLocations()
        );
    });
    
    // Map dialog events
    document.getElementById('map-dialog').addEventListener('click', (event) => {
        if (event.target.classList.contains('location-marker')) {
            const locationId = event.target.dataset.locationId;
            window.gameController.travelToLocation(locationId);
            window.uiController.closeMapDialog();
        }
    });
    
    document.getElementById('close-map-btn').addEventListener('click', () => {
        window.uiController.closeMapDialog();
    });
    
    // Character interaction
    document.querySelectorAll('.character-card').forEach(characterCard => {
        characterCard.addEventListener('click', (event) => {
            const characterId = event.currentTarget.dataset.characterId;
            const currentLocation = window.gameController.getCurrentLocation();
            
            if (currentLocation && currentLocation.characters) {
                const character = currentLocation.characters.find(c => c.id === characterId);
                
                if (character) {
                    window.gameController.selectCharacter(character);
                }
            }
        });
    });
    
    // Common question buttons
    document.querySelectorAll('.common-question').forEach(questionBtn => {
        questionBtn.addEventListener('click', (event) => {
            const question = event.target.dataset.question;
            
            if (question) {
                // First check if speech recognition is active
                const isListening = window.gameController.gameState.isListening;
                
                if (!isListening) {
                    // If not listening, process directly
                    window.gameController.processSpeech(question);
                } else {
                    // If listening, show the question in the speech result area
                    window.uiController.displaySpeechResult({
                        original: question,
                        corrected: question,
                        detectedLanguage: 'french',
                        confidence: 1.0,
                        feedback: "Perfect pronunciation!"
                    });
                    
                    // Process the speech
                    window.gameController.processSpeech(question);
                }
            }
        });
    });
    
    // Case completion events
    document.getElementById('continue-after-case-btn').addEventListener('click', () => {
        window.uiController.showScreen('caseSelection');
    });
    
    // Menu and navigation buttons
    document.getElementById('menu-btn').addEventListener('click', () => {
        window.uiController.toggleMenuPanel();
    });
    
    document.getElementById('return-to-cases-btn').addEventListener('click', () => {
        if (confirm('Are you sure you want to exit this case? Your progress will be lost.')) {
            // Stop the game timer
            clearInterval(window.gameController.gameState.timerInterval);
            
            // Return to case selection
            window.uiController.showScreen('caseSelection');
        }
    });
    
    document.getElementById('help-btn').addEventListener('click', () => {
        window.uiController.toggleHelpPanel();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (event) => {
        if (event.key === 'm' && (event.ctrlKey || event.metaKey)) {
            window.gameController.toggleSpeech();
            event.preventDefault();
        }
    });
    
    // Window resize event for responsive UI
    window.addEventListener('resize', () => {
        window.uiController.adjustLayout();
    });
}

/**
 * Error handling for script loading
 */
window.addEventListener('error', (event) => {
    console.error('Script error:', event.message);
    
    // Display error message to user if critical components fail to load
    const criticalScripts = ['game-data.js', 'locations-data.js', 'speech-recognition.js', 'ui-controller.js', 'game-controller.js'];
    const scriptSrc = event.filename || '';
    
    if (criticalScripts.some(script => scriptSrc.includes(script))) {
        document.body.innerHTML = `
            <div class="error-screen">
                <h1>Oops! Something went wrong</h1>
                <p>We couldn't load an important part of the game. Please try refreshing the page.</p>
                <p>Error: ${event.message}</p>
                <button onclick="location.reload()">Refresh Page</button>
            </div>
        `;
    }
});
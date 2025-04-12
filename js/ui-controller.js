/**
 * UI Controller for Language Detective: Global Chase
 * Manages screen transitions, UI updates, and user interactions
 */

class UIController {
    constructor() {
        this.screens = {
            userLogin: document.getElementById('user-section'),
            intro: document.getElementById('intro-screen'),
            caseSelection: document.getElementById('case-selection'),
            caseBriefing: document.getElementById('case-briefing'),
            gameplay: document.getElementById('gameplay-screen'),
            map: document.getElementById('map-screen'),
            notebook: document.getElementById('notebook-screen'),
            help: document.getElementById('help-screen'),
            caseComplete: document.getElementById('case-complete'),
            teacherDashboard: document.getElementById('teacher-dashboard')
        };
        
        this.elements = {
            username: document.getElementById('username'),
            gradeLevel: document.getElementById('grade-level'),
            startGameBtn: document.getElementById('start-game'),
            teacherLoginLink: document.getElementById('teacher-login-link'),
            viewCasesBtn: document.getElementById('view-cases'),
            casesContainer: document.querySelector('.cases-container'),
            currentLocation: document.getElementById('current-location'),
            playerScore: document.getElementById('player-score'),
            timeRemaining: document.getElementById('time-remaining'),
            sceneImage: document.getElementById('scene-image'),
            characterImage: document.getElementById('character-image'),
            characterDialog: document.getElementById('character-dialog'),
            dialogTranslation: document.getElementById('dialog-translation'),
            cluesList: document.getElementById('clues-list'),
            speakButton: document.getElementById('speak-button'),
            recognizedSpeech: document.getElementById('recognized-speech'),
            pronunciationFeedback: document.getElementById('pronunciation-feedback'),
            toggleTranslation: document.getElementById('toggle-translation'),
            mapButton: document.getElementById('map-button'),
            notebookButton: document.getElementById('notebook-button'),
            helpButton: document.getElementById('help-button'),
            worldMap: document.getElementById('world-map'),
            locationOptions: document.getElementById('location-options'),
            closeMap: document.getElementById('close-map'),
            closeNotebook: document.getElementById('close-notebook'),
            closeHelp: document.getElementById('close-help'),
            notebookCluesList: document.querySelector('.notebook-clues-list'),
            vocabularyList: document.querySelector('.vocabulary-list'),
            notebookTabs: document.querySelectorAll('.tab-btn'),
            tabContents: document.querySelectorAll('.tab-content'),
            suspectProfile: document.querySelector('.suspect-profile'),
            startInvestigation: document.getElementById('start-investigation'),
            caseTitle: document.getElementById('case-title'),
            difficultyLevel: document.getElementById('difficulty-level'),
            caseImage: document.getElementById('case-image'),
            caseText: document.getElementById('case-text'),
            learningObjectivesList: document.getElementById('learning-objectives-list'),
            suggestionButtons: document.querySelectorAll('.suggestion')
        };
        
        // Initialize event listeners
        this.initializeEventListeners();
    }

    // Initialize all event listeners
    initializeEventListeners() {
        // Login screen
        this.elements.startGameBtn.addEventListener('click', () => this.handleStartGame());
        this.elements.teacherLoginLink.addEventListener('click', () => this.showTeacherLogin());
        
        // Intro screen
        this.elements.viewCasesBtn.addEventListener('click', () => this.showScreen('caseSelection'));
        
        // Case selection
        
        // Case briefing
        this.elements.startInvestigation.addEventListener('click', () => this.startInvestigation());
        
        // Gameplay screen
        this.elements.toggleTranslation.addEventListener('click', () => this.toggleTranslation());
        this.elements.speakButton.addEventListener('click', () => this.toggleSpeechRecognition());
        this.elements.mapButton.addEventListener('click', () => this.showScreen('map'));
        this.elements.notebookButton.addEventListener('click', () => this.showScreen('notebook'));
        this.elements.helpButton.addEventListener('click', () => this.showScreen('help'));
        
        // Map screen
        this.elements.closeMap.addEventListener('click', () => this.showScreen('gameplay'));
        
        // Notebook screen
        this.elements.closeNotebook.addEventListener('click', () => this.showScreen('gameplay'));
        this.elements.notebookTabs.forEach(tab => {
            tab.addEventListener('click', (e) => this.switchNotebookTab(e));
        });
        
        // Help screen
        this.elements.closeHelp.addEventListener('click', () => this.showScreen('gameplay'));
        
        // Suggestion buttons
        this.elements.suggestionButtons.forEach(button => {
            button.addEventListener('click', (e) => this.useSuggestion(e.target.textContent));
        });
    }

    // Show a specific screen
    showScreen(screenName) {
        // Hide all screens
        Object.values(this.screens).forEach(screen => {
            screen.classList.add('hidden');
        });
        
        // Show the requested screen
        if (this.screens[screenName]) {
            this.screens[screenName].classList.remove('hidden');
            
            // Special handling for certain screens
            if (screenName === 'caseSelection') {
                this.populateCaseSelection();
            } else if (screenName === 'map') {
                this.updateMap();
            } else if (screenName === 'notebook') {
                this.updateNotebook();
            }
        }
    }

    // Handle start game button
    handleStartGame() {
        const username = this.elements.username.value.trim();
        const gradeLevel = this.elements.gradeLevel.value;
        
        if (!username) {
            alert('Please enter your name to continue.');
            return;
        }
        
        // Save player info
        window.gameController.setPlayerInfo(username, gradeLevel);
        
        // Set speech recognition level based on grade
        window.speechRecognition.setPlayerLevel(gradeLevel);
        
        // Show intro screen
        this.showScreen('intro');
    }

    // Show teacher login dialog
    showTeacherLogin() {
        const password = prompt('Please enter teacher password:');
        
        if (password === 'teacher123') { // Simple password for demo
            this.showScreen('teacherDashboard');
        } else {
            alert('Incorrect password. Please try again.');
        }
    }

    // Populate case selection screen with available cases
    populateCaseSelection() {
        const container = this.elements.casesContainer;
        container.innerHTML = '';
        
        gameCases.forEach(caseData => {
            const caseCard = document.createElement('div');
            caseCard.className = 'case-card';
            caseCard.dataset.caseId = caseData.id;
            
            const caseImage = document.createElement('div');
            caseImage.className = 'case-image';
            caseImage.style.backgroundImage = `url(${caseData.image || 'assets/images/cases/default-case.jpg'})`;
            
            const caseInfo = document.createElement('div');
            caseInfo.className = 'case-info';
            
            const caseTitle = document.createElement('h3');
            caseTitle.textContent = caseData.title;
            
            const caseDesc = document.createElement('p');
            caseDesc.textContent = caseData.description;
            
            const caseDifficulty = document.createElement('div');
            caseDifficulty.className = 'case-difficulty';
            caseDifficulty.textContent = `Difficulty: ${caseData.difficulty} (Grade ${caseData.grade})`;
            
            const caseTags = document.createElement('div');
            caseTags.className = 'case-tags';
            
            // Create tags from learning objectives
            if (caseData.learningObjectives && caseData.learningObjectives.length > 0) {
                caseData.learningObjectives.slice(0, 2).forEach(objective => {
                    const tag = document.createElement('span');
                    tag.className = 'case-tag';
                    tag.textContent = objective.split(' ')[0]; // Just the first word
                    caseTags.appendChild(tag);
                });
            }
            
            caseInfo.appendChild(caseTitle);
            caseInfo.appendChild(caseDesc);
            caseInfo.appendChild(caseDifficulty);
            caseInfo.appendChild(caseTags);
            
            caseCard.appendChild(caseImage);
            caseCard.appendChild(caseInfo);
            
            // Add click event
            caseCard.addEventListener('click', () => this.selectCase(caseData));
            
            container.appendChild(caseCard);
        });
    }

    // Handle case selection
    selectCase(caseData) {
        window.gameController.setCurrentCase(caseData);
        
        // Update case briefing screen
        this.elements.caseTitle.textContent = caseData.title;
        this.elements.difficultyLevel.textContent = caseData.difficulty.charAt(0).toUpperCase() + caseData.difficulty.slice(1);
        this.elements.caseImage.style.backgroundImage = `url(${caseData.image || 'assets/images/cases/default-case.jpg'})`;
        this.elements.caseText.textContent = caseData.description;
        
        // Update learning objectives
        const objectivesList = this.elements.learningObjectivesList;
        objectivesList.innerHTML = '';
        
        if (caseData.learningObjectives && caseData.learningObjectives.length > 0) {
            caseData.learningObjectives.forEach(objective => {
                const li = document.createElement('li');
                li.textContent = objective;
                objectivesList.appendChild(li);
            });
        }
        
        // Show the case briefing screen
        this.showScreen('caseBriefing');
    }

    // Start investigation
    startInvestigation() {
        // Initialize game state for the current case
        window.gameController.initializeGameplay();
        
        // Show gameplay screen
        this.showScreen('gameplay');
    }

    // Toggle translation visibility
    toggleTranslation() {
        const translation = this.elements.dialogTranslation;
        const button = this.elements.toggleTranslation;
        
        if (translation.classList.contains('hidden')) {
            translation.classList.remove('hidden');
            button.innerHTML = '<i class="fas fa-language"></i> Hide Translation';
        } else {
            translation.classList.add('hidden');
            button.innerHTML = '<i class="fas fa-language"></i> Show Translation';
        }
    }

    // Toggle speech recognition
    toggleSpeechRecognition() {
        window.gameController.toggleSpeech();
    }

    // Update speech button state
    updateSpeechButton(isListening) {
        const button = this.elements.speakButton;
        
        if (isListening) {
            button.innerHTML = '<i class="fas fa-microphone"></i> Listening...';
            button.classList.add('listening');
        } else {
            button.innerHTML = '<i class="fas fa-microphone"></i> Ask a Question';
            button.classList.remove('listening');
        }
    }

    // Display speech recognition result
    displaySpeechResult(result) {
        // Show what was recognized
        this.elements.recognizedSpeech.textContent = result.original;
        
        // Show pronunciation feedback
        const feedback = result.pronunciationFeedback;
        this.elements.pronunciationFeedback.textContent = feedback.message;
        this.elements.pronunciationFeedback.className = feedback.quality;
        
        // If there are tips, add them
        if (feedback.tips) {
            this.elements.pronunciationFeedback.textContent += ' ' + feedback.tips;
        }
    }

    // Display dialog from character
    displayCharacterDialog(text, translation) {
        this.elements.characterDialog.textContent = text;
        
        if (translation) {
            this.elements.dialogTranslation.textContent = translation;
        }
    }

    // Update character display
    updateCharacter(character) {
        if (!character) return;
        
        this.elements.characterImage.style.backgroundImage = `url(${character.image})`;
        this.displayCharacterDialog(character.greeting, ""); // Initial greeting
    }

    // Add a clue to the list
    addClue(clueText, isNew = true) {
        // Add to gameplay clues list
        const clueItem = document.createElement('li');
        clueItem.textContent = clueText;
        
        if (isNew) {
            clueItem.classList.add('new-clue');
            
            // Remove the 'new' highlight after a delay
            setTimeout(() => {
                clueItem.classList.remove('new-clue');
            }, 3000);
        }
        
        this.elements.cluesList.appendChild(clueItem);
        
        // Also add to notebook clues list
        const notebookClue = document.createElement('li');
        notebookClue.textContent = clueText;
        this.elements.notebookCluesList.appendChild(notebookClue);
    }

    // Update the location display
    updateLocation(location) {
        if (!location) return;
        
        this.elements.currentLocation.textContent = `${location.name}, ${location.country}`;
        this.elements.sceneImage.style.backgroundImage = `url(${location.image})`;
    }

    // Update map with locations
    updateMap() {
        // Clear existing locations
        this.elements.worldMap.innerHTML = '';
        
        // Add map locations based on game state
        const visitedLocations = window.gameController.getVisitedLocations();
        const currentLocation = window.gameController.getCurrentLocation();
        const availableLocations = window.gameController.getAvailableLocations();
        
        // Update location options
        this.elements.locationOptions.innerHTML = '';
        
        availableLocations.forEach(location => {
            const button = document.createElement('button');
            button.textContent = `Travel to ${location.name}`;
            button.classList.add('btn-secondary');
            
            if (location.id === currentLocation.id) {
                button.disabled = true;
                button.textContent = `Currently in ${location.name}`;
            }
            
            button.addEventListener('click', () => {
                window.gameController.travelToLocation(location.id);
                this.showScreen('gameplay');
            });
            
            this.elements.locationOptions.appendChild(button);
            
            // Add location to map
            const mapLocation = document.createElement('div');
            mapLocation.className = 'map-location';
            mapLocation.style.left = `${50 + Math.random() * 80}%`; // Random position for demo
            mapLocation.style.top = `${30 + Math.random() * 40}%`;
            
            if (visitedLocations.includes(location.id)) {
                mapLocation.classList.add('visited');
            }
            
            if (location.id === currentLocation.id) {
                mapLocation.classList.add('current');
            }
            
            mapLocation.dataset.location = location.id;
            mapLocation.title = location.name;
            
            mapLocation.addEventListener('click', () => {
                window.gameController.travelToLocation(location.id);
                this.showScreen('gameplay');
            });
            
            this.elements.worldMap.appendChild(mapLocation);
        });
    }

    // Update notebook content
    updateNotebook() {
        // Update vocabulary list
        const vocabularyList = this.elements.vocabularyList;
        vocabularyList.innerHTML = '';
        
        const learnedVocabulary = window.gameController.getLearnedVocabulary();
        
        learnedVocabulary.forEach(item => {
            const vocabItem = document.createElement('div');
            vocabItem.className = 'vocabulary-item';
            
            const frenchWord = document.createElement('div');
            frenchWord.className = 'french-word';
            frenchWord.textContent = item.french;
            
            const englishTranslation = document.createElement('div');
            englishTranslation.className = 'english-translation';
            englishTranslation.textContent = item.english;
            
            vocabItem.appendChild(frenchWord);
            vocabItem.appendChild(englishTranslation);
            vocabularyList.appendChild(vocabItem);
        });
        
        // Update suspect profile
        const suspectDetails = window.gameController.getSuspectDetails();
        const suspectProfile = this.elements.suspectProfile;
        
        if (suspectDetails) {
            const characteristics = suspectProfile.querySelectorAll('.suspect-characteristic .value');
            
            // Update known characteristics
            characteristics[0].textContent = suspectDetails.hair || '?';
            characteristics[1].textContent = suspectDetails.height || '?';
            characteristics[2].textContent = suspectDetails.clothing || '?';
            characteristics[3].textContent = suspectDetails.interests || '?';
            characteristics[4].textContent = suspectDetails.nextDestination || '?';
        }
    }

    // Switch notebook tab
    switchNotebookTab(event) {
        const tabId = event.target.dataset.tab;
        
        // Update active tab button
        this.elements.notebookTabs.forEach(tab => {
            tab.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Show the selected tab content
        this.elements.tabContents.forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabId}-tab`).classList.add('active');
    }

    // Use a suggested question
    useSuggestion(text) {
        // Set the recognized speech to the suggested text
        this.elements.recognizedSpeech.textContent = text;
        
        // Process the suggestion as if it was spoken
        window.gameController.processSpeech(text);
    }

    // Update player stats
    updatePlayerStats(score, timeRemaining) {
        this.elements.playerScore.textContent = score;
        this.elements.timeRemaining.textContent = timeRemaining;
    }

    // Display a notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }

    // Show case completion screen
    showCaseCompletion(stats) {
        // Update stats
        document.getElementById('clues-found').textContent = `${stats.cluesFound}/${stats.totalClues}`;
        document.getElementById('vocab-mastered').textContent = stats.vocabLearned;
        document.getElementById('pronunciation-score').textContent = `${stats.pronunciationScore}%`;
        document.getElementById('grammar-score').textContent = `${stats.grammarScore}%`;
        document.getElementById('time-taken').textContent = stats.timeTaken;
        
        // Set thief image
        document.getElementById('thief-image').style.backgroundImage = `url(${stats.thiefImage})`;
        
        // Show screen
        this.showScreen('caseComplete');
        
        // Add event listeners for next actions
        document.getElementById('next-case').addEventListener('click', () => {
            this.showScreen('caseSelection');
        });
        
        document.getElementById('customize-detective').addEventListener('click', () => {
            alert('Detective customization feature coming soon!');
        });
        
        document.getElementById('view-vocabulary').addEventListener('click', () => {
            this.showScreen('notebook');
            // Switch to vocabulary tab
            document.querySelector('[data-tab="vocabulary"]').click();
        });
    }
}

// Create global instance if in browser context
if (typeof window !== 'undefined') {
    window.uiController = new UIController();
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIController;
}
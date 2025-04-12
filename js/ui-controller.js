/**
 * UI Controller for Language Detective: Global Chase
 * Manages all UI elements, transitions, and animations
 */
class UIController {
    constructor() {
        this.screens = {
            welcome: document.getElementById('welcome-screen'),
            caseSelection: document.getElementById('case-selection-screen'),
            gamePlay: document.getElementById('gameplay-screen'),
            caseComplete: document.getElementById('case-complete-screen')
        };
        
        this.panels = {
            clues: document.getElementById('clues-panel'),
            vocabulary: document.getElementById('vocabulary-panel'),
            menu: document.getElementById('menu-panel'),
            help: document.getElementById('help-panel')
        };
        
        this.dialogs = {
            map: document.getElementById('map-dialog'),
            feedback: document.getElementById('feedback-dialog')
        };
        
        this.speechUI = {
            microphoneBtn: document.getElementById('microphone-btn'),
            speechResult: document.getElementById('speech-result'),
            speechFeedback: document.getElementById('speech-feedback')
        };
        
        this.gameplayUI = {
            locationName: document.getElementById('location-name'),
            locationDescription: document.getElementById('location-description'),
            charactersContainer: document.getElementById('characters-container'),
            characterDialog: document.getElementById('character-dialog'),
            timer: document.getElementById('game-timer'),
            score: document.getElementById('player-score'),
            rank: document.getElementById('player-rank')
        };
        
        this.caseCompleteUI = {
            caseName: document.getElementById('completed-case-name'),
            timeSpent: document.getElementById('time-spent'),
            scoreEarned: document.getElementById('score-earned'),
            cluesFound: document.getElementById('clues-found'),
            vocabularyLearned: document.getElementById('vocabulary-learned'),
            rankAchieved: document.getElementById('rank-achieved')
        };
        
        this.activePanels = [];
        this.showTranslations = false;
    }
    
    /**
     * Show a specific screen and hide all others
     * @param {string} screenName - The name of the screen to show
     */
    showScreen(screenName) {
        // Hide all screens
        Object.values(this.screens).forEach(screen => {
            if (screen) screen.classList.add('hidden');
        });
        
        // Show requested screen
        if (this.screens[screenName]) {
            this.screens[screenName].classList.remove('hidden');
            
            // Special handling for different screens
            if (screenName === 'caseSelection') {
                this.updateCaseSelection();
            } else if (screenName === 'gamePlay') {
                this.resetPanelsAndDialogs();
            }
        }
    }
    
    /**
     * Update the case selection screen with available cases
     */
    updateCaseSelection() {
        const casesContainer = document.getElementById('cases-container');
        const completedCases = window.gameController ? window.gameController.getCompletedCases() : [];
        
        // Clear previous cases
        casesContainer.innerHTML = '';
        
        // Get cases data and player grade level
        const availableCases = window.gameCases || [];
        const playerGradeLevel = window.gameController ? 
            window.gameController.getPlayerInfo().gradeLevel : '6';
        
        // Filter cases based on grade level
        const filteredCases = availableCases.filter(gameCase => {
            return gameCase.gradeLevel <= parseInt(playerGradeLevel);
        });
        
        // Add cases to the container
        filteredCases.forEach(gameCase => {
            const isCompleted = completedCases.includes(gameCase.id);
            const caseCard = document.createElement('div');
            caseCard.className = `case-card ${isCompleted ? 'completed' : ''}`;
            caseCard.dataset.caseId = gameCase.id;
            
            caseCard.innerHTML = `
                <div class="case-image">
                    <img src="images/cases/${gameCase.image}" alt="${gameCase.title}">
                    ${isCompleted ? '<div class="completed-badge">Completed</div>' : ''}
                </div>
                <div class="case-info">
                    <h3>${gameCase.title}</h3>
                    <p class="case-location">${gameCase.mainLocation}</p>
                    <p class="case-difficulty">Level: ${gameCase.difficulty}</p>
                    <p class="case-description">${gameCase.description}</p>
                </div>
            `;
            
            casesContainer.appendChild(caseCard);
        });
    }
    
    /**
     * Update the gameplay screen with the current location
     * @param {Object} location - The current location data
     */
    updateLocation(location) {
        if (!location) return;
        
        // Update location details
        this.gameplayUI.locationName.textContent = location.name;
        this.gameplayUI.locationDescription.textContent = location.description;
        
        // Update background image
        document.getElementById('location-background').style.backgroundImage = 
            `url('images/locations/${location.background}')`;
        
        // Update characters
        this.updateCharacters(location.characters || []);
    }
    
    /**
     * Update the characters shown at the current location
     * @param {Array} characters - Array of character objects
     */
    updateCharacters(characters) {
        const container = this.gameplayUI.charactersContainer;
        container.innerHTML = '';
        
        characters.forEach(character => {
            const characterCard = document.createElement('div');
            characterCard.className = 'character-card';
            characterCard.dataset.characterId = character.id;
            
            characterCard.innerHTML = `
                <div class="character-image">
                    <img src="images/characters/${character.image}" alt="${character.name}">
                </div>
                <div class="character-name">${character.name}</div>
            `;
            
            container.appendChild(characterCard);
        });
    }
    
    /**
     * Display character dialog with speech bubble
     * @param {Object} character - The character data
     * @param {string} dialog - The dialog text
     * @param {boolean} isTranslated - Whether to show translation
     */
    showCharacterDialog(character, dialog, translation = '') {
        const dialogElement = this.gameplayUI.characterDialog;
        
        dialogElement.innerHTML = `
            <div class="character-portrait">
                <img src="images/characters/${character.image}" alt="${character.name}">
                <div class="character-name">${character.name}</div>
            </div>
            <div class="speech-bubble">
                <p class="dialog-text">${dialog}</p>
                ${this.showTranslations && translation ? 
                    `<p class="dialog-translation">${translation}</p>` : ''}
            </div>
        `;
        
        dialogElement.classList.remove('hidden');
        
        // Highlight any vocabulary words in the dialog
        this.highlightVocabulary(dialogElement.querySelector('.dialog-text'));
    }
    
    /**
     * Hide the character dialog
     */
    hideCharacterDialog() {
        this.gameplayUI.characterDialog.classList.add('hidden');
    }
    
    /**
     * Display the result of speech recognition
     * @param {Object} result - Speech recognition result
     */
    displaySpeechResult(result) {
        if (!result) return;
        
        const resultElement = this.speechUI.speechResult;
        const feedbackElement = this.speechUI.speechFeedback;
        
        // Display what was said
        resultElement.textContent = result.original;
        
        // Display feedback based on accuracy
        if (result.feedback) {
            feedbackElement.textContent = result.feedback;
            
            // Set color based on confidence
            if (result.confidence > 0.8) {
                feedbackElement.className = 'feedback excellent';
            } else if (result.confidence > 0.5) {
                feedbackElement.className = 'feedback good';
            } else {
                feedbackElement.className = 'feedback needs-improvement';
            }
            
            // Show corrected text if available and different
            if (result.corrected && result.corrected !== result.original) {
                resultElement.innerHTML += `<span class="correction"> → ${result.corrected}</span>`;
            }
            
            // Show feedback
            feedbackElement.classList.remove('hidden');
        } else {
            feedbackElement.classList.add('hidden');
        }
    }
    
    /**
     * Update the microphone button to show listening state
     * @param {boolean} isListening - Whether the microphone is listening
     */
    updateMicrophoneState(isListening) {
        const micButton = this.speechUI.microphoneBtn;
        
        if (isListening) {
            micButton.classList.add('listening');
            micButton.querySelector('i').className = 'fas fa-microphone-alt';
        } else {
            micButton.classList.remove('listening');
            micButton.querySelector('i').className = 'fas fa-microphone';
        }
    }
    
    /**
     * Update the clues panel with found clues
     * @param {Array} clues - Array of clue objects
     */
    updateCluesPanel(clues) {
        const cluesContainer = this.panels.clues.querySelector('.clues-container');
        cluesContainer.innerHTML = '';
        
        if (clues && clues.length > 0) {
            clues.forEach(clue => {
                const clueElement = document.createElement('div');
                clueElement.className = 'clue-item';
                
                clueElement.innerHTML = `
                    <div class="clue-icon">
                        <i class="fas ${this.getClueIcon(clue.type)}"></i>
                    </div>
                    <div class="clue-content">
                        <h4>${clue.title}</h4>
                        <p>${clue.description}</p>
                        ${clue.image ? `<img src="images/clues/${clue.image}" alt="${clue.title}">` : ''}
                    </div>
                `;
                
                cluesContainer.appendChild(clueElement);
            });
        } else {
            cluesContainer.innerHTML = '<p class="empty-state">No clues found yet.</p>';
        }
    }
    
    /**
     * Get the appropriate icon for a clue type
     * @param {string} type - The clue type
     * @returns {string} - FontAwesome icon class
     */
    getClueIcon(type) {
        switch (type) {
            case 'document': return 'fa-file-alt';
            case 'photo': return 'fa-image';
            case 'audio': return 'fa-headphones';
            case 'object': return 'fa-cube';
            case 'testimony': return 'fa-comment-alt';
            default: return 'fa-search';
        }
    }
    
    /**
     * Update the vocabulary panel with learned words
     * @param {Array} vocabulary - Array of vocabulary objects
     */
    updateVocabularyPanel(vocabulary) {
        const vocabContainer = this.panels.vocabulary.querySelector('.vocabulary-container');
        vocabContainer.innerHTML = '';
        
        if (vocabulary && vocabulary.length > 0) {
            // Group vocabulary by category
            const groupedVocabulary = vocabulary.reduce((groups, word) => {
                if (!groups[word.category]) {
                    groups[word.category] = [];
                }
                groups[word.category].push(word);
                return groups;
            }, {});
            
            // Create sections for each category
            Object.keys(groupedVocabulary).forEach(category => {
                const categorySection = document.createElement('div');
                categorySection.className = 'vocabulary-category';
                
                categorySection.innerHTML = `<h3>${category}</h3>`;
                
                const wordsList = document.createElement('div');
                wordsList.className = 'vocabulary-words';
                
                groupedVocabulary[category].forEach(word => {
                    const wordElement = document.createElement('div');
                    wordElement.className = 'vocabulary-word';
                    
                    wordElement.innerHTML = `
                        <div class="word-original">${word.french}</div>
                        <div class="word-translation">${word.english}</div>
                        <div class="word-example">${word.example}</div>
                        <button class="speak-word-btn" data-word="${word.french}">
                            <i class="fas fa-volume-up"></i>
                        </button>
                    `;
                    
                    wordsList.appendChild(wordElement);
                });
                
                categorySection.appendChild(wordsList);
                vocabContainer.appendChild(categorySection);
            });
            
            // Add event listeners for speak buttons
            vocabContainer.querySelectorAll('.speak-word-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const word = button.dataset.word;
                    this.speakText(word, 'fr-FR');
                });
            });
        } else {
            vocabContainer.innerHTML = '<p class="empty-state">No vocabulary words learned yet.</p>';
        }
    }
    
    /**
     * Use text-to-speech to speak text
     * @param {string} text - Text to speak
     * @param {string} lang - Language code (e.g., 'fr-FR')
     */
    speakText(text, lang = 'fr-FR') {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            speechSynthesis.speak(utterance);
        }
    }
    
    /**
     * Highlight vocabulary words in text
     * @param {Element} element - Text element to highlight words in
     */
    highlightVocabulary(element) {
        const vocabulary = window.gameController ? 
            window.gameController.getLearnedVocabulary() : [];
        
        if (!vocabulary || vocabulary.length === 0 || !element) return;
        
        let html = element.innerHTML;
        
        vocabulary.forEach(word => {
            const regex = new RegExp(`\\b${word.french}\\b`, 'gi');
            html = html.replace(regex, `<span class="vocabulary-highlight" 
                data-word="${word.french}" 
                data-translation="${word.english}">${word.french}</span>`);
        });
        
        element.innerHTML = html;
        
        // Add event listeners for highlighted words
        element.querySelectorAll('.vocabulary-highlight').forEach(highlight => {
            highlight.addEventListener('mouseover', (event) => {
                const word = event.target.dataset.word;
                const translation = event.target.dataset.translation;
                
                // Create or update tooltip
                let tooltip = document.getElementById('vocab-tooltip');
                if (!tooltip) {
                    tooltip = document.createElement('div');
                    tooltip.id = 'vocab-tooltip';
                    document.body.appendChild(tooltip);
                }
                
                tooltip.textContent = translation;
                tooltip.style.display = 'block';
                
                // Position tooltip near word
                const rect = event.target.getBoundingClientRect();
                tooltip.style.left = `${rect.left + window.scrollX}px`;
                tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
            });
            
            highlight.addEventListener('mouseout', () => {
                const tooltip = document.getElementById('vocab-tooltip');
                if (tooltip) {
                    tooltip.style.display = 'none';
                }
            });
        });
    }
    
    /**
     * Show the map dialog with available locations
     * @param {Object} currentLocation - The current location object
     * @param {Array} visitedLocations - Array of visited location IDs
     * @param {Array} availableLocations - Array of available location objects
     */
    showMapDialog(currentLocation, visitedLocations, availableLocations) {
        const mapContainer = this.dialogs.map.querySelector('.map-container');
        mapContainer.innerHTML = '';
        
        // Load the map image
        const mapImage = document.createElement('img');
        mapImage.src = 'images/map.jpg';
        mapImage.alt = 'World Map';
        mapImage.className = 'world-map';
        
        mapContainer.appendChild(mapImage);
        
        // Add location markers
        if (availableLocations && availableLocations.length > 0) {
            availableLocations.forEach(location => {
                const marker = document.createElement('div');
                marker.className = 'location-marker';
                marker.dataset.locationId = location.id;
                
                // Set class based on status
                if (currentLocation && currentLocation.id === location.id) {
                    marker.classList.add('current');
                } else if (visitedLocations && visitedLocations.includes(location.id)) {
                    marker.classList.add('visited');
                }
                
                // Set marker position based on coordinates
                marker.style.left = `${location.mapX}%`;
                marker.style.top = `${location.mapY}%`;
                
                // Add tooltip with location name
                marker.innerHTML = `
                    <div class="marker-icon">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="marker-tooltip">${location.name}</div>
                `;
                
                mapContainer.appendChild(marker);
            });
        }
        
        // Show the dialog
        this.dialogs.map.classList.remove('hidden');
    }
    
    /**
     * Close the map dialog
     */
    closeMapDialog() {
        this.dialogs.map.classList.add('hidden');
    }
    
    /**
     * Update the game timer display
     * @param {number} seconds - Elapsed time in seconds
     */
    updateTimer(seconds) {
        if (!this.gameplayUI.timer) return;
        
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        this.gameplayUI.timer.textContent = 
            `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    /**
     * Update the player score display
     * @param {number} score - Current player score
     */
    updateScore(score) {
        if (this.gameplayUI.score) {
            this.gameplayUI.score.textContent = score;
        }
    }
    
    /**
     * Update the player rank display
     * @param {string} rank - Current player rank
     */
    updateRank(rank) {
        if (this.gameplayUI.rank) {
            this.gameplayUI.rank.textContent = rank;
        }
    }
    
    /**
     * Show the case complete screen with results
     * @param {Object} results - Case completion results
     */
    showCaseComplete(results) {
        if (!results) return;
        
        // Update UI elements with results
        this.caseCompleteUI.caseName.textContent = results.caseName;
        this.caseCompleteUI.timeSpent.textContent = results.timeSpent;
        this.caseCompleteUI.scoreEarned.textContent = results.scoreEarned;
        this.caseCompleteUI.cluesFound.textContent = `${results.cluesFound} / ${results.totalClues}`;
        this.caseCompleteUI.vocabularyLearned.textContent = `${results.vocabularyLearned} words`;
        this.caseCompleteUI.rankAchieved.textContent = results.rankAchieved;
        
        // Show achievements if any
        const achievementsContainer = document.getElementById('achievements-container');
        if (achievementsContainer) {
            achievementsContainer.innerHTML = '';
            
            if (results.achievements && results.achievements.length > 0) {
                results.achievements.forEach(achievement => {
                    const achievementElement = document.createElement('div');
                    achievementElement.className = 'achievement';
                    
                    achievementElement.innerHTML = `
                        <div class="achievement-icon">
                            <i class="fas ${achievement.icon}"></i>
                        </div>
                        <div class="achievement-info">
                            <h4>${achievement.title}</h4>
                            <p>${achievement.description}</p>
                        </div>
                    `;
                    
                    achievementsContainer.appendChild(achievementElement);
                });
            } else {
                achievementsContainer.innerHTML = '<p>No special achievements this time.</p>';
            }
        }
        
        // Show the screen
        this.showScreen('caseComplete');
    }
    
    /**
     * Toggle the clues panel visibility
     */
    toggleCluesPanel() {
        this.togglePanel('clues');
    }
    
    /**
     * Toggle the vocabulary panel visibility
     */
    toggleVocabularyPanel() {
        this.togglePanel('vocabulary');
    }
    
    /**
     * Toggle the menu panel visibility
     */
    toggleMenuPanel() {
        this.togglePanel('menu');
    }
    
    /**
     * Toggle the help panel visibility
     */
    toggleHelpPanel() {
        this.togglePanel('help');
    }
    
    /**
     * Toggle a panel's visibility
     * @param {string} panelName - The name of the panel to toggle
     */
    togglePanel(panelName) {
        const panel = this.panels[panelName];
        
        if (!panel) return;
        
        if (panel.classList.contains('hidden')) {
            // Hide any other open panels
            Object.values(this.panels).forEach(p => {
                if (p && p !== panel) {
                    p.classList.add('hidden');
                }
            });
            
            // Show this panel
            panel.classList.remove('hidden');
            this.activePanels.push(panelName);
        } else {
            // Hide this panel
            panel.classList.add('hidden');
            this.activePanels = this.activePanels.filter(p => p !== panelName);
        }
    }
    
    /**
     * Toggle translation display in dialogs
     * @param {boolean} show - Whether to show translations
     */
    toggleTranslations(show) {
        this.showTranslations = show;
        
        // Update any visible dialog
        const dialogElement = this.gameplayUI.characterDialog;
        if (!dialogElement.classList.contains('hidden')) {
            const translationElement = dialogElement.querySelector('.dialog-translation');
            if (translationElement) {
                translationElement.style.display = show ? 'block' : 'none';
            }
        }
    }
    
    /**
     * Reset all panels and dialogs to hidden state
     */
    resetPanelsAndDialogs() {
        // Hide all panels
        Object.values(this.panels).forEach(panel => {
            if (panel) panel.classList.add('hidden');
        });
        
        // Hide all dialogs
        Object.values(this.dialogs).forEach(dialog => {
            if (dialog) dialog.classList.add('hidden');
        });
        
        // Hide character dialog
        this.hideCharacterDialog();
        
        // Reset active panels list
        this.activePanels = [];
    }
    
    /**
     * Adjust layout based on window size
     */
    adjustLayout() {
        // Implement responsive adjustments here if needed
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            document.body.classList.add('mobile-layout');
        } else {
            document.body.classList.remove('mobile-layout');
        }
    }
}
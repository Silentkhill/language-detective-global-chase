/**
 * Player Controller for Language Detective: Global Chase
 * Manages player data, progress, and interactions with the game
 */
class PlayerController {
    constructor(gameDataController) {
        // Reference to the game data controller
        this.gameData = gameDataController;
        
        // Default player data
        this.defaultPlayerData = {
            id: null,
            name: '',
            avatar: 'default-avatar.png',
            gradeLevel: 6,
            score: 0,
            rank: 'Rookie Detective',
            learnedVocabulary: [],
            vocabularyProficiency: {}, // Word ID -> proficiency level (0-1)
            currentCase: null,
            completedCases: [],
            currentLocation: null,
            visitedLocations: [],
            collectedClues: [],
            interviewedCharacters: [],
            successfulConversations: 0,
            perfectPronunciations: 0,
            pronunciationHistory: [],
            achievements: [],
            preferences: {
                speechRecognitionEnabled: true,
                subtitlesEnabled: true,
                difficulty: 'Beginner',
                textSize: 'medium',
                audioVolume: 0.8
            },
            timeSpent: 0, // in seconds
            lastSaveTime: null
        };
        
        // Current player data
        this.playerData = {...this.defaultPlayerData};
        
        // Local storage key
        this.storageKey = 'languageDetectivePlayerData';
        
        // Load data from local storage if available
        this.loadPlayerData();
        
        // Set up auto-save
        setInterval(() => this.savePlayerData(), 60000); // Auto-save every minute
    }
    
    /**
     * Initialize a new player
     * @param {string} name - Player name
     * @param {number} gradeLevel - Student's grade level
     * @returns {Object} New player data
     */
    createNewPlayer(name, gradeLevel) {
        // Generate a unique ID
        const playerId = 'player_' + Date.now();
        
        // Create new player data
        this.playerData = {
            ...this.defaultPlayerData,
            id: playerId,
            name: name,
            gradeLevel: gradeLevel,
            lastSaveTime: new Date().toISOString()
        };
        
        // Save the new player data
        this.savePlayerData();
        
        return this.playerData;
    }
    
    /**
     * Save player data to local storage
     */
    savePlayerData() {
        // Update last save time
        this.playerData.lastSaveTime = new Date().toISOString();
        
        // Save to local storage
        localStorage.setItem(this.storageKey, JSON.stringify(this.playerData));
        
        // In a real implementation, this would also save to a server
        console.log('Player data saved:', this.playerData.lastSaveTime);
        
        // Check for new achievements
        this.checkAchievements();
        
        return true;
    }
    
    /**
     * Load player data from local storage
     * @returns {Object|null} Player data or null if none exists
     */
    loadPlayerData() {
        const savedData = localStorage.getItem(this.storageKey);
        
        if (savedData) {
            try {
                this.playerData = JSON.parse(savedData);
                console.log('Player data loaded:', this.playerData.name);
                return this.playerData;
            } catch (error) {
                console.error('Error loading player data:', error);
                return null;
            }
        }
        
        return null;
    }
    
    /**
     * Reset player data to default values
     */
    resetPlayerData() {
        this.playerData = {...this.defaultPlayerData};
        localStorage.removeItem(this.storageKey);
        return true;
    }
    
    /**
     * Get current player data
     * @returns {Object} Player data
     */
    getPlayerData() {
        return this.playerData;
    }
    
    /**
     * Update player preferences
     * @param {Object} preferences - New preference settings
     */
    updatePreferences(preferences) {
        this.playerData.preferences = {
            ...this.playerData.preferences,
            ...preferences
        };
        
        this.savePlayerData();
        return this.playerData.preferences;
    }
    
    /**
     * Start a new case
     * @param {string} caseId - ID of the case to start
     */
    startCase(caseId) {
        // Get the case data
        const caseData = this.gameData.getCaseById(caseId);
        
        if (!caseData) {
            console.error('Case not found:', caseId);
            return false;
        }
        
        // Set current case
        this.playerData.currentCase = caseId;
        
        // Reset current location and visited locations for this case
        this.playerData.currentLocation = null;
        this.playerData.visitedLocations = [];
        this.playerData.collectedClues = [];
        this.playerData.interviewedCharacters = [];
        
        // Save changes
        this.savePlayerData();
        
        return true;
    }
    
    /**
     * Complete the current case
     * @param {number} caseScore - Score earned for the case
     */
    completeCurrentCase(caseScore = 100) {
        if (!this.playerData.currentCase) {
            console.error('No active case to complete');
            return false;
        }
        
        // Add to completed cases if not already completed
        if (!this.playerData.completedCases.includes(this.playerData.currentCase)) {
            this.playerData.completedCases.push(this.playerData.currentCase);
        }
        
        // Add score
        this.playerData.score += caseScore;
        
        // Update rank
        this.updateRank();
        
        // Reset current case
        this.playerData.currentCase = null;
        
        // Save changes
        this.savePlayerData();
        
        return true;
    }
    
    /**
     * Update the player's detective rank based on their score
     */
    updateRank() {
        const newRank = this.gameData.getDetectiveRankForScore(this.playerData.score);
        this.playerData.rank = newRank.rank;
        return newRank;
    }
    
    /**
     * Visit a location in the current case
     * @param {string} locationId - ID of the location to visit
     */
    visitLocation(locationId) {
        if (!this.playerData.currentCase) {
            console.error('No active case');
            return false;
        }
        
        // Check if the location exists for this case
        const location = this.gameData.getLocationById(
            this.playerData.currentCase,
            locationId
        );
        
        if (!location) {
            console.error('Location not found:', locationId);
            return false;
        }
        
        // Set current location
        this.playerData.currentLocation = locationId;
        
        // Add to visited locations if not already visited
        if (!this.playerData.visitedLocations.includes(locationId)) {
            this.playerData.visitedLocations.push(locationId);
        }
        
        // Save changes
        this.savePlayerData();
        
        return true;
    }
    
    /**
     * Collect a clue from the current location
     * @param {string} clueId - ID of the clue to collect
     */
    collectClue(clueId) {
        if (!this.playerData.currentCase || !this.playerData.currentLocation) {
            console.error('No active case or location');
            return false;
        }
        
        // Get clues for the current location
        const clues = this.gameData.getCluesForLocation(
            this.playerData.currentLocation,
            this.playerData.currentCase
        );
        
        // Check if the clue exists
        const clueExists = clues.some(clue => clue.id === clueId);
        
        if (!clueExists) {
            console.error('Clue not found at current location:', clueId);
            return false;
        }
        
        // Create a record of the collected clue
        const clueRecord = {
            id: clueId,
            caseId: this.playerData.currentCase,
            locationId: this.playerData.currentLocation,
            timestamp: new Date().toISOString()
        };
        
        // Add to collected clues if not already collected
        const alreadyCollected = this.playerData.collectedClues.some(
            clue => clue.id === clueId && clue.caseId === this.playerData.currentCase
        );
        
        if (!alreadyCollected) {
            this.playerData.collectedClues.push(clueRecord);
            
            // Award points for finding a new clue
            this.playerData.score += 10;
            this.updateRank();
        }
        
        // Save changes
        this.savePlayerData();
        
        return true;
    }
    
    /**
     * Record a conversation with a character
     * @param {string} characterId - ID of the character
     * @param {number} pronunciationScore - Score for pronunciation (0-1)
     * @param {boolean} successful - Whether the conversation was successful
     */
    recordConversation(characterId, pronunciationScore, successful) {
        if (!this.playerData.currentCase || !this.playerData.currentLocation) {
            console.error('No active case or location');
            return false;
        }
        
        // Check if the character exists at the current location
        const location = this.gameData.getLocationById(
            this.playerData.currentCase,
            this.playerData.currentLocation
        );
        
        if (!location || !location.characters.some(char => char.id === characterId)) {
            console.error('Character not found at current location:', characterId);
            return false;
        }
        
        // Create a record of the conversation
        const conversationRecord = {
            characterId: characterId,
            caseId: this.playerData.currentCase,
            locationId: this.playerData.currentLocation,
            pronunciationScore: pronunciationScore,
            successful: successful,
            timestamp: new Date().toISOString()
        };
        
        // Add to interviewed characters if not already interviewed
        const alreadyInterviewed = this.playerData.interviewedCharacters.some(
            record => record.characterId === characterId && 
                     record.caseId === this.playerData.currentCase
        );
        
        if (!alreadyInterviewed) {
            this.playerData.interviewedCharacters.push(conversationRecord);
            
            // Award points for first interview with this character
            this.playerData.score += 15;
            this.updateRank();
        }
        
        // Update pronunciation history
        this.playerData.pronunciationHistory.push(pronunciationScore);
        
        // Update successful conversations count
        if (successful) {
            this.playerData.successfulConversations++;
            
            // Award points for successful conversation
            this.playerData.score += 5;
        }
        
        // Check for perfect pronunciation
        if (pronunciationScore >= 0.95) {
            this.playerData.perfectPronunciations++;
        }
        
        // Save changes
        this.savePlayerData();
        
        return true;
    }
    
    /**
     * Learn a new vocabulary word
     * @param {string} word - The word in French
     * @param {number} proficiency - Initial proficiency level (0-1)
     */
    learnVocabularyWord(word, proficiency = 0.5) {
        // Check if word is already learned
        if (!this.playerData.learnedVocabulary.includes(word)) {
            // Add to learned vocabulary
            this.playerData.learnedVocabulary.push(word);
            
            // Award points for learning a new word
            this.playerData.score += 2;
            this.updateRank();
        }
        
        // Set proficiency level
        this.playerData.vocabularyProficiency[word] = proficiency;
        
        // Save changes
        this.savePlayerData();
        
        return true;
    }
    
    /**
     * Update proficiency level for a vocabulary word
     * @param {string} word - The word in French
     * @param {number} proficiency - New proficiency level (0-1)
     */
    updateVocabularyProficiency(word, proficiency) {
        // Check if word is not learned yet
        if (!this.playerData.learnedVocabulary.includes(word)) {
            // Learn the word first
            this.learnVocabularyWord(word, proficiency);
            return true;
        }
        
        // Update proficiency level
        this.playerData.vocabularyProficiency[word] = proficiency;
        
        // Save changes
        this.savePlayerData();
        
        return true;
    }
    
    /**
     * Get vocabulary proficiency for a word
     * @param {string} word - The word in French
     * @returns {number} Proficiency level (0-1) or 0 if not learned
     */
    getVocabularyProficiency(word) {
        return this.playerData.vocabularyProficiency[word] || 0;
    }
    
    /**
     * Update player's avatar
     * @param {string} avatarUrl - URL or identifier for the avatar
     */
    updateAvatar(avatarUrl) {
        this.playerData.avatar = avatarUrl;
        this.savePlayerData();
        return true;
    }
    
    /**
     * Update player's grade level
     * @param {number} gradeLevel - New grade level
     */
    updateGradeLevel(gradeLevel) {
        this.playerData.gradeLevel = gradeLevel;
        this.savePlayerData();
        return true;
    }
    
    /**
     * Track time spent in the game
     * @param {number} seconds - Number of seconds to add
     */
    trackTimeSpent(seconds) {
        this.playerData.timeSpent += seconds;
        this.savePlayerData();
        return this.playerData.timeSpent;
    }
    
    /**
     * Check for newly earned achievements
     * @returns {Array} Newly earned achievements
     */
    checkAchievements() {
        // Get previously earned achievements
        const earnedAchievementIds = this.playerData.achievements;
        
        // Check for newly earned achievements
        const newAchievements = this.gameData.getNewlyEarnedAchievements(
            this.playerData,
            earnedAchievementIds
        );
        
        // Add new achievements to player data
        newAchievements.forEach(achievement => {
            if (!earnedAchievementIds.includes(achievement.id)) {
                this.playerData.achievements.push(achievement.id);
                
                // Award points for earning an achievement
                this.playerData.score += 25;
                this.updateRank();
            }
        });
        
        // Save if there are new achievements
        if (newAchievements.length > 0) {
            this.savePlayerData();
        }
        
        return newAchievements;
    }
    
    /**
     * Get all earned achievements with details
     * @returns {Array} Achievement objects
     */
    getEarnedAchievements() {
        return this.gameData.getAllAchievements().filter(
            achievement => this.playerData.achievements.includes(achievement.id)
        );
    }
    
    /**
     * Get the player's current performance metrics
     * @returns {Object} Performance metrics
     */
    getPerformanceMetrics() {
        return this.gameData.calculatePerformanceMetrics(this.playerData);
    }
    
    /**
     * Generate a progress report for the player
     * @returns {Object} Progress report object
     */
    generateProgressReport() {
        const metrics = this.getPerformanceMetrics();
        const achievements = this.getEarnedAchievements();
        
        // Calculate cases in progress
        let caseInProgress = null;
        if (this.playerData.currentCase) {
            caseInProgress = this.gameData.getCaseById(this.playerData.currentCase);
        }
        
        // Calculate vocabulary statistics
        const vocabularyStats = {
            learned: this.playerData.learnedVocabulary.length,
            mastered: Object.values(this.playerData.vocabularyProficiency).filter(p => p >= 0.9).length,
            inProgress: Object.values(this.playerData.vocabularyProficiency).filter(p => p >= 0.5 && p < 0.9).length,
            needsPractice: Object.values(this.playerData.vocabularyProficiency).filter(p => p < 0.5).length
        };
        
        return {
            playerName: this.playerData.name,
            gradeLevel: this.playerData.gradeLevel,
            rank: this.playerData.rank,
            score: this.playerData.score,
            metrics: metrics,
            achievements: achievements,
            completedCases: this.playerData.completedCases.length,
            caseInProgress: caseInProgress ? caseInProgress.title : null,
            vocabularyStats: vocabularyStats,
            timeSpent: this.formatTimeSpent(this.playerData.timeSpent),
            lastPlayed: this.playerData.lastSaveTime
        };
    }
    
    /**
     * Format seconds into a readable time string
     * @param {number} seconds - Time in seconds
     * @returns {string} Formatted time string
     */
    formatTimeSpent(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        
        return `${hours}h ${minutes}m ${remainingSeconds}s`;
    }
    
    /**
     * Check if player is eligible for a specific case
     * @param {string} caseId - The case ID to check
     * @returns {boolean} True if eligible, false otherwise
     */
    isEligibleForCase(caseId) {
        const gameCase = this.gameData.getCaseById(caseId);
        
        if (!gameCase) return false;
        
        // Check grade level
        if (gameCase.gradeLevel > this.playerData.gradeLevel) {
            return false;
        }
        
        // Check if prerequisites are met
        if (gameCase.prerequisites) {
            for (const prerequisite of gameCase.prerequisites) {
                if (!this.playerData.completedCases.includes(prerequisite)) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    /**
     * Get the next recommended case for the player
     * @returns {Object|null} Recommended case object or null if none available
     */
    getNextRecommendedCase() {
        // Get all cases for the player's grade level
        const availableCases = this.gameData.getCasesByGradeLevel(this.playerData.gradeLevel);
        
        // Filter out completed cases
        const uncompletedCases = availableCases.filter(
            gameCase => !this.playerData.completedCases.includes(gameCase.id)
        );
        
        // Sort by difficulty level
        const sortedCases = uncompletedCases.sort((a, b) => {
            const difficultyOrder = {
                'Beginner': 1,
                'Intermediate': 2,
                'Advanced': 3
            };
            
            return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        });
        
        // Return the first eligible case
        for (const gameCase of sortedCases) {
            if (this.isEligibleForCase(gameCase.id)) {
                return gameCase;
            }
        }
        
        return null;
    }
    
    /**
     * Export player data for teacher dashboard
     * @returns {Object} Player data for teacher dashboard
     */
    exportForTeacherDashboard() {
        return this.gameData.generateTeacherReport(this.playerData);
    }
}
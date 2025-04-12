/**
 * Game Data Controller for Language Detective: Global Chase
 * Manages all educational content, cases, and game progression data
 */
class GameDataController {
    constructor() {
        // Default grade levels supported
        this.gradeLevels = [6, 7, 8, 9, 10];
        
        // Default difficulty levels
        this.difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];
        
        // Sample cases - would be loaded from server in production
        this.cases = [
            {
                id: 'case-paris-1',
                title: 'The Missing Masterpiece',
                description: 'A valuable painting has disappeared from the Louvre. Track down the thief across Paris!',
                difficulty: 'Beginner',
                gradeLevel: 6,
                mainLocation: 'Paris, France',
                image: 'paris-case.jpg',
                requiredVocabulary: 20,
                learningObjectives: [
                    'Basic greetings and introductions',
                    'Asking simple questions',
                    'Directions and locations',
                    'Numbers and time expressions'
                ],
                grammaticalFocus: [
                    'Present tense of regular -er verbs',
                    'Basic question formation',
                    'Definite and indefinite articles'
                ],
                culturalFocus: 'French art and museum etiquette'
            },
            {
                id: 'case-nice-1',
                title: 'Carnival Mystery',
                description: 'Someone is sabotaging the preparations for the Nice Carnival. Solve the case before time runs out!',
                difficulty: 'Beginner',
                gradeLevel: 6,
                mainLocation: 'Nice, France',
                image: 'nice-case.jpg',
                requiredVocabulary: 25,
                learningObjectives: [
                    'Describing people and objects',
                    'Expressing likes and dislikes',
                    'Ordering food and drinks',
                    'Talking about events'
                ],
                grammaticalFocus: [
                    'Adjective agreement and placement',
                    'Present tense of irregular verbs',
                    'Possessive adjectives'
                ],
                culturalFocus: 'French festivals and celebrations'
            },
            {
                id: 'case-lyon-1',
                title: 'Recipe for Disaster',
                description: 'A famous chef\'s secret recipe has been stolen in Lyon. Follow the culinary clues to catch the culprit!',
                difficulty: 'Intermediate',
                gradeLevel: 7,
                mainLocation: 'Lyon, France',
                image: 'lyon-case.jpg',
                requiredVocabulary: 30,
                learningObjectives: [
                    'Food vocabulary and cooking terms',
                    'Giving instructions',
                    'Describing processes',
                    'Cultural practices around dining'
                ],
                grammaticalFocus: [
                    'Imperative mood',
                    'Partitive articles',
                    'Near future (futur proche)'
                ],
                culturalFocus: 'French cuisine and dining customs'
            },
            {
                id: 'case-marseille-1',
                title: 'Harbor Heist',
                description: 'Valuable cargo has disappeared from Marseille\'s port. Navigate the busy harbor to find what was stolen!',
                difficulty: 'Intermediate',
                gradeLevel: 8,
                mainLocation: 'Marseille, France',
                image: 'marseille-case.jpg',
                requiredVocabulary: 35,
                learningObjectives: [
                    'Maritime and travel vocabulary',
                    'Making comparisons',
                    'Expressing opinions',
                    'Negotiating and bargaining'
                ],
                grammaticalFocus: [
                    'Comparative and superlative forms',
                    'Passé composé with avoir',
                    'Direct and indirect object pronouns'
                ],
                culturalFocus: 'Mediterranean trade and port cities'
            },
            {
                id: 'case-mont-blanc-1',
                title: 'Alpine Adventure',
                description: 'A mountaineer has gone missing in the Mont Blanc region. Race against time and weather to find them!',
                difficulty: 'Advanced',
                gradeLevel: 9,
                mainLocation: 'Chamonix, France',
                image: 'mont-blanc-case.jpg',
                requiredVocabulary: 40,
                learningObjectives: [
                    'Nature and environment vocabulary',
                    'Weather expressions',
                    'Emergency situations',
                    'Giving detailed descriptions'
                ],
                grammaticalFocus: [
                    'Subjunctive mood for uncertainty',
                    'Passé composé with être',
                    'Conditional mood for hypotheticals'
                ],
                culturalFocus: 'French Alpine traditions and environmental awareness'
            },
            {
                id: 'case-bordeaux-1',
                title: 'Vintage Vanishing',
                description: 'A rare collection of wines has disappeared from a famous Bordeaux château. Follow the trail through vineyards!',
                difficulty: 'Advanced',
                gradeLevel: 10,
                mainLocation: 'Bordeaux, France',
                image: 'bordeaux-case.jpg',
                requiredVocabulary: 45,
                learningObjectives: [
                    'Wine and agriculture vocabulary',
                    'Business transactions',
                    'Formal expressions',
                    'History and traditions'
                ],
                grammaticalFocus: [
                    'Past tenses (imparfait vs passé composé)',
                    'Future simple',
                    'Passive voice constructions'
                ],
                culturalFocus: 'French wine culture and regional identities'
            }
        ];
        
        // Sample vocabulary lists by category - would be loaded from server
        this.vocabularyDatabase = {
            greetings: [
                { french: 'bonjour', english: 'hello/good day', example: 'Bonjour! Comment allez-vous?', category: 'Greetings' },
                { french: 'salut', english: 'hi', example: 'Salut! Ça va?', category: 'Greetings' },
                { french: 'au revoir', english: 'goodbye', example: 'Au revoir! À bientôt!', category: 'Greetings' },
                { french: 'bonsoir', english: 'good evening', example: 'Bonsoir! Comment s\'est passée votre journée?', category: 'Greetings' },
                { french: 'enchanté', english: 'pleased to meet you', example: 'Je m\'appelle Pierre, enchanté.', category: 'Greetings' }
            ],
            questions: [
                { french: 'comment', english: 'how', example: 'Comment vas-tu?', category: 'Questions' },
                { french: 'où', english: 'where', example: 'Où est la gare?', category: 'Questions' },
                { french: 'quand', english: 'when', example: 'Quand arrive le train?', category: 'Questions' },
                { french: 'pourquoi', english: 'why', example: 'Pourquoi es-tu en retard?', category: 'Questions' },
                { french: 'qui', english: 'who', example: 'Qui a pris mon livre?', category: 'Questions' },
                { french: 'quel', english: 'which/what', example: 'Quel est ton plat préféré?', category: 'Questions' }
            ],
            directions: [
                { french: 'à gauche', english: 'to the left', example: 'Tournez à gauche au feu.', category: 'Directions' },
                { french: 'à droite', english: 'to the right', example: 'La boulangerie est à droite.', category: 'Directions' },
                { french: 'tout droit', english: 'straight ahead', example: 'Continuez tout droit jusqu\'au rond-point.', category: 'Directions' },
                { french: 'près de', english: 'near', example: 'L\'hôtel est près de la rivière.', category: 'Directions' },
                { french: 'loin de', english: 'far from', example: 'La gare est loin d\'ici?', category: 'Directions' }
            ],
            food: [
                { french: 'le pain', english: 'bread', example: 'J\'achète du pain à la boulangerie.', category: 'Food' },
                { french: 'le fromage', english: 'cheese', example: 'La France est connue pour ses fromages.', category: 'Food' },
                { french: 'le vin', english: 'wine', example: 'Nous avons bu un verre de vin.', category: 'Food' },
                { french: 'le repas', english: 'meal', example: 'Le repas était délicieux.', category: 'Food' },
                { french: 'la viande', english: 'meat', example: 'Je ne mange pas beaucoup de viande.', category: 'Food' },
                { french: 'les légumes', english: 'vegetables', example: 'Il faut manger des légumes tous les jours.', category: 'Food' }
            ],
            travel: [
                { french: 'le train', english: 'train', example: 'Le train pour Paris part à midi.', category: 'Travel' },
                { french: 'l\'avion', english: 'airplane', example: 'Nous prenons l\'avion demain matin.', category: 'Travel' },
                { french: 'la gare', english: 'train station', example: 'Rendez-vous à la gare à 9h.', category: 'Travel' },
                { french: 'l\'hôtel', english: 'hotel', example: 'Nous restons dans un petit hôtel.', category: 'Travel' },
                { french: 'le passeport', english: 'passport', example: 'N\'oubliez pas votre passeport!', category: 'Travel' }
            ],
            time: [
                { french: 'maintenant', english: 'now', example: 'Nous devons partir maintenant.', category: 'Time' },
                { french: 'aujourd\'hui', english: 'today', example: 'Aujourd\'hui, il fait beau.', category: 'Time' },
                { french: 'demain', english: 'tomorrow', example: 'À demain!', category: 'Time' },
                { french: 'hier', english: 'yesterday', example: 'Hier, j\'ai visité le musée.', category: 'Time' },
                { french: 'après', english: 'after', example: 'Nous mangerons après le film.', category: 'Time' }
            ],
            nature: [
                { french: 'la montagne', english: 'mountain', example: 'J\'aime faire de la randonnée en montagne.', category: 'Nature' },
                { french: 'la mer', english: 'sea', example: 'Nous allons à la mer cet été.', category: 'Nature' },
                { french: 'la forêt', english: 'forest', example: 'La forêt est magnifique en automne.', category: 'Nature' },
                { french: 'le fleuve', english: 'river', example: 'La Seine est un fleuve qui traverse Paris.', category: 'Nature' },
                { french: 'le ciel', english: 'sky', example: 'Le ciel est bleu aujourd\'hui.', category: 'Nature' }
            ],
            weather: [
                { french: 'il pleut', english: 'it\'s raining', example: 'Prenez un parapluie, il pleut.', category: 'Weather' },
                { french: 'il fait beau', english: 'it\'s nice weather', example: 'Allons au parc, il fait beau!', category: 'Weather' },
                { french: 'il fait chaud', english: 'it\'s hot', example: 'En été, il fait chaud dans le sud.', category: 'Weather' },
                { french: 'il fait froid', english: 'it\'s cold', example: 'Mettez un manteau, il fait froid dehors.', category: 'Weather' },
                { french: 'il neige', english: 'it\'s snowing', example: 'En hiver, il neige souvent en montagne.', category: 'Weather' }
            ]
        };
        
        // Sample locations for cases - would be loaded dynamically for each case
        this.locations = {
            'case-paris-1': [
                {
                    id: 'louvre-museum',
                    name: 'Musée du Louvre',
                    description: 'The world\'s largest art museum and a historic monument in Paris.',
                    background: 'louvre.jpg',
                    mapX: 48.5,
                    mapY: 32.2,
                    characters: [
                        {
                            id: 'museum-guard',
                            name: 'Pierre',
                            role: 'Security Guard',
                            image: 'guard.jpg',
                            dialogs: [
                                {
                                    text: "Bonjour! Je suis Pierre, un gardien du musée. Le tableau a disparu hier soir.",
                                    translation: "Hello! I'm Pierre, a museum guard. The painting disappeared last night.",
                                    vocabularyWords: ['bonjour', 'hier'],
                                    responseOptions: [
                                        {
                                            text: "Bonjour. Avez-vous vu quelque chose d'étrange?",
                                            translation: "Hello. Did you see anything strange?",
                                            correctness: 0.9,
                                            feedback: "Excellent question! Your pronunciation was very good.",
                                            response: {
                                                text: "Oui, j'ai vu une femme avec un grand sac près du tableau vers 18h.",
                                                translation: "Yes, I saw a woman with a large bag near the painting around 6pm."
                                            }
                                        },
                                        {
                                            text: "Où est le tableau maintenant?",
                                            translation: "Where is the painting now?",
                                            correctness: 0.7,
                                            feedback: "Good question, but your pronunciation of 'tableau' needs practice.",
                                            response: {
                                                text: "Je ne sais pas. C'est pourquoi nous avons besoin de votre aide!",
                                                translation: "I don't know. That's why we need your help!"
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'museum-curator',
                            name: 'Madame Dubois',
                            role: 'Curator',
                            image: 'curator.jpg',
                            dialogs: [
                                {
                                    text: "Bonjour, je suis Madame Dubois, la conservatrice. Cette situation est terrible!",
                                    translation: "Hello, I am Mrs. Dubois, the curator. This situation is terrible!",
                                    vocabularyWords: ['bonjour'],
                                    responseOptions: [
                                        {
                                            text: "Pouvez-vous décrire le tableau, s'il vous plaît?",
                                            translation: "Can you describe the painting, please?",
                                            correctness: 0.8,
                                            feedback: "Very good! Your 's'il vous plaît' was perfectly pronounced.",
                                            response: {
                                                text: "C'est un petit tableau de Monet. Il montre un jardin avec des fleurs bleues et rouges.",
                                                translation: "It's a small Monet painting. It shows a garden with blue and red flowers."
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    clues: [
                        {
                            id: 'security-footage',
                            title: 'Security Footage',
                            description: 'A video showing a woman with a large bag leaving the museum at 6:30pm.',
                            type: 'video',
                            image: 'security-footage.jpg',
                            vocabularyWords: ['hier', 'femme']
                        },
                        {
                            id: 'museum-map',
                            title: 'Museum Map',
                            description: 'A map of the Louvre with a circle around the Impressionist gallery.',
                            type: 'document',
                            image: 'museum-map.jpg',
                            vocabularyWords: ['musée']
                        }
                    ]
                },
                {
                    id: 'cafe-seine',
                    name: 'Café by the Seine',
                    description: 'A charming café with a view of the Seine river. Popular with tourists and locals.',
                    background: 'cafe-seine.jpg',
                    mapX: 49.2,
                    mapY: 33.1,
                    characters: [
                        {
                            id: 'waiter',
                            name: 'Jean',
                            role: 'Waiter',
                            image: 'waiter.jpg',
                            dialogs: [
                                {
                                    text: "Bonjour! Bienvenue au Café de la Seine. Que désirez-vous?",
                                    translation: "Hello! Welcome to Café de la Seine. What would you like?",
                                    vocabularyWords: ['bonjour', 'bienvenue'],
                                    responseOptions: [
                                        {
                                            text: "Bonjour. Un café, s'il vous plaît. Avez-vous vu cette femme?",
                                            translation: "Hello. A coffee, please. Have you seen this woman?",
                                            correctness: 0.85,
                                            feedback: "Well done! Clear pronunciation and good sentence structure.",
                                            response: {
                                                text: "Oui, elle était ici hier soir. Elle a parlé avec un homme en costume noir.",
                                                translation: "Yes, she was here last night. She spoke with a man in a black suit."
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    clues: [
                        {
                            id: 'receipt',
                            title: 'Café Receipt',
                            description: 'A receipt for two coffees and a croissant, paid at 7:15pm.',
                            type: 'document',
                            image: 'receipt.jpg',
                            vocabularyWords: ['café']
                        }
                    ]
                }
            ]
        };
        
        // Sample character database
        this.characters = [
            {
                id: 'museum-guard',
                name: 'Pierre',
                role: 'Security Guard',
                image: 'guard.jpg',
                location: 'Musée du Louvre'
            },
            {
                id: 'museum-curator',
                name: 'Madame Dubois',
                role: 'Curator',
                image: 'curator.jpg',
                location: 'Musée du Louvre'
            },
            {
                id: 'waiter',
                name: 'Jean',
                role: 'Waiter',
                image: 'waiter.jpg',
                location: 'Café by the Seine'
            }
            // More characters would be added here
        ];
        
        // Criteria for detective ranks
        this.detectiveRanks = [
            { rank: 'Rookie Detective', minScore: 0, badge: 'badge-rookie.png' },
            { rank: 'Junior Detective', minScore: 100, badge: 'badge-junior.png' },
            { rank: 'Detective', minScore: 250, badge: 'badge-detective.png' },
            { rank: 'Senior Detective', minScore: 500, badge: 'badge-senior.png' },
            { rank: 'Master Detective', minScore: 1000, badge: 'badge-master.png' },
            { rank: 'Detective Extraordinaire', minScore: 2000, badge: 'badge-extraordinaire.png' }
        ];
        
        // Achievements
        this.achievements = [
            {
                id: 'vocab-novice',
                title: 'Vocabulary Novice',
                description: 'Learn 10 new vocabulary words',
                icon: 'fa-book',
                condition: player => player.learnedVocabulary.length >= 10
            },
            {
                id: 'vocab-master',
                title: 'Vocabulary Master',
                description: 'Learn 50 new vocabulary words',
                icon: 'fa-book-open',
                condition: player => player.learnedVocabulary.length >= 50
            },
            {
                id: 'conversation-starter',
                title: 'Conversation Starter',
                description: 'Complete 5 successful conversations',
                icon: 'fa-comments',
                condition: player => player.successfulConversations >= 5
            },
            {
                id: 'perfect-pronunciation',
                title: 'Perfect Pronunciation',
                description: 'Get a perfect pronunciation score in a conversation',
                icon: 'fa-microphone',
                condition: player => player.perfectPronunciations >= 1
            },
            {
                id: 'case-solver',
                title: 'Case Solver',
                description: 'Solve your first case',
                icon: 'fa-search',
                condition: player => player.completedCases.length >= 1
            },
            {
                id: 'master-sleuth',
                title: 'Master Sleuth',
                description: 'Solve 3 cases',
                icon: 'fa-user-secret',
                condition: player => player.completedCases.length >= 3
            }
        ];
    }
    
    /**
     * Get all available cases
     * @returns {Array} Array of case objects
     */
    getAllCases() {
        return this.cases;
    }
    
    /**
     * Get cases filtered by grade level
     * @param {number} gradeLevel - Student's grade level
     * @returns {Array} Filtered array of case objects
     */
    getCasesByGradeLevel(gradeLevel) {
        return this.cases.filter(gameCase => {
            return gameCase.gradeLevel <= gradeLevel;
        });
    }
    
    /**
     * Get a specific case by ID
     * @param {string} caseId - The case ID to retrieve
     * @returns {Object|null} Case object or null if not found
     */
    getCaseById(caseId) {
        return this.cases.find(gameCase => gameCase.id === caseId) || null;
    }
    
    /**
     * Get locations for a specific case
     * @param {string} caseId - The case ID
     * @returns {Array} Array of location objects for the case
     */
    getLocationsForCase(caseId) {
        return this.locations[caseId] || [];
    }
    
    /**
     * Get a specific location by ID within a case
     * @param {string} caseId - The case ID
     * @param {string} locationId - The location ID
     * @returns {Object|null} Location object or null if not found
     */
    getLocationById(caseId, locationId) {
        const locations = this.getLocationsForCase(caseId);
        return locations.find(location => location.id === locationId) || null;
    }
    
    /**
     * Get vocabulary words by category
     * @param {string} category - Category name
     * @returns {Array} Array of vocabulary word objects
     */
    getVocabularyByCategory(category) {
        return this.vocabularyDatabase[category.toLowerCase()] || [];
    }
    
    /**
     * Get vocabulary words for a specific case
     * @param {string} caseId - The case ID
     * @returns {Array} Array of vocabulary word objects
     */
    getVocabularyForCase(caseId) {
        const gameCase = this.getCaseById(caseId);
        if (!gameCase) return [];
        
        let caseVocabulary = [];
        
        // For demonstration, we're selecting random vocabulary
        // In production, this would be curated for each case
        Object.keys(this.vocabularyDatabase).forEach(category => {
            const categoryWords = this.vocabularyDatabase[category];
            caseVocabulary = caseVocabulary.concat(categoryWords);
        });
        
        // Limit to the required number of words for the case
        caseVocabulary = caseVocabulary.slice(0, gameCase.requiredVocabulary);
        
        return caseVocabulary;
    }
    
    /**
     * Get a specific character by ID
     * @param {string} characterId - The character ID
     * @returns {Object|null} Character object or null if not found
     */
    getCharacterById(characterId) {
        return this.characters.find(character => character.id === characterId) || null;
    }
    
    /**
     * Get the detective rank for a given score
     * @param {number} score - Player's score
     * @returns {Object} Rank object with name and badge
     */
    getDetectiveRankForScore(score) {
        // Sort ranks in descending order of minScore
        const sortedRanks = [...this.detectiveRanks].sort((a, b) => b.minScore - a.minScore);
        
        // Find the highest rank that the player qualifies for
        for (const rank of sortedRanks) {
            if (score >= rank.minScore) {
                return rank;
            }
        }
        
        // Default to lowest rank if none found (shouldn't happen with proper setup)
        return this.detectiveRanks[0];
    }
    
    /**
     * Get all available achievements
     * @returns {Array} Array of achievement objects
     */
    getAllAchievements() {
        return this.achievements;
    }
    
    /**
     * Check which achievements a player has earned
     * @param {Object} playerData - Player's current data
     * @returns {Array} Array of earned achievement objects
     */
    getEarnedAchievements(playerData) {
        return this.achievements.filter(achievement => {
            return achievement.condition(playerData);
        });
    }
    
    /**
     * Get newly earned achievements since last check
     * @param {Object} playerData - Player's current data
     * @param {Array} previouslyEarned - Array of previously earned achievement IDs
     * @returns {Array} Array of newly earned achievement objects
     */
    getNewlyEarnedAchievements(playerData, previouslyEarned) {
        const earnedAchievements = this.getEarnedAchievements(playerData);
        return earnedAchievements.filter(achievement => {
            return !previouslyEarned.includes(achievement.id);
        });
    }
    
    /**
     * Get grammar rules for a specific case
     * @param {string} caseId - The case ID
     * @returns {Array} Array of grammar rule objects
     */
    getGrammarRulesForCase(caseId) {
        const gameCase = this.getCaseById(caseId);
        if (!gameCase) return [];
        
        // In a real implementation, this would return actual grammar rules
        // For now, return placeholders based on the case's grammatical focus
        return gameCase.grammaticalFocus.map(focus => {
            return {
                title: focus,
                explanation: `Example explanation for ${focus}`,
                examples: [`Example for ${focus}`],
                exercises: [`Practice exercise for ${focus}`]
            };
        });
    }
    
    /**
     * Get cultural notes for a specific case
     * @param {string} caseId - The case ID
     * @returns {Object} Cultural notes object
     */
    getCulturalNotesForCase(caseId) {
        const gameCase = this.getCaseById(caseId);
        if (!gameCase) return null;
        
        // In a real implementation, this would return actual cultural notes
        return {
            title: gameCase.culturalFocus,
            description: `Cultural information about ${gameCase.culturalFocus}`,
            funFacts: [
                `Fun fact 1 about ${gameCase.culturalFocus}`,
                `Fun fact 2 about ${gameCase.culturalFocus}`
            ],
            images: []
        };
    }
    
    /**
     * Get dialogue for a specific character at a location
     * @param {string} characterId - The character ID
     * @param {string} locationId - The location ID
     * @param {string} caseId - The case ID
     * @returns {Array} Array of dialogue objects
     */
    getCharacterDialogues(characterId, locationId, caseId) {
        const location = this.getLocationById(caseId, locationId);
        if (!location) return [];
        
        const character = location.characters.find(c => c.id === characterId);
        if (!character) return [];
        
        return character.dialogs || [];
    }
    
    /**
     * Get clues for a specific location
     * @param {string} locationId - The location ID
     * @param {string} caseId - The case ID
     * @returns {Array} Array of clue objects
     */
    getCluesForLocation(locationId, caseId) {
        const location = this.getLocationById(caseId, locationId);
        if (!location) return [];
        
        return location.clues || [];
    }
    
    /**
     * Get student performance metrics template
     * @returns {Object} Performance metrics template
     */
    getPerformanceMetricsTemplate() {
        return {
            vocabularyMastery: 0, // Percentage of vocabulary mastered
            pronunciationAccuracy: 0, // Average pronunciation score
            grammarCorrectness: 0, // Percentage of grammar usage correct
            conversationFluency: 0, // Subjective measure of conversational ability
            caseCompletionRate: 0, // Percentage of assigned cases completed
            overallScore: 0 // Combined score
        };
    }
    
    /**
     * Calculate performance metrics based on player data
     * @param {Object} playerData - Player's current data
     * @returns {Object} Calculated performance metrics
     */
    calculatePerformanceMetrics(playerData) {
        // This would be more sophisticated in production
        // Just a basic implementation for demonstration
        const metrics = this.getPerformanceMetricsTemplate();
        
        if (playerData) {
            // Calculate vocabulary mastery
            const totalVocabulary = this.getTotalVocabularyCount();
            metrics.vocabularyMastery = Math.min(100, 
                Math.round((playerData.learnedVocabulary.length / totalVocabulary) * 100));
            
            // Calculate pronunciation accuracy from history
            if (playerData.pronunciationHistory && playerData.pronunciationHistory.length > 0) {
                const total = playerData.pronunciationHistory.reduce((sum, score) => sum + score, 0);
                metrics.pronunciationAccuracy = Math.round((total / playerData.pronunciationHistory.length) * 100);
            }
            
            // Calculate case completion rate
            const availableCases = this.getCasesByGradeLevel(playerData.gradeLevel).length;
            metrics.caseCompletionRate = Math.min(100, 
                Math.round((playerData.completedCases.length / availableCases) * 100));
            
            // Overall score is a weighted average
            metrics.overallScore = Math.round(
                (metrics.vocabularyMastery * 0.3) +
                (metrics.pronunciationAccuracy * 0.3) +
                (metrics.caseCompletionRate * 0.4)
            );
        }
        
        return metrics;
    }
    
    /**
     * Get total count of vocabulary words in the database
     * @returns {number} Total vocabulary count
     */
    getTotalVocabularyCount() {
        let count = 0;
        Object.values(this.vocabularyDatabase).forEach(category => {
            count += category.length;
        });
        return count;
    }
    
    /**
     * Generate a teacher report for a student
     * @param {Object} playerData - Player's data
     * @returns {Object} Teacher report object
     */
    generateTeacherReport(playerData) {
        if (!playerData) return null;
        
        const metrics = this.calculatePerformanceMetrics(playerData);
        const earnedAchievements = this.getEarnedAchievements(playerData);
        const rank = this.getDetectiveRankForScore(playerData.score);
        
        return {
            studentName: playerData.name,
            gradeLevel: playerData.gradeLevel,
            metrics: metrics,
            achievements: earnedAchievements,
            completedCases: playerData.completedCases.map(caseId => {
                const gameCase = this.getCaseById(caseId);
                return gameCase ? gameCase.title : 'Unknown Case';
            }),
            recommendedFocus: this.generateRecommendedFocus(metrics),
            currentRank: rank.rank,
            timestamp: new Date().toISOString()
        };
    }
    
    /**
     * Generate recommended focus areas based on performance metrics
     * @param {Object} metrics - Performance metrics object
     * @returns {Array} Array of recommended focus areas
     */
    generateRecommendedFocus(metrics) {
        const recommendations = [];
        
        if (metrics.vocabularyMastery < 50) {
            recommendations.push('Vocabulary building');
        }
        if (metrics.pronunciationAccuracy < 60) {
            recommendations.push('Pronunciation practice');
        }
        if (metrics.grammarCorrectness < 70) {
            recommendations.push('Grammar review');
        }
        if (metrics.conversationFluency < 50) {
            recommendations.push('Conversation practice');
        }
        
        return recommendations;
    }
}
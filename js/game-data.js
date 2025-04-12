// Game data for Language Detective: Global Chase

// Case data
const gameCases = [
    {
        id: 'missing-mona-lisa',
        title: 'The Missing Mona Lisa',
        description: "A famous artwork has been stolen from the Louvre Museum in Paris. Witnesses saw someone suspicious leaving the scene. Your mission is to track down the thief and recover the stolen painting.",
        difficulty: 'beginner',
        grade: '5-6',
        image: 'assets/images/cases/mona-lisa.jpg',
        startLocation: 'paris',
        thief: 'fashionista',
        stolenItem: 'Mona Lisa painting',
        learningObjectives: [
            'Basic description vocabulary',
            'Simple present tense questions',
            'Cultural knowledge about Paris'
        ],
        vocabulary: {
            appearance: [
                { french: 'les cheveux', english: 'hair' },
                { french: 'blond(e)', english: 'blonde' },
                { french: 'brun(e)', english: 'brown-haired' },
                { french: 'roux/rousse', english: 'red-haired' },
                { french: 'grand(e)', english: 'tall' },
                { french: 'petit(e)', english: 'short' },
                { french: 'les yeux', english: 'eyes' },
                { french: 'bleus', english: 'blue' },
                { french: 'verts', english: 'green' },
                { french: 'marron', english: 'brown' }
            ],
            clothing: [
                { french: 'un chapeau', english: 'a hat' },
                { french: 'des lunettes', english: 'glasses' },
                { french: 'un manteau', english: 'a coat' },
                { french: 'rouge', english: 'red' },
                { french: 'noir(e)', english: 'black' },
                { french: 'blanc(he)', english: 'white' }
            ],
            questions: [
                { french: 'Avez-vous vu quelqu\'un de suspect?', english: 'Did you see someone suspicious?' },
                { french: 'Comment était cette personne?', english: 'What did this person look like?' },
                { french: 'Où est-il/elle allé(e)?', english: 'Where did he/she go?' },
                { french: 'Qu\'est-ce qu\'il/elle portait?', english: 'What was he/she wearing?' }
            ]
        }
    },
    {
        id: 'stolen-recipe',
        title: 'The Stolen Recipe',
        description: "A famous chef's secret recipe has been stolen from a restaurant in Lyon. The thief plans to sell it to a competitor. Your mission is to find the culprit and recover the recipe before it changes hands.",
        difficulty: 'beginner',
        grade: '5-6',
        image: 'assets/images/cases/recipe.jpg',
        startLocation: 'lyon',
        thief: 'gourmand',
        stolenItem: 'Secret recipe',
        learningObjectives: [
            'Food and cooking vocabulary',
            'Simple past tense questions',
            'Restaurant conversations'
        ],
        vocabulary: {
            food: [
                { french: 'la nourriture', english: 'food' },
                { french: 'le restaurant', english: 'restaurant' },
                { french: 'le chef', english: 'chef' },
                { french: 'la recette', english: 'recipe' },
                { french: 'délicieux/délicieuse', english: 'delicious' },
                { french: 'le repas', english: 'meal' },
                { french: 'le menu', english: 'menu' }
            ],
            cooking: [
                { french: 'cuisiner', english: 'to cook' },
                { french: 'goûter', english: 'to taste' },
                { french: 'la cuisine', english: 'kitchen/cuisine' },
                { french: 'les ingrédients', english: 'ingredients' },
                { french: 'une recette secrète', english: 'a secret recipe' }
            ],
            questions: [
                { french: 'Qu\'est-ce que le chef prépare?', english: 'What does the chef prepare?' },
                { french: 'Avez-vous vu quelqu\'un dans la cuisine?', english: 'Did you see someone in the kitchen?' },
                { french: 'Quel est le plat spécial?', english: 'What is the special dish?' },
                { french: 'Quand avez-vous vu cette personne?', english: 'When did you see this person?' }
            ]
        }
    },
    {
        id: 'fashion-heist',
        title: 'The Fashion Week Heist',
        description: "A collection of designer outfits has been stolen just before Paris Fashion Week. Your mission is to track down the thief and recover the clothing before the big show.",
        difficulty: 'intermediate',
        grade: '7-8',
        image: 'assets/images/cases/fashion.jpg',
        startLocation: 'paris',
        thief: 'fashionista',
        stolenItem: 'Designer collection',
        learningObjectives: [
            'Clothing and fashion vocabulary',
            'Comparative and descriptive phrases',
            'Shopping conversations'
        ],
        vocabulary: {
            clothing: [
                { french: 'les vêtements', english: 'clothes' },
                { french: 'la mode', english: 'fashion' },
                { french: 'le styliste', english: 'fashion designer' },
                { french: 'le défilé', english: 'fashion show' },
                { french: 'élégant(e)', english: 'elegant' },
                { french: 'à la mode', english: 'fashionable' },
                { french: 'la collection', english: 'collection' }
            ],
            colors: [
                { french: 'rouge', english: 'red' },
                { french: 'bleu(e)', english: 'blue' },
                { french: 'vert(e)', english: 'green' },
                { french: 'jaune', english: 'yellow' },
                { french: 'violet(te)', english: 'purple' },
                { french: 'orange', english: 'orange' },
                { french: 'noir(e)', english: 'black' },
                { french: 'blanc(he)', english: 'white' }
            ],
            questions: [
                { french: 'Qui a créé cette collection?', english: 'Who created this collection?' },
                { french: 'Comment étaient les vêtements?', english: 'What were the clothes like?' },
                { french: 'Quelle couleur préfère le voleur?', english: 'What color does the thief prefer?' },
                { french: 'Où puis-je acheter des vêtements?', english: 'Where can I buy clothes?' }
            ]
        }
    },
    {
        id: 'wildlife-mystery',
        title: 'The Wildlife Mystery',
        description: "A rare animal has been taken from a wildlife sanctuary in Martinique. You need to track down the person responsible and ensure the animal's safe return to its habitat.",
        difficulty: 'intermediate',
        grade: '7-8',
        image: 'assets/images/cases/wildlife.jpg',
        startLocation: 'martinique',
        thief: 'naturaliste',
        stolenItem: 'Rare tropical bird',
        learningObjectives: [
            'Nature and animal vocabulary',
            'Environmental expressions',
            'Caribbean French phrases'
        ],
        vocabulary: {
            nature: [
                { french: 'la nature', english: 'nature' },
                { french: 'la forêt', english: 'forest' },
                { french: 'la plage', english: 'beach' },
                { french: 'la mer', english: 'sea' },
                { french: 'la montagne', english: 'mountain' },
                { french: 'tropical(e)', english: 'tropical' }
            ],
            animals: [
                { french: 'les animaux', english: 'animals' },
                { french: 'l\'oiseau', english: 'bird' },
                { french: 'le poisson', english: 'fish' },
                { french: 'rare', english: 'rare' },
                { french: 'en voie de disparition', english: 'endangered' },
                { french: 'protégé(e)', english: 'protected' }
            ],
            questions: [
                { french: 'Quels animaux avez-vous ici?', english: 'What animals do you have here?' },
                { french: 'Avez-vous vu quelqu\'un près des cages?', english: 'Did you see someone near the cages?' },
                { french: 'Où se trouve l\'habitat naturel?', english: 'Where is the natural habitat?' },
                { french: 'Comment peut-on protéger les animaux?', english: 'How can we protect the animals?' }
            ]
        }
    },
    {
        id: 'museum-mystery',
        title: 'The Museum Mystery',
        description: "An ancient artifact has disappeared from the National Museum in Quebec City. You must follow the trail across French Canada to recover this important piece of history.",
        difficulty: 'advanced',
        grade: '9-10',
        image: 'assets/images/cases/museum.jpg',
        startLocation: 'quebec',
        thief: 'collectionneur',
        stolenItem: 'Ancient artifact',
        learningObjectives: [
            'Historical vocabulary',
            'Complex tenses and conditional',
            'Canadian French expressions'
        ],
        vocabulary: {
            history: [
                { french: 'l\'histoire', english: 'history' },
                { french: 'ancien(ne)', english: 'ancient' },
                { french: 'l\'artefact', english: 'artifact' },
                { french: 'le musée', english: 'museum' },
                { french: 'précieux/précieuse', english: 'precious' },
                { french: 'la collection', english: 'collection' }
            ],
            museum: [
                { french: 'l\'exposition', english: 'exhibition' },
                { french: 'le guide', english: 'guide' },
                { french: 'visiter', english: 'to visit' },
                { french: 'observer', english: 'to observe' },
                { french: 'la vitrine', english: 'display case' },
                { french: 'le gardien', english: 'security guard' }
            ],
            questions: [
                { french: 'Quand l\'artefact a-t-il disparu?', english: 'When did the artifact disappear?' },
                { french: 'Qui aurait pu le prendre?', english: 'Who could have taken it?' },
                { french: 'Quelle est la valeur de cet objet?', english: 'What is the value of this object?' },
                { french: 'Y a-t-il des caméras de sécurité?', english: 'Are there security cameras?' }
            ]
        }
    },
    {
        id: 'musical-mystery',
        title: 'The Musical Mystery',
        description: "A famous musician's instrument has been stolen before a major concert in Senegal. You must find the thief and return the instrument before the performance.",
        difficulty: 'advanced',
        grade: '9-10',
        image: 'assets/images/cases/music.jpg',
        startLocation: 'dakar',
        thief: 'musicien',
        stolenItem: 'Rare musical instrument',
        learningObjectives: [
            'Music vocabulary',
            'Cultural expressions',
            'West African French phrases'
        ],
        vocabulary: {
            music: [
                { french: 'la musique', english: 'music' },
                { french: 'le musicien/la musicienne', english: 'musician' },
                { french: 'l\'instrument', english: 'instrument' },
                { french: 'jouer', english: 'to play' },
                { french: 'le concert', english: 'concert' },
                { french: 'la chanson', english: 'song' }
            ],
            instruments: [
                { french: 'le piano', english: 'piano' },
                { french: 'la guitare', english: 'guitar' },
                { french: 'le tambour', english: 'drum' },
                { french: 'la flûte', english: 'flute' },
                { french: 'le djembé', english: 'djembe' },
                { french: 'le kora', english: 'kora' }
            ],
            questions: [
                { french: 'Quel instrument a été volé?', english: 'Which instrument was stolen?' },
                { french: 'Quand est le prochain concert?', english: 'When is the next concert?' },
                { french: 'Qui connaît bien le musicien?', english: 'Who knows the musician well?' },
                { french: 'Avez-vous entendu quelque chose?', english: 'Did you hear anything?' }
            ]
        }
    }
];

// Thieves data
const thieves = {
    'fashionista': {
        name: 'La Fashionista',
        description: 'A fashion-obsessed thief who steals designer items and artwork',
        appearance: {
            hair: 'blonde',
            eyes: 'blue',
            height: 'tall',
            distinctive: 'always wears designer sunglasses'
        },
        interests: ['fashion', 'art', 'jewelry'],
        catchphrase: 'La mode est mon art!'
    },
    'gourmand': {
        name: 'Le Gourmand',
        description: 'A culinary thief who steals famous recipes and rare ingredients',
        appearance: {
            hair: 'brown',
            eyes: 'green',
            height: 'medium',
            distinctive: 'always carries a small notebook'
        },
        interests: ['cooking', 'restaurants', 'markets'],
        catchphrase: 'La cuisine est une science!'
    },
    'naturaliste': {
        name: 'Le Naturaliste',
        description: 'An eco-thief who steals rare plants and animals, claiming to "protect" them',
        appearance: {
            hair: 'red',
            eyes: 'brown',
            height: 'tall',
            distinctive: 'wears eco-friendly clothing'
        },
        interests: ['nature', 'animals', 'conservation'],
        catchphrase: 'Je protège ce que vous négligez!'
    },
    'collectionneur': {
        name: 'Le Collectionneur',
        description: 'A history buff who steals artifacts for a private collection',
        appearance: {
            hair: 'gray',
            eyes: 'brown',
            height: 'short',
            distinctive: 'uses a walking cane'
        },
        interests: ['history', 'museums', 'ancient civilizations'],
        catchphrase: 'L\'histoire appartient à ceux qui la comprennent!'
    },
    'musicien': {
        name: 'Le Musicien Masqué',
        description: 'A mysterious figure who steals rare instruments',
        appearance: {
            hair: 'black',
            eyes: 'dark',
            height: 'medium',
            distinctive: 'has musical notes tattooed on wrist'
        },
        interests: ['music', 'concerts', 'rare instruments'],
        catchphrase: 'La musique transcende les frontières!'
    }
};

// Export data for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        gameCases,
        thieves
    };
}
// Locations data for Language Detective: Global Chase

const gameLocations = [
    {
        id: 'paris',
        name: 'Paris',
        country: 'France',
        description: "The City of Light, known for its art, fashion, and iconic landmarks like the Eiffel Tower and the Louvre Museum.",
        image: 'assets/images/locations/paris.jpg',
        mapPosition: { x: 48.8566, y: 2.3522 },
        localPhrases: [
            { french: "Bonjour!", english: "Hello!" },
            { french: "Merci beaucoup", english: "Thank you very much" },
            { french: "Excusez-moi", english: "Excuse me" },
            { french: "Où se trouve...?", english: "Where is...?" }
        ],
        culturalNotes: [
            "The Eiffel Tower was built for the 1889 World's Fair",
            "French people typically greet with 'la bise' (cheek kisses)",
            "Paris is divided into 20 arrondissements (districts)"
        ],
        characters: [
            {
                id: 'museum_guard',
                name: 'Monsieur Dupont',
                role: 'Museum Guard',
                image: 'assets/images/characters/museum_guard.jpg',
                greeting: "Bonjour! Je suis le gardien du musée. Puis-je vous aider?",
                dialogues: {
                    suspect: "Oui, j'ai vu une personne suspecte hier. Elle avait les cheveux blonds et portait des lunettes de soleil.",
                    item: "La Joconde - euh, the Mona Lisa - a été volée hier soir.",
                    direction: "La personne a mentionné qu'elle allait à Lyon pour goûter la cuisine française.",
                    smalltalk: "Le Louvre est le plus grand musée du monde. Il y a plus de 35,000 objets exposés ici."
                },
                questions: {
                    "Avez-vous vu quelqu'un de suspect": "suspect",
                    "Qu'est-ce qui a été volé": "item",
                    "Où est allé le voleur": "direction",
                    "Parlez-moi du musée": "smalltalk"
                }
            },
            {
                id: 'cafe_owner',
                name: 'Madame Moreau',
                role: 'Café Owner',
                image: 'assets/images/characters/cafe_owner.jpg',
                greeting: "Bonjour! Bienvenue à mon café. Que désirez-vous?",
                dialogues: {
                    suspect: "Oui, une personne élégante est venue ici. Elle était grande avec des yeux bleus.",
                    item: "Cette personne parlait beaucoup d'art et de mode.",
                    direction: "Elle a dit qu'elle adorait la cuisine de Lyon et voulait y aller.",
                    smalltalk: "Mon café est ouvert tous les jours de 7h à 22h. Nous servons les meilleurs croissants de Paris!"
                },
                questions: {
                    "Avez-vous vu quelqu'un d'inhabituel": "suspect",
                    "De quoi parlait cette personne": "item",
                    "Savez-vous où cette personne est allée": "direction",
                    "Parlez-moi de votre café": "smalltalk"
                }
            }
        ]
    },
    {
        id: 'lyon',
        name: 'Lyon',
        country: 'France',
        description: "The gastronomic capital of France, known for its delicious cuisine, historic architecture, and the Festival of Lights.",
        image: 'assets/images/locations/lyon.jpg',
        mapPosition: { x: 45.75, y: 4.85 },
        localPhrases: [
            { french: "À votre santé!", english: "Cheers!" },
            { french: "Bon appétit", english: "Enjoy your meal" },
            { french: "C'est délicieux", english: "It's delicious" },
            { french: "Je voudrais goûter...", english: "I would like to taste..." }
        ],
        culturalNotes: [
            "Lyon is known as the gastronomic capital of France",
            "The 'bouchons' are traditional Lyonnais restaurants",
            "The Festival of Lights (Fête des Lumières) is held every December"
        ],
        characters: [
            {
                id: 'chef',
                name: 'Chef Bernard',
                role: 'Famous Chef',
                image: 'assets/images/characters/chef.jpg',
                greeting: "Bonjour! Bienvenue dans mon restaurant. Vous aimez la cuisine française?",
                dialogues: {
                    suspect: "Oui, une personne élégante est venue dîner hier. Elle m'a posé beaucoup de questions sur mes recettes.",
                    item: "Ma recette secrète pour la sauce aux truffes a disparu!",
                    direction: "Cette personne a mentionné qu'elle allait à Nice pour voir la mer Méditerranée.",
                    smalltalk: "Lyon est connue comme la capitale gastronomique de la France. Nous avons plus de 4,000 restaurants!"
                },
                questions: {
                    "Avez-vous vu quelqu'un de suspect": "suspect",
                    "Qu'est-ce qui a été volé": "item",
                    "Où est allé le voleur": "direction",
                    "Parlez-moi de la cuisine lyonnaise": "smalltalk"
                }
            },
            {
                id: 'market_vendor',
                name: 'Monsieur Dubois',
                role: 'Market Vendor',
                image: 'assets/images/characters/market_vendor.jpg',
                greeting: "Bonjour! Je vends les meilleurs produits frais du marché!",
                dialogues: {
                    suspect: "Oui, une personne bizarre achetait beaucoup d'ingrédients rares hier.",
                    item: "Cette personne cherchait des truffes et des herbes spéciales.",
                    direction: "J'ai entendu cette personne parler de Nice au téléphone.",
                    smalltalk: "Le marché de Lyon existe depuis 1859. Nous avons les meilleurs produits de la région!"
                },
                questions: {
                    "Avez-vous vu quelqu'un d'inhabituel": "suspect",
                    "Qu'est-ce que cette personne achetait": "item",
                    "Savez-vous où cette personne est allée": "direction",
                    "Parlez-moi du marché": "smalltalk"
                }
            }
        ]
    },
    {
        id: 'nice',
        name: 'Nice',
        country: 'France',
        description: "A beautiful coastal city on the French Riviera with stunning beaches, Mediterranean culture, and vibrant markets.",
        image: 'assets/images/locations/nice.jpg',
        mapPosition: { x: 43.7102, y: 7.2620 },
        localPhrases: [
            { french: "La mer est belle", english: "The sea is beautiful" },
            { french: "Il fait beau", english: "The weather is nice" },
            { french: "La plage est par là", english: "The beach is that way" },
            { french: "Je voudrais une glace", english: "I would like an ice cream" }
        ],
        culturalNotes: [
            "Nice has a distinct culture influenced by its proximity to Italy",
            "The 'Promenade des Anglais' is a famous seaside walkway",
            "Nice is known for its 'Socca', a local chickpea pancake"
        ],
        characters: [
            {
                id: 'beach_attendant',
                name: 'Sophie',
                role: 'Beach Attendant',
                image: 'assets/images/characters/beach_attendant.jpg',
                greeting: "Bonjour! Bienvenue à la plage de Nice. Vous voulez un parasol?",
                dialogues: {
                    suspect: "J'ai vu une personne qui prenait beaucoup de photos des bateaux de luxe hier.",
                    item: "Cette personne avait un grand sac qui semblait très lourd.",
                    direction: "J'ai entendu cette personne parler de visiter Martinique pour voir les animaux tropicaux.",
                    smalltalk: "La plage de Nice est une des plus belles de la Côte d'Azur. L'eau est vraiment turquoise!"
                },
                questions: {
                    "Avez-vous vu quelqu'un de suspect": "suspect",
                    "Qu'est-ce que cette personne portait": "item",
                    "Où est allé le voleur": "direction",
                    "Parlez-moi de Nice": "smalltalk"
                }
            },
            {
                id: 'gallery_owner',
                name: 'Monsieur Laurent',
                role: 'Art Gallery Owner',
                image: 'assets/images/characters/gallery_owner.jpg',
                greeting: "Bonjour! Bienvenue dans ma galerie d'art. Vous aimez l'art méditerranéen?",
                dialogues: {
                    suspect: "Une personne élégante est venue hier et a posé beaucoup de questions sur l'expédition d'œuvres d'art.",
                    item: "Elle semblait particulièrement intéressée par nos méthodes de sécurité.",
                    direction: "Cette personne a mentionné qu'elle allait aux Caraïbes, à la Martinique je crois.",
                    smalltalk: "Nice a inspiré de nombreux artistes comme Matisse et Chagall. La lumière ici est parfaite pour peindre!"
                },
                questions: {
                    "Avez-vous eu des clients inhabituels": "suspect",
                    "Qu'est-ce qui intéressait cette personne": "item",
                    "Savez-vous où cette personne est allée": "direction",
                    "Parlez-moi de l'art à Nice": "smalltalk"
                }
            }
        ]
    },
    {
        id: 'martinique',
        name: 'Martinique',
        country: 'France (Overseas)',
        description: "A Caribbean island and French overseas territory known for its beautiful beaches, tropical forests, and unique blend of French and Caribbean culture.",
        image: 'assets/images/locations/martinique.jpg',
        mapPosition: { x: 14.6415, y: -61.0242 },
        localPhrases: [
            { french: "Sa ou fé?", english: "How are you? (Creole)" },
            { french: "La plage est magnifique", english: "The beach is beautiful" },
            { french: "Je cherche des animaux tropicaux", english: "I'm looking for tropical animals" },
            { french: "Quelle belle île!", english: "What a beautiful island!" }
        ],
        culturalNotes: [
            "Martinique is an overseas region of France in the Caribbean",
            "Both French and Creole are spoken on the island",
            "Mount Pelée is an active volcano on the island"
        ],
        characters: [
            {
                id: 'tour_guide',
                name: 'Jean-Michel',
                role: 'Tour Guide',
                image: 'assets/images/characters/tour_guide.jpg',
                greeting: "Bonjour! Bienvenue à la Martinique. Vous voulez découvrir notre belle île?",
                dialogues: {
                    suspect: "Oui, j'ai guidé une personne très intéressée par notre réserve naturelle et nos oiseaux rares.",
                    item: "Cette personne prenait beaucoup de notes sur les espèces protégées.",
                    direction: "La personne a mentionné qu'elle allait visiter Québec ensuite.",
                    smalltalk: "La Martinique est célèbre pour ses plages, sa forêt tropicale et le rhum! Nous avons plus de 100 espèces d'oiseaux."
                },
                questions: {
                    "Avez-vous guidé quelqu'un de suspect": "suspect",
                    "Qu'est-ce qui intéressait cette personne": "item",
                    "Où est allé le voleur": "direction",
                    "Parlez-moi de la Martinique": "smalltalk"
                }
            },
            {
                id: 'wildlife_ranger',
                name: 'Élise',
                role: 'Wildlife Ranger',
                image: 'assets/images/characters/wildlife_ranger.jpg',
                greeting: "Bonjour! Je travaille dans la réserve naturelle. Je protège les animaux.",
                dialogues: {
                    suspect: "Une personne étrange est venue hier et posait beaucoup de questions sur notre oiseau rare, le Moqueur gorge-blanche.",
                    item: "Et ce matin, j'ai découvert que l'oiseau avait disparu de sa volière!",
                    direction: "Cette personne a dit qu'elle était intéressée par la faune du Canada aussi, à Québec.",
                    smalltalk: "Notre réserve protège plus de 30 espèces en danger. Le climat tropical de la Martinique abrite une biodiversité unique."
                },
                questions: {
                    "Avez-vous vu quelqu'un de suspect": "suspect",
                    "Qu'est-ce qui a été volé": "item",
                    "Savez-vous où cette personne est allée": "direction",
                    "Parlez-moi des animaux": "smalltalk"
                }
            }
        ]
    },
    {
        id: 'quebec',
        name: 'Québec City',
        country: 'Canada',
        description: "A historic city in French-speaking Canada known for its preserved old town, European character, and vibrant cultural scene.",
        image: 'assets/images/locations/quebec.jpg',
        mapPosition: { x: 46.8139, y: -71.2080 },
        localPhrases: [
            { french: "Bonjour/Allô", english: "Hello" },
            { french: "C'est cool", english: "That's cool" },
            { french: "Je suis désolé(e)", english: "I'm sorry" },
            { french: "C'est-tu beau!", english: "That's beautiful! (Québécois)" }
        ],
        culturalNotes: [
            "Québec City is one of the oldest European settlements in North America",
            "French is the official language of Québec",
            "Québécois French has unique expressions and accent"
        ],
        characters: [
            {
                id: 'museum_curator',
                name: 'Madame Tremblay',
                role: 'Museum Curator',
                image: 'assets/images/characters/museum_curator.jpg',
                greeting: "Bonjour! Bienvenue au Musée de la civilisation. Vous aimez l'histoire?",
                dialogues: {
                    suspect: "Une personne est venue visiter notre collection d'artefacts autochtones hier et posait des questions très précises.",
                    item: "Notre masque cérémoniel ancien a disparu ce matin!",
                    direction: "Cette personne a mentionné qu'elle allait à Dakar au Sénégal pour un festival de musique.",
                    smalltalk: "Notre musée présente l'histoire du Québec et des Premières Nations. Le bâtiment date de 1751."
                },
                questions: {
                    "Avez-vous eu des visiteurs suspects": "suspect",
                    "Qu'est-ce qui a été volé": "item",
                    "Où est allé le voleur": "direction",
                    "Parlez-moi du musée": "smalltalk"
                }
            },
            {
                id: 'street_performer',
                name: 'Jacques',
                role: 'Street Performer',
                image: 'assets/images/characters/street_performer.jpg',
                greeting: "Salut! J'joue de la musique dans le Vieux-Québec. Ça va bien?",
                dialogues: {
                    suspect: "Ouais, j'ai vu une personne bizarre qui regardait beaucoup le musée. Elle prenait plein de photos.",
                    item: "Cette personne avait un gros sac à dos et semblait nerveuse.",
                    direction: "J'l'ai entendue parler au téléphone de l'Afrique... euh, le Sénégal, je pense.",
                    smalltalk: "Le Vieux-Québec est super beau! C'est comme un p'tit coin d'Europe en Amérique du Nord."
                },
                questions: {
                    "Avez-vous vu quelqu'un de suspect": "suspect",
                    "Qu'est-ce que cette personne portait": "item",
                    "Savez-vous où cette personne est allée": "direction",
                    "Parlez-moi de Québec": "smalltalk"
                }
            }
        ]
    },
    {
        id: 'dakar',
        name: 'Dakar',
        country: 'Senegal',
        description: "The vibrant capital of Senegal, known for its music, art, colorful markets, and blend of French and West African cultures.",
        image: 'assets/images/locations/dakar.jpg',
        mapPosition: { x: 14.7167, y: -17.4677 },
        localPhrases: [
            { french: "Nanga def?", english: "How are you? (Wolof)" },
            { french: "C'est formidable", english: "That's great" },
            { french: "Le marché est par là", english: "The market is that way" },
            { french: "J'adore la musique", english: "I love the music" }
        ],
        culturalNotes: [
            "Senegal was a French colony until 1960",
            "Both French and Wolof are widely spoken",
            "Senegalese music, especially Mbalax, is famous worldwide"
        ],
        characters: [
            {
                id: 'music_shop_owner',
                name: 'Amadou',
                role: 'Music Shop Owner',
                image: 'assets/images/characters/music_shop_owner.jpg',
                greeting: "Bonjour! Bienvenue dans ma boutique de musique. Vous aimez la musique sénégalaise?",
                dialogues: {
                    suspect: "Oui, une personne étrangère est venue hier et s'intéressait beaucoup à nos instruments traditionnels.",
                    item: "Notre kora ancienne, un instrument très précieux, a disparu aujourd'hui!",
                    direction: "Je crois que cette personne séjourne à l'Hôtel Teranga près de la plage.",
                    smalltalk: "La musique est très importante au Sénégal. Nous avons le mbalax, le jazz sénégalais, et beaucoup d'autres styles."
                },
                questions: {
                    "Avez-vous eu des clients suspects": "suspect",
                    "Qu'est-ce qui a été volé": "item",
                    "Où pourrait être le voleur": "direction",
                    "Parlez-moi de la musique": "smalltalk"
                }
            },
            {
                id: 'hotel_concierge',
                name: 'Fatoumata',
                role: 'Hotel Concierge',
                image: 'assets/images/characters/hotel_concierge.jpg',
                greeting: "Bonjour! Bienvenue à l'Hôtel Teranga. Je peux vous aider?",
                dialogues: {
                    suspect: "Oui, nous avons un client qui correspond à cette description. Cette personne a beaucoup d'instruments de musique dans sa chambre.",
                    item: "J'ai vu cette personne avec un instrument à cordes très inhabituel ce matin.",
                    direction: "Le client est dans la chambre 302. Mais je crois qu'il/elle se prépare à partir bientôt!",
                    smalltalk: "Notre hôtel est un des plus anciens de Dakar. Nous accueillons beaucoup de musiciens pendant les festivals."
                },
                questions: {
                    "Avez-vous des clients suspects": "suspect",
                    "Qu'est-ce que cette personne transportait": "item",
                    "Où se trouve cette personne maintenant": "direction",
                    "Parlez-moi de l'hôtel": "smalltalk"
                }
            }
        ]
    }
];

// Export data for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        gameLocations
    };
}
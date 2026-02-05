// Default date ideas data (will be synced with Google Sheets)
const DEFAULT_CATEGORIES = {
    paint: {
        id: 'paint',
        label: 'Paint & Sip',
        icon: '🎨',
        color: 'rose',
        desc: 'Wine in one hand, paintbrush in the other. Zero skill required.',
    },
    pottery: {
        id: 'pottery',
        label: 'Pottery',
        icon: '🏺',
        color: 'amber',
        desc: 'Get your hands dirty. Ghost vibes not guaranteed, but fun is.',
    },
    cooking: {
        id: 'cooking',
        label: 'Cooking',
        icon: '🍳',
        color: 'emerald',
        desc: 'The ultimate teamwork test. Cook a feast, then eat it.',
    },
    music: {
        id: 'music',
        label: 'Music',
        icon: '🎹',
        color: 'violet',
        desc: 'Sing or play together. A harmonious (or hilarious) date idea.',
    },
    other: {
        id: 'other',
        label: 'Unique',
        icon: '✨',
        color: 'cyan',
        desc: 'Adrenaline, VR, or nice smells. Something different.',
    }
};

const DEFAULT_DATE_IDEAS = {
    paint: [
        {
            id: 'pinots-palette',
            title: "Pinot's Palette",
            loc: "San Bruno",
            price: 98,
            tags: ["#Blacklight", "#FullBar", "#PartyVibe"],
            link: "https://www.pinotspalette.com/san-bruno/events",
            why: "Best upbeat vibe. Great for special Blacklight/Glow classes."
        },
        {
            id: 'bottle-bottega',
            title: "Bottle & Bottega",
            loc: "Belmont",
            price: 90,
            tags: ["#Chic", "#BYOFood", "#WineBar"],
            link: "https://www.paintingwithatwist.com/studio/redwood-city/calendar/",
            why: "Classier studio. You can bring your own snacks."
        },
        {
            id: 'color-me-mine',
            title: "Color Me Mine",
            loc: "Sunnyvale",
            price: 60,
            tags: ["#Chill", "#NoPressure", "#Downtown"],
            link: "https://sunnyvale.colormemine.com/",
            why: "Relaxed date. Paint pre-made pottery on Murphy Ave."
        },
        {
            id: 'create-mix-mingle',
            title: "Create Mix & Mingle",
            loc: "San Mateo",
            price: 90,
            tags: ["#Studio", "#Social", "#Local"],
            link: "https://createmixandmingle.com/calendar",
            why: "A dedicated local art studio, very reliable for Saturday dates."
        }
    ],
    pottery: [
        {
            id: 'clayroom',
            title: "Clayroom",
            loc: "San Mateo",
            price: 210,
            tags: ["#Pro", "#Impressive", "#WheelThrowing"],
            link: "https://www.clayroomsanmateo.com/pottery-classes",
            why: "The most aesthetic/modern studio. High quality instruction."
        },
        {
            id: 'capybara-clay',
            title: "Capybara Clay",
            loc: "Cupertino",
            price: 178,
            tags: ["#Cozy", "#Beginner", "#Cute"],
            link: "https://www.capybaraclay.com/services",
            why: "Small, intimate, and very welcoming to newbies."
        },
        {
            id: 'laurel-st-arts',
            title: "Laurel St Arts",
            loc: "San Carlos",
            price: 70,
            tags: ["#GlassArt", "#Casual", "#WalkIn"],
            link: "https://www.laurelstreetarts.com/",
            why: "Try Glass Fusing instead of clay. Make colorful coasters."
        },
        {
            id: 'clay-life-arts',
            title: "Clay Life Arts",
            loc: "San Mateo",
            price: 180,
            tags: ["#Private", "#Romantic", "#Quiet"],
            link: "https://theclaylife.com/",
            why: "Book a private lesson just for the two of you."
        }
    ],
    cooking: [
        {
            id: 'sur-la-table',
            title: "Sur La Table",
            loc: "Palo Alto",
            price: 230,
            tags: ["#Fancy", "#Gourmet", "#Busy"],
            link: "https://www.surlatable.com/locations/ca/paloalto/cooking-classes-73.html",
            why: "Top tier equipment. Located in Town & Country."
        },
        {
            id: 'taste-buds',
            title: "Taste Buds",
            loc: "Palo Alto",
            price: 170,
            tags: ["#BYOB", "#Social", "#Fun"],
            link: "https://tastebudskitchen.com/palo-alto/adult-cooking-classes/",
            why: "It's BYOB! Saves money and relaxes the mood."
        },
        {
            id: 'cozymeal',
            title: "Cozymeal",
            loc: "Various",
            price: 200,
            tags: ["#PrivateChef", "#HiddenGem"],
            link: "https://www.cozymeal.com/south-bay-peninsula/cooking-classes",
            why: "Unique venues, often more intimate than schools."
        },
        {
            id: 'cucina-bambini',
            title: "Cucina Bambini",
            loc: "Willow Glen",
            price: 150,
            tags: ["#Pasta", "#Friendly", "#Easy"],
            link: "https://cucinabambini.com/adult-classes/",
            why: "Very relaxed, great for learning basics like Pasta."
        }
    ],
    music: [
        {
            id: 'opus-1-music',
            title: "Opus 1 Music",
            loc: "Palo Alto",
            price: 110,
            tags: ["#Reputable", "#Private", "#Piano"],
            link: "https://musicopus1.com/",
            why: "Voted best music school. Book a 'Duo Intro'."
        },
        {
            id: 'myriad-music',
            title: "Myriad Music",
            loc: "San Mateo",
            price: 95,
            tags: ["#Friendly", "#Intro", "#Fun"],
            link: "https://www.myriadmusic.net/adult-music-lessons/",
            why: "They have a specific 'Adult Quick Start' packet."
        },
        {
            id: 'vibo-music',
            title: "Vibo Music",
            loc: "San Bruno",
            price: 85,
            tags: ["#Local", "#Casual", "#Affordable"],
            link: "https://vibomusic.com/",
            why: "Located on a great food street in San Bruno."
        },
        {
            id: 'sv-second-school',
            title: "SV Second School",
            loc: "Cupertino",
            price: 80,
            tags: ["#Community", "#Violin", "#Piano"],
            link: "https://www.svsecondschool.com/",
            why: "Low pressure, good for trying a new instrument."
        }
    ],
    other: [
        {
            id: 'candle-making',
            title: "Candle Making",
            loc: "Mountain View",
            price: 116,
            tags: ["#SmellsGood", "#Workshop", "#Cute"],
            link: "https://www.mountainviewcandleco.com/classes-diy-class",
            why: "Make custom soy candles. Very romantic outcome."
        },
        {
            id: 'sandbox-vr',
            title: "Sandbox VR",
            loc: "San Mateo",
            price: 110,
            tags: ["#Action", "#Zombies", "#HighTech"],
            link: "https://sandboxvr.com/sanmateo",
            why: "Full body VR suit. Fight pirates together."
        },
        {
            id: 'axeventures',
            title: "AxeVentures",
            loc: "San Mateo",
            price: 70,
            tags: ["#Active", "#Competitive", "#Loud"],
            link: "https://axeventures-sanmateo.com/",
            why: "Surprisingly great stress relief. Beer available."
        },
        {
            id: 'topgolf',
            title: "Topgolf",
            loc: "N. San Jose",
            price: 100,
            tags: ["#Foodie", "#Golf", "#Party"],
            link: "https://topgolf.com/us/san-jose/",
            why: "Heated bays, cocktails, no golf skill needed."
        }
    ]
};

// State management
let completedDates = {};  // { ideaId: { rating: 1-5, completedDate: 'YYYY-MM-DD' } }
let categories = { ...DEFAULT_CATEGORIES };
let dateIdeas = { ...DEFAULT_DATE_IDEAS };

// Load completed dates from Google Sheets
async function loadCompletedDates() {
    try {
        const data = await SheetsAPI.read('CompletedDates');
        if (data && data.length > 0) {
            // Skip header row if present
            const startIndex = data[0][0] === 'ideaId' ? 1 : 0;
            for (let i = startIndex; i < data.length; i++) {
                const [ideaId, rating, completedDate] = data[i];
                if (ideaId) {
                    completedDates[ideaId] = {
                        rating: parseInt(rating) || 0,
                        completedDate: completedDate || ''
                    };
                }
            }
        }
    } catch (error) {
        console.error('Error loading completed dates:', error);
    }
}

// Save a completed date to Google Sheets
async function saveCompletedDate(ideaId, rating, completedDate) {
    completedDates[ideaId] = { rating, completedDate };
    await SheetsAPI.append('CompletedDates', [ideaId, rating, completedDate]);
}

// Check if a date idea is completed
function isCompleted(ideaId) {
    return completedDates.hasOwnProperty(ideaId);
}

// Get completion info for a date idea
function getCompletionInfo(ideaId) {
    return completedDates[ideaId] || null;
}

// Get all date ideas as a flat array
function getAllDateIdeas() {
    const allItems = [];
    Object.entries(dateIdeas).forEach(([catId, items]) => {
        const cat = categories[catId];
        items.forEach(item => {
            allItems.push({ ...item, categoryId: catId, color: cat.color, catIcon: cat.icon });
        });
    });
    return allItems;
}

// Generate star rating HTML
function getStarRatingHTML(rating, interactive = false, ideaId = '') {
    let html = '<div class="star-rating">';
    for (let i = 1; i <= 5; i++) {
        const filled = i <= rating;
        if (interactive) {
            html += `<span onclick="setRating('${ideaId}', ${i})" class="cursor-pointer">${filled ? '⭐' : '☆'}</span>`;
        } else {
            html += `<span>${filled ? '⭐' : '☆'}</span>`;
        }
    }
    html += '</div>';
    return html;
}

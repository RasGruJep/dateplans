// Default date ideas data (used as fallback when Google Sheets is unavailable)
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

// --- State Management ---
let completedDates = {};  // { ideaId: { rating: 1-5, completedDate: 'YYYY-MM-DD' } }
let categories = {};
let dateIdeas = {};
let calendarEvents = [];

// --- Load Categories from Sheets (falls back to defaults) ---
async function loadCategories() {
    try {
        const data = await SheetsAPI.read('Categories');
        if (data && data.length > 1) {
            const startIndex = data[0][0] === 'id' ? 1 : 0;
            categories = {};
            for (let i = startIndex; i < data.length; i++) {
                const [id, label, icon, color, desc] = data[i];
                if (id) {
                    categories[id] = { id, label, icon, color, desc: desc || '' };
                }
            }
            return;
        }
    } catch (error) {
        console.error('Error loading categories:', error);
    }
    // Fallback to defaults
    categories = { ...DEFAULT_CATEGORIES };
}

// --- Load Date Ideas from Sheets (falls back to defaults) ---
async function loadDateIdeas() {
    try {
        const data = await SheetsAPI.read('DateIdeas');
        if (data && data.length > 1) {
            const startIndex = data[0][0] === 'id' ? 1 : 0;
            dateIdeas = {};
            for (let i = startIndex; i < data.length; i++) {
                const [id, categoryId, title, loc, price, why, link, tags] = data[i];
                if (id && categoryId) {
                    if (!dateIdeas[categoryId]) dateIdeas[categoryId] = [];
                    dateIdeas[categoryId].push({
                        id,
                        title,
                        loc: loc || '',
                        price: parseInt(price) || 0,
                        why: why || '',
                        link: link || '',
                        tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : []
                    });
                }
            }
            return;
        }
    } catch (error) {
        console.error('Error loading date ideas:', error);
    }
    // Fallback to defaults (deep copy)
    dateIdeas = JSON.parse(JSON.stringify(DEFAULT_DATE_IDEAS));
}

// --- Load Completed Dates from Sheets ---
async function loadCompletedDates() {
    try {
        const data = await SheetsAPI.read('CompletedDates');
        if (data && data.length > 0) {
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

// --- Load Calendar Events from Sheets ---
async function loadCalendarEvents() {
    try {
        const data = await SheetsAPI.read('CalendarEvents');
        calendarEvents = [];
        if (data && data.length > 0) {
            const startIndex = data[0][0] === 'id' ? 1 : 0;
            for (let i = startIndex; i < data.length; i++) {
                const [id, ideaId, ideaTitle, date, time, duration, location] = data[i];
                if (id) {
                    calendarEvents.push({
                        id, ideaId, ideaTitle, date, time,
                        duration: parseInt(duration) || 2,
                        location: location || ''
                    });
                }
            }
        }
    } catch (error) {
        console.error('Error loading calendar events:', error);
    }
    return calendarEvents;
}

// --- Load All Data in Parallel ---
async function loadAllData() {
    await Promise.all([
        loadCategories(),
        loadDateIdeas(),
        loadCompletedDates(),
        loadCalendarEvents()
    ]);
}

// --- Save a completed date ---
async function saveCompletedDate(ideaId, rating, completedDate) {
    completedDates[ideaId] = { rating, completedDate };
    const success = await SheetsAPI.append('CompletedDates', [ideaId, rating, completedDate]);
    if (success) {
        showToast('Date marked as done!', 'success');
    }
}

// --- Query Helpers ---
function isCompleted(ideaId) {
    return completedDates.hasOwnProperty(ideaId);
}

function getCompletionInfo(ideaId) {
    return completedDates[ideaId] || null;
}

function getAllDateIdeas() {
    const allItems = [];
    Object.entries(dateIdeas).forEach(([catId, items]) => {
        const cat = categories[catId];
        if (!cat) return;
        items.forEach(item => {
            allItems.push({ ...item, categoryId: catId, color: cat.color, catIcon: cat.icon });
        });
    });
    return allItems;
}

// --- Stats Dashboard ---
function getStats() {
    const allIdeas = getAllDateIdeas();
    const completedCount = Object.keys(completedDates).length;
    const totalCount = allIdeas.length;

    // Average rating
    const ratings = Object.values(completedDates).map(d => d.rating).filter(r => r > 0);
    const avgRating = ratings.length > 0
        ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
        : '\u2014';

    // Favorite category (most completed dates)
    const catCounts = {};
    Object.keys(completedDates).forEach(ideaId => {
        const idea = allIdeas.find(i => i.id === ideaId);
        if (idea) {
            catCounts[idea.categoryId] = (catCounts[idea.categoryId] || 0) + 1;
        }
    });
    const favCatId = Object.entries(catCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
    const favCat = favCatId ? categories[favCatId] : null;

    // Total spent on completed dates
    let totalSpent = 0;
    Object.keys(completedDates).forEach(ideaId => {
        const idea = allIdeas.find(i => i.id === ideaId);
        if (idea) totalSpent += idea.price;
    });

    return { completedCount, totalCount, avgRating, favCat, totalSpent };
}

// --- Countdown Banner ---
function getNextUpcomingEvent() {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const upcoming = calendarEvents
        .filter(e => e.date >= todayStr)
        .sort((a, b) => {
            const dA = new Date(a.date + 'T' + (a.time || '00:00'));
            const dB = new Date(b.date + 'T' + (b.time || '00:00'));
            return dA - dB;
        });
    return upcoming[0] || null;
}

function getDaysUntil(dateStr) {
    const now = new Date();
    const target = new Date(dateStr + 'T12:00:00');
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    return diff;
}

// --- Theme Management ---
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('dp-theme', next);
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.textContent = isDark ? '\u2600\uFE0F' : '\uD83C\uDF19';
    });
}

// --- Skeleton Helpers ---
function renderSkeletonCards(containerId, count = 4) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const card = document.createElement('div');
        card.className = 'skeleton-card';
        card.innerHTML = `
            <div class="skeleton skeleton-line" style="width: 40%; height: 14px;"></div>
            <div class="skeleton skeleton-line" style="width: 70%; height: 24px; margin-top: 12px;"></div>
            <div class="skeleton skeleton-line" style="width: 100%; height: 14px; margin-top: 12px;"></div>
            <div class="skeleton skeleton-line" style="width: 90%; height: 14px; margin-top: 6px;"></div>
            <div class="skeleton skeleton-line" style="width: 60%; height: 36px; margin-top: 20px; border-radius: 12px;"></div>
        `;
        container.appendChild(card);
    }
}

function renderSkeletonList(containerId, count = 5) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const item = document.createElement('div');
        item.className = 'skeleton-list-item';
        item.innerHTML = `
            <div class="skeleton skeleton-circle"></div>
            <div style="flex:1">
                <div class="skeleton skeleton-line" style="width: 80%; height: 14px;"></div>
                <div class="skeleton skeleton-line" style="width: 50%; height: 12px; margin-top: 6px;"></div>
            </div>
        `;
        container.appendChild(item);
    }
}

// --- Star Rating HTML ---
function getStarRatingHTML(rating, interactive = false, ideaId = '') {
    let html = '<div class="star-rating">';
    for (let i = 1; i <= 5; i++) {
        const filled = i <= rating;
        if (interactive) {
            html += `<span onclick="setRating('${ideaId}', ${i})" class="cursor-pointer">${filled ? '\u2B50' : '\u2606'}</span>`;
        } else {
            html += `<span>${filled ? '\u2B50' : '\u2606'}</span>`;
        }
    }
    html += '</div>';
    return html;
}

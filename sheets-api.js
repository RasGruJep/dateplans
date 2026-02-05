// Google Sheets API Helper Functions
// Includes localStorage caching with TTL and offline fallback

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// --- Toast Notification System ---
// Defined here so it's available before any API calls
function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icons = { info: '\u2139\uFE0F', warning: '\u26A0\uFE0F', error: '\u274C', success: '\u2705' };
    toast.innerHTML = `<span>${icons[type] || icons.info}</span> <span>${message}</span>`;

    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('toast-visible'));

    setTimeout(() => {
        toast.classList.remove('toast-visible');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// --- Sheets API with Caching ---
const SheetsAPI = {
    _getCache(key) {
        try {
            const cached = localStorage.getItem(`dp_cache_${key}`);
            if (cached) {
                const parsed = JSON.parse(cached);
                const fresh = (Date.now() - parsed.timestamp) < CACHE_TTL;
                return { data: parsed.data, fresh };
            }
        } catch (e) { /* localStorage unavailable */ }
        return null;
    },

    _setCache(key, data) {
        try {
            localStorage.setItem(`dp_cache_${key}`, JSON.stringify({
                data,
                timestamp: Date.now()
            }));
        } catch (e) { /* localStorage full or unavailable */ }
    },

    _clearCache(key) {
        try { localStorage.removeItem(`dp_cache_${key}`); } catch (e) {}
    },

    // Read data from a sheet (with caching + offline fallback)
    async read(sheetName, range = '') {
        const cacheKey = range ? `${sheetName}!${range}` : sheetName;
        const cached = this._getCache(cacheKey);

        // Return fresh cache immediately
        if (cached && cached.fresh) {
            return cached.data;
        }

        const rangeParam = range ? `${sheetName}!${range}` : sheetName;
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SHEET_ID}/values/${rangeParam}?key=${CONFIG.API_KEY}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const values = data.values || [];
            this._setCache(cacheKey, values);
            return values;
        } catch (error) {
            console.error('Error reading from sheet:', error);
            if (cached) {
                showToast('Using cached data \u2014 could not reach Google Sheets', 'warning');
                return cached.data;
            }
            showToast('Could not load data from Google Sheets', 'error');
            return [];
        }
    },

    // Write data to a sheet (append a row)
    async append(sheetName, rowData) {
        try {
            await fetch(CONFIG.APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'append', sheet: sheetName, row: rowData })
            });
            this._clearCache(sheetName);
            return true;
        } catch (error) {
            console.error('Error writing to sheet:', error);
            showToast('Failed to save \u2014 please try again', 'error');
            return false;
        }
    },

    // Update specific cells
    async update(sheetName, range, values) {
        try {
            await fetch(CONFIG.APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'update', sheet: sheetName, range, values })
            });
            this._clearCache(sheetName);
            return true;
        } catch (error) {
            console.error('Error updating sheet:', error);
            showToast('Failed to update \u2014 please try again', 'error');
            return false;
        }
    }
};

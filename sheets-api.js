// Google Sheets API Helper Functions

const SheetsAPI = {
    // Read data from a sheet
    async read(sheetName, range = '') {
        const rangeParam = range ? `${sheetName}!${range}` : sheetName;
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SHEET_ID}/values/${rangeParam}?key=${CONFIG.API_KEY}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.values || [];
        } catch (error) {
            console.error('Error reading from sheet:', error);
            return [];
        }
    },

    // Write data to a sheet (append a row)
    async append(sheetName, rowData) {
        try {
            const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Apps Script requires this
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'append',
                    sheet: sheetName,
                    row: rowData
                })
            });
            return true;
        } catch (error) {
            console.error('Error writing to sheet:', error);
            return false;
        }
    },

    // Update specific cells
    async update(sheetName, range, values) {
        try {
            const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'update',
                    sheet: sheetName,
                    range: range,
                    values: values
                })
            });
            return true;
        } catch (error) {
            console.error('Error updating sheet:', error);
            return false;
        }
    }
};

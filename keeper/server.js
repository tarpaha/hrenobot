'use strict';

const fastify = require('fastify')({ logger: false });
const { GoogleSpreadsheet } = require('google-spreadsheet');

const port = 8000;

var config = require('dotenv').config();
if(config.error)
{
    console.log(`Error loading env variables: ${config.error}`);
    process.exit(1);
}

var Dictionary;

const loadSpreadsheet = async (spreadsheetId, apiKey) => {
    const spreadsheet = new GoogleSpreadsheet(spreadsheetId);
    spreadsheet.useApiKey(apiKey);
    await spreadsheet.loadInfo();
    return spreadsheet;
}

const loadWorksheetRows = async (spreadsheet, worksheetIndex) => {
    const sheet = spreadsheet.sheetsByIndex[worksheetIndex];
    const rows = await sheet.getRows();
    return rows;
}

const updateDictionary = async () => {
    const spreadsheet = await loadSpreadsheet(process.env.SPREADSHEET_ID, process.env.API_KEY);
    const rows = await loadWorksheetRows(spreadsheet, 0);
    Dictionary = rows.map(row => {
        return { text: row.text, reaction: row.reaction };
    });
}

fastify.get('/records', async (req, res) => {
    return Dictionary;
});

fastify.get('/update', async (req, res) => {
    await updateDictionary();
    return { records: Dictionary.length };
});

const start = async () => {
    try {
        await updateDictionary();
        await fastify.listen(port, '0.0.0.0');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

start();
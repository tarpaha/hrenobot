'use strict';

const { GoogleSpreadsheet } = require('google-spreadsheet');

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

const loadDictionary = async () => {
    const spreadsheet = await loadSpreadsheet(process.env.SPREADSHEET_ID, process.env.API_KEY);
    var rows = await loadWorksheetRows(spreadsheet, 0);
    return rows.map(row => {
        return { text: row.text, reaction: row.reaction };
    });
}

const start = async () => {
    Dictionary = await loadDictionary();
    console.log(Dictionary);
}

start();
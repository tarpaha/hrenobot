'use strict';

const { GoogleSpreadsheet } = require('google-spreadsheet');

var Dictionary;
module.exports.getRecords = () => { return Dictionary; }
module.exports.getReaction = (text) => {
    const textInLowerCase = text.toLowerCase();
    const foundElement = Dictionary.find(el => el.text === textInLowerCase);
    return { reaction: foundElement ? foundElement.reaction : null };
}
module.exports.update = async () => {
    const spreadsheet = await loadSpreadsheet(process.env.SPREADSHEET_ID, process.env.API_KEY);
    const rows = await loadWorksheetRows(spreadsheet, 0);
    Dictionary = rows.map(row => {
        return { text: row.text.toLowerCase(), reaction: row.reaction };
    });
}

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
'use strict';

 // fixes warning about token cancellation in telegram bot api
process.env["NTBA_FIX_319"] = 1;

const config = require('dotenv').config();
if(config.error)
{
    console.log(`Error loading env variables: ${config.error}`);
    process.exit(1);
}

const respondentAddress = process.env.RESPONDENT_ADDRESS || 'localhost:8000';

const telegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new telegramBot(token, {polling: true});

bot.onText(/\/update/, (msg) => {
    axios.get(`http://${respondentAddress}/update`).then((response) => {
        bot.sendMessage(msg.chat.id, `Updated, records: ${response.data.records}`);
    });    
});

bot.on('message', (msg) => {
    if(msg.text.toString().toLowerCase() === '/update')
        return;
    bot.sendMessage(msg.chat.id, 'Pong: ' + msg.text);
});
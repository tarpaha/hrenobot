'use strict';

const axios = require('axios');

module.exports.get = async (librarianAddress, text) => {
    if (!text || (typeof text !== 'string'))
        return null;
    const response = await axios.get(
        `http://${librarianAddress}/get`, { params: { text: getLastWord(text) } });
    return response.data.reaction;
}

function getLastWord(text) {
    var words = text.match(/([\p{L}-]+)/ug);
    return words ? words.pop() : null;
}
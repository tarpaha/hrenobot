'use strict';

module.exports.get = async (text) => {
    return text && (typeof text === 'string')
        ? await getLastWord(text)
        : null;
}

async function getLastWord(text) {
    var words = text.match(/([\p{L}-]+)/ug);
    return words ? words.pop() : null;
}
'use strict';

module.exports.get = function(text) {
    return text && (typeof text === 'string')
        ? getLastWord(text)
        : null;
}

function getLastWord(text) {
    var words = text.match(/([\p{L}-]+)/ug);
    return words ? words.pop() : null;
}
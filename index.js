import { syllable } from 'syllable';

const getWords = (txt) => {
    let result = [];
    let words = txt.trim().split(/[\s/]/);

    for (const i in words) {
        let word = words[i].trim();
        if (word.length > 0 && word !== '.') {
            if (word.match(/[\w\d][.?!]$/)) word = word.replace(/[.?!]/, '');
            result.push(word);
        }
    }
    return result;
}

const getSentenceCount = (txt) => {
    txt = txt.trim();
    return txt.replace(/([.?!])\s+(?=\w)/g, "$1|").split("|").length;
}

const getSyllableCount = (words) => {
    let words_array = getWords(words);
    let result = 0;
    for (const i in words_array) {
        result += getSyllableCountByWord(words_array[i]);
    }
    return result;
}

const getSyllableCountByWord = (word) => {
    return syllable(word);
}

const stripSpecialTitles = (txt) => {
    txt = txt.replace(/\s(prof{1,2})\./g,' professor');
    txt = txt.replace(/\s(rev)\./g,' reverend');
    txt = txt.replace(/\s(rt\.\shon)\./g,' right honorary');
    txt = txt.replace(/\s(msgr)\./g,' monsignor');
    return txt.replace(/\s(dr|mr|mrs|jr|sr|esq|messrs|mmes)\./g,' title');
}

const stripOutSpecialCharacters = (txt) => {
    txt = txt.replace(/(\(|\)|;|:|,|-|—)/g,'');
    txt = txt.replace(/^\s*[\r\n]/gm, '');
    return txt;
}

const readingEaseTest = (totalWords, totalSentences, totalSyllables) => {
    return ( 206.835 - 1.015 * (totalWords / totalSentences) - 84.6 * (totalSyllables / totalWords));
}

const gradeLevelTest = (totalWords, totalSentences, totalSyllables) => {
    return ( 0.39 * (totalWords/totalSentences) + 11.8 * (totalSyllables/totalWords) - 15.59);
}

export const flekin = (text) => {
    if (typeof text !== 'string') throw new Error('text is not of type string');
    if (!text.length) throw new Error('text must not be an empty string');

    text = text.toLowerCase().trim();
    text = stripSpecialTitles(text);
    text = stripOutSpecialCharacters(text);
    let words = getWords(text);
    let wordcount = words.length;
    let sentencecount = getSentenceCount(text);
    let syllablecount = getSyllableCount(text);

    return {
        grade_level: parseFloat(gradeLevelTest(wordcount, sentencecount, syllablecount).toFixed(2)),
        reading_ease: parseFloat(readingEaseTest(wordcount, sentencecount, syllablecount).toFixed(2)),
        word_count: wordcount,
        syllable_count: syllablecount,
        sentence_count: sentencecount
    }
}
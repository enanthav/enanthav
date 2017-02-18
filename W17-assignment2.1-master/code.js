//
// this is just a stub for a function you need to implement
//

function numWords(txt) {
    var txt = txt.replace(/(\t|\r|\n+)/gm, " "); // trim spaces from ends and replace new line characters
    txt = txt.replace(/[".,'?+\/!@#$%\^&\*;:{}=\-_`~()]/gm, " ").trim();
    nWords = txt.split(/[ ]+/).length;
    return nWords;
}

function numLines(txt) {

    if (txt.length === 0) {
        return 0;
    }
    var count = txt.split(/\r\n|\r|\n/);
    return count;
}

function longestLine(txt){
    var max = 0;
    var array = txt.split(/\r\n|\r|\n/);
    for(var i = 0; i < array.length; i++){
        if (array[i].length > max) {
            max = array[i].length;
        }
    }
    return max;
}

function getStats(txt) {
    var stats = {}, nChars, nWords, nLines, maxLinelength, averageWordLength, palindromes, nNonEmptyLines, longestWords, mostFrequentWords;
    stats.nChars = txt.length;
    stats.nWords = numWords(txt);
    stats.nLines = numLines(txt).length;
    stats.nNonEmptyLines = txt.match(/^\s*\S/gm).length;
    /*
    stats.maxLineLength = longestLine(txt);
    stats.averageWordLength = avgWordLength(txt);
    stats.palindromes = findPalindromes(txt);

    stats.longestWords = tenLongestWords(txt);
    stats.mostFrequentWords = tenMostFrequentWords(txt);
    */
    return stats;
}
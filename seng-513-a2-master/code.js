//
// this is just a stub for a function you need to implement
//

function numWords(txt) {
    var trim = txt.trim();
    nWords = trim.split(/(\s+)/).length;
    return nWords;
}


function numLines(txt) {
    if (txt.length === 0) {
        return 0;
    }
    var count = txt.split(/\r\n|\r|\n/).length;
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


function avgWordLength(txt) {
    var average = 0;
    var array = txt.split(/(\s+)/);
    for(var i = 0; i < array.length; i++){
        average += array[i].length;
    }
    average = average/array.length;
    return average;
}


function tenMostFrequentWords(txt) {
    txt = txt.toLowerCase();
    txt = txt.replace(/[".,'?+\/!@#$%\^&\*;:{}=\-_`~()]/gm, " "); // remove punctuation
    var oldTxt = txt.split(" "); // split at space
    txt = txt.replace(/(\r|\n)/gm,""); // remove newline
    var wordCounts = {}; // create object

    oldTxt.forEach(function(key) {
        if (!wordCounts[key]) {
            wordCounts[key] = 0;
        }
        wordCounts[key] += 1;
    });

    /* PSEUDOCODE

    // sort the wordCounts by frequency
    var mostFrequent = [];
    for (var i = 0; i < 9; i++){
      mostFrequent[i] = wordCounts.word + "(" + wordCounts.frequency + ")";
    }
    // return mostFrequent;
    */
    return wordCounts;
}

// This function will return an array of palindromes (strings) in the order they appear
function findPalindromes(txt){
    txt = txt.toLowerCase();
    txt = txt.replace(/[.,'"?+\/!@#$%\^&\*;:{}=\-_`~()]/gm," "); // remove punctuation
    txt = txt.replace(/(\r|\n)/g,""); // remove newline
    var oldTxt = txt.split(" ");
    var array = [];
    var count = 0;
    for (var i = 0; i < oldTxt.length; i++){
      console.log(oldTxt[i]);
      console.log(oldTxt[i].split("").reverse().join(""));
      // check there is an alphanumerical palindrome that is >=2 characters long
      if (oldTxt[i] === oldTxt[i].split("").reverse().join("") && oldTxt[i].length >= 2){
        console.log(oldTxt[i].split("").reverse().join(""));
        array[count] = oldTxt[i];
        count++;
      }
    }
    return array;
}


function tenLongestWords(txt){
    txt = txt.toLowerCase();
    txt = txt.replace(/[.',"+\/#!$%\^&\*;:{}=\-_`~()]/gm, " "); // remove punctuation
    txt = txt.replace(/(\r|\n)/g,"");  // remove newline
    var oldTxt = txt.split(" "); // split at space

    // sort by length (ascending) and alphabetically
    oldTxt.sort(function(a, b) {return b.length - a.length || a.localeCompare(b);});

    var longest = [];

    // initialize first index of array
    longest[0] = oldTxt[0];

    for (var i = 1, h = 0; h < 9; i++){
      if (oldTxt[i] === longest[h]){
        i++;
      } else {
        // add 1 since longest[0] is already filled
        longest[h+1] = oldTxt[i];
        h++;
      }
    }
    return longest;
}


function getStats(txt) {
    var stats = {}, nChars, nWords, nLines, maxLinelength, averageWordLength, palindromes, nNonEmptyLines, longestWords, mostFrequentWords;
    stats.nChars = txt.length;
    stats.nWords = numWords(txt);
    stats.nLines = numLines(txt);
    stats.maxLineLength = longestLine(txt);
    stats.averageWordLength = avgWordLength(txt);
    stats.palindromes = findPalindromes(txt);
    stats.nNonEmptyLines = txt.match(/^\s*\S/gm).length;
    stats.longestWords = tenLongestWords(txt);
    stats.mostFrequentWords = tenMostFrequentWords(txt);
    return stats;
}


//
// this is just a stub for a function you need to implement
//

function numWords(txt) {
    var txt = txt.replace(/(\t|\r|\n+)/gm, " "); // replace new line characters
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

function avgWordLength(txt) {
    var txt = txt.replace(/(\t|\r|\n+)/gm, " "); // trim spaces from ends and replace new line characters
    txt = txt.replace(/[".,'?+\/!@#$%\^&\*;:{}=\-_`~()]/gm, " ").trim();
    array = txt.split(/[ ]+/);
    var average = 0;
    for (var i = 0; i < array.length; i++){
        average += array[i].length;
    }
    average = average/array.length;
    return average;
}

function findPalindromes(txt){
    txt = txt.toLowerCase();
    txt = txt.replace(/[.,'"?+\/!@#$%\^&\*;:{}=\-_`~()]/gm," "); // remove punctuation
    txt = txt.replace(/(\r|\n|\t)/g, " "); // remove newline
    var oldTxt = txt.split(/[ ]+/);
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
    txt = txt.toLowerCase(); // handle case sensitivity
    txt = txt.replace(/[".,'?+\/!@#$%\^&\*;:{}=\-_`~()]/gm, " "); // remove punctuation
    txt = txt.replace(/(\r|\n|\t)/gm," ").trim(); // remove newline characters
    var oldTxt = txt.split(/[ ]+/); // split at space

    // sort by length (ascending) and alphabetically
    oldTxt = oldTxt.sort(function(a, b) {return (b.length - a.length || a.localeCompare(b));});

    var longest = [];
    for(var i = 0; i < oldTxt.length; i++) 
    {
        // check if word in oldTxt[] is contained in longest[]
        if (longest.indexOf(oldTxt[i]) == -1){ // true when longest does contain an oldTxt word
            longest.push(oldTxt[i]); // add to word to longest[]
        };
    }
    return longest.slice(0,10); // return ten longest words
}

function tenMostFrequentWords(txt) {
    txt = txt.toLowerCase(); // handle case sensitivity
    txt = txt.replace(/[".,'?+\/!@#$%\^&\*;:{}=\-_`~()]/gm, " "); // remove punctuation
    txt = txt.replace(/(\r|\n|\t)/gm," ").trim(); // remove newline characters
    var oldTxt = txt.split(/[ ]+/); // split at space
    var wordCounts = {}; // create object

    // count number of times the word appears
    for(var i = 0; i < oldTxt.length; i++){
        wordCounts[oldTxt[i]] = (wordCounts[oldTxt[i]] || 0) + 1
    };

    var sorted = [];
    var val;
    for (val in wordCounts) {
        if (wordCounts.hasOwnProperty(val)) {
            sorted.push({
                "key": val,
                "value": wordCounts[val]
            });
        }
    }
    // sorted numerically and alphabetically
    sorted = sorted.sort(function(a, b) { return (b.value - a.value || a.key.localeCompare(b.key));});

    sorted = sorted.slice(0, 10); // ten most frequent words only

    // reformat array
    for (var i = 0; i < sorted.length; i++){
      sorted[i] = sorted[i].key + "(" + sorted[i].value + ")";
    }
    return sorted; 
}

function getStats(txt) {
    var stats = {}, nChars, nWords, nLines, maxLinelength, averageWordLength, palindromes, nNonEmptyLines, longestWords, mostFrequentWords;
    stats.nChars = txt.length;
    stats.nWords = numWords(txt);
    stats.nLines = numLines(txt).length;
    stats.nNonEmptyLines = txt.match(/^\s*\S/gm).length;
    stats.maxLineLength = longestLine(txt);
    stats.averageWordLength = avgWordLength(txt);
    stats.palindromes = findPalindromes(txt);
    stats.longestWords = tenLongestWords(txt);
    stats.mostFrequentWords = tenMostFrequentWords(txt);
    return stats;
}


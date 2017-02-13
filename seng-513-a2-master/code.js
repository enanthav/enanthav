//
// this is just a stub for a function you need to implement
//

function numWords(txt) {
    var trim = txt.trim();
    nWords = trim.split(" ").length;
    return nWords;
}


function numLines(txt) {
    if (txt.length === 0) {
        return 0;
    }
    var count = txt.split(/\r\n|\r|\n/).length;
    return count;
}

function numNonEmptyLines(txt){
    return txt.split(/\S\n|\S\r\n|\S\r/).length;
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
    var array = txt.split(" ");
    for(var i = 0; i < array.length; i++){
        average += array[i].length;
    }
    average = average/array.length;
    return average;
}
// Will contain the 10 most frequent words in the text, concatenated with their respective frequencies. 
// Use alphabetic sorting to to resolve frequency ties. The results will include the corresponding frequencies appended to the actual words surrounded by brackets.
function tenMostFrequentWords(txt) {
    txt = txt.toLowerCase();
    txt = txt.replace(/[".,'?+\/!@#$%\^&\*;:{}=\-_`~()]/gm, " "); // remove punctuation
    var oldTxt = txt.split(" "); // split at space
    var wordCounts = {}, word, frequency, i; // create object

    oldTxt.forEach(function(key)) {
        if (!wordCounts[key]) {
            wordCOunts[key] = 0;
        } else {
            wordCounts[key]++;
        }
    });

    oldTxt.sort(function(a, b) {
        return b.frequency - a.frequency;
    });

    return oldTxt;
}


// This function will return an array of palindromes (strings) in the order they appear
function findPalindromes(txt){
    txt = txt.toLowerCase();
    txt = txt.replace(/[".,'?+\/!@#$%\^&\*;:{}=\-_`~()]/gm," "); // remove punctuation
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
    txt = txt.replace(/[".,'?+\/!@#$%\^&\*;:{}=\-_`~()]/gm, ""); // remove punctuation
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

    // var word = {nChars: 0, nWords }
    var nChars = txt.length;
    var nWords = numWords(txt);
    var nLines = numLines(txt);
    var maxLineLength = longestLine(txt);
    var averageWordLength = avgWordLength(txt);
    var nNonEmptyLines = txt.split(/\S\r\n|\S\r|\S\n/).length;
    var longestWords = tenLongestWords(txt);
    return longestWords;
    /*return {
        nChars: 123,
        nWords: 22,
        nLines: 10,
        nNonEmptyLines: 22,
        averageWordLength: 3.3,
        maxLineLength: 33,
        palindromes: ["12321", "kayak", "mom"],
        longestWords: ["xxxxxxxxx", "123444444"],
        mostFrequentWords: [ "hello(7)", "world(1)" ]
    }*/;
}


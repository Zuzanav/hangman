// Load when DOM is ready
$(document).ready(function() {

// VARIABLES =====================================================================================

//--------------------------------------------------------------------------------------
// Array with all letters of the alphabet for computer to choose from 

let words = ["demogorgan", "upside down", "eleven", "hawkins", "spy", "waffles", 
"magnets", "hopper", "starcourt"];


// VARIABLES FOR SCORES
let wins = 0;
let losses = 0;
let guesses = 6;
let characterGuessed;

// COMPUTER SELECTS RANDOM WORD --------------------------
let randomWord = words[Math.floor(Math.random()*words.length)]
console.log(randomWord);

//-------------------------------------------------------------------------


// FUNCTIONS  =====================================================================================

// array defined to hold the answer and display on DOM
let answerArray = [];

    // loop creates x amount of underscores "_" based on amount of characters in selected word
    for (let i=0; i<randomWord.length; i++){
        answerArray[i] = "_"
    };

// saving character count from selected word for comparison later...
let wordCharCount = randomWord.length;

console.log(answerArray);

//write underscores to the DOM 
$(document).ready(function(){ 
    $("#randomWord").html(answerArray);
})









});  // end document ready function
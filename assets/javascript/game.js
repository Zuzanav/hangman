// Load when DOM is ready
$(document).ready(function() {

// VARIABLES =====================================================================================

//--------------------------------------------------------------------------------------
// Array with all letters of the alphabet for computer to choose from 

let words = ["demogorgan", "upside down", "eleven", "hawkins", "spy", "waffles", 
"magnets", "hopper", "starcourt"];


// variables for scores 
let wins = 0;
let losses = 0;
let guesses = 6;
let characterGuessed;

// array defined to hold the answer and display on DOM
let answerArray = [];

//-------------------------------------------------------------------------


// GAME SET UP  =====================================================================================

// computer selects a random word from array
let randomWord = words[Math.floor(Math.random()*words.length)]
console.log(randomWord);

// SET UP BOARD -----------------------------------------------------------------------------
// loop creates x amount of underscores "_" based on amount of characters in selected word
for (let i=0; i<randomWord.length; i++){
    answerArray[i] = "_"
};

// saving character count from selected word for comparison later...
let wordCharCount = randomWord.length;

console.log(answerArray);

//print underscores to the DOM 
$(document).ready(function(){ 
    $("#randomWord").html(answerArray);
});
// -----------------------------------------------------------------------------------------


// EVENTS =====================================================================================

// Watch for user to press a key
document.onkeyup = function () {

    // save pressed key
    let letterGuessed = event.key;

    console.log(letterGuessed);

}


// -----------------------------------------------------




});  // end document ready function
// Load when DOM is ready
$(document).ready(function() {

// VARIABLES =====================================================================================

//--------------------------------------------------------------------------------------
// Array with all letters of the alphabet for computer to choose from 

let words = ["demogorgan", "upside down", "eleven", "hawkins", "spy", "waffles", 
"magnets", "hopper", "starcourt"];


// Variables for Scores
let wins = 0;
let losses = 0;
let guesses = 6;
let characterGuessed;

//-------------------------------------------------------------------------


// FUNCTIONS  =====================================================================================

// COMPUTER SELECTS RANDOM WORD --------------------------
    function selectRandomWord() {
        let randomWord = words[Math.floor(Math.random()*words.length)]
        return randomWord;
    };

    let randomWord = selectRandomWord();

    console.log(randomWord);





});  // end document ready function
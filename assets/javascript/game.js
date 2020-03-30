// Load when DOM is ready
$(document).ready(function() {

// VARIABLES =====================================================================================

//--------------------------------------------------------------------------------------
// Array with all letters of the alphabet for computer to choose from 

let words = ["demogorgan", "eleven", "hawkins", "spy", "waffles", 
"magnets", "hopper", "starcourt", "dart"];


// variables for scores 
let guesses = 6;
let characterGuessed;
let numChars = 0;


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

// split randomWord into its individual characters
let charsArray = Array.from(randomWord)

console.log(answerArray);
console.log("words characters: " + charsArray);

//print underscores to the DOM 
$(document).ready(function(){ 
    $("#randomWord").html(answerArray);
});
// -----------------------------------------------------------------------------------------


// FUNCTIONS ==================================================================================



function game(){

    // save user's guessed letter
    let letterGuessed = event.key;
    console.log(letterGuessed);

    var n = charsArray.includes(letterGuessed);

    // if character array does include letter guessed by user...
    if (n === true ) {

        numChars++;

        // run this for loop...
        for (let i=0; i < charsArray.length; i++) {

            // if the character in the array matches the letter guessed by user...
            if (charsArray[i] === letterGuessed) {
                //update that character/letter in answerArray
                answerArray[i] = letterGuessed;
                console.log("new answer array" + answerArray);
                //and re-render answerArray to the DOM to show user's answer
                $("#randomWord").html(answerArray);
                // increase amount of 
                
                }
            }
    // if character array does NOT include letter guessed by user...
    } else {
        guesses--;
        $("#guesses").html("Guesses left: " + guesses);
        console.log("Guesses Left: " + guesses);
    }

    if (!answerArray.includes("_")) {
        setTimeout(function(){
            alert("winner!");
        }, 500); //wait 500 milliseconds
    }

};




// -----------------------------------------------------------------------------------------


// EVENTS =====================================================================================

// Watch for user to press a key
document.onkeyup = function () {

    // Fail Safe - if key pressed does not equate to a letter A-Z, alert the player 
    if ( !(event.keyCode >= 65 && event.keyCode <= 90 ) ) {
        alert("Please select a letter only.")
    
    // if key pressed is letter A-Z, continue game 
     } else {
        game();
     }

}


// -----------------------------------------------------




});  // end document ready function
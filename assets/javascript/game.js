// =======================================================================================
// LOAD WHEN DOM IS READY ---------------------------------------------------
$(document).ready(function() {
    
    // HIDE GAME TEXT
    $('#text-container').css('visibility','hidden');

    // START BUTTON
    $('#resetButton').css('visibility','visible');

    // WATCH FOR USER TO CLICK START BUTTON ----------------------------------
    document.getElementById("resetButton").onclick = function () {
        // RUN THE GAME
        wholeGame();
        }
});
// -------------------------------------------------------------------------------------


// HANGMAN GAME CONTAINER ================================================================
function wholeGame() {
    
    // HIDE GAME TEXT
    $('#text-container').css('visibility','visible');

    // VARIABLES ----------------------------------------------------------------
    // Array with all letters of the alphabet for computer to choose from 
    let words = ["demogorgan", "eleven", "hawkins", "spy", "waffles", 
    "magnets", "hopper", "starcourt", "dart", "joyce", "mouthbreather", "arcade", "dustin"];

    // Amount of guesses per round 
    let guesses = 6;

    // Display to users amount of guesses left 
    $("#guesses").html("GUESSES LEFT: " + guesses);

    // array defined to hold the answer and display on DOM
    let answerArray = [];

    // array defined to hold INCORRECT answers
    let wrongAnswers = [];

    //setup Reset Button - hidden until end of game
    $('#resetButton').css('visibility','hidden');
    //--------------------------------------------------------------------------


    // GAME SET UP  =============================================================

    // computer selects a random word from array
    let randomWord = words[Math.floor(Math.random()*words.length)]
    console.log(randomWord);

    // SET UP BOARD --------------------------------------------------------------
    // loop creates x amount of underscores "_" based on amount of characters in selected word
    for (let i=0; i<randomWord.length; i++){
        answerArray[i] = "_"
    };

    // split randomWord into its individual characters
    let charsArray = Array.from(randomWord)

    console.log(answerArray);
    console.log("words characters: " + charsArray);

    //print underscores to the DOM 
    $(document).ready(function(){ 
        $("#randomWord").html(answerArray);
    });


    // -------------------------------------------------------------------------------


    // FUNCTIONS =====================================================================

    function game() {

        // FIRST ---------------------------------------------
        // save user's guessed letter
        let letterGuessed = event.key;
        console.log(letterGuessed);

        // SECOND -------------------------------------------
        // compare user's guess with characters in array
        var correctGuess = charsArray.includes(letterGuessed);

        // THIRD --------------------------------------------
        // If/Else Statement to guide game on correct or incorrect guess 

        // if user selects a letter they already guessed correctly...
        if (answerArray.includes(letterGuessed)) {
            alert("You already picked that")

        // IF user DID NOT CORRECLTY guess a letter correctly...
        } else if (correctGuess === !true) {
            
            // wrong answer is compared to array which stores incorrect guesses
            var repeat = wrongAnswers.includes(letterGuessed)

                // if answer is in wrongArray, it is a repeat and user will be notified
                if (repeat === true) {
                        alert("You already guessed that letter")
                } else {
                        // decrease guesses left by 1
                        guesses--;

                        // update guesses left on DOM 
                        $("#guesses").html("GUESSES LEFT: " + guesses);
                        console.log("Guesses Left: " + guesses);

                        // push wrong guess to array for later comparison
                        wrongAnswers.push(letterGuessed);
                        console.log("Wrong Answer: " + wrongAnswers);
                        }

        }

        // IF user CORRECTLY guessed a letter...
        else if (correctGuess === true ) {

            // run this for loop ...
            for (let i=0; i < charsArray.length; i++) {

                // if the character in the array matches the letter guessed by user...
                if (charsArray[i] === letterGuessed) {

                    //update that character/letter in answerArray
                    answerArray[i] = letterGuessed;
                    console.log("new answer array" + answerArray);

                    //and re-render answerArray to the DOM to show user's answer
                    $("#randomWord").html(answerArray);
                    }
                }

        } // ---------------------- end of if/else statement


        // FOURTH | DETERMINING THE WIN ------------------------------------------
        // IF the answerArray doesn't include anymore underscores - user WINS!
        if (!answerArray.includes("_")) {
            setTimeout(function(){
                alert("winner!");
                $('#resetButton').html('Play Again!').css('visibility','visible');
            }, 500); //wait 500 milliseconds to allow last letter to render on the DOM 
            document.onkeyup = function (e) {
                e.preventDefault(); 
            }
        // ELSE IF user RUNS OUT of Guesses - user LOSES!
        } else if (guesses === 0) {
        
            setTimeout(function(){
                alert("you lose!");
                $('#resetButton').html('Play Again!').css('visibility','visible');
            }, 500); //wait 500 milliseconds to allow last letter to render on the DOM 
            document.onkeyup = function (e) {
                e.preventDefault(); 
            }
        };

    };
    // --------------------------------------------------------------------------------


    // EVENTS =========================================================================

    // WATCH FOR USER TO CLICK A KEY ------------------------------------------
    document.onkeyup = function () {

        // Fail Safe - if key pressed does not equate to a letter A-Z, alert the player 
        if ( !(event.keyCode >= 65 && event.keyCode <= 90 ) ) {
            alert("Please select a letter only.")
        
        // if key pressed is letter A-Z, continue game 
        } else {
            game();
        }
    }

    // WATCH FOR USER TO CLICK RESET BUTTON -----------------------------------
    document.getElementById("resetButton").onclick = function () {
        wholeGame();
    }


    // -----------------------------------------------------

}
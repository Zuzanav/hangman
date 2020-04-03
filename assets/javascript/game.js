// =======================================================================================
// LOAD WHEN DOM IS READY ---------------------------------------------------
$(document).ready(function() {
    
    // HIDE GAME TEXT
    $('#score-box').css('visibility','hidden');
    $('#randomWord').css('visibility','hidden');
    $('#you-win').css('visibility','hidden');
    // $('#buttons').css('display','none');

    // START BUTTON
    $('#resetButton').css('visibility','visible');


    // MUSIC CONTROLLERS ----------------------------------------------

    // When Musical Note button is pressed, play music 
    document.getElementById("music-player").onclick = function () {
        document.getElementById("music-controller").play();
    }

    // When pause button is pressed, paused music 
    document.getElementById("pause-player").onclick = function () {
        document.getElementById("music-controller").pause();
    }


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
    $('#score-box').css('visibility','visible');
    $('#randomWord').css('visibility','visible');
    $('#you-win').css('visibility','hidden');

    // FOR MOBILE ONLY ------------------------------------------------------------

    // define alphabet for mobile-screen keyboard
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];

      
    // collect the viewportWidth user is on
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;

        // IF the user is on Mobile (770px or less), then...
        if (viewportWidth <= 771) {

            // display the buttons DIV 
            $('#buttons').css('display','block');

            // var btnBox = document.createElement("DIV");
            // btnBox.id = "buttons";
            // console.log("HELLO: " + btnBox.id);

            // hide box that displays incorrect guesses 
            $('#letters-guessed-box').css('display','none')

            function dynamicEvent() {
                var guess = (this.innerHTML);
                console.log(guess);
                $(this).css('color', '#FB3287');
                $(this).css('border', '1px solid #FB3287');
                game(guess);
              }

            // Run loop through alphabet ... 
            for (i=0; i < alphabet.length; i++) {

                //create a button for each letter 
                var btn = document.createElement("BUTTON");
                //give button class
                btn.id = "azButton";
                //include letter from the alphabet
                btn.innerHTML = alphabet[i];
                //add to the buttons DIV in HTML 
                document.getElementById("buttons").appendChild(btn)
                //on button click, run dynamicEvent function
                btn.onclick = dynamicEvent;
            }
        
        } // end IF statement for Mobile 


    //===========================================================================

    // VARIABLES ----------------------------------------------------------------
    // Array with all letters of the alphabet for computer to choose from 
    let words = ["demogorgan", "eleven", "hawkins", "spy", "waffles", 
    "magnets", "hopper", "starcourt", "dart", "joyce", "arcade", "dustin"];

    // Amount of guesses per round 
    let guesses = 6;

    // Display to users amount of guesses left 
    $("#guesses").html(guesses);

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

    $("#all-guesses").html(wrongAnswers);


    // -------------------------------------------------------------------------------


    // FUNCTIONS =====================================================================

    function game(guess) {

        // FIRST ---------------------------------------------
        // save user's guessed letter
        let letterGuessed = event.key;

        if (letterGuessed = "undefined") {
            letterGuessed = guess;
        };
        console.log("LETTER GUESSED: " + letterGuessed);

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
                        $("#guesses").html(guesses);
                        console.log("Guesses Left: " + guesses);

                        // push wrong guess to array for later comparison
                        wrongAnswers.push(letterGuessed);
                        console.log("Wrong Answer: " + wrongAnswers);
                        
                        $("#all-guesses").html(wrongAnswers);

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

        function disableKeyboard() {
        // RESET THE KEYBOARD - MOBILE ONLY ------------
        // retreive the "buttons" DIV
        var btnDiv = document.getElementById('buttons');
        // remove all the individual letter buttons (all childs) 
        while (btnDiv.firstChild) btnDiv.removeChild(btnDiv.firstChild);
        }
        //----------------------------------------------

        // FOURTH | DETERMINING THE WIN ------------------------------------------
        // IF the answerArray doesn't include anymore underscores - user WINS!
        if (!answerArray.includes("_")) {

            setTimeout(function(){

                $('#you-win').css('visibility','visible').html("YOU WIN");
                $('#resetButton').html('Play Again!').css('visibility','visible');
                disableKeyboard()

            }, 500); //wait 500 milliseconds to allow last letter to render on the DOM 
            document.onkeyup = function (e) {
                e.preventDefault(); 
            }
        // ELSE IF user RUNS OUT of Guesses - user LOSES!
        } else if (guesses === 0) {
        
            setTimeout(function(){
                $('#you-win').css('visibility','visible').html("YOU LOSE");
                disableKeyboard()


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



        // RESTART GAME --------
        wholeGame();
    }
    // -----------------------------------------------------
}
//define global variables
var words = [
    "chevrolet",
    "ford",
    "chrysler",
    "dodge",
    "buick",
    "pontiac",
    "cadillac",
    "jeep",
    "mercury",
    "tesla",
    "freightliner",
    "peterbilt",
    "volvo",
    "international",
    "kenworth",
    "sterling",
    "honda",
    "toyota",
    "suzuki",
    "lexus",
    "mitsubishi",
    "subaru",
    "scion",
    "nissan",
    "fiat",
    "genesis",
    "hyundia",
    "infinty",
    "jaguar",
    "bentley",
    "porsche",
    "ferrari",
    "lamboghini",
    "lotus",
    "maserati",
    "land rover",
    "mercedes",
    "volkswagen",
];
var randoWord = "";
var displayWord = [];
var parsedWord = "";
var keyPress;
var timeLeft = 15;
var timerInterval;
var wins = localStorage.getItem("wins");
var losses = localStorage.getItem("losses");
var winDisplay = document.querySelector(".win");
var lossDisplay = document.querySelector(".lose");
var startButton = document.querySelector(".start-button");
var wordBlanks = document.querySelector(".word-blanks");
var timerCount = document.querySelector(".timer-count");

//check if local storage is null and set to 0 if so
if (wins == null) {
    wins = 0;
}
if (losses == null) {
    losses = 0;
};


//display local storage w/l
winDisplay.textContent = wins;
lossDisplay.textContent = losses;

//start game when start button is clicked
startButton.addEventListener("click", startGame);

//get random word and display it as blanks
function startGame() {
    displayWord = [];
    // get random number
    function getRandomNum(max) {
        return Math.floor(Math.random() * max);
    };
    
    // set randoWord to a random word from words array
    randoWord = words[getRandomNum(words.length)];
    
    //set display word to a string of _ seperated by spaces the length of word
    for (i = 0; i < randoWord.length; i++) {
        let blank = ["_ "];
        displayWord = displayWord.concat(blank);
    };
    
    // console.log(randoWord);
    
    //display the text
    wordBlanks.textContent = displayWord.join('');
    playGame();
};

function playGame() {
    //start timer
    timeLeft = 15;
    timer();

    //check if keypress = a letter in the word
    document.addEventListener('keydown', function(event) {
        var key = event.key.toLowerCase();
        var occurance = "";
        var position = randoWord.indexOf(key, 0);
        
        // console.log(key);

        // replace correct letters in displyWord array
        while (position !== -1) {
            var correctLetter = key + " ";
            let replaced = displayWord.splice(position, 1, correctLetter);
            position = randoWord.indexOf(key, position + 1);
        };

        //display replaced text on screen
        wordBlanks.textContent = displayWord.join('');

        //convert displayWord to string without spaces and save in variable
        parsedWord = displayWord.join("");
        parsedWord = parsedWord.split(' ').join('');
    });
};

function timer() {
    //reset parsedWord
    parsedWord = "";

    clearInterval(timerInterval);

    //reset displayed time
    timerCount.textContent = timeLeft;
    
    //start timer
    timerInterval = setInterval(function() {
        timeLeft--;
        timerCount.textContent = timeLeft; //display countdown
        
        //end timer if state occurs, display win and write to local storage
        if (timeLeft !== 0 && randoWord === parsedWord) {
            clearInterval(timerInterval);
            alert("You Win!");
            wins++
            winDisplay.textContent = wins;
            localStorage.setItem("wins", wins);
        //end timer if out of time, display loss and write to local storage
        } else if (timeLeft === 0) {
            clearInterval(timerInterval);
            alert("You lose." + "\n" + "The answer was " + randoWord);
            losses++;
            lossDisplay.textContent = losses;
            localStorage.setItem("losses", losses);
        }

    }, 1000); //interval in milliseconds
};

console
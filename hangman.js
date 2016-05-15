// Declare the list of words
var words = ["Skywalker", "Tatooine", "Wookiee", "Vader", "Stormtrooper", "Empire", "Rebellion", "Threepio", "Artoo", "Blaster"];
for(i=0; i<words.length; i++)
  {
    words[i] = words[i].toUpperCase();
  }

// Choose a random word to guess
var index = Math.floor(Math.random() * words.length);
var word = words[index];

// Get all elements
var wordBox = document.getElementById('word');
var pastGuessesBox = document.getElementById('pastGuesses');
var missesBox = document.getElementById('misses');
var resultBox = document.getElementById('result');

// Initialize the game
var guessedIndices = [];
var guessedLetters = []; // used?
var pastGuessesText = "";
var misses = 0;

// Renders the word
function renderWord(){
  // Render the current state of the word
  var currentWord = "";
  for(i=0; i<word.length; i++){
    // Render guessed letters
    if(guessedIndices.indexOf(i) > -1){
      currentWord += word[i];
    }
    // Render masked letters
    else{
      currentWord += '-';
    }
  }    
  return currentWord;
}

// Starts the game
function start(){
  // Initialize the word
  wordBox.innerText = renderWord();
  
  // Initialize the counter for misses
  missesBox.innerText = misses;
}

// Checks the next guess
function guess(){
  // Get the guess
  var guessInput = document.getElementById('nextGuess');
  var nextGuess = guessInput.value.toUpperCase();
  
  // Skip if letter was already guessed
  if (guessedLetters.indexOf(nextGuess) > -1){
    alert("Already guessed!");
    return;
  }
  
  // Add to the letters already guessed
  guessedLetters.push(nextGuess);
  pastGuessesText += nextGuess;
    
  // Loop to find matches in the word
  var isMatch = false;
  for (i=0; i< word.length; i++){
    if (word[i] == nextGuess){
      guessedIndices.push(i);
      isMatch = true;
    }      
  }
  
  // Increment counter if guess is a miss
  if (!isMatch)
    misses++;
  
  // Reset input
  guessInput.value = "";
  
  // Update the current number of misses
  missesBox.innerText = misses;
  
  // Update the word
  wordBox.innerText = renderWord();
  
  // Update the past guesses
  pastGuessesBox.innerText = pastGuessesText;
  
  // Check if won
  if (guessedIndices.length == word.length){
    resultBox.innerText = "You won!";
    return;
  }
        
  // Check if lost
  if (misses == 9){
    resultBox.innerText = "You lost!";
  }
}
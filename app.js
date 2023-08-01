// Define global variables
let words = [];
let currentWordIndex = 0;

// Define utility functions
const fn = {};

// Load a page into the navigator
fn.load = function (page) {
  const navigator = document.querySelector("#navigator");
  navigator.bringPageTop(page);
};

// Load the next word in the learn page
fn.nextWord = function () {
  // Get the current word and its collocations
  const word = words[currentWordIndex];
  const collocations = word.collocations;

  // Update the word card with the new word and its collocations
  const wordElement = document.querySelector("#word");
  const collocationsElement = document.querySelector("#collocations");
  wordElement.textContent = word.word;
  collocationsElement.innerHTML = "";
  for (const collocation of collocations) {
    const button = document.createElement("ons-button");
    button.textContent = collocation;
    button.onclick = () => fn.checkAnswer(collocation);
    collocationsElement.appendChild(button);
  }

  // Increment the current word index
  currentWordIndex = (currentWordIndex + 1) % words.length;
};

// Check the user's answer
fn.checkAnswer = function (collocation) {
  // Get the current word and its correct collocation
  const word = words[currentWordIndex - 1];
  const correctCollocation = word.collocation;

  // Check if the user's answer is correct
  if (collocation === correctCollocation) {
    // Display a success icon
    ons.notification.toast("Correct!", { buttonLabel: "OK", timeout: 2000 });
  } else {
    // Display an error icon
    ons.notification.toast("Incorrect!", { buttonLabel: "OK", timeout: 2000 });
  }
};

// Load words from the JSON file
fn.loadWords = function () {
  // Use fetch to load the JSON file
  fetch("words.json")
    .then((response) => response.json())
    .then((data) => {
      // Store the words in the global variable
      words = data.words;
      fn.nextWord();
    });
};

// Save changes to GitHub
fn.saveChanges = function () {
  // Collect user input for GitHub account and password
  const emailInput = document.querySelector("#email-input");
  const passwordInput = document.querySelector("#password-input");
  const email = emailInput.value;
  const password = passwordInput.value;

  // Use GitHub API to save changes
  // ...
};

// Initialize the app
ons.ready(function () {
  // Load words from the JSON file
  fn.loadWords();
});

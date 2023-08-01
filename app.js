Here’s a possible implementation of the learn.html template and the corresponding JavaScript code for loading a random word from the JSON file, displaying the collocations, checking the answer, and displaying feedback icons:

<!-- Define the learn page template -->
<template id="learn.html">
    <ons-page>
        <!-- Use ons-toolbar to display a header with a back button -->
        <ons-toolbar>
            <div class="left">
                <ons-back-button>Back</ons-back-button>
            </div>
            <div class="center">Learn</div>
        </ons-toolbar>

        <!-- Use ons-card to display a word and its collocations -->
        <ons-card id="word-card">
            <!-- Use JavaScript to load a random word from the JSON file -->
            <h2 id="word"></h2>
            <div id="collocations"></div>
        </ons-card>

        <!-- Use ons-fab to display a button to go to the next word -->
        <ons-fab position="bottom right" onclick="nextWord()">
            <ons-icon icon="md-arrow-forward"></ons-icon>
        </ons-fab>
    </ons-page>
</template>
Kopieren
// Define global variables
let words = [];
let currentWordIndex = 0;

// Load words from the JSON file
function loadWords() {
    fetch('words.json')
        .then(response => response.json())
        .then(data => {
            words = data.words;
            nextWord();
        });
}

// Load the next word
function nextWord() {
    // Get the current word and its collocations
    const word = words[currentWordIndex];
    const collocations = word.collocations;

    // Update the word card with the new word and its collocations
    const wordElement = document.querySelector('#word');
    const collocationsElement = document.querySelector('#collocations');
    wordElement.textContent = word.word;
    collocationsElement.innerHTML = '';
    for (const collocation of collocations) {
        const button = document.createElement('ons-button');
        button.textContent = collocation;
        button.onclick = () => checkAnswer(collocation);
        collocationsElement.appendChild(button);
    }

    // Increment the current word index
    currentWordIndex = (currentWordIndex + 1) % words.length;
}

// Check the user's answer
function checkAnswer(collocation) {
    // Get the current word and its correct collocation
    const word = words[currentWordIndex - 1];
    const correctCollocation = word.collocation;

    // Check if the user's answer is correct
    if (collocation === correctCollocation) {
        // Display a success icon
        ons.notification.toast('Correct!', {buttonLabel: 'OK', timeout: 2000});
    } else {
        // Display an error icon
        ons.notification.toast('Incorrect!', {buttonLabel: 'OK', timeout: 2000});
    }
}

// Initialize the app
window.addEventListener('load', () => {
    loadWords();
});
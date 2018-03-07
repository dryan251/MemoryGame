/*
 * Create a list that holds all of your cards
 */
let listOfCards;
let deckBoard = document.querySelector('.deck');
let cardSymbols = []; //array to hold symbols
let cardsCompare = []; //array to hold 2 cards for compare
let hitCounter = 0;
let firstCardIndex = 0;
let pairsToDiscover = 8;

//get symbols from cards
let cards = document.querySelectorAll(".deck .card");
for (let i = 0; i < cards.length; i++) {
    cardSymbols[i] = cards[i].firstElementChild.className;
}

function setBoard() {
    cardSymbols = shuffle(cardSymbols);
    for (let i = 0; i < cards.length; i++) {
        cards[i].firstElementChild.className = cardSymbols[i];
    }
    updateScore(0);
}

//function to hide the card
function hideCard(index) {
    cards[index].className = 'card';
}

//function to show the card
function showCard(index) {
    cards[index].classList.add('open', 'show');
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
setBoard();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//set up the listener event for cards

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function() {
        if (!cards[i].classList.contains("match")) {
            hitCounter++;
            showCard(i);
            if (hitCounter > 0) {
                if (hitCounter % 2 === 1) {
                    firstCardIndex = i;
                } else {
                    verifyMatch(i);
                    updateScore(hitCounter);
                }
            }
        }
    });
}

function updateScore(val) {
    document.querySelector('.moves').textContent = (val / 2).toFixed(0);
    if (hitCounter === 22 || hitCounter === 28 ||
        hitCounter === 36) deleteStar();
}

function deleteStar() {
    let star = document.querySelector('.stars');
    star.firstElementChild.remove();
}

//check if 2 cards match
function verifyMatch(index) {
    if (cards[index].firstElementChild.className === cards[firstCardIndex].firstElementChild.className) {
        //we have a match, lock the cards
        cards[index].classList.add('match');
        cards[firstCardIndex].classList.add("match");
        pairsToDiscover--;
        if (pairsToDiscover === 0) winGame();
    } else {
        window.setTimeout(function() {
            hideCard(index);
            hideCard(firstCardIndex);
        }, 800);
    }
}

function winGame() {
    console.log("You won !!!")
}
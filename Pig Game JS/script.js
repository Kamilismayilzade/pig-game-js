'use strict';

// Selecting Elements
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  // Starting conditions

  // Current score; initial
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  playerEl0.classList.remove('player--winner');
  playerEl1.classList.remove('player--winner');
  playerEl0.classList.add('player--active');
  playerEl1.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  playerEl0.classList.toggle('player--active');
  playerEl1.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1; // from 0 to 5 , we are adding 1
    console.log(dice);

    // 2. Displaying it on screen
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Checkfor rolled 1; if true switch to the next player

    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // change later
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to the active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    console.log(scores[activePlayer]);

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2.Check if player's score >=100
    if (scores[activePlayer] >= 20) {
      // Finish the game
      playing = false;

      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

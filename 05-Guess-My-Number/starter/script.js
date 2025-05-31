'use strict';

// console.log(document.querySelector('.message').textContent);
//
// document.querySelector('.message').textContent = 'Correct Number!';
//
// console.log(document.querySelector('.message').textContent);
//
// console.log(document.querySelector('.guess').value);
//
// document.querySelector('.guess').value = 23;
//
// console.log(document.querySelector('.guess').value);

const displayMessage = message => {
  document.querySelector('.message').textContent = message;
};

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (score <= 1) {
    displayMessage('💥 You lost the game!');
    return;
  }

  if (!guess) {
    displayMessage('⛔️ No number!');
  } else if (guess === secretNumber) {
    displayMessage(' Correct Number!');
    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('body').style.backgroundColor = '#60b347';

    document.querySelector('.number').style.width = '30rem';

    highScore < score ? (highScore = score) : score;
    document.querySelector('.highscore').textContent = highScore;
  } else if (guess !== secretNumber) {
    displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
    score--;
    document.querySelector('.score').textContent = score;
  }
});

document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
  displayMessage('Start guessing...');
});

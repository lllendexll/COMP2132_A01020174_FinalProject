//Define game state
let gameState = {
  playerScore: 0,
  computerScore: 0,
  round: 0,
};

//Roll a dice
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

//Calculate the score based on the dice roll
function calculateScore(dice1, dice2) {
  if (dice1 === 1 || dice2 === 1) {
      return 0;
  } else if (dice1 === dice2) {
      return (dice1 + dice2) * 2;
  } else {
      return dice1 + dice2;
  }
}

//Update the display
function updateDisplay() {
  $('#player-dice-1').fadeOut(0, function() {
    $(this).attr('src', `img/dice-${gameState.playerDice1}.png`).fadeIn(500);
  });
  $('#player-dice-2').fadeOut(0, function() {
    $(this).attr('src', `img/dice-${gameState.playerDice2}.png`).fadeIn(500);
  });
  $('#computer-dice-1').fadeOut(0, function() {
    $(this).attr('src', `img/dice-${gameState.computerDice1}.png`).fadeIn(500);
  });
  $('#computer-dice-2').fadeOut(0, function() {
    $(this).attr('src', `img/dice-${gameState.computerDice2}.png`).fadeIn(500);
  });
  $('#player-round-score').text(gameState.playerRoundScore);
  $('#computer-round-score').text(gameState.computerRoundScore);
  $('#player-total-score').text(gameState.playerScore);
  $('#computer-total-score').text(gameState.computerScore);
}

// Play a round
function playRound() {
  if (gameState.round < 3) {
      gameState.playerDice1 = rollDice();
      gameState.playerDice2 = rollDice();
      gameState.computerDice1 = rollDice();
      gameState.computerDice2 = rollDice();

      gameState.playerRoundScore = calculateScore(gameState.playerDice1, gameState.playerDice2);
      gameState.computerRoundScore = calculateScore(gameState.computerDice1, gameState.computerDice2);

      gameState.playerScore += gameState.playerRoundScore;
      gameState.computerScore += gameState.computerRoundScore;

      gameState.round++;

      updateDisplay();

      if (gameState.round === 3) {
          let winner = gameState.playerScore > gameState.computerScore ? 'Player' : 'Computer';
          document.getElementById('winner-message').textContent = `The winner is: ${winner}`;
      }
  }
}

//Reset game
function resetGame() {
  gameState.playerScore = 0;
  gameState.computerScore = 0;
  gameState.round = 0;

  gameState.playerDice1 = 1;
  gameState.playerDice2 = 1;
  gameState.computerDice1 = 1;
  gameState.computerDice2 = 1;
  gameState.playerRoundScore = 0;
  gameState.computerRoundScore = 0;

  document.getElementById('winner-message').textContent = '';

  updateDisplay();
}

//Event listeners for buttons
document.getElementById('roll-button').addEventListener('click', playRound);
document.getElementById('reset-button').addEventListener('click', resetGame);

//Initialize display
resetGame();
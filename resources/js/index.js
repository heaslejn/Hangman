const startWrapper = document.getElementById(`startWrapper`);
const difficultySelectForm = document.getElementById(`difficultySelect`);
const difficultySelect = document.getElementById(`difficulty`);

const gameWrapper = document.getElementById(`gameWrapper`);
const guessesText = document.getElementById(`guesses`);
const wordHolderText = document.getElementById(`wordHolder`);

const guessForm = document.getElementById(`guessForm`);
const guessInput = document.getElementById(`guessInput`);

const startGame = document.getElementById(`startBtn`);
const guessButton = document.getElementById(`guessSubmitButton`);
const resetGame = document.getElementById(`resetGame`);

let canvas = document.getElementById(`hangmanCanvas`);

try {
  let game = new Hangman(canvas);
  difficultySelectForm.addEventListener(`submit`, function (event) {
    const difficulty = difficultySelect.value;
    event.preventDefault();
    game.start(difficulty, function(){
      startWrapper.classList.add(`hidden`);
      startWrapper.classList.remove(`hidden`);
      wordHolderText.innerText = game.getWordHolderText();
      guessesText.innerText = game.getGuessesText();
    });
  });

  guessForm.addEventListener(`submit`, function (e) {
    e.preventDefault();
    const letter = guessInput.value;
    game.guess(letter);
    wordHolderText.innerText = game.getWordHolderText();
    guessesText.innerText = game.getGuessesText();
    guessInput.value = ``;

    if(game.isOver){
      guessInput.setAttribute(`disabled`, `disabled`);
      guessButton.setAttribute(`disabled`, `disabled`);
      resetGame.classList.remove(`hidden`);
      console.log(`game is over`);
      if(game.didWin){
        alert(`congratulations You won`);
      }else{
        alert(`you lose`);
      }
    }
  });

  // add a click Event Listener to the resetGame button
  //    show the startWrapper
  //    hide the gameWrapper
  resetGame.addEventListener(`click`, function (e) {
    startWrapper.classList.remove(`hidden`);
    gameWrapper.classList.add(`hidden`);

    guessInput.removeAttribute(`disabled`);
    guessButton.removeAttribute(`disabled`);
  });

} catch (error) {
  console.error(error);
  alert(error + error.stack);
}

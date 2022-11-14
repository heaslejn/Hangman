class Hangman {
  constructor(_canvas) {
    if (!_canvas) {
      throw new Error(`invalid canvas provided`);
    }

    this.canvas = _canvas;
    this.ctx = this.canvas.getContext(`2d`);
  }

  /**
   * This function takes a difficulty string as a patameter
   * would use the Fetch API to get a random word from the Hangman
   * To get an easy word: https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=easy
   * To get an medium word: https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=medium
   * To get an hard word: https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=hard
   * The results is a json object that looks like this:
   *    { word: "book" }
   * */
  getRandomWord(difficulty) {
    return fetch(
      `https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=${difficulty}`
    )
      .then((r) => r.json())
      .then((r) => r.word);
  }

  /**
   *
   * @param {string} difficulty a difficulty string to be passed to the getRandomWord Function
   * @param {function} next callback function to be called after a word is reveived from the API.
   */
  async start(difficulty, next) {
    // get word and set it to the class's this.word
    this.word = await this.getRandomWord(difficulty);
    console.log(this.word);
    // clear canvas
    this.clearCanvas();
    // draw base
    this.drawBase();
    // reset this.guesses to empty array
    this.guesses = [];
    this.getWordHolderText();
    // reset this.isOver to false
    this.isOver = false;
    // reset this.didWin to false
    this.didWin = false;
    next();
  }

  /**
   *
   * @param {string} letter the guessed letter.
   */
  guess(letter) {
    this.letter = letter;
    try{
      if(letter.length < 1){
        throw new Error(`You have to put at least one letter!`);
      }
      if(!letter.match(/[a-zA-Z]/)){
        throw new Error(letter + `is not a letter, Input a letter`);
      }
      if(letter.length > 1){
        throw new ErrorEvent(`You can only input ONE letter`);
      }
      if(letter == letter.toUpperCase()){
        letter = letter.toLowerCase();
      }
      if(!this.guesses.includes(letter)){
        this.guesses.push(letter);
      }else{
        throw new Error(`You guessed this letter`);
      }
      if(this.word.includes(letter)){
        this.checkWin();
        console.log(`You guessed Right`);
      }else{
        this.onWrongGuess();
        console.log(`Your Guessed Wrong`);
      }
    } catch (error){
      alert(error + error.stack);
    }
  }

  checkWin() {
    let wordUnknowns =
    this.word
      .split(``)
      .filter(words => !this.guesses.includes(words)).length;
    console.log(wordUnknowns);
    if(wordUnknowns == 0){
      this.isOver = true;
      this.didWin = true;
    }
  }

  /**
   * Based on the number of wrong guesses, this function would determine and call the appropriate drawing function
   * drawHead, drawBody, drawRightArm, drawLeftArm, drawRightLeg, or drawLeftLeg.
   * if the number wrong guesses is 6, then also set isOver to true and didWin to false.
   */
  onWrongGuess() {
    let wordArrlength = this.word.length;
    let wordArr = this.word.split(``);

    let word_onWrongGuess = this.word;
    let guessArr = this.guesses;
    guessArr.filter(function(word){
      word_onWrongGuess.includes(word);
    });
    if(guessArr.length == 1){
      this.drawHead();
    }
    if(guessArr.length == 2){
      this.drawBody();
    }
    if(guessArr.length == 3){
      this.drawRightArm();
    }
    if(guessArr.length == 4){
      this.drawLeftArm();
    }
    if(guessArr.length == 5){
      this.drawRightLeg();
    }
    if(guessArr.length == 6){
      this.drawLeftLeg();

      this.isOver = true;
      this.didWin = false;
    }
  }

  /**
   * This function will return a string of the word placeholder
   * It will have underscores in the correct number and places of the unguessed letters.
   * i.e.: if the word is BOOK, and the letter O has been guessed, this would return _ O O _
   */
  getWordHolderText() {
    return;
  }

  /**
   * This function returns a string of all the previous guesses, seperated by a comma
   * This would return something that looks like
   * (Guesses: A, B, C)
   * Hint: use the Array.prototype.join method.
   */
  getGuessesText() {
    return ``;
  }

  /**
   * Clears the canvas
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws the hangman base
   */
  drawBase() {
    this.ctx.fillRect(95, 10, 150, 10); // Top
    this.ctx.fillRect(245, 10, 10, 50); // Noose
    this.ctx.fillRect(95, 10, 10, 400); // Main beam
    this.ctx.fillRect(10, 410, 175, 10); // Base
  }

  drawHead() {}

  drawBody() {}

  drawLeftArm() {}

  drawRightArm() {}

  drawLeftLeg() {}

  drawRightLeg() {}
}

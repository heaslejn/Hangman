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
    return fetch(`https://hangman-micro-service.herokuapp.com//?difficulty=${difficulty}`)
      .then((r) => r.json())
      .then((r) => r.word);
  }

  /**
   *
   * @param {string} difficulty a difficulty string to be passed to the getRandomWord Function
   * @param {function} next callback function to be called after a word is reveived from the API.
   */
  async start(difficulty, next) {
    this.word = await this.getRandomWord(difficulty);
    console.log(this.word);
    this.clearCanvas();
    this.drawBase();
    this.guesses = [];
    this.getWordHolderText();
    this.isOver = false;
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

  getWordHolderText() {
    let wordArrlength = this.word.length;
    let wordArr = this.word.split(``);
    let guessesArr = this.guesses;
    let wordHolderArr = ``;

    for(let i = 0; i < wordArrlength; i ++){
      if(guessesArr.includes(wordArr[i])){
        wordHolderArr = wordHolderArr + wordArr[i];
      }else{
        wordHolderArr = wordHolderArr + ` _ `;
      }
    }
    console.log(wordHolderArr);
    return wordHolderArr;
  }

  getGuessesText() {
    return `Guessed: ` + this.guesses.join(`, `);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBase() {
    this.ctx.fillRect(95, 10, 150, 10); // Top
    this.ctx.fillRect(245, 10, 10, 50); // Noose
    this.ctx.fillRect(95, 10, 10, 400); // Main beam
    this.ctx.fillRect(10, 410, 175, 10); // Base
  }

  drawHead() {
    console.log(`Head`);
    this.ctx.beginPath();
    this.ctx.arc(250, 85, 25, 0, Math.PI *2, false);
    this.ctx.stroke();
  }

  drawBody() {
    console.log(`Body`);
    this.ctx.fillRect(245, 110, 10, 80, false);
  }

  drawLeftArm() {
    console.log(`RightArm`);
    this.ctx.beginPath();
    this.ctx.moveTo(250, 175);
    this.ctx.lineTo(330, 100);
    this.ctx.stroke();
  }

  drawRightArm() {
    console.log(`LeftArm`);
    this.ctx.beginPath();
    this.ctx.moveTo(250, 175);
    this.ctx.lineTo(170, 100);
    this.ctx.stroke();
  }

  drawLeftLeg() {
    console.log(`LeftLeg`);
    this.ctx.beginPath();
    this.ctx.moveTo(245, 190);
    this.ctx.lineTo(170, 250);
    this.ctx.stroke();
  }

  drawRightLeg() {
    console.log(`RightLeg`);
    this.ctx.beginPath();
    this.ctx.moveTo(255, 190);
    this.ctx.lineTo(330, 250);
    this.ctx.stroke();
  }
}

'use strict';
const htmlElementGenerator = (elementTag,innerCode,elementClass,elementId) => {
  if (typeof elementTag === 'string' && elementTag.length >0) {
      const element = document.createElement(elementTag);
      if (typeof elementClass === 'string' && elementClass.length > 0) {
          element.setAttribute('class', elementClass);
      }
      if (typeof elementId === 'string' && elementId.length > 0) {
          element.setAttribute('id',elementId);
      }
      element.innerHTML = innerCode;
      return element;
  }else console.log('Element tag not valid');
}
const random = (min,max) => {
  const num = (Math.random()*(max-min)) + min;
  return num;
}
// Runs on initial start and contains calls all other functions that manage the game
const main = () => {
  let game; // instance of the Game
  let splashScreen; // Start Screen
  const topScoresList = new Scores();
  topScoresList.loadFromLocalStorage();
    
  // -- splash screen

  const buildSplashScreen = () => {
    splashScreen = htmlElementGenerator('main','','splash-screen-container');
    const title = htmlElementGenerator('h1','IronBall');
    const newGame = htmlElementGenerator('button','NEW GAME');
    const topScores = htmlElementGenerator('button', 'TOP SCORES');
    const buttonsContainer = htmlElementGenerator('div','','buttons-container');
    
    splashScreen.appendChild(title);
    buttonsContainer.appendChild(newGame);
    buttonsContainer.appendChild(topScores);
    splashScreen.appendChild(buttonsContainer);

    newGame.addEventListener('click', () => {
      startGame();
    });
    topScores.addEventListener('click', () => {
      showScores();
    });
    
    document.body.appendChild(splashScreen);
  }

  const removeSplashScreen = () => {
      //Tested!
      splashScreen.remove();
  }
    
  const buildGameScreen = () => {
      
      const gameContainer = htmlElementGenerator('main','');
      const canvasContainer = htmlElementGenerator('div','','canvas-container');
      const canvas = htmlElementGenerator('canvas');
      canvasContainer.appendChild(canvas);

      const gameInfoContainer = htmlElementGenerator('section','','game-info-container');
      const lifeContainer = htmlElementGenerator('div', '','lives');
      lifeContainer.appendChild(htmlElementGenerator('span','Lives: ','label'));
      lifeContainer.appendChild(htmlElementGenerator('span','','value'));
      
      const timeContainer = htmlElementGenerator('div','','time');
      timeContainer.appendChild(htmlElementGenerator('span','','label'));
      timeContainer.appendChild(htmlElementGenerator('span','','value'));

      const pointsContainer = htmlElementGenerator('div', '', 'points');
      pointsContainer.appendChild(htmlElementGenerator('span','','label'));
      pointsContainer.appendChild(htmlElementGenerator('span','0','value'));
      gameInfoContainer.appendChild(lifeContainer);
      gameInfoContainer.appendChild(timeContainer);
      gameInfoContainer.appendChild(pointsContainer);
      gameContainer.appendChild(canvasContainer);
      gameContainer.appendChild(gameInfoContainer);
      gameContainer.appendChild(buildGameOverWindow());  //Poner lo delgameover
      
      document.body.appendChild(gameContainer);
      return gameContainer;
  }
  const buildGameOverWindow = () => {
    const gameOverContainer = htmlElementGenerator('div','','game-over');
    gameOverContainer.classList.add('game-over-hidden');
    gameOverContainer.appendChild(htmlElementGenerator('h1','Game Over'));

    const scoreContainer = htmlElementGenerator('div','','final-score');
    scoreContainer.appendChild(htmlElementGenerator('span','Your Score:', 'label'));
    scoreContainer.appendChild(htmlElementGenerator('span','','value'));
    gameOverContainer.appendChild(scoreContainer);

    const nameForm = document.createElement('form');
    nameForm.innerHTML = `<label for="name">Nickname</label>
    <input type='text' name='name' id='player-name'></input>
    `;
    gameOverContainer.appendChild(nameForm);

    const gameOverButtonsContainer = htmlElementGenerator('div','','game-over-buttons-container');
    const playAgainButton = htmlElementGenerator('button','Play Again','play-again-btn');
    gameOverButtonsContainer.appendChild(playAgainButton);
    const returnMainButton = htmlElementGenerator('button','Return','return-main-btn');
    
    gameOverButtonsContainer.appendChild(returnMainButton);
    gameOverContainer.appendChild(gameOverButtonsContainer);

    playAgainButton.addEventListener('click', () => {
      const playerName = document.getElementById('player-name').value;
      const playerScore = game.getPoints();
      const playerTime = game.chronometer.setTime();
      savePlayerScore(playerName, playerScore, playerTime);
      gameOverContainer.setAttribute('class','game-over-hidden game-over');
      removeSplashScreen();
      game.restartGame();
    });
    returnMainButton.addEventListener('click', () => {
      const playerName = document.getElementById('player-name').value;
      const playerScore = game.getPoints();
      const playerTime = game.chronometer.setTime();
      //console.log(`${playerTime.getHours()}:${playerTime.getMinutes()}:${playerTime.getSeconds()}`);
      console.log(playerTime);
      savePlayerScore(playerName,playerScore, playerTime);
      removeGameScreen();
    });
    return gameOverContainer;
  }

  const removeGameScreen = () => {
      game.removeGameScreen();
  }
  const savePlayerScore = async(nickname, points,time) => {
    if (name==='') name='Empty';
    name.toUpperCase();
    await topScoresList.addNewScore({nickname,points,time});
    //topScoresList.saveToLocalStorage();
  }
    
  // -- Setting the game state 

  const startGame= () => {
    removeSplashScreen();
    game = new Game();
    game.gameScreen = buildGameScreen();
    game.start();

    game.passGameOverCallback(() => buildSplashScreen());
  }

  const showScores = async() => {
    removeSplashScreen();
    const scoresScreen = htmlElementGenerator('div','','score-screen');
    scoresScreen.appendChild(htmlElementGenerator('h1','Best Scores'));
    
    const listContainer = htmlElementGenerator('div','');
    listContainer.appendChild(htmlElementGenerator('ol',''));
    
    const listaPlayers = await topScoresList.getScores();
    listaPlayers.forEach(element => {
      const liPlayer = htmlElementGenerator('li','','player-score');
      liPlayer.appendChild(htmlElementGenerator('span',element.nickname,'player-score player-name'));
      liPlayer.appendChild(htmlElementGenerator('span',element.points,'player-score'));
      listContainer.appendChild(liPlayer);
    });

    scoresScreen.appendChild(listContainer);
    const returnMainContainer = htmlElementGenerator('div','',);
    const returnButton = htmlElementGenerator('button','Return to main screen','','return-main');
    returnMainContainer.appendChild(returnButton);
    scoresScreen.appendChild(returnMainContainer);
    document.body.appendChild(scoresScreen);

    returnButton.addEventListener('click', () => {
      scoresScreen.remove();
      
      buildSplashScreen();
    });
  }
    
  // -- initialize Splash screen on initial start
  buildSplashScreen();
}

// Runs the function `main` once all resources are loaded
window.addEventListener('load', main);
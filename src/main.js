'use strict';
function htmlElementGenerator(elementTag,innerCode,elementClass,elementId) {
    if (typeof elementTag === 'string' && elementTag.length >0) {
        var element = document.createElement(elementTag);
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
function random(min,max) {
  var num = (Math.random()*(max-min)) + min;
  return num;
}
// Runs on initial start and contains calls all other functions that manage the game
function main() {
  var game; // instance of the Game
  var splashScreen; // Start Screen
  var topScoresList = new Scores();
  topScoresList.loadFromLocalStorage();
    
  // -- splash screen

  function buildSplashScreen() {
    splashScreen = htmlElementGenerator('main','','splash-screen-container');
    
    var title = htmlElementGenerator('h1','IronBall');
    var newGame = htmlElementGenerator('button','NEW GAME');
    var topScores = htmlElementGenerator('button', 'TOP SCORES');
    var buttonsContainer = htmlElementGenerator('div','','buttons-container');
    
    splashScreen.appendChild(title);
    buttonsContainer.appendChild(newGame);
    buttonsContainer.appendChild(topScores);
    splashScreen.appendChild(buttonsContainer);

    newGame.addEventListener('click', function() {
      startGame();
    });
    topScores.addEventListener('click', function() {
      showScores();
    });
    
    document.body.appendChild(splashScreen);
  }

  function removeSplashScreen() {
      //Tested!
      splashScreen.remove();
  }
    
  function buildGameScreen() {
      
      var gameContainer = htmlElementGenerator('main','');
      var canvasContainer = htmlElementGenerator('div','','canvas-container');
      var canvas = htmlElementGenerator('canvas');
      canvasContainer.appendChild(canvas);

      var gameInfoContainer = htmlElementGenerator('section','','game-info-container');
      var lifeContainer = htmlElementGenerator('div', '','lives');
      lifeContainer.appendChild(htmlElementGenerator('span','Lives: ','label'));
      lifeContainer.appendChild(htmlElementGenerator('span','','value'));
      
      var timeContainer = htmlElementGenerator('div','','time');
      timeContainer.appendChild(htmlElementGenerator('span','','label'));
      timeContainer.appendChild(htmlElementGenerator('span','','value'));

      var pointsContainer = htmlElementGenerator('div', '', 'points');
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
  function buildGameOverWindow() {
    var gameOverContainer = htmlElementGenerator('div','','game-over');
    gameOverContainer.classList.add('game-over-hidden');
    gameOverContainer.appendChild(htmlElementGenerator('h1','Game Over'));

    var scoreContainer = htmlElementGenerator('div','','final-score');
    scoreContainer.appendChild(htmlElementGenerator('span','Your Score:', 'label'));
    scoreContainer.appendChild(htmlElementGenerator('span','','value'));
    gameOverContainer.appendChild(scoreContainer);

    var nameForm = document.createElement('form');
    nameForm.innerHTML = `<label for="name">Nickname</label>
    <input type='text' name='name' id='player-name'></input>
    `;
    gameOverContainer.appendChild(nameForm);

    var gameOverButtonsContainer = htmlElementGenerator('div','','game-over-buttons-container');
    var playAgainButton = htmlElementGenerator('button','Play Again','play-again-btn');
    gameOverButtonsContainer.appendChild(playAgainButton);
    var returnMainButton = htmlElementGenerator('button','Return','return-main-btn');
    gameOverButtonsContainer.appendChild(returnMainButton);
    gameOverContainer.appendChild(gameOverButtonsContainer);

    playAgainButton.addEventListener('click', function() {
      var playerName = document.getElementById('player-name').value;
      var playerScore = game.getPoints();
      savePlayerScore(playerName,playerScore);
      gameOverContainer.setAttribute('class','game-over-hidden game-over');
      removeSplashScreen();
      game.restartGame();
    });
    returnMainButton.addEventListener('click', function() {
      var playerName = document.getElementById('player-name').value;
      var playerScore = game.getPoints();
      savePlayerScore(playerName,playerScore);
      removeGameScreen();
    });
    return gameOverContainer;
  }

  function removeGameScreen() {
      game.removeGameScreen();
  }
  function savePlayerScore (name, score) {
    topScoresList.addNewScore({name:name,score:score});
    topScoresList.saveToLocalStorage();
  }
    
  // -- Setting the game state 

  function startGame() {
    removeSplashScreen();
    game = new Game();
    game.gameScreen = buildGameScreen();
    game.start();

    game.passGameOverCallback(function() {
      buildSplashScreen();
    });
  }

  function showScores() {
    removeSplashScreen();
    var scoresScreen = htmlElementGenerator('div','','score-screen');
    scoresScreen.appendChild(htmlElementGenerator('h1','Best Scores'));
    
    var listContainer = htmlElementGenerator('div','');
    listContainer.appendChild(htmlElementGenerator('ol',''));
    topScoresList.getScores().forEach(function (element) {
      var liPlayer = htmlElementGenerator('li','','player-score');
      liPlayer.appendChild(htmlElementGenerator('span',element.name,'player-score player-name'));
      liPlayer.appendChild(htmlElementGenerator('span',element.score,'player-score'));
      listContainer.appendChild(liPlayer);
    });

    scoresScreen.appendChild(listContainer);
    var returnButton = htmlElementGenerator('button','Return to main screen');
    scoresScreen.appendChild(returnButton);
    document.body.appendChild(scoresScreen);

    returnButton.addEventListener('click', function() {
      scoresScreen.remove();
      buildSplashScreen();
    });
  }
    
  // -- initialize Splash screen on initial start
  buildSplashScreen();
}

// Runs the function `main` once all resources are loaded
window.addEventListener('load', main);
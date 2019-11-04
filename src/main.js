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
  var gameOverScreen;

    
  // -- splash screen

  function buildSplashScreen() {
    splashScreen = htmlElementGenerator('main','','splash-screen-container');
    
    var title = htmlElementGenerator('h1','IronBall');
    var newGame = htmlElementGenerator('button','NEW GAME');
    var topScores = htmlElementGenerator('button', 'TOP SCORES');

    splashScreen.appendChild(title);
    splashScreen.appendChild(newGame);
    splashScreen.appendChild(topScores);

    newGame.addEventListener('click', function() {
        startGame();
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
      timeContainer.appendChild(htmlElementGenerator('span','Time: ','label'));
      timeContainer.appendChild(htmlElementGenerator('span','','value'));

      var pointsContainer = htmlElementGenerator('div', '', 'points');
      pointsContainer.appendChild(htmlElementGenerator('span','Points: ','label'));
      pointsContainer.appendChild(htmlElementGenerator('span','','value'));
      gameInfoContainer.appendChild(lifeContainer);
      gameInfoContainer.appendChild(timeContainer);
      gameInfoContainer.appendChild(pointsContainer);

      var gameOverContainer = htmlElementGenerator('div','','game-over-hidden');
      gameOverContainer.appendChild(htmlElementGenerator('h1','Game Over'));

      var scoreContainer = htmlElementGenerator('div','','final-score');
      scoreContainer.appendChild(htmlElementGenerator('span','Your Score', 'label'));
      scoreContainer.appendChild(htmlElementGenerator('span','','value'));
      gameOverContainer.appendChild(scoreContainer);

      var nameForm = document.createElement('form');
      nameForm.innerHTML = `<label for="name">Nickname</label>
      <input type='text' name='name'></input>
      <button>Submit</button>`;
      gameOverContainer.appendChild(nameForm);

      gameContainer.appendChild(canvasContainer);
      gameContainer.appendChild(gameInfoContainer);
      gameContainer.appendChild(gameOverContainer)
      
      document.body.appendChild(gameContainer);
      return gameContainer;
  }

  function removeGameScreen() {
      
  }

    
  // -- game over screen & restart button

  function buildGameOverMessage(score) {}

  function removeGameOverMessage() {}

    
  // -- Setting the game state 

  function startGame() {
    removeSplashScreen();
    game = new Game();
    game.gameScreen = buildGameScreen();
    game.start();
  }

  function gameOver() {}

    
  // -- initialize Splash screen on initial start
  buildSplashScreen();
}

// Runs the function `main` once all resources are loaded
window.addEventListener('load', main);
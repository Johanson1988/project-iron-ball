'use strict';

function Game () {
    this.canvas = null;
    this.ctx = null;
    this.platform= null;
    this.gameIsOver = false;
    this.ball = null;
    this.gameScreen = null;
    this.bricksArray = [];
    this.chronometer = null;
}

Game.prototype.start = function() {
    // Save reference to canvas and container. Create ctx
  this.canvasContainer = document.querySelector('.canvas-container');
  this.canvas = this.gameScreen.querySelector('canvas');
  this.ctx = this.canvas.getContext('2d');

  // Save reference to the score, time and lives elements
  this.livesElement = this.gameScreen.querySelector('.lives .value');
  this.scoreElement = this.gameScreen.querySelector('.score .value');
  this.timeElement = this.gameScreen.querySelector('.time .value');

  // Set the canvas dimensions to match the parent
  this.containerWidth = this.canvasContainer.offsetWidth;
  this.containerHeight = this.canvasContainer.offsetHeight;
  this.canvas.setAttribute('width', this.containerWidth);
  this.canvas.setAttribute('height', this.containerHeight);

  //Creates a new chronometer
  this.chronometer = new Chronometer();

  // Create a new platform and ball for the current game
  this.platform = new Platform(this.canvas, 5);
  this.ball = new Ball(
    this.canvas,
    this.platform.x+this.platform.width/2,
    this.platform.y-10, //se le resta el radio
    random(-3,3),
    random(0,-3));

  //Generate bricks
  this.generateBricks();
    
  // Add event listener for moving the player
  this.handleKeyDown = function(event)  {
    if (event.key === 'ArrowLeft') {
      this.platform.setDirection('left');  
    }else if (event.key === 'ArrowRight') {
      this.platform.setDirection('right');
    }else if (event.keyCode === 32) {
      this.ball.launchBall();
      this.chronometer.startClick();
    }  
  };

  document.body.addEventListener('keydown', this.handleKeyDown.bind(this));
  
  // Start the canvas requestAnimationFrame loop
  this.startLoop();
};



Game.prototype.startLoop = function () {
  
  var loop = function() {
    this.ball.fall();
    var time = document.querySelector('.time .value');
    time.innerHTML = this.chronometer.setTime();
    if (!this.ball.isFallen()) {
      this.platform.handleScreenCollision();
      this.ball.handleWallCollisions(this.platform.x, this.platform.y,this.platform.width,this.platform.direction);
      this.bricksArray.forEach(function (brick,index) {
      this.handleBrickCollisions(this.ball,brick,index);
      }.bind(this));
      this.ball.updatePosition(this.platform.x+this.platform.width/2);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.platform.draw();
      this.ball.draw();
      this.bricksArray.forEach(function(brick){
        brick.draw();      
      });
      this.platform.updatePoints();
    }else {
      this.chronometer.stopClick();
      this.platform.removeLife();      
      if (this.platform.livesRemaining()) {
        this.platform.returnToInitialPosition();
        this.ball.returnToInitialPosition(this.platform.x+this.platform.width/2,
          this.platform.y-10);
      }else this.setGameOver();
    }
    this.platform.updateLives();
    if (!this.gameIsOver) window.requestAnimationFrame(loop);
  }.bind(this);

  window.requestAnimationFrame(loop);
} ;


Game.prototype.setGameOver = function () {
  this.gameIsOver = true;
  this.showGameOverScreen();
  this.onGameOverCallback();
};
Game.prototype.passGameOverCallback = function(callback) {
  this.onGameOverCallback = callback;
};

Game.prototype.removeGameScreen = function () {
  this.gameScreen.remove();
};
Game.prototype.showGameOverScreen = function () {
  var gameOverScreen = document.querySelector('.game-over-hidden');
  gameOverScreen.classList.remove('game-over-hidden');
  var scores = document.querySelector('.final-score .value');
  scores.innerHTML = this.platform.getPoints();
};

Game.prototype.restartGame = function () {
  this.platform.lives = 1;    //Add set life
  this.gameIsOver = false;
  this.platform.points = 0;         //Add set points
  this.chronometer.resetClick();
  this.platform.returnToInitialPosition();
  this.ball.returnToInitialPosition(this.platform.x+this.platform.width/2,
    this.platform.y-10);
  this.clearBricksArray();
  this.generateBricks();
  this.startLoop();
}

Game.prototype.handleBrickCollisions = function(ball,brick,index) {
  var brickTopLeft = {
      x : brick.x,
      y : brick.y
  }
  var brickTopRight = {
      x : brick.x+brick.width,
      y : brick.y
  }
  var brickBottomLeft = {
      x : brick.x,
      y : brick.y+brick.height
  }
  var brickBottomRight = {
      x : brick.x + brick.width,
      y : brick.y + brick.height
  }
  //touches bottom border of the brick
  if (ball.ballTouchesLine(brickBottomLeft.x,brickBottomLeft.y,brickBottomRight.x,brickBottomRight.y,ball.x,ball.y,ball.radius)) {
      ball.bounce('bottom');
      this.bricksArray.splice(index,1);
      this.platform.addPoints(100);
  //hits right border
  }else if (ball.ballTouchesLine(brickTopRight.x,brickTopRight.y,brickBottomRight.x, brickBottomRight.y,ball.x,ball.y,ball.radius)) {
    ball.bounce('right');
    this.bricksArray.splice(index,1);
    this.platform.addPoints(100);
  }
  //hits top border
  else if (ball.ballTouchesLine(brickTopLeft.x,brickTopLeft.y,brickTopRight.x,brickTopRight.y,ball.x,ball.y,ball.radius)) {
    ball.bounce('top');
    this.bricksArray.splice(index,1);
    this.platform.addPoints(100);
  }
  //hits left border
  else if (ball.ballTouchesLine(brickTopLeft.x,brickTopLeft.y,brickBottomLeft.x,brickBottomLeft.y,ball.x,ball.y,ball.radius)) {
    ball.bounce('left');
    this.bricksArray.splice(index,1);
    this.platform.addPoints(100);
  }
}
Game.prototype.generateBricks = function () {
  //Create bricks
  var totalWidth = random(5,20);
  var brickGap = 3;
  var totalHeight = 80;
  for (var i=0;i<=60;i++) {                 //Cambiar este index para generar más ladrillos
    var width = random(30,90);
    if (totalWidth + width >= this.canvas.width) {
      totalWidth = random(5,20);
      totalHeight += random(16,30);
    }
    var brick = new Brick(this.canvas, totalWidth, totalHeight, width);
    totalWidth += brickGap + brick.width;
    this.bricksArray.push(brick);
  }
}
Game.prototype.clearBricksArray = function () {
  this.bricksArray = [];
}
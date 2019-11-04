'use strict';

function Game () {
    this.canvas = null;
    this.ctx = null;
    this.platform= null;
    this.gameIsOver = false;
    this.ball = null;
    this.gameScreen = null;
    this.bricksArray = [];
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

  // Create a new platform and ball for the current game
  this.platform = new Platform(this.canvas, 5);
  this.ball = new Ball(
    this.canvas,
    this.platform.x+this.platform.width/2,
    this.platform.y-10,
    random(-3,3),
    random(0,-3));

  //Create bricks
  var totalWidth = random(5,20);
  var brickGap = 3;
  for (var i=0;i<=0;i++) {                 //Cambiar este index para generar más ladrillos
    var width = 500;//random(30,90);
    var brick = new Brick(this.canvas, totalWidth, 80, width);
    totalWidth += brickGap + brick.width;
    this.bricksArray.push(brick);
  }
    
  // Add event listener for moving the player
  this.handleKeyDown = function(event)  {
    if (event.key === 'ArrowLeft') {
      this.platform.setDirection('left');  
    }else if (event.key === 'ArrowRight') {
      this.platform.setDirection('right');
    }else if (event.keyCode === 32) this.ball.launchBall() ;  
  };

  document.body.addEventListener('keydown', this.handleKeyDown.bind(this));
  
  // Start the canvas requestAnimationFrame loop
  this.startLoop();
};



Game.prototype.startLoop = function () {
  var loop = function() {
    this.platform.handleScreenCollision();
    this.ball.handleWallCollisions(this.platform.x, this.platform.y,this.platform.width);

    this.ball.handleBrickCollisions(this.bricksArray[0]);

    this.ball.updatePosition(this.platform.x+this.platform.width/2);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.platform.draw();
    this.ball.draw();
    this.bricksArray.forEach(function(brick){
      brick.draw();
    });

    window.requestAnimationFrame(loop);
  }.bind(this);

  window.requestAnimationFrame(loop);
} ;
Game.prototype.checkCollisions = function () {};
Game.prototype.clearCanvas = function () {};
Game.prototype.updateCanvas = function () {};
Game.prototype.drawCanvas = function () {};
Game.prototype.setGameOver = function () {};
Game.prototype.showScores = function () {};
Game.prototype.removeGameScreen = function () {};
Game.prototype.showGameOverText = function () {};
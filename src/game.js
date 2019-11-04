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
  for (var i=0;i<=8;i++) {                 //Cambiar este index para generar más ladrillos
    var width = random(30,90);
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
  //hits right border
  }else if (ball.ballTouchesLine(brickTopRight.x,brickTopRight.y,brickBottomRight.x, brickBottomRight.y,ball.x,ball.y,ball.radius)) {
    ball.bounce('right');
    this.bricksArray.splice(index,1);
  }
  //hits top border
  else if (ball.ballTouchesLine(brickTopLeft.x,brickTopLeft.y,brickTopRight.x,brickTopRight.y,ball.x,ball.y,ball.radius)) {
    ball.bounce('top');
    this.bricksArray.splice(index,1);
  }
  //hits left border
  else if (ball.ballTouchesLine(brickTopLeft.x,brickTopLeft.y,brickBottomLeft.x,brickBottomLeft.y,ball.x,ball.y,ball.radius)) {
    ball.bounce('left');
    this.bricksArray.splice(index,1);
  }
}
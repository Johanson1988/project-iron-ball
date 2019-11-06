'use strict';
function Platform (canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = 455; //half of totalCanvasSize - half of platform size;
    this.y = 380; //420 final value
    this.speed = 50;
    this.lives = 1;
    this.points = 0;
    this.width = 90;
    this.height = 30;
    this.direction = 0;
    this.sectionSize = 30; //size divided by 3 so 3 sections
    this.color = 'red';
    this.rocketImg = new Image();
}

// setDirection()

Platform.prototype.setDirection = function(direction) {
    // +1 right  -1 left
    if (direction === 'left') this.direction = -1;
    else if (direction === 'right') this.direction = 1;
    this.move();
  };

Platform.prototype.move = function() {
  this.x += this.direction * this.speed;
};

Platform.prototype.handleScreenCollision = function() {
var screenLeftBorder = 0;
var screenRightBorder = this.canvas.width;


if ((this.x + this.direction * this.speed) > screenRightBorder-this.width){
  this.x = screenRightBorder - this.width;
}
//if it reaches the border it will not escape the screen
else if (this.x < screenLeftBorder) this.x = 0;
};

// removeLife()

Platform.prototype.removeLife = function() {
    this.lives -= 1;
};
Platform.prototype.updateLives = function() {
  document.querySelector('.lives .value').innerHTML = this.lives;
}

Platform.prototype.draw = function() {
  if (this.direction === 1) this.rocketImg.src = ('../images/rocketL.png');
  else this.rocketImg.src = ('../images/rocketR.png');
  // fillRect(x, y, width, height)
  this.ctx.drawImage(this.rocketImg,
    this.x,
    this.y,
    this.width,
    this.height
  );
  
};
Platform.prototype.returnToInitialPosition = function() {
  //half of totalCanvasSize - half of platform size;
  this.x= this.canvas.width/2 - this.width/2;
}
Platform.prototype.addPoints = function (points) {
  this.points += points;
}
Platform.prototype.updatePoints = function() {
  var points = document.querySelector('.points .value');
  points.innerHTML = this.points;
}
Platform.prototype.getPoints = function() {
  return this.points;
}
Platform.prototype.livesRemaining = function () {
  if (this.lives > 0) return true;
  else return false;
}
Platform.prototype.autoPilot = function(ballX) {
  this.x = ballX-this.width/2;
}
Platform.prototype.getDirection = function () {
  return this.direction;
}
'use strict';
function Platform (canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = 455; //half of totalCanvasSize - half of platform size;
    this.y = 420;
    this.speed = 5;
    this.lives = 5;
    this.points = 0;
    this.width = 90;
    this.height = 15;
    this.sectionSize = 30; //size divided by 3 so 3 sections
    this.color = 'red';
    this.initPos = {x: 455, y: 420};
}

// setDirection()

Platform.prototype.setDirection = function(direction) {
    // +1 down  -1 up
    if (direction === 'left') this.direction = -1;
    else if (direction === 'right') this.direction = 1;
  };

Platform.prototype.handleScreenCollision = function() {
this.x = this.x + this.direction * this.speed;
var screenLeftBorder = 0;
var screenRightBorder = this.canvas.width;

if (this.x > screenRightBorder) this.x = screenRightBorder - this.width;
//if it reaches the border it will not escape the screen
else if (this.x < screenLeftBorder) this.x = 0;
};

// removeLife()

Platform.prototype.removeLife = function() {
    this.lives -= 1;
};

Platform.prototype.draw = function() {
    this.ctx.fillStyle = this.color;
    // fillRect(x, y, width, height)
    this.ctx.fillRect(
      this.x,
      this.y,
      this.width,
      this.height
    );
  };
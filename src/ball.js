'use strict';

function Ball (canvas,x,y,speedX,speedY) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = x; //For the first ball should platform.x + 45, platform.y;
    this.y = y;
    this.radius = 10;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = 'blue';
    this.launched = false;
    this.stop = false; //testing option
    //will add random to be launch to one direction or other
}

Ball.prototype.draw = function() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, this.radius, 0, (Math.PI) * 2);
    this.ctx.fill();
    this.ctx.closePath();
}
Ball.prototype.launchBall = function () {
    this.launched = true;
}

Ball.prototype.updatePosition = function (platformNewX) {
    if (!this.launched) this.x = platformNewX;
    else {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

Ball.prototype.handleWallCollisions = function(platformX, platformY, platformSize) {
    function pointInCircle(x, y, cx, cy, radius) {
        //x,y points to check
        //cx, cy points from the circle
        var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
        return distancesquared <= radius * radius;
      }
    var screenRightBorder = this.canvas.width;
    //If ball touches left wall

    if (pointInCircle(0,this.y, this.x,this.y, this.radius)) {
        this.bounce('left');
    }
    //if ball touches right wall
    else if (pointInCircle(screenRightBorder,this.y, this.x,this.y, this.radius)) {
        this.bounce('right');
    }
    //If ball touches top wall
    else if (pointInCircle(this.x,0, this.x,this.y, this.radius)) {
        this.bounce('top');
    }
    //If touches platform
    else if ((this.y + this.speedY >= platformY) && (this.x >= platformX) && (this.x <= platformX + platformSize)) {
        console.log('Passed first if');
        if (pointInCircle(platformX, platformY, platformX, this.y, this.radius)) {
            this.bounce('platform');
        }
    }
}

Ball.prototype.bounce = function (bouncedFrom) {
    switch (bouncedFrom) {
        case 'top':
        case 'platform':
            this.speedY= -(this.speedY);
            break;
        case 'right':
        case 'left':
            this.speedX = -(this.speedX);
            break;
    }
}
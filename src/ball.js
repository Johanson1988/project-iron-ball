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
    var screenRightBorder = this.canvas.width;
    var screenBottonBorder = this.canvas.height;
    //If ball touches left wall

    if (this.ballTouchesLine(0,0,0,screenBottonBorder,this.x,this.y,this.radius)) {
        this.bounce('left');
    }
    //if ball touches right wall
    else if (this.ballTouchesLine(screenRightBorder,0,screenRightBorder,screenBottonBorder,this.x,this.y,this.radius)) {
        this.bounce('right');
    }
    //If ball touches top wall
    else if (this.ballTouchesLine(0,0,screenRightBorder,0,this.x,this.y,this.radius)) {
        this.bounce('top');
    }
    //If touches platform
    else if (this.ballTouchesLine(platformX,platformY,platformX+platformSize,platformY,this.x,this.y,this.radius)) {
            this.bounce('platform');
    }
}

Ball.prototype.bounce = function (bouncedFrom) {
    switch (bouncedFrom) {
        case 'top':
        case 'platform':
        case 'bottom':
            this.speedY= -(this.speedY);
            break;
        case 'right':
        case 'left':
            this.speedX = -(this.speedX);
            break;
    }
}

Ball.prototype.ballTouchesLine = function (xInit,yInit,xEnd,yEnd,xBall,yBall,radiusBall) {
    //extraced https://math.stackexchange.com/questions/275529/check-if-line-intersects-with-circles-perimeter
    xInit -= xBall;
    xEnd -= xBall;
    yInit -= yBall;
    yEnd -= yBall;
    var dx = xEnd - xInit;
    var dy = yEnd - yInit;
    var dr_squared = dx**2 + dy**2;
    var distance = xInit*yEnd - xEnd*yInit;
return radiusBall**2 * dr_squared > distance**2;
}

Ball.prototype.handleBrickCollisions = function(brick) {
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
    if (this.ballTouchesLine(brickBottomLeft.x,brickBottomLeft.y,brickBottomRight.x,brickBottomRight.y,this.x,this.y,this.radius)) {
        debugger;
        this.bounce('top');
    }
}
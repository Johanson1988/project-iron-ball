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
    this.fallen = false;
    //will add random to be launch to one direction or other
}
Ball.prototype.setSpeeds = function(speedX, speedY) {
    this.speedX = speedX;
    this.speedY = speedY;
}

Ball.prototype.increaseSpeed = function() {
    if ((this.speedX >0) && (Math.abs(this.speedX < 10))) this.speedX += 0.001;
    else this.speedX += -0.001;
    if ((this.speedY >0)  && (Math.abs(this.speedY < 10))) this.speedY += 0.001;
    else this.speedY += -0.001;
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
Ball.prototype.getBallIsLaunched = function () {
    return this.launched;
}

Ball.prototype.updatePosition = function (platformNewX) {
    if (!this.launched) this.x = platformNewX;
    else {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

Ball.prototype.handleWallCollisions = function(platformX, platformY, platformSize,platformDirection) {
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
            this.bounce('platform', platformDirection);
    }
}

Ball.prototype.bounce = function (bouncedFrom, platformDirection) {
    function changeAngle(speed) {
        var random = Math.random();
        if ((random >= 0.6) && (random <= 0.8)) speed += -1;
        else if (random > 0.8) speed += 1;
        if (random >0.6) console.log(random,'angle changed');
        return speed;
    }
    switch (bouncedFrom) {
        case 'top':
        case 'platform':
            if ((this.speedX > 0 && platformDirection < 0) || (this.speedX < 0 && platformDirection >0)) {
                this.speedX = -(this.speedX);
                console.log(this.speedX,this.speedY);
                this.speedX = changeAngle(this.speedX);
                console.log(this.speedX, this.speedY);
            }
        case 'bottom':
            this.speedY= -(this.speedY);
            this.speedY = changeAngle(this.speedY);
            break;
        case 'right':
        case 'left':
            this.speedX = -(this.speedX);
            this.speedX = changeAngle(this.speedX);
            break;
    }
}

Ball.prototype.ballTouchesLine = function (xInit,yInit,xEnd,yEnd,xBall,yBall,radiusBall) {
    //based from https://stackoverflow.com/questions/36523507/detection-and-response-ball-to-wall-collision-inside-any-polygon
    // calc delta distance: source point to line start
    var dx=xBall-xInit;
    var dy=yBall-yInit;

    // calc delta distance: line start to end
    var dxx=xEnd-xInit;
    var dyy=yEnd-yInit;

    // Calc position on line normalized between 0.00 & 1.00
    // == dot product divided by delta line distances squared
    var t=(dx*dxx+dy*dyy)/(dxx*dxx+dyy*dyy);

    // calc nearest pt on line
    var x=xInit+dxx*t;
    var y=yInit+dyy*t;

    // clamp results to being on the segment
    if(t<0){x=xInit;y=yInit;}
    if(t>1){x=xEnd;y=yEnd;}

    //return({ x:x, y:y, isOnSegment:(t>=0 && t<=1) });
    var dx=xBall-x;
    var dy=yBall-y
    return(dx*dx+dy*dy<radiusBall*radiusBall);
}
Ball.prototype.fall = function() {
    if (this.ballTouchesLine(0,this.canvas.height,this.canvas.width,this.canvas.height,this.x,this.y,this.radius)) {
        this.fallen = true;
    }
}
Ball.prototype.returnToInitialPosition = function(x,y) {
    this.launched = false;
    this.x = x;
    this.y = y;
    this.speedY = random(0,3);
    this.speedX = random(-3,3);
    this.fallen = false;
}
Ball.prototype.isFallen = function() {
    return this.fallen;
}
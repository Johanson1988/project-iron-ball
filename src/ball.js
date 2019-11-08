'use strict';

function Ball (canvas,x,y,speedX,speedY) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = x; //For the first ball should platform.x + 45, platform.y;
    this.y = y;
    this.radius = 10;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = '#F6D5D5';
    this.launched = false;
    this.fallen = false;
    this.image = new Image();
    this.wallAudio = new Audio('./audio/wall-sound.wav');
    this.prevY = null;
    this.prevYprevY = null;
    this.audioOutside = new Audio('./audio/smb_pipe.wav');
    
    //will add random to be launch to one direction or other
}
Ball.prototype.setSpeeds = function(speedX, speedY) {
    if (speedX) this.speedX = speedX;
    if (speedY) this.speedY = speedY;
}

Ball.prototype.increaseSpeed = function(autoPilotSwitch) {
    var incSpeedX = 0.003;
    var incSpeedY = 0.003;
    if (autoPilotSwitch) {
        incSpeedX = 0.009;
        incSpeedY = 0.009;
    }
    if ((this.speedX >0) && (Math.abs(this.speedX < 10))) this.speedX += incSpeedX;
    else this.speedX += -1*incSpeedX;
    if ((this.speedY >0)  && (Math.abs(this.speedY < 11))) this.speedY += incSpeedY;
    else this.speedY += -1*incSpeedY;
}

Ball.prototype.draw = function() {
    this.ctx.beginPath();
    
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, this.radius, 0, (Math.PI) * 2);    
    this.ctx.fill();
    this.ctx.closePath();
}
Ball.prototype.launchBall = function (launched) {
    this.launched = true;
}
Ball.prototype.getBallIsLaunched = function () {
    return this.launched;
}

Ball.prototype.updatePosition = function (platformNewX) {
    if (!this.launched) this.x = platformNewX;
    else {
        this.prevYprevY = this.prevY;
        this.prevY = this.y;
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

Ball.prototype.handleWallCollisions = function(platformX, platformY, platformSize,platformDirection,autoPilot) {
    var screenRightBorder = this.canvas.width;
    function pointInCircle(x, y, cx, cy, radius) {
        //x,y points to check
        //cx, cy points from the circle
        var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
        return distancesquared <= radius * radius;
      }
    var screenRightBorder = this.canvas.width;
    //If ball touches left wall
    if ((this.x + this.speedX === 999) && (this.y + this.speedY === 1) ) {
        this.x = 980;
        this.y = 30;
        this.speedY = (this.speedY);
        this.speedX = -(this.speedX);
        this.wallAudio.play();
        this.audioOutside= currentTime =0;
        this.audioOutside.play();

    }else if ((this.x + this.speedX === 1) && (this.y + this.speedY === 1)) {
        this.speedY = -(this.speedY);
        this.speedX = -(this.speedX);
        this.wallAudio.play();
        this.audioOutside= currentTime =0;
        this.audioOutside.play();

    }else if(this.x > 1000) {
        this.x =990;
        this.audioOutside= currentTime =0;
        this.audioOutside.play();
    }
    else {
        if (pointInCircle(0,this.y, this.x,this.y, this.radius)) {
            this.bounce('left');
            this.wallAudio.play();
        }
        //if ball touches right wall
        else if (pointInCircle(screenRightBorder,this.y, this.x,this.y, this.radius)) {
            this.bounce('right');
            this.wallAudio.play();
        }
        //If ball touches top wall
        else if (pointInCircle(this.x,0, this.x,this.y, this.radius)) {
            this.bounce('top');
            this.wallAudio.play();
        }
        //If touches platform
        else if (this.ballTouchesLine(platformX-5,platformY,platformX+platformSize+5,platformY,this.x,this.y,this.radius)) {
                this.bounce('platform', platformDirection,autoPilot);
        }
    }
    
    
}

Ball.prototype.bounce = function (bouncedFrom, platformDirection, autoPilot) {
    switch (bouncedFrom) {
        case 'top':
        case 'platform':
            if (((this.speedX > 0 && platformDirection < 0) || (this.speedX < 0 && platformDirection >0)) && !autoPilot) {
                this.speedX = -(this.speedX);
            }
        case 'bottom':
            this.speedY= -(this.speedY);
            break;
        case 'right':
        case 'left':
            this.speedX = -(this.speedX);
            break;
    }
}



Ball.prototype.checkOutside = function(platformX, platformSize) {
   /* if ((this.x < 0) && (this.y < 0)) {
        this.x = 1;
        this.y = 1;
        this.speedX = Math.abs(this.speedX);
        this.speedY = Math.abs(this.speedY) * -1;
        console.log('caso A');
    }
    else if ((this.x === 999) && (this.y ===1)) {
        this.x = 990;
        this.y = 10;
        this.speedX = Math.abs(this.speedX) * -1;
        this.speedY = Math.abs(this.speedY) * -1;
        console.log('caso C');
    }*/
    if ((this.y <= 1)) {
        this.x = this.canvas.width -30;
        this.y = 20;
        this.speedX = Math.abs(this.speedX) * -1;
        this.speedY = Math.abs(this.speedY) * -1;
    }
    if ((this.y>498) && (Math.floor(this.y) === Math.floor(this.prevYprevY)) && ((this.x >platformX) &&(this.x<platformX+platformSize))) {
        this.speedY = Math.abs(this.speedY) * -1;
        this.y = 480;
    }else if((500-this.y+this.prevY-this.prevYprevY < 30) && ((this.x >platformX) &&(this.x<platformX+platformSize))) {
        this.speedY = Math.abs(this.speedY) * -1;
    }
    this.audioOutside.currentTime=0;
    this.audioOutside.play();
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
    this.speedY = -3;
    this.speedX = 3;
    this.fallen = false;
}
Ball.prototype.isFallen = function() {
    return this.fallen;
}
Ball.prototype.getSpeedX = function() {
    return this.speedX;
}
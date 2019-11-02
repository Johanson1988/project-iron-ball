'use strict';

function Ball (canvas,x,y) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = x; //For the first ball should platform.x + 45, platform.y;
    this.y = y; 
    this.radius = 10;
    this.speed = 10;
    this.color = 'blue';
    this.launched = false;
    this.stop = false; //testing option
    //will add random to be launch to one direction or other
    this.direction = 'north-east';
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
    else if(!this.stop) switch(this.direction) {
        case 'north':
            this.y--;
            break;
        case 'north-east':
            this.x++;
            this.y--;
            break;
        case 'east':
            this.x++;
            break;
        case 'south-east':
            this.x++;
            this.y++;
            break;
        case 'south':
            this.y++;
            break;
        case 'south-west':
            this.y++;
            this.x--;
            break;
        case 'west':
            this.x--;
            break;
        case 'north-west':
            this.x--;
            this.y--;
            break;
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
        this.direction = this.bounce('left', this.direction);
    }
    //if ball touches right wall
    else if (pointInCircle(screenRightBorder,this.y, this.x,this.y, this.radius)) {
        this.direction = this.bounce('right', this.direction);
    }
    //If ball touches top wall
    else if (pointInCircle(this.x,0, this.x,this.y, this.radius)) {
        this.direction = this.bounce('top', this.direction);
    }
    //If touches platform
    else if ((this.y === platformY) && (this.x >= platformX) && (this.x <= platformX + platformSize)) {
        if (pointInCircle(platformX, platformY, platformX, this.y, this.radius)) {
            this.direction = this.bounce('platform', this.direction);
        }
    }
}

Ball.prototype.bounce = function (bouncedFrom, direction) {
    switch (bouncedFrom) {
        case 'top':
            if (direction === 'north-east') return 'south-east';
            if (direction === 'north-west') return 'south-west';
            break;
        case 'right':
            if (direction === 'north-east') return 'north-west';
            if (direction === 'south-east') return 'south-west';
            break;
        case 'platform':
            if (direction === 'south-east') return 'north-east';
            if (direction === 'south-west') return 'north-west';
            break;
        case 'left':
            if (direction === 'north-west') return 'north-east';
            if (direction === 'south-west') return 'south-east';
            break;
    }
}
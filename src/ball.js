'use strict';

function Ball (canvas,x,y) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = x; //For the first ball should platform.x + 45, platform.y;
    this.y = y; 
    this.radius = 30;
    this.speed = 10;
    this.color = 'blue';
    this.launched = false;
    this.stop = false; //testing option
    //will add random to be launch to one direction or other
    this.direction = 'north-west';
}

Ball.prototype.draw = function() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, 10, 0, (Math.PI) * 2);
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

Ball.prototype.handleWallCollisions = function() {
    function pointInCircle(x, y, cx, cy, radius) {
        //x,y points to check
        //cx, cy points from the circle
        var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
        return distancesquared <= radius * radius;
      }
    var screenRightBorder = this.canvas.width;
      console.log(this.x,this.y);
    //If ball touches left wall

    if (pointInCircle(-this.radius+10,this.y, this.x,this.y, this.radius)) {
        this.stop = true;
    }
    //if ball touches right wall
    if (pointInCircle(screenRightBorder+this.radius-10,this.y, this.x,this.y, this.radius)) {
        this.stop = true;
    }
    //If ball touches top wall
    if (pointInCircle(this.x,-this.radius+10, this.x,this.y, this.radius)) {
        this.stop = true;
    }
}


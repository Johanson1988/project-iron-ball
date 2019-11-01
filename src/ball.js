'use strict';

function Ball (canvas,x,y) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = x; //For the first ball should platform.x + 45, platform.y;
    this.y = y; 
    this.radio = 30;
    this.speed = 10;
    this.color = 'blue';
}

Ball.prototype.draw = function() {
    console.log('drawing ball');
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, 10, 0, (Math.PI) * 2);
    this.ctx.fill();
}


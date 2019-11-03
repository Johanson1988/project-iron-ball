'use strict';
//random size
function Brick (canvas,x,y,width) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 15;
    this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
}

Brick.prototype.draw = function() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
        this.x,
        this.y,
        this.width,
        this.height);
        
    this.ctx.closePath();
}
'use strict';
//random size
class Brick {
    constructor(canvas,x,y,width) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.width = width; //add width for random
        this.height = 20;
        this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';

    }
    draw () {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height);
            
        this.ctx.closePath();
    }
}


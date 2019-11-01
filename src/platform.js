'use strict';
function Platform (canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = 455; //half of totalCanvasSize - half of platform size;
    this.y = 420;
    this.lives = 5;
    this.points = 0;
    this.size = 90;
    this.sectionSize = 30; //size divided by 3 so 3 sections
    this.color = 'red';
    this.initPos = {x: 455, y: 420};
}


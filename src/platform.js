'use strict';
function Platform (canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = 0;
    this.y = 0;
    this.lives = 5;
    this.points = 0;
    this.size = null;
    this.sectionSize = null;
    this.color = 'red';
    this.initPos = null;



}
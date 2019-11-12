'use strict';
//random size
//encapsulation in progress, restore to previous commit if still does not work
class Brick {
    constructor(pCanvas,pX,pY,pWidth) {
        let canvas = pCanvas;
        let ctx = canvas.getContext('2d');
        let x = pX;
        let y = pY;
        let width = pWidth; //add width for random
        let height = 20;
        let color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';

        //Getters
        this.getCtx = () => ctx;
        this.getX = () => x;
        this.getY = () => y;
        this.getWidth = () => width;
        this.getHeight = () => height;
        this.getColor = () => color;
    }


    draw () {
        this.getCtx().beginPath();
        this.getCtx().fillStyle = this.getColor();
        this.getCtx().fillRect(
            this.getX(),
            this.getY(),
            this.getWidth(),
            this.getHeight());
            
        this.getCtx().closePath();
    }
}


'use strict';
class Platform  {
  constructor(canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = 455; //half of totalCanvasSize - half of platform size;
    this.y = 500; //420 final value
    this.speed = 30;
    this.lives = 1;
    this.points = 0;
    this.width = 150;
    this.height = 30;
    this.direction = 0;
    this.sectionSize = 30; //size divided by 3 so 3 sections
    this.color = 'red';
    this.rocketImg = new Image();
    this.autoPilotSwitch = false;
  }
  setDirection (direction) {
    // +1 right  -1 left
    if (direction === 'left') this.direction = -1;
    else if (direction === 'right') this.direction = 1;
    this.move();
  };
  move () {
    this.x += this.direction * this.speed;
  };

  handleScreenCollision () {
  const screenLeftBorder = 0;
  const screenRightBorder = this.canvas.width;


  if ((this.x + this.direction * this.speed) > screenRightBorder-this.width){
    this.x = screenRightBorder - this.width;
  }
  //if it reaches the border it will not escape the screen
  else if (this.x < screenLeftBorder) this.x = 0;
  };

  // removeLife()

  removeLife () {
      this.lives -= 1;
  };
  updateLives () {
    document.querySelector('.lives .value').innerHTML = this.lives;
  }

  draw () {
    if (this.direction === 1) this.rocketImg.src = ('./images/rocketL.png');
    else this.rocketImg.src = ('./images/rocketR.png');
    // fillRect(x, y, width, height)
    this.ctx.drawImage(this.rocketImg,
      this.x,
      this.y,
      this.width,
      this.height
    );
    
  };
  returnToInitialPosition () {
    //half of totalCanvasSize - half of platform size;
    this.x= this.canvas.width/2 - this.width/2;
  }
  addPoints  (points) {
    this.points += points;
  }
  updatePoints () {
    const points = document.querySelector('.points .value');
    points.innerHTML = this.points;
  }
  getPoints () {
    return this.points;
  }
  livesRemaining  () {
    if (this.lives > 0) return true;
    else return false;
  }
  autoPilot (ballX) {
    //const prevX = this.x;
    this.x = ballX-this.width/2;
    //if (prevX - this.X < 0) this.setDirection('left');
    //else this.setDirection('right');
    
  }
  getDirection  () {
    return this.direction;
  }
  activateAutoPilot  (boolean) {
    console.log(boolean);
    this.autoPilotSwitch = boolean;
  }
}
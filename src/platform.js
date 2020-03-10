'use strict';
class Platform  {
  constructor(newCanvas, newLives) {
    let canvas = newCanvas;
    let ctx = canvas.getContext('2d');
    let x = 455; //half of totalCanvasSize - half of platform size;
    let y = 500; //420 final value
    let speed = 30;
    let lives = newLives;
    let points = 0;
    let width = 150;
    let height = 30;
    let direction = 0;
    let rocketImg = new Image();
    let autoPilotSwitch = false;
    let isHovered = false;

    //getters
    this.getCanvas = () => canvas;
    this.getCtx = () => ctx;
    this.getX = () => x;
    this.getY = () => y;
    this.getSpeed = () => speed;
    this.getLives = () => lives;
    this.getPoints = () => points;
    this.getWidth = () => width;
    this.getHeight = () => height;
    this.getDirection = () => direction;
    this.getRocketImg = () => rocketImg;
    this.getAutoPilot = () => autoPilotSwitch;
    this.getIsHovered = () => isHovered;

    //setters
    this.setDirection = (newDirection) => {
      // +1 right  -1 left
      if (newDirection === 'left') direction = -1;
      else if (newDirection === 'right') direction = 1;
      this.move();
    };
    
    this.setX = (newX) => x = newX;
    this.setY = (newY) => y = newY;
    this.setSpeed = (newSpeed) => speed = newSpeed;
    this.setLives = (newLives) => lives += newLives;
    this.setPoints =  (newPoints) => points += newPoints;
    this.setAutoPilot =  (boolean) => autoPilotSwitch = boolean;
    this.setRocketImgRoute = (route) => rocketImg.src=route;
    this.setIsHovered = newStatus => isHovered = newStatus;
  }

  move () {
    this.setX(this.getX() + this.getDirection() * this.getSpeed());
  };

  handleScreenCollision () {
  const screenLeftBorder = 0;
  const screenRightBorder = this.getCanvas().width;


  if ((this.getX() + this.getDirection() * this.getSpeed()) > screenRightBorder-this.getWidth()){
    this.setX(screenRightBorder - this.getWidth());
  }
  
  //if it reaches the border it will not escape the screen
  else if (this.getX() < screenLeftBorder) this.setX(0);
  };

  // removeLife()

  removeLife () {
      this.setLives(-1);
  };
  updateLives () {
    document.querySelector('.lives .value').innerHTML = this.getLives();
  }

  draw () {
    if (this.getDirection() === 1) this.setRocketImgRoute('./images/rocketL.png');
    else this.setRocketImgRoute('./images/rocketR.png');
    // fillRect(x, y, width, height)
    this.getCtx().drawImage(this.getRocketImg(),
      this.getX(),
      this.getY(),
      this.getWidth(),
      this.getHeight()
    );
    
  };
  returnToInitialPosition () {
    //half of totalCanvasSize - half of platform size;
    this.setX(this.getCanvas().width/2 - this.getWidth()/2);
  }

  updatePoints () {
    const points = document.querySelector('.points .value');
    points.innerHTML = this.getPoints();
  }

  livesRemaining  () {
    if (this.getLives() > 0) return true;
    else return false;
  }
  autoPilot (ballX) {
    //const prevX = this.x;
    this.getX() = ballX-this.getWidth()/2;
    //if (prevX - this.X < 0) this.setDirection('left');
    //else this.setDirection('right');
    
  }
  

}
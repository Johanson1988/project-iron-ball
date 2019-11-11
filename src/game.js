'use strict';

class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.platform= null;
    this.gameIsOver = false;
    this.ball = null;
    this.gameScreen = null;
    this.bricksArray = [];
    this.chronometer = null;
    this.lastBrickY = null;
    this.totalBricks = 40;
    this.gameAudio = new Audio('./audio/Chiptronical.ogg');
    this.brickAudio = new Audio('./audio/brick-sound.wav');
    this.pause = false;

    //Canvas Background
    const img = new Image();
    img.src = './images/space-background.png'

    this.backgroundImage = {
      img: img,
      y: 0,
      speed: 17,

      move: function(canvas) {
        this.y += this.speed;
        this.y %= canvas.height;
      },

      draw: function(canvas,ctx) {
        ctx.drawImage(this.img, 0, this.y);
        if (this.speed < 0) {
          ctx.drawImage(this.img, 0, this.y + canvas.height,canvas.width,canvas.height);
        } else {
          ctx.drawImage(this.img, 0, this.y - this.img.height,canvas.width,canvas.height);
        }
      },
    };
  }

  start () {
    // Save reference to canvas and container. Create ctx
  this.canvasContainer = document.querySelector('.canvas-container');
  this.canvas = this.gameScreen.querySelector('canvas');
  this.ctx = this.canvas.getContext('2d');

  // Save reference to the score, time and lives elements
  this.livesElement = this.gameScreen.querySelector('.lives .value');
  this.scoreElement = this.gameScreen.querySelector('.score .value');
  this.timeElement = this.gameScreen.querySelector('.time .value');

  // Set the canvas dimensions to match the parent
  this.containerWidth = this.canvasContainer.offsetWidth;
  this.containerHeight = this.canvasContainer.offsetHeight;
  this.canvas.setAttribute('width', this.containerWidth);
  this.canvas.setAttribute('height', this.containerHeight);

  //Creates a new chronometer
  this.chronometer = new Chronometer();

  // Create a new platform and ball for the current game
  this.platform = new Platform(this.canvas, 5);
  this.ball = new Ball(
    this.canvas,
    this.platform.x+this.platform.width/2,
    this.platform.y-10, //se le resta el radio
    -3.5,
    -3.5);

  //Generate bricks
  this.lastBrickY = this.generateBricks(this.totalBricks);
    
  // Add event listener for moving the player
  this.handleKeyDown = event => {
    if (event.key === 'ArrowLeft') {
      this.platform.setDirection('left');  
    }else if (event.key === 'ArrowRight') {
      this.platform.setDirection('right');
    }else if (event.keyCode === 32) {
      this.ball.launchBall(true);
      this.chronometer.startClick();
    }else if (event.keyCode === 81) {
      this.platform.activateAutoPilot(true);
    }else if(event.keyCode === 80) {
      this.platform.activateAutoPilot(false);
    }else if (event.keyCode === 16) {
      if (this.pause) this.pause = false;
      else this.pause = true;
    }
  };

  document.body.addEventListener('keydown', this.handleKeyDown.bind(this));

  // Start the canvas requestAnimationFrame loop
  this.startLoop();
  };

  startLoop () {

  const loop = () => {
    if (this.pause === false) {
      this.ball.fall();
      const time = document.querySelector('.time .value');
      time.innerHTML = this.chronometer.setTime();
      if (!this.ball.getBallIsLaunched()) {
        if ((this.platform.getDirection() > 0 && this.ball.getSpeedX() < 0)
            || (this.platform.getDirection() < 0 && this.ball.getSpeedX() > 0))
          this.ball.setSpeeds(this.ball.getSpeedX*-1);
      }
      if (!this.ball.isFallen()) {
        this.platform.handleScreenCollision();
        if (this.bricksArray.length === 0) {
          this.lastBrickY = this.generateBricks(this.totalBricks);
          if (!this.platform.autoPilotSwitch) {
            this.ball.launchBall(false);
            this.chronometer.stopClick();
            this.ball.returnToInitialPosition(this.platform.x+this.platform.width/2,this.platform.y-10);
          }
          
        }
        if (this.ball.getBallIsLaunched()) {
          if (this.platform.autoPilotSwitch) {
            this.platform.autoPilot(this.ball.x);
          }
          this.backgroundImage.move(this.canvas);
          this.gameAudio.play();
          this.ball.checkOutside(this.platform.x,this.platform.width);
          this.ball.handleWallCollisions(this.platform.x, this.platform.y,this.platform.width,this.platform.direction,this.platform.autoPilotSwitch);
          
          
          //avoid checking brick collisions if the ball isn't in the area to save CPU
          
          if ((this.ball.y-this.ball.radius) <= (this.lastBrickY + this.ball.radius*3)) {
            
            this.bricksArray.forEach((brick,index) => {
              this.handleBrickCollisions(this.ball,brick,index);
              });
          }
          this.platform.updatePoints();
        }
        this.ball.updatePosition(this.platform.x+this.platform.width/2);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.backgroundImage.draw(this.canvas,this.ctx);
        this.platform.draw();
        this.ball.draw();
        this.bricksArray.forEach((brick) => {
          brick.draw();
        });
        if (this.ball.getBallIsLaunched()) {
          this.ball.increaseSpeed(this.platform.autoPilotSwitch);
        }
      }else {
        this.gameAudio.pause();
        this.gameAudio.currentTime = 0;
        this.chronometer.stopClick();
        this.platform.removeLife();      
        if (this.platform.livesRemaining()) {
          this.platform.returnToInitialPosition();
          this.ball.returnToInitialPosition(this.platform.x+this.platform.width/2,
            this.platform.y-10);
        }else this.setGameOver();
      }
      this.platform.updateLives();
      }else {
        this.gameAudio.pause();
        this.chronometer.stopClick();
      }
      if (!this.gameIsOver) window.requestAnimationFrame(loop);
    };

  window.requestAnimationFrame(loop);
  } ;


  setGameOver () {
  this.gameIsOver = true;
  this.showGameOverScreen();
  this.onGameOverCallback();
  };
  passGameOverCallback(callback) {
  this.onGameOverCallback = callback;
  };

  removeGameScreen () {
  this.gameScreen.remove();
  };
  showGameOverScreen () {
  const gameOverScreen = document.querySelector('.game-over-hidden');
  gameOverScreen.classList.remove('game-over-hidden');

  const scores = document.querySelector('.final-score .value');
  scores.innerHTML = this.platform.getPoints();
  };

  restartGame () {
  this.platform.lives = 1;    //Add set life
  this.gameIsOver = false;
  this.platform.points = 0;         //Add set points
  this.chronometer.resetClick();
  this.platform.returnToInitialPosition();
  this.ball.returnToInitialPosition(this.platform.x+this.platform.width/2,
    this.platform.y-10);
  this.ball.setSpeeds(2.5,-2.5);
  this.totalBricks = 30;
  this.clearBricksArray();
  this.lastBrickY = this.generateBricks(this.totalBricks);
  this.startLoop();
  }

  handleBrickCollisions(ball,brick,index) {
  const brickTopLeft = {
      x : brick.x,
      y : brick.y
  }
  const brickTopRight = {
      x : brick.x+brick.width,
      y : brick.y
  }
  const brickBottomLeft = {
      x : brick.x,
      y : brick.y+brick.height
  }
  const brickBottomRight = {
      x : brick.x + brick.width,
      y : brick.y + brick.height
  }
  //touches bottom border of the brick
  if (ball.ballTouchesLine(brickBottomLeft.x,brickBottomLeft.y,brickBottomRight.x,brickBottomRight.y,ball.x,ball.y,ball.radius)) {
      ball.bounce('bottom');
      this.bricksArray.splice(index,1);
      this.platform.addPoints(100);
      this.brickAudio.currentTime = 0;
      this.brickAudio.play();
  //hits right border
  }else if (ball.ballTouchesLine(brickTopRight.x,brickTopRight.y,brickBottomRight.x, brickBottomRight.y,ball.x,ball.y,ball.radius)) {
    ball.bounce('right');
    this.bricksArray.splice(index,1);
    this.platform.addPoints(100);
    this.brickAudio.currentTime = 0;
    this.brickAudio.play();
  }
  //hits top border
  else if (ball.ballTouchesLine(brickTopLeft.x,brickTopLeft.y,brickTopRight.x,brickTopRight.y,ball.x,ball.y,ball.radius)) {
    ball.bounce('top');
    this.bricksArray.splice(index,1);
    this.platform.addPoints(100);
    this.brickAudio.currentTime = 0;
    this.brickAudio.play();
  }
  //hits left border
  else if (ball.ballTouchesLine(brickTopLeft.x,brickTopLeft.y,brickBottomLeft.x,brickBottomLeft.y,ball.x,ball.y,ball.radius)) {
    ball.bounce('left');
    this.bricksArray.splice(index,1);
    this.platform.addPoints(100);
    this.brickAudio.currentTime = 0;
    this.brickAudio.play();
  }
  }
  generateBricks (totalBricks) {
  //Create bricks
  let totalWidth = random(30,80);
  const brickGap = 4
  let totalHeight = 80;
  for (let i=0;i<=totalBricks;i++) {                 //Cambiar este index para generar más ladrillos
    const width = random(30,90);
    if (totalWidth + width >= this.canvas.width) {
      totalWidth = random(5,20);
      totalHeight += random(25,60);
    }
    
    var brick = new Brick(this.canvas, totalWidth, totalHeight, width);
    totalWidth += brickGap + brick.width;
    this.bricksArray.push(brick);
  }
  this.increaseTotalBricks();
  return totalHeight + brick.height;
  }
  clearBricksArray () {
  this.bricksArray = [];
  }
  increaseTotalBricks() {
  this.totalBricks +=10;
  }
  getPoints () {
  return this.platform.getPoints();
  }
  
  
}

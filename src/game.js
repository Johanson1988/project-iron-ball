'use strict';

function Game () {
    this.canvas = null;
    this.ctx = null;
    this.lifes = 5;
    this.platform= null;
    this.points = 0;
    this.gameIsOver = false;
    this.ball = null;
    this.gameScreen = null;
}

Game.prototype.start = function() { };
Game.prototype.startLoop = function () {} ;
Game.prototype.checkCollisions = function () {};
Game.prototype.clearCanvas = function () {};
Game.prototype.updateCanvas = function () {};
Game.prototype.drawCanvas = function () {};
Game.prototype.setGameOver = function () {};
Game.prototype.showScores = function () {};
Game.prototype.removeGameScreen = function () {};
Game.prototype.showGameOverText = function () {};
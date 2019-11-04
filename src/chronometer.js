// Constructor
function Chronometer() {
    this.currentTime = 0;
    this.intervalId = 0;
    this.milliseconds =0;
    this.intervalMillisecs = 0;
}

Chronometer.prototype.startClick = function () {
    this.intervalId = setInterval(() => {
        this.milliseconds++;
        if (this.milliseconds === 100) {
            this.currentTime++;
            this.milliseconds = 0;
        }                
        this.setTime();
    },10);
};

Chronometer.prototype.setMinutes = function () {
    return this.twoDigitsNumber(parseInt(this.currentTime/60));
};

Chronometer.prototype.setSeconds = function () {
    return this.twoDigitsNumber(parseInt(this.currentTime -this.setMinutes()*60));
};
Chronometer.prototype.setMilliseconds = function () {
    return this.twoDigitsNumber(parseInt(this.milliseconds));
}

Chronometer.prototype.twoDigitsNumber = function (num) {
    return ('0' + num).slice(-2);
};

Chronometer.prototype.setTime = function() {
     return `${this.setMinutes()}:${this.setSeconds()}:${this.setMilliseconds()}`;
}

Chronometer.prototype.stopClick = function () {
    clearInterval(this.intervalId);
};

Chronometer.prototype.resetClick = function () {
    this.currentTime = 0;
    this.milliseconds = 0;
};
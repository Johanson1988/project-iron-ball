// Constructor
class Chronometer {
    constructor() {
        this.currentTime = 0;
        this.intervalId = 0;
        this.milliseconds =0;
        this.intervalMillisecs = 0;
    }
    startClick () {
        this.intervalId = setInterval(() => {
            this.milliseconds++;
            if (this.milliseconds === 100) {
                this.currentTime++;
                this.milliseconds = 0;
            }                
            this.setTime();
        },10);
    };
    
    setMinutes () {
        return this.twoDigitsNumber(parseInt(this.currentTime/60));
    };
    
    setSeconds () {
        return this.twoDigitsNumber(parseInt(this.currentTime -this.setMinutes()*60));
    };
    setMilliseconds () {
        return this.twoDigitsNumber(parseInt(this.milliseconds));
    }
    
    twoDigitsNumber (num) {
        return ('0' + num).slice(-2);
    };
    
    setTime = function() {
         return `${this.setMinutes()}:${this.setSeconds()}:${this.setMilliseconds()}`;
    }
    
    stopClick () {
        clearInterval(this.intervalId);
    };
    
    resetClick () {
        this.currentTime = 0;
        this.milliseconds = 0;
    };
}
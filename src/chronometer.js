// Constructor
class Chronometer {
    constructor() {
        let currentTime = 0;
        let intervalId = 0;
        let milliseconds =0;

        //getters
        this.getCurrentTime = () => currentTime;
        this.getIntervalId = () => intervalId;
        this.getMilliseconds = () => milliseconds;

        //setters
        this.updateCurrentTime = (newCurrentTime) => currentTime = newCurrentTime;
        this.updateIntervalId = (newIntervalID) => intervalId = newIntervalID;
        this.updateMilliseconds = (newMilliseconds) => milliseconds = newMilliseconds;
        this.setTime = () => {
            return `${this.setMinutes()}:${this.setSeconds()}:${this.setMilliseconds()}`;
       };
        
    }
        
    startClick () {
        this.updateIntervalId(setInterval(() => {
            this.updateMilliseconds(this.getMilliseconds()+1);
            if (this.getMilliseconds() === 100) {
                this.updateCurrentTime(this.getCurrentTime()+1);
                this.updateMilliseconds(0);
            }                
            this.setTime();
        },10));
    };
    
    setMinutes () {
        return this.twoDigitsNumber(parseInt(this.getCurrentTime()/60));
    };
    
    setSeconds () {
        return this.twoDigitsNumber(parseInt(this.getCurrentTime() -this.setMinutes()*60));
    };
    setMilliseconds () {
        return this.twoDigitsNumber(parseInt(this.getMilliseconds()));
    }
    
    twoDigitsNumber (num) {
        return ('0' + num).slice(-2);
    };
    

    
    stopClick () {
        this.updateIntervalId(clearInterval(this.getIntervalId()));
    };
    
    resetClick () {
        this.updateCurrentTime(0);
        this.updateMilliseconds(0);
    };
}
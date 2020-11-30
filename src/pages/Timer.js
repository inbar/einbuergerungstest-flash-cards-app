export default class Timer {
    constructor(setTimeSec, tickCallback) {
        this.isRunning = false;
        this.originalSetTimeSec = setTimeSec;
        this.timerRemainingSec = setTimeSec;
        this.tickCallback = tickCallback;
    }

    start(callback) {
        if (!this.isRunning) {
            this.intervalId = setInterval(
                () => this.tick(),
                1000
            );
            this.isRunning = true;
        }
        
        callback(this);
    }

    pause(callback) {
        clearInterval(this.intervalId);
        this.isRunning = false;
        callback(this);
    }

    reset(callback) {
        clearInterval(this.intervalId);
        this.isRunning = false;
        this.timerRemainingSec = this.originalSetTimeSec;

        callback(this);
    }

    tick() {
        this.timerRemainingSec = --this.timerRemainingSec;
        this.tickCallback(this);
    }
    
}
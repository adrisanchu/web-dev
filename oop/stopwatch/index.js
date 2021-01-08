function Stopwatch() {
    // set initial variables
    let startTime, endTime, duration = 0;
    let running = false;
    
    // start our timer
    this.start = function() {
        if(running)
            throw new Error('Stopwatch has already started!');

        running = true;
        console.log('start!');
        startTime = new Date();
    }
    
    // stop the clock!
    this.stop = function() {
        if(!running)
            throw new Error('Stopwatch is already stopped!');

        running = false;
        console.log('stop!');
        endTime = new Date();
        const seconds = ( endTime.getTime() - startTime.getTime() ) / 1000;
        duration += seconds;
    }
    
    // reset activate initial state
    this.reset = function() {
        console.log('reset');
        startTime = null;
        endTime = null;
        running = false;
        duration = 0;
    }

    Object.defineProperty(this, 'duration', {
        get: function() { return duration; }
    });
}

const sw = new Stopwatch(10);
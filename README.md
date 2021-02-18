# timerjs
manages multiple timers with the lowest memory and resource load

## Create function
Creates a new clock, receives an optional boolean parameter indicating whether the clock will start immediately after being created (default: false).


### Example
    const timer = new Timer();
    const clock = timer.Create(true);


## Attributes and functions del reloj
 - id       : int
 - active   : boolean
 - created  : boolean
 - getTime  : function
 - seconds  : int
 - tick     : function
 - reset    : function

## reset function example

    const timer = new Timer();
    const clock = timer.Create(true);

    clock.reset();

## getTime function example

    const timer = new Timer();
    const clock = timer.Create(true);

    console.log(clock.getTime()); // return object {hours:int,minutes:int,seconds:int}

## tick function example

    const timer = new Timer();
    const clock = timer.Create(true);

    clock.tick = (time)=>{
        // time = {hours:int,minutes:int,seconds:int}
        if(time.minutes >= 5){
            clock.active = false;
            alert("stop");
        }
    }
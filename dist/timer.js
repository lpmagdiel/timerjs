/**
 * @constructor
 */
class Timer{
    constructor(){
        this.clockList = [];
        this.runControl = window.setInterval(()=>{
            this.Run();
        },1000);
        console.log('🕒 Ready');
    }
    /**
     * @returns {Array} Array of objects with the data of each watch
     */
    Export(){
        return this.clockList;
    }
    /**
     * 
     * @param {Array} clocks Array of objects with the data of each watch
     */
    Import(clocks = []){
        this.clockList = this.clockList.concat(clocks);
    }
    /**
     * 
     * @param {Boolean} activate Indicates whether or not the network will be active when it is created.
     * @returns {Object}
     */
    Create(activate = false){
        let dt = new Date();
        let d = (dt.getDate() < 10)?'0'+dt.getDate():dt.getDate();
        let m = ((dt.getMonth()+1) < 10)?'0'+(dt.getMonth()+1):(dt.getMonth()+1);
        let clock = {
            created: dt.getFullYear()+'-'+m+'-'+d,
            seconds: 0,
            minutes: 0,
            hours: 0,
            id: Date.now(),
            active:activate,
            reset: function(){
                this.seconds=0;
                this.minutes=0;
                this.hours=0;
            },
            tick:null
        }
        this.clockList.push(clock);
        return this.clockList[this.clockList.length-1];
    }
    Run(){
        for (let i=0;i<this.clockList.length;i++){
            if(this.clockList[i].active === true){
                this.clockList[i].seconds++;
                if(this.clockList[i].seconds >= 60){
                    this.clockList[i].minutes++;
                    this.clockList[i].seconds = 0;
                }
                if(this.clockList[i].minutes >= 60){
                    this.clockList[i].hours++;
                    this.clockList[i].minutes = 0;
                }
                if(typeof this.clockList[i].tick == 'function'){
                    this.clockList[i].tick({hours:this.clockList[i].hours,minutes:this.clockList[i].minutes,seconds:this.clockList[i].seconds});
                }
            }
        }
    }
}
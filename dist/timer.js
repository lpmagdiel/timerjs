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
            getTime: function(){
                const m = Math.floor((this.seconds / 60) % 60);
                const h = Math.floor(this.seconds / 3600);
                const s = this.seconds % 60;
                return {seconds:s,minutes:m,hours:h};
            },
            id: Date.now(),
            active:activate,
            reset: function(){
                this.seconds=0;
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
                if(typeof this.clockList[i].tick == 'function'){
                    this.clockList[i].tick(this.clockList[i].getTime());
                }
            }
        }
    }
}
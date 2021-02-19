'use strict';
/**
 * @constructor
 */
class Timer{
    constructor(){
        this.clockList = [];
        this.Run();
        console.log('%c🕒 Ready', 'color: #196F3D');
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
            active: activate,
            reset: function(){
                this.seconds=0;
            },
            context:this,
            tick:null
        }
        let proxy = new Proxy(clock,{
            set: function(target,promp,value){
                switch(promp){
                    case 'active':
                        if(target.active != value){
                            target.active = value;
                            target.context.Run();
                        }
                        break;
                    case 'tick':
                        target.tick = value;
                        break;
                }
            }
        });
        if(activate==true && this.IsAllInactive()==true){
            this.clockList.push(clock);
            this.Run();
        }
        else this.clockList.push(clock);
        return proxy;
    }
    IsAllInactive(){
        let status = false;
        status = (this.clockList.length>0)?this.clockList.map(i=> status+i.active).reduce((a,b)=> a+b):0;
        return (status>0)?false:true;
    }
    Run(){
        if(this.IsAllInactive()) window.clearInterval(this.runControl);
        else{
            this.runControl = window.setInterval(()=>{
                for (let i=0;i<this.clockList.length;i++){
                    if(this.clockList[i].active === true){
                        this.clockList[i].seconds++;
                        if(typeof this.clockList[i].tick == 'function'){
                            this.clockList[i].tick(this.clockList[i].getTime());
                        }
                    }
                }
                if(this.IsAllInactive()) window.clearInterval(this.runControl);
            },1000);
        }
    }
}
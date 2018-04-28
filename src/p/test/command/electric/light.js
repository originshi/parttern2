export default class Light{
    constructor(config){
        //name el
        Object.assign(this,config);
    }
    on(){
        this.el.addClass("on").removeClass("off");
        console.log("打开电灯")
    }
    off(){
        this.el.toggleClass("off").removeClass("on")
        console.log("关闭电灯")
    }
    
}
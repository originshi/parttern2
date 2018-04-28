export default class Fan{
    constructor(config){
        //name el
        Object.assign(this,config);
    }
    on(){
        this.el.addClass("on").removeClass("off");
        console.log("打开风扇")
    }
    off(){
        this.el.toggleClass("off").removeClass("on")
        console.log("关闭风扇")
    }
}
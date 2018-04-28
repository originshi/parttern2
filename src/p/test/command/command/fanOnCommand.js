import Command from "../base/command";
import Fan from "../electric/fan";

export default class FanOnCommand extends Command{
    constructor(fan){
        super();
        this.Fan=fan;
    }
    excute(){
        this.Fan.on();
    }
    undo(){
        this.Fan.off();
    }
}
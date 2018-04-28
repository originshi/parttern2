

import Command from "../base/command";
import Fan from "../electric/fan";

export default class FanOffCommand extends Command{
    constructor(fan){
        super();
        this.Fan=fan;
    }
    excute(){
        this.Fan.off();
    }
    undo(){
        this.Fan.on();
    }
}
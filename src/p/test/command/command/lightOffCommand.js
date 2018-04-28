import Command from "../base/command";
import Light from "../electric/light";

export default class LightOffCommand extends Command{
    constructor(light){
        super();
        this.light=light;
    }
    excute(){
        this.light.off();
    }
    undo(){
        this.light.on();
    }
}
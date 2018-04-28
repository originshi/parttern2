import Command from "../base/command";
import Light from "../electric/light";

export default class LightOnCommand extends Command{
    constructor(light){
        super();
        this.light=light;
    }
    excute(){
        this.light.on();
    }
    undo(){
        this.light.off();
    }
}
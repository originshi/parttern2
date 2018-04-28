import Cheese from "../burdenings/cheese";
import Icream from "../burdenings/icream";
import BurDeningFactory from "../base/burdeningFactory";


export default class CustomeBurdenningFactory extends BurDeningFactory {
    
    constructor(){
        super();
    }
    createCheese() {
        this.cheese=new Cheese();
        console.log("做了"+this.cheese.name)
        return this.cheese;
    }

    createIcream() {
        this.icream=new Icream()
        console.log("做了"+this.icream.name)
        return this.icream;
    }
}
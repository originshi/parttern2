
import BurDeningFactory from "../base/burdeningFactory";
import NewYorkCheese from "../burdenings/newYorkCheese";
import NewYorkIcream from "../burdenings/newYorkIcream";


export default class NewYorkBurdenningFactory extends BurDeningFactory {
    
    constructor(){
        super();
    }
    createCheese() {
        this.cheese=new NewYorkCheese();
        console.log("做了"+this.cheese.name)
        return this.cheese;
    }

    createIcream() {
        this.icream=new NewYorkIcream()
        console.log("做了"+this.icream.name)
        return this.icream;
    }
}
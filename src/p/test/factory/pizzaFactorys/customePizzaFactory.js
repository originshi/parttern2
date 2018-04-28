import { PizaFactory } from "../base/pizzaFactory";
import BigPizza from "../pizzas/bigPizza";
import SmallPizza from "../pizzas/smallPizza";
import NewYorkBurdenningFactory from "../burdeningFactorys/newYorkBurdening";
import CustomeBurdenningFactory from "../burdeningFactorys/customeBurdening";



export default class CustomePizzaFactory extends PizaFactory{
    constructor(){
       super()
       this.burDeningFactory=new CustomeBurdenningFactory();
    }

    createPizza(type){
        let pizza;
        switch (type) {
            case "big":
                pizza = new BigPizza(this.burDeningFactory);
                break;
            case "small":
                pizza = new SmallPizza(this.burDeningFactory);
                break;
            default:
                pizza = null;
                break;
        }
        this.pizza=pizza;
    }
}
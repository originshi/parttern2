import { PizaFactory } from "../base/pizzaFactory";
import BigPizza from "../pizzas/bigPizza";
import SmallPizza from "../pizzas/smallPizza";
import NewYorkBurdenningFactory from "../burdeningFactorys/newYorkBurdening";



export default class NewYorkPizzaFactory extends PizaFactory{
    constructor(){
       super()
       this.burDeningFactory=new NewYorkBurdenningFactory();
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
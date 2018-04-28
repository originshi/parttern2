

export class PizaFactory {
    pizza;
    constructor(){
        
    }
    createOrder(type){
       this.createPizza(type);
       this.pizza.burdening();
       this.pizza.cut();
       this.pizza.package();
       return this.pizza;
    }

    createPizza(){}
}
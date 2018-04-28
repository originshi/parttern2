import XbkCoffe from "./xbkcoffe";

export default class Decorate extends XbkCoffe{
    coffe;
    burdeningCost;
    constructor(coffe){
        super();
        this.coffe=coffe;
    }

    cost(){
        return this.burdeningCost+this.coffe.cost();
    }
}
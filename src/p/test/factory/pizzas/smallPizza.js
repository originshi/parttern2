import Pizza from "../base/pizza";

export default class SmallPizza extends Pizza{
   constructor(burdeningFactory){
       super(burdeningFactory);
   }

   burdening(){
    this.cheese=this.burdeningFactory.createCheese();
    this.iceram=this.burdeningFactory.createIcream();
   }
}
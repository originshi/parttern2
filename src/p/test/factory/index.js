import NewYorkPizzaFactory from "./pizzaFactorys/newyorkPizzaFactory";
import CustomePizzaFactory from "./pizzaFactorys/customePizzaFactory";
import Slider from "./component/slider/slider";

export default class Index{
   constructor(){
       let Nfactory=new NewYorkPizzaFactory();
       let pizza=Nfactory.createOrder("big");
       console.log(pizza);
       let Cfactory=new CustomePizzaFactory();
       let pizza1=Cfactory.createOrder("small");
       console.log(pizza1)
       this.init();
   }

   init(){
       let silder=new Slider({el:$(".huakuai"),max:5000,min:300,step:1000,showEl:$("#aa")})
       $("#aa").on("input",function(){
           var value=$(this).val();
           
            silder.fire("showEl:update",$(this).val())
           
           
       })
   }
}
class Singlon {
    static single={a:1};
    constructor(){
        return Singlon.single;
    }
}
console.log(new Singlon().a=4);
console.log(new Singlon())
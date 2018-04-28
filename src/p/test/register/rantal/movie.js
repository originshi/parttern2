import Base from "../base";
import CustomePrice from "./price/custome";
import NewPrice from "./price/new";
import ChildrenPrice from "./price/children";




export default class Movie extends Base{
     price;
     static CUSTOMER=Symbol();
     static NEW=Symbol();
     static CHILDREN=Symbol();
    constructor(type,name){
       super();
       this.name=name;
       switch (type){
        case Movie.CUSTOMER:
           this.price =new CustomePrice();
        break;
        case Movie.NEW:
           this.price =new NewPrice();
           break;
        case Movie.CHILDREN:
           this.price =new ChildrenPrice();
        break;
       }
    }
    getPrice(){
       return this.price.getPrice();
    }
    getPonit(){
       return this.price.getPonit();
    }
}
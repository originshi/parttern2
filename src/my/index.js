"use strict";
import Base from "./base";
import Customer from "./rantal/customer";
import Movie from "./rantal/movie";
import Rental from "./rantal/rental";


export default class Index extends Base{
   
    constructor(config){
       super(config)
       console.log(super().AA);
       this._init();
    }

    _init(){
        console.log("1111",this);
       var customer1=new Customer("wangwu");
       customer1.addRental(new Rental(new Movie(Movie.CUSTOMER,"heheda"),1))
       customer1.addRental(new Rental(new Movie(Movie.NEW,"heheda"),1))
       customer1.addRental(new Rental(new Movie(Movie.CHILDREN,"heheda"),1))
       customer1.showStament();
       console.log(customer1)
    }


}
new Index({heh:111});
import Base from "../base";


"use strict";

export default class Customer extends Base{
    _name;
    rentals=[];
    constructor(name){
       super();
       this._name=name;
    }
    _getName(name){
        return this._name;
    }
    addRental(rental){
        this.rentals.push(rental);
    }
    showStament(){
        let rentals=this.rentals;
        let result="";
        for(let i=0;i<rentals.length;i++){
            let rental=rentals[i];
            console.log(rental)
        }
    }
    
}
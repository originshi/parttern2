import Base from "../base";


"use strict";

export default class Price extends Base{
    
    constructor(){
        super();
        
    }

    getPrice(){
        return this.price;
    }
    getPoint(){
        return this.point;
    }
}
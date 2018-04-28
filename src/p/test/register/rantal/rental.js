import Base from "../base";


"use strict";

export default class Rental extends Base{
    movie;
    day;
    constructor(movie,day){
       super();
       this.movie=movie;
       this.day=day;
    }
    getPrice(){
        return this.movie.getPrice();
    }
    getPoint(){
        var point=this.movie.getPonit();
        let points=this.day*point;
        return points;
    }
}
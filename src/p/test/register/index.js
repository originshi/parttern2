"use strict";
import {Base,log} from "./base";
import { mix, copyProperties } from "./mix";
import { Observer, DisplayElement, Subject } from "./interface";

class WeatherData extends Subject {
    //static fenshuajiang=1;
    fenshuajiang=1;
    ObserverSet = new Set();
    
    constructor(){
        
        super();
        
        //this.fenshuajiang=1;
        this.name=1111;
        this.age=222;
        this.getName=function(){
            return this.name;
        }
    }
    registerObserver(Observer) {
        this.ObserverSet.add(Observer)
    }
    removeObserver(Observer) {
        this.ObserverSet.delete(Observer)
    }

    notifyObserver(data) {
        for (let Observer of this.ObserverSet) {
            Observer.update(data);
        }
    }
    setStateMent(data){
        this.notifyObserver(data)
    }
}
WeatherData.prototype.yuanxingshuxing="yuanxingshuxing";
class DisplayBord1 extends mix(Observer, DisplayElement) {
    display(data) {
        console.log("DisplayBord1",data)
    }
    update(data) {
        console.log("updateDisplayBord1")
        this.display(data);
    }
}
class DisplayBord2 extends mix(Observer, DisplayElement) {
    display(data) {
        console.log("DisplayBord2",data)
    }
    update(data) {
        console.log("updateDisplayBord1")
        this.display(data);
    }
}
class DisplayBord3 extends mix(Observer, DisplayElement) {
    display(data) {
        console.log("DisplayBord3",data)
    }
    update(data) {
        console.log("updateDisplayBord1")
        this.display(data);
    }
}


export default class Index extends Base {

    constructor(config) {
        super(config)    
        console.log(this)      
        // console.log("类属性",Reflect.ownKeys(WeatherData));
        // console.log(WeatherData.fenshuajiang);
        // console.log("原型",WeatherData.prototype)
        // // WeatherData.prototype.yuanxingshuxing="yuanxingshuxing";
        // // console.log("原型",WeatherData.prototype)
        // console.log("原型属性",Object.getOwnPropertyNames(WeatherData.prototype));
        // var weatherData1 = new WeatherData();
        // console.log("实例属性",Object.getOwnPropertyNames(weatherData1));
        
        // console.log("实例",weatherData1);
        // var displayBord2 = new DisplayBord2();
        // console.log(Reflect.ownKeys(DisplayBord2));
        // console.log(Reflect.ownKeys(displayBord2));
        // console.log(displayBord2)
       
        
        //this._init();
    }

    _init() {
        var weatherData1 = new WeatherData();
        var displayBord1 = new DisplayBord1();
        var displayBord2 = new DisplayBord2();
        var displayBord3 = new DisplayBord3();
        weatherData1.registerObserver(displayBord1)
        weatherData1.registerObserver(displayBord2)
        //weatherData1.registerObserver(displayBord3)
        weatherData1.setStateMent("222");
    }


}
//new Index({ heh: 111 })
import {a,hahage as d} from "./arg";
class GetArgs {
    
    constructor(){
      log(a) 
      log(d)  
      d.y=3 
    //    console.log(b);
    //    console.log(c);
    }
}
import e,{hahage as d11} from "./arg";
class GetArgs1{
     constructor(){
         log("11",e);
         import("./arg").then((data)=>{
             console.log(data)
         });
         let str="a1b1c1a";
         str=str.split(1);
         str=str.join("1")
         log(str)
     }
}
new GetArgs();
new GetArgs1();
var str=_.template(`
   <%if (1){%>
       <div><%= a %></div>
    <% }else{%>
        <span><%= a %></span>
        <%}%>

`);
console.log(str({a:1}))
console.log(str)


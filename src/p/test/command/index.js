import Control from "./base/control";
import LightOnCommand from "./command/lightOnCommand";
import LightOffCommand from "./command/lightOffCommand";
import FanOnCommand from "./command/fanOnCommand";
import FanOffCommand from "./command/fanOffCommand";
import Light from "./electric/light";
import Fan from "./electric/fan";
import Client from "./base/client";

class Index{
    constructor(){
        let ctrl=new Control();
        let light=new Light({name:"厨房",el:$(".light .color")});
        let lightOn=new LightOnCommand(light);
        let lightOff=new LightOffCommand(light);
        let fan=new Fan({name:"厨房",el:$(".fan .color")})
        let fanOn=new FanOnCommand(fan);
        let fanOff=new FanOffCommand(fan);
        new Client($(".light .on"),lightOn,ctrl);
        new Client($(".light .off"),lightOff,ctrl);
        new Client($(".fan .on"),fanOn,ctrl);
        new Client($(".fan .off"),fanOff,ctrl);
        new Client($(".undo"),null,ctrl);
        
        $(".undo").click(function(){

        })
        
    }
}
//new Index()
// let d=$.Deferred();
// let wait=(d)=>{
//     setTimeout(()=>{
//         d.resolve(1);
//     },10000)
//     return d;
// }
// let dd=$.when(wait(d)).then((data)=>{console.log(data)})
// // ajaxGet.abort();
// let ajaxGet=$.post(
// "http://localhost:7878",
// {a:1,b:2},
// (data)=>{console.log(data)}
// ).then((data)=>{console.log(data)})
//ajaxGet.abort();
//d.resolve(2);
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
    console.log(xhr.responseText);
    }
};
xhr.open('get','http://localhost:7878');
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
//()
xhr.send("a=1222&b=2");
//xhr.abort();
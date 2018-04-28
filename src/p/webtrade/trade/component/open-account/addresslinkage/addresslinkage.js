"use strict";
var Base = require("./../../../../../../app/base");
var jsonData=require("./address.js");
var tml=require("./addresslinkage.ejs.html");
var tml_city=require("./city.ejs.html");

export default class  AddressLinkage extends Base{
    
    jsonData=jsonData;
    constructor(config){
        super(config)
        this.init();
    }

    init(){
        this.renderHtml();
        this.bind();
    }

    bind(){
        this.el.on("change",".province",_.bind(this.provinceChange,this))
    }

    provinceChange(e){
        
        var name=e.target.value;
        var list=[];
        this.jsonData.forEach(function(n,i){
            if(n.name == name){
                list=n.sub;
                return;
            }
        })
        this.render(tml_city,{list:list},this.el.find(".city"));
    }

    renderHtml(){



















        
        this.render(tml,{data:this.jsonData},this.el);
        this.render(tml_city,{list:this.jsonData[1].sub},this.el.find(".city"));
       
    }
}

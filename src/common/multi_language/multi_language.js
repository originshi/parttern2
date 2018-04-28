

"use strict";
var Base = require("../../app/base");
var MultiLanguageBase=require("../../lib/l10n");

// function MultiLanguage(){
//     MultiLanguage.superclass.constructor.apply(this, arguments);
    
//     this.bind();
// }
// Base.extend(MultiLanguage,Base,{
    
//     l10n:document.webL10n,


//     bind(){         
//           this.changeLangulage("zh")
//           document.webL10n.ready(this.onLocalized); 
//           this.el.on("change",$.proxy(this.changeEvent,this));
//     },

//     onLocalized(){
//          //this.l10n.getText() init文件中的内容
//          //this.l10n.getData() 把init中内容转为 json数据
//     },
    
//     changeEvent(e){
//         var el=e.currentTarget;
//         this.changeLangulage(el.value);
//     } ,

//     changeLangulage(value){
//         this.l10n.setLanguage(value);
//     }
    
// })
// export default MultiLanguage;

export default class MultiLanguage extends Base {

    l10n=document.webL10n

    constructor(config){
        super(config);
        this.bind();
    }
    
    bind(){         
          this.changeLangulage("zh")
          document.webL10n.ready(this.onLocalized); 
          this.el.on("change",$.proxy(this.changeEvent,this));
    }

    onLocalized(){
         //this.l10n.getText() init文件中的内容
         //this.l10n.getData() 把init中内容转为 json数据
    }
    
    changeEvent(e){
        var el=e.currentTarget;
        this.changeLangulage(el.value);
    } 

    changeLangulage(value){
        this.l10n.setLanguage(value);
    }
}
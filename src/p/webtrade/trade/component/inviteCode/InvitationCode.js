"use strict"
var  Base =require("../../../../../app/base");
var Cookie = require('../../../../../lib/cookie');
import Toast from "../../../../../common/toast"

export default class InvitationCode extends Base{
    onlyOne=false;
    $error=$("<p class='error'>不能为空</p>")
    constructor(config){
        super(config)
        
        this.init();
    }

    init(){
        this.renderHtml();
        this.bind();
    }

    renderHtml(){
       this.el.show();
       var code=this.account.refer_code;
       this.$showCode=this.el.find(".hasInviCode");//有了显示的
       this.$actionCode=this.el.find(".noInviCode");//没有需要提交的整个dom
       this.$code=this.el.find(".invite_code_input");//填写的code
       this.$span=this.el.find(".invite_code_span");
       if(code){
        this.$showCode.text(this.account.refer_code);
        this.$actionCode.remove();
       }else{
        this.$showCode.hide();
        this.$actionCode.show();
       }
    }

    bind(){
        this.el.on("click",".invite_code_span",$.proxy(this._submit,this));
        this.el.on("blur",".invite_code_input",$.proxy(this.verify,this));
    }

    _submit(){
       
       if(this.onlyOne || this.verify()){
           return;
       }
       this.only=true;
       this.ajax({
           url:"/v1/user/refer_code",
           type:"post",
           data:{
            access_token:Cookie.get("token"),
            invite_code:this.$code.val()
           }
           
       }).then((data)=>{
           this.$actionCode.remove();
           console.log(data)
           this.only=false;
           this.$showCode.text(this.$code.val()).show();
           
       },(error)=>{
           console.log(error)
           this.only=false;
           new Toast("设置失败");
           
       })
    }

    verify(){
        if(this.$code.val()){
            // if(this.el.find(".error").length){
            //     this.$error.hide();
            // } 
            return false;     
        }else{
            // if(this.el.find(".error").length){
            //     this.$error.show();
            // }else{
            //     this.$span.after(this.$error)
            // }
            new Toast('推荐码不能为空!');
            return true; 
        }
    }
}
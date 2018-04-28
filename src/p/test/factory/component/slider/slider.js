

import Base from "../../../../../app/base"
require("./index.css");
let tml=require("./slider.ejs.html")

export default class Slider extends Base{
    // {el:往哪个元素里面填充,max:最大值,min:最小值,step:步长,showEl:关联的输入框}
    constructor(config){
       super(config)
       this.init()
       this.lazyBind();
       this.initDatas();
       
    }
    init(){
        this.extent=this.max-this.min;
        this.labelNumbers=Math.ceil(this.extent/this.step);      
        this.render(tml,{length:this.labelNumbers,
        min:this.min,max:this.max,step:this.step},this.el);
        
    }
    initDatas(){
        this.$slider=this.el.find(".slider");
        this.$progress=this.el.find(".progress");
        this.$sliderParent=this.$slider.parent();
        this.$sliderParentWidth=this.$sliderParent.width();
        let slider_label=this.el.find(".slider_label");
        let slider_line=this.el.find(".slider_line");
        let length=this.labelNumbers;
        slider_label[0].style.left=0;
        slider_label[length].style.left=this.$sliderParentWidth+"px";    
        slider_line[0].style.left=0;
        slider_label[0].setAttribute("money",this.min);
        slider_line[length].style.left=this.$sliderParentWidth+"px";
        slider_label[0].setAttribute("money",this.max);
        for(let i=1;i<length;i++){

            let left=this.$sliderParentWidth*((this.step*i-this.min)/this.extent);

            slider_label[i].style.left=left+"px";
            slider_line[i].style.left=left+"px";
            slider_line[i].setAttribute("money",this.step*i);
        }
        
    }
    lazyBind(){
        this.on("showEl:update",$.proxy(this.updateProgress,this));
        this.el.on("mousedown",".slider",(e)=>{
            e.preventDefault();
            let $slider=this.$slider;
            $slider.attr("move",1)     
        })
        $(document).on("mouseup",(e)=>{
            e.preventDefault();
            let $slider=this.$slider
            $slider.attr("move",0)
        })
        $(document).on("mousemove",(e)=>{
            e.preventDefault();
            let $slider=this.$slider;
            if($slider.attr("move")!=1){
                    return;
            }
            let $sliderParent=this.$sliderParent;
            let $sliderParentWidth=this.$sliderParentWidth;
            let parentLeft=$sliderParent.offset().left;
            let $sliderLeft=e.pageX-parentLeft;
            if($sliderLeft<0){
                $sliderLeft=0
            }
            if($sliderLeft>$sliderParentWidth){
                $sliderLeft=$sliderParentWidth
            }       
            $slider.css({left:$sliderLeft});
            this.$progress.css({"width":$sliderLeft+"px"});
            let ratio=$sliderLeft/$sliderParentWidth;
            let money=this.min+parseInt((this.extent)*ratio)
            let remainder=money%this.step;
            if(remainder>=this.step-30){
                money=parseInt(Math.ceil(money/this.step))*this.step
            }else if(remainder<=30){
                money=parseInt(Math.floor(money/this.step))*this.step
            }
            $sliderLeft=(money-this.min)/this.max*$sliderParentWidth;
            this.showEl.val(money);
            

        })
    }
    updateProgress(data){
        data=data*1;
        if(typeof data !="number"){
            return;
        }       
        if(data<this.min){
            data=this.min;
        }
        if(data>this.max){
            data=this.max;
        }
        let ratio=(data-this.min)/this.extent;
        var $sliderLeft=ratio*this.$sliderParentWidth;
        this.$slider.css({left:$sliderLeft});
        this.$progress.css({"width":$sliderLeft+"px"});

    }
    
}
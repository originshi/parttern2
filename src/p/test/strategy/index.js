  export default class Strategy {

      constructor(strategy={}){
         this.strategy=strategy;
         this.cache=[];
      }

      addVerify(dom = document.createElement('') , verifyaAtions=[] , errmsg='' , fn=()=>{} ){
          let length = verifyaAtions.length;
          for (let i = 0; i < length; i++) {
              let verifyAtion = verifyaAtions[i].split(':');
              if (verifyAtion.length == 1) {
                  this.cache.push(this.strategy[verifyAtion].bind(dom,dom, errmsg, fn))
              } else {                 
                  this.cache.push(this.strategy[verifyAtion[0]].bind(dom,dom,verifyAtion[1],errmsg, fn))                 
              }
          }
         
         
         
      }

      fromVerify(){
          let cache = this.cache;
          let length = cache.length;
          let err=false;
          for (let i=0 ; i < length ; i ++){
             let ierr= cache[i]();
             if(ierr && !err){
                err=true;
             }
          }
          return err;
      }

  }
  let strategy={
      empty:(dom,errmsg,fn)=>{ 
        let err=false,msg=''; 
        if(dom.value == ''){
            msg=errmsg;
            err= true;
        }
        fn(dom,msg)
        return err;
      },
      length:(dom,length,errmsg,fn)=>{
        let err=false,msg=''; 
        if(dom.value.length!=length){   
            msg=errmsg;      
            err= true;
        }
        fn(dom,msg)
        return err;
     },
     phone:(dom,errmsg,fn)=>{
        let err=false,msg=''; 
        if(!/^1(\d{10}||14||10)$/.test(dom.value)){
            msg=errmsg;
            err= true;
        }
        fn(dom,msg)
        return err;
    },
  }
  let s=new Strategy(strategy);
  s.addVerify(document.querySelector('.empty'),['empty'],'不能为空',(dom,errmsg = '')=>{
    if(errmsg){
      dom.value=errmsg
    }else{
      //dom.value='成功' 
    }    
})
s.addVerify(document.querySelector('.length'),['length:6'],'不能小于6',(dom,errmsg = '')=>{
    if(errmsg){
      dom.value=errmsg
    }else{
      //dom.value='成功' 
    }    
})
s.addVerify(document.querySelector('.phone'),['phone'],'不是电话',(dom,errmsg = '')=>{
    if(errmsg){
      dom.value=errmsg
    }else{
      //dom.value='成功' 
    }    
})
var dataCache = new Map();
let doms=document.querySelectorAll('input'),length=doms.length;
    for(let i = 0 ;i< length;i++){
        doms[i].addEventListener('blur',()=>{
            let issuccess=s.fromVerify();
            console.log(issuccess);
        })
    }



    class Base{
       timerFunction(fn,that){
           let timer;
           return function(){
               clearTimeout(timer)
              timer=setTimeout(()=>{
                 fn.bind(that)()
              },2000)
           }
           
       }
    }
    class one extends Base{
        constructor(){
            super()
           // this.init=this.timerFunction(this.init,this);
            $("#a").click($.proxy(this.init,this))
            this.init();
        }
        init(){
            console.log(1111111);
            this.apiCache({
                url:'localhost:7878',
                fn:this.test,
                fnName:'test',
                ctx:this,
                isTemporary:false,
                isRender:false
            })
           // this.test();
            setInterval(()=>{
               this.test();
            },1000)
        }
        test(){
            return {
                fncallback:function(data,e){
                    console.log(data)
                },
                fntogetpromise:function(){
                    return $.ajax({
                        url:'http://localhost:7878',
                        type:"post",
                        data:{
                            a:1
                        }
                    }).promise();
                }
            }
        }
        apiCache({url,fn,fnName,ctx,time=5*1000,isTemporary=true,isRender=false}){
            let isfirst=true;
            let newFunction = function () {
                let fncallback=fn().fncallback,
                    fntogetpromise=fn().fntogetpromise;
                    
                let catchObj = dataCache.get(url);
                if (catchObj) {
                    let time = catchObj.time;
                    let now = Date.now();
                    let data = catchObj.data;
                    if (now > time) {
                            if(isfirst) {
                                setNewData()
                            }                                                                       
                    } else {
                        if(!isRender){
                            fncallback.bind(ctx)(data)
                        }
                    }
                } else {
                    if(isfirst){
                        setNewData()
                    }
                    
                }
                function setNewData(isSecondFirst) {
                    isfirst=false;
                    fntogetpromise().then((data) => {
                        let newDate = new Date();
                        let se=newDate.getSeconds()*1+time/1000;
                        newDate.setSeconds(se)
                        dataCache.set(url, {
                            time: newDate.getTime(),
                            data: data,
                            fntogetpromise
                        });
                        isfirst=true;                       
                        fncallback.bind(ctx)(data)
                    }, (e) => {
                        fncallback.bind(ctx)(null, e)
                    })
                }
            };
            if(isTemporary){
                return newFunction;
            }else{
                return ctx[fnName]=newFunction;
            }
           
        }
    }
    new one();

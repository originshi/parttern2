
let gObserveData={};
// {
//     type:{
//         offLineData:[] || '',//数据
//         observe:[{
//             fn:, //函数
//             ctx:, // 环境
//         }],
//     }
// }
let event={

    observeData:{},
    gListen:function({type,fn,ctx}){
        let observeData=gObserveData;
        if(Reflect.has(observeData,type)){
            let observeObj=observeData[type];
            let offLineData=observeObj.offLineData,offLineDataLength=offLineData.length;
            let observeList=observeObj.observe;
            for(let i=0,n;n=offLineData[i++];){
                fn.call(ctx,data)
            }
            if(observeList){
                observeList.add({ fn, ctx})
            }else{
                observeList=new Set();
                observeList.add({ fn, ctx})
            }
        }else{
            let observeList=new Set;
            observeList.add({ fn, ctx});
            observeData[type]={
                observe:observeList
            }
            
        }
    },
    gRemove:function(type,fn){
        let observeData=gObserveData;
        if(Reflect.has(observeData,type)){
            let observeObj=observeData[type];
            
            let observeList=observeObj.observe;
            for(let i=0,n;n=observeList[i++];){
                if(n.fn==fn){
                    observeList.delete(fn);
                    break;
                }
            }
        }
    },
    //缓存的数据是否需要替换 isNeedReplace:true
    gTrigger:function({type,data,isNeedReplace=true}){
        let observeData=gObserveData;
        let offLineData=observeObj.offLineData;
            if(isNeedReplace){
                offLineData.splice(0,1,data)
            }else{
                offLineData.push(data)
            }
        if(Reflect.has(observeData,type)){
            let observeObj=observeData[type];
            
            let observeList=observeObj.observe;
            for(let i=0,n;n=observeList[i++];){
                n.fn.call(n.ctx,data)
            }
        }else{
            observeData[type]={
                offLineData,
                isNeedReplace
            }
            
        }
    },

    listen:function({type,fn,ctx}){
        let observeData=this.observeData;
        if(Reflect.has(observeData,type)){
            let observeObj=observeData[type];
            let offLineData=observeObj.offLineData,offLineDataLength=offLineData.length;
            let observeList=observeObj.observe;
            for(let i=0,n;n=offLineData[i++];){
                fn.call(ctx,n)
            }
            if(observeList){
                observeList.add({ fn, ctx})
            }else{
                observeList=new Set();
                observeList.add({ fn, ctx});
                observeObj.observe=observeList;
            }
        }else{
            let observeList=new Set;
            observeList.add({ fn, ctx});
            observeData[type].observe=observeList;
            
        }
    },

    trigger:function({type,data,isNeedReplace=true}){
        //console.log(this)
        let observeData=this.observeData;
        let observeObj=observeData[type];
        
        if(Reflect.has(observeData,type)){
            let offLineData=observeObj.offLineData;
            if(isNeedReplace){
                offLineData.splice(0,1,data)
            }else{
                offLineData.push(data)
            } 
            let observeList=observeObj.observe;
            if(observeList){
                for(let n of observeList){
                    n.fn.call(n.ctx,data)
                }
            }
            
        }else{
            let offLineData=[data];
            observeData[type]={
                offLineData
            }
            
        }
    },

    remove:function({type,fn}){
        let observeData=this.observeData;
        if(Reflect.has(observeData,type)){
            let observeObj=observeData[type];
            
            let observeList=observeObj.observe;
            for(let i=0,n;n=observeList[i++];){
                if(n.fn==fn){
                    observeList.delete(fn);
                    break;
                }
            }
        }
    }

}

class Test{

    constructor(){
        Object.assign(this,event);
        this.init();
    }

    init(){

        this.trigger({
            data:1,
            type:'first',
            isNeedReplace:false
        })
        this.trigger({
            data:2,
            type:'first',
            isNeedReplace:false
        })
        this.listen({
            type:'first',
            fn:this.print,
            ctx:this
        })
        // this.remove({
        //     type:'first',
        //     fn:this.print,
        // })
        this.trigger({
            data:3,
            type:'first',
            isNeedReplace:false
        })
    }

    print(data){
console.log(data)
    }

}
new Test();
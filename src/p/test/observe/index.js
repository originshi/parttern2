let gObserveData = {};
// {
//     type:{
//         offLineData:[] || '',//数据
//		   isReplace:true, //是否替换 
//			isNeedOffData:false, //是否需要离线数据
//         observes:[[fn:{
//             fn:, //函数
//             ctx:, // 环境
//				offLineData:[]
//         }]], //观察者集合 Map
//     }
// }
Map.prototype.update=function (key,fn){
	   var value=this.get(key);
	   var newValue=fn(value);
	   this.set(key,newValue);
	   return this;
	}
let event = {
	observeData: {},

	listen: function({ type, fn, ctx ,g=false,isNeedReplace=1, isNeedOffData=0}) {
		let observeData =!g ?this.observeData :gObserveData;
		let observeObj;
		if (Reflect.has(observeData, type)) {
		    observeObj = observeData[type];			
			let observeList = observeObj.observes;
			if (observeList) {
				let observe=observeList.get( fn);
				if(observe){
					if(!observe.isListen){			
						observe.isListen=true;
					}					
				}else{
					observeList.set( fn, {ctx,isListen:true} );							
				}				
			} else {
				observeList = new Map();
				observeList.set(fn, {ctx,isListen:true} );
				observeObj.observes = observeList;
			}
			
		} else {
			let observeList = new Map();
			observeList.set(fn, {ctx,isListen:true} );
			observeObj=observeData[type]={
				observes:observeList, 
				isNeedReplace,
				isNeedOffData
			}
		}
		// if(isNeedOffData === 0){
		// }else if(!isNeedOffData){
		// 	observeObj.isNeedOffData=false;
		// }else{
		// 	observeObj.isNeedOffData=true;
		// }		
		if(observeObj.isNeedOffData){
			let offLineData = observeObj.offLineData;
			for (let i = 0, n;n=offLineData[i++]; ) {
				fn.call(ctx, n);
			}
		}
		return this;
	},

	trigger: function({ type, data, isNeedReplace=1 ,g=false,isNeedOffData=0}) {
		//console.log(this)
		let observeData =!g ?this.observeData :gObserveData;
		let observeObj;		
		if (Reflect.has(observeData, type)) {
			observeObj = observeData[type];
			//动态改变isNeedOffData
			// if(isNeedOffData === 0){
			// }else if(!isNeedOffData){
			// 	observeObj.isNeedOffData=false;
			// }else{
			// 	observeObj.isNeedOffData=true;
			// }
			if(observeObj.isNeedOffData){
				//动态改变isNeedReplace
				// if(isNeedReplace === 1){

				// }else if(!isNeedReplace){
				// 	observeObj.isNeedReplace=false;
				// }else{
				// 	observeObj.isNeedReplace=true;
				// }
				let offLineData = observeObj.offLineData;
				if (observeObj.isNeedReplace) {
					offLineData.splice(0, offLineData.length, data);
				} else {
					offLineData.push(data);
				}
			}			
			let observeList = observeObj.observes;
			if(observeList){
				for (let n of observeList) {
					let observe=n[1];
					if(observe.isListen){
						n[0].call(n[1].ctx, data);
					}else if(observeObj.isNeedOffData){
						if(observeObj.isNeedReplace){
							observe.offLineData=[data]
						}else{
							observe.offLineData.push(data)
						}
					}
					
				}
			}
		} else {
			let offLineData=[];
			if(isNeedOffData){
				offLineData = [data];
			}		
			observeData[type] = {
				offLineData,
				isNeedReplace,
				isNeedOffData
			};
		}
		return this;
	},

	remove: function({ type, fn ,g=false,isNeedOffData=false }) {
		let observeData =!g ?this.observeData :gObserveData;
		if (Reflect.has(observeData, type)) {
			let observeObj = observeData[type];
			let observeList = observeObj.observes;
			for (let n of observeList ) {				
				if (n[0] == fn) {
					let observe=n[1]
					observe.isListen=false;
					observe.offLineData=[];
					break;
				}
			}
		}
		return this;
	},

	removeAll({g=false}){
		if(!g){
			this.observeData={};
		}else{
			gObserveData={};
		}
		
		return this;
	},

};

class Test {
	constructor() {
		Object.assign(this, event);
		this.init();
	}

	init() {
		this.trigger({
			data: 1,
			type: "first",
			isNeedReplace: false,
			isNeedOffData:true
		});
		this.trigger({
			data: 2,
			type: "first",
			isNeedReplace: false
		});
		this.listen({
			type: "first",
			fn: this.print,
			ctx: this
		});
		this.remove({
		    type:'first',
		    fn:this.print,
		})
		this.trigger({
			data: 3,
			type: "first",
			isNeedReplace: false
		});
		this.trigger({
			data: 4,
			type: "first",
			isNeedReplace: true
		});
		this.listen({
			type: "first",
			fn: this.print,
			ctx: this
		});
		this.remove({
		    type:'first',
		    fn:this.print,
		})
		
		this.trigger({
			data: 5,
			type: "first",
			isNeedReplace: true
		});
		this.trigger({
			data: 6,
			type: "first",
			isNeedReplace: true
		});
		this.listen({
			type: "first",
			fn: this.print,
			ctx: this
		});
		
	}

	print(data) {
        console.log(data);
	}
}
//new Test();
// $(window).scroll((e)=>{
//   console.log(e)
// })
import A from './graph';
//new A();
import Immu,{Map as map,fromJS,List} from 'immutable';
let m=map({a:1,b:2});
let n=map({a:1,b:2});
let o={a:1};
let o1=fromJS(o);
let o2=o1;
o2=o2.set('a',222);

console.log(m.toJS());
console.log(Immu.is(m,n))
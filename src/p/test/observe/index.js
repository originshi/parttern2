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
Map.prototype.update = function(key, fn) {
  var value = this.get(key);
  var newValue = fn(value);
  this.set(key, newValue);
  return this;
};
let event = {
  observeData: {},

  listen: function({
    type,
    fn,
    ctx,
    g = false,
    isNeedReplace = 1,
    isNeedOffData = 0
  }) {
    let observeData = !g ? this.observeData : gObserveData;
    let observeObj;
    if (Reflect.has(observeData, type)) {
      observeObj = observeData[type];
      let observeList = observeObj.observes;
      if (observeList) {
        let observe = observeList.get(fn);
        if (observe) {
          if (!observe.isListen) {
            observe.isListen = true;
          }
        } else {
          observeList.set(fn, { ctx, isListen: true });
        }
      } else {
        observeList = new Map();
        observeList.set(fn, { ctx, isListen: true });
        observeObj.observes = observeList;
      }
    } else {
      let observeList = new Map();
      observeList.set(fn, { ctx, isListen: true });
      observeObj = observeData[type] = {
        observes: observeList,
        isNeedReplace,
        isNeedOffData
      };
    }
    // if(isNeedOffData === 0){
    // }else if(!isNeedOffData){
    // 	observeObj.isNeedOffData=false;
    // }else{
    // 	observeObj.isNeedOffData=true;
    // }
    if (observeObj.isNeedOffData) {
      let offLineData = observeObj.offLineData;
      for (let i = 0, n; (n = offLineData[i++]); ) {
        fn.call(ctx, n);
      }
    }
    return this;
  },

  trigger: function({
    type,
    data,
    isNeedReplace = 1,
    g = false,
    isNeedOffData = 0
  }) {
    //console.log(this)
    let observeData = !g ? this.observeData : gObserveData;
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
      if (observeObj.isNeedOffData) {
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
      if (observeList) {
        for (let n of observeList) {
          let observe = n[1];
          if (observe.isListen) {
            n[0].call(n[1].ctx, data);
          } else if (observeObj.isNeedOffData) {
            if (observeObj.isNeedReplace) {
              observe.offLineData = [data];
            } else {
              observe.offLineData.push(data);
            }
          }
        }
      }
    } else {
      let offLineData = [];
      if (isNeedOffData) {
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

  remove: function({ type, fn, g = false, isNeedOffData = false }) {
    let observeData = !g ? this.observeData : gObserveData;
    if (Reflect.has(observeData, type)) {
      let observeObj = observeData[type];
      let observeList = observeObj.observes;
      for (let n of observeList) {
        if (n[0] == fn) {
          let observe = n[1];
          observe.isListen = false;
          observe.offLineData = [];
          break;
        }
      }
    }
    return this;
  },

  removeAll({ g = false }) {
    if (!g) {
      this.observeData = {};
    } else {
      gObserveData = {};
    }

    return this;
  }
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
      isNeedOffData: true
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
      type: "first",
      fn: this.print
    });
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
      type: "first",
      fn: this.print
    });

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
//import A from './graph';
//new A();
//import Immu,{Map as map,fromJS,List} from 'immutable';
// let m=map({a:1,b:2});
// let n=map({a:1,b:2});
// let o={a:1};
// let o1=fromJS(o);
// let o2=o1;
// o2=o2.set('a',222);
// console.log(o2.set('a',333),o2)
// console.log(m.toJS(),o1==o2);
// console.log(Immu.is(m,n));
// let mm=map();
// let key={a:1};
// mm=mm.set(key,{value:1});
// let jsmm=mm.toJS();
// console.log(mm.toJS(),mm.get(key));
// function insert(n,arr){
// 	let newArr=[n];
//     a:for(let i=0 , charushu;charushu=arr[i++];){
// 		n=[...newArr].pop();
//         if(charushu<n){
// 			let j=newArr.length-2;
// 			b:for(let newArrItem;newArrItem=newArr[j];j--){
// 				if(charushu>newArrItem){
// 					newArr=[...newArr.slice(0,j+1),charushu,...newArr.slice(j+1)];
// 					break b;
// 				}else if(j==0){
// 					newArr=[charushu,...newArr.slice()];
// 				}

// 			}
// 			//newArr.push(item);
// 			//n=item;
// 		}else{
// 			newArr.push(charushu);
// 		}

// 	}
// 	return newArr;
// }
// let arr=[23,4,7,12,45,3,6,9,10,2];
// console.log(insert(5,arr));
// function quick(oldarr){
// 	if(oldarr.length==1 || oldarr.length==0){return oldarr};
// 	let arr=oldarr.slice();
// 	let last=arr.pop();
// 	let left=[],right=[];
// 	for(let i=0,arrItem;i<arr.length;i++ ){
// 		 arrItem=arr[i]
// 		 if(arrItem>last){
// 			right.push(arrItem);
// 		 }else{
// 			left.push(arrItem);
// 		 }
// 	}
// 	// /console.log(...quick(left),last,...quick(right))
// 	return [...quick(left),last,...quick(right)];
// }
// console.log(quick(arr))
//mescroll
// import m from '../../../common/mescroll/mescroll.js';
// alert(1);
// new m({el:'mescroll',refresh:()=>{
// 	return new Promise((res,rej)=>{
// 		setTimeout(()=>{
// 		 res(1111111);
// 		},3000)
// 	}).then((data)=>{
// 		console.log(1,data);
// 		$('ul').html(`
// 		<li>1</li>
// 		<li>2</li>
// 		<li>3</li>
// 		<li>4</li>
// 		<li>5</li>
// 		<li>6</li>
// 		<li>7</li>
// 		<li>8</li>
// 		<li>9</li>
// 		<li>10</li>
// 		<li>11</li>
// 		<li>12</li>
// 		<li>13</li>
// 		<li>14</li>
// 		`)
// 		return data;
// 	})

//  },upload:(page)=>{
// 	 console.log(page)
// 	return new Promise((res,rej)=>{
// 		setTimeout(()=>{
// 			$('ul').html(`
// 		<li>1</li>
// 		<li>2</li>
// 		<li>3</li>
// 		<li>4</li>
// 		<li>5</li>
// 		<li>6</li>
// 		<li>7</li>
// 		<li>8</li>
// 		<li>9</li>
// 		<li>10</li>
// 		<li>11</li>
// 		<li>12</li>
// 		<li>13</li>
// 		<li>14</li>
// 		`)
// 		 res({l:10,n:false});
// 		},3000)
// 	}).then(({l,n})=>{
// 		console.log('上拉1',length);
// 		return {l,n};
// 	},()=>{

// 	})

//  },
// page:{
// 	num:0,
// 	size:5
// }})

// $.fn.extend({
//   on: (function(orig) {
//     return function() {
//       for (var i = 0, length = arguments.length; i < length; i++) {
//         var fn = arguments[i];
//         if (typeof fn == "function") {
//           arguments[i] = function(e) {
//             console.log(e.currentTarget, this, fn.context);
//             fn(e);
//           };
//           break;
//         }
//       }
//       return orig.apply(this, arguments);
//     };
//   })($.fn.on)
// });
// $.extend({
//   proxy: function(fn, ctx) {
//     function fnn() {
//       return fn.apply(ctx, arguments);
//     }
//     fnn.context = ctx;
//     return fnn;
//   }
// });
// Function.prototype.bind = function(context) {
//   var self = this; // 保存原函数
//   function fn() {
//     // 返回一个新函数
//     return self.apply(context, arguments); // 执行新函数时，将传入的上下文context作为新函数的this
//   }
//   fn.context = context;
//   return fn;
// };
// class A {
//   constructor() {
// 	  this.c='woshic';
//     $(document).on("click", "#adb", $.proxy(this.aaa,this));
//   }
//   aaa() {
//     console.log(this.c);
//   }
// }
// new A();


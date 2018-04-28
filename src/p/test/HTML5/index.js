   let js;
   if(location.href.indexOf("localhost")!=-1){
      js="./test/HTML5/demo_worker_imp.js";
   }else{
      js="../../../build/test/HTML5/demo_worker_imp.js"
   }
   var w=new Worker(js);
   w.onmessage=(event)=>{
       let data=event.data;
       if(data.id==1){
        $("#test").text(data.data);
       }
       
   }
   $("#stop").click((e)=>{
       let el=e.currentTarget;
       $(el).text(Math.random()*99);
       w.terminate()
   })
   let root=$("#root");
root.on("click",".one",(e)=>{
       $(e.currentTarget).text(Math.random()*80);
})
root.on("click",".two",(e)=>{
    $(e.currentTarget).text(Math.random()*80);
})
root.on("click",".three",(e)=>{
    $(e.currentTarget).text(Math.random()*80);
})
root.on("click",".off",(e)=>{
    root.off();
})
// window.onbeforeunload = function(event) {
//     event.returnValue = "我在这写点东西...";
//    };
   $(window).on('beforeunload', function () {  
    this.sessionStorage.setItem("aa",2)
    return 'Your own message goes here...';  
})
let i=new Image();
i.src="http://localhost:7878?cccc=2";
// window.onbeforeunload = function (e) {
    
//     e = e || window.event;
    
//     // 兼容IE8和Firefox 4之前的版本
//     if (e) {
//       e.returnValue = '关闭提示';
//     }
    
//     // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
//     return '关闭提示';
//   };
 $(".one")[0].innerHTML="<span style='color:red'>11111</span>"

   
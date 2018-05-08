var http=require("http");
let opn=require("opn")
let obj={};
let data=require("./data/bigdata")
let server=http.createServer(function(req,res){
   console.log(req.url)
   req.on("data",function(data){
       //data=decodeURIComponent(data)
       console.log(data)
       data=data.toString();
       //data=JSON.parse(data);
       console.log(data.toString())
       data=data.split("&");
       for(let n of data){
           n=n.split("=");
           obj[n[0]]=n[1];
       }
        //Object.assign(obj,data);
   })
   req.on("end",()=>{
       //application/json   text-plain字符串
       res.writeHead(200,{"content-type":"text-plain","access-control-allow-origin":"*"});
       setTimeout(()=>{
        res.write(new Date()+'');
        res.end();
       },3000)
      
   })
});
server.listen(7878,"localhost",()=>{
    
    console.log("开启了服务");
});
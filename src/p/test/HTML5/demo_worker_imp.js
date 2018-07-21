  let count=1;
  function ti(){
    setInterval(()=>{
        postMessage(count++);
        postMessage({A:count});
        ti();
     },1000)
  }
 // ti();
  // fetch("http://localhost:7878",{method:"get",body:{a:1}}).then((data)=>{return data.json()}).then((data)=>{
  //    console.time("1");
  //     for(let n of data){
  //       for(let n1 of data){
          
  //         if(JSON.stringify(n)==JSON.stringify(n1)){
  //           n[0]=n1[0]**10+1+1+1+1;
  //           n[1]=n1[1]**10+1+1+1+1;
  //           n[2]=n1[2]**19+1+1+1+1;
  //           postMessage({id:1,data:n});
  //           break;
  //         }
          
  //       }
  //     }
      
  //     console.timeEnd("1");
  // })
  
import ZongHe from "./coffes/zonghe";
import Milk from "./decorates/milk";
import Moka from "./decorates/moka";

  
  class Index {
      constructor(){
          var zonghe=new ZongHe();
          var decorate=new Milk(zonghe);
          decorate=new Moka(decorate);
          decorate=new Moka(decorate);
          console.log(decorate)
          console.log(decorate.cost());
          $("#a").click((e)=>{
              e.preventDefault();
              alert(1);


          })
        //   $("#a").on("tap",(e)=>{
        //     e.preventDefault();
        //     alert(1);
        //   })
      }

  }
  new Index();
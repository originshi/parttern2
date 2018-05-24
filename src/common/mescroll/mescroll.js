import MeScroll from 'mescroll.js'
require("./mescroll.css");




export default class MEscroll {
  constructor(config) {
    // {
    //     el:string 元素的id,
    //       refresh:fn 函数要返回一个promise
    //      upload:fn 函数要返回一个promise
    // }
    Object.assign(this, config);
    this.init();
  }
  init() {
    let refresh,upload;
      if(this.refresh){
         refresh = () => {
            this.refresh().then(
              length => {
                console.log(2,data);
                this.mescroll.endSuccess(length);
              },
              () => {
                this.mescroll.endErr();
              }
            );
          };
      }
    if (this.upload) {
      upload = (page) => {
        this.upload(page).then(
          ({l,n}) => {
            console.log('上拉2',l,n)
            this.mescroll.endSuccess(l, n);
          },
          () => {
            this.mescroll.endErr();
          }
        );
      };
    }
    

    this.mescroll= new MeScroll(this.el, {
      down: {
        use: refresh ? true : false,    
        auto: refresh && !upload ? true : false,
        callback: refresh, //下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
        autoShowLoading:refresh && !upload ? true : false,
      },
      up: {
        use: upload ? true : false,
        auto: upload ? true : false,
        callback: upload, //上拉加载的回调
        isBounce: false, //如果您的项目是在iOS的微信,QQ,Safari等浏览器访问的,建议配置此项.解析(必读)
        page:this.page,
        empty:{ 
            warpId : this.el , 
            icon : null , 
            tip : "暂无相关数据~" , 
            btntext : "" , 
            btnClick : null, 
            supportTap : false 
          }
      }
    });
    console.log(this.mescroll)
  }
}

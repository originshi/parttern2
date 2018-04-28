

export default class Pizza{
    cheese;
    iceram;
    burdeningFactory;
    constructor(burdeningFactory){
       this.burdeningFactory=burdeningFactory;
    }

    burdening(){}
    cut(){
        console.log("切片")
    }
    package(){
        console.log("打包")
    }
}
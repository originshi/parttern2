

export class BankImg{

    constructor(el,bankscode){
        this.el=el;
        this.bankscode=bankscode;
        this.traverse();
    }
    traverse(){
       let nodeList=this.el.find();
       let length=nodeList.length;
       for(let i=0;i<length;i++){
           this.setBackGround(nodeList[i], this.bankscode[i])       
       }
    }

    setBackGround(button,code){
        const leftUnit=-200,topUnit=-70;
        let left;
        let top;
        switch(code){
            case "ICBC"://工商银行
            left=leftUnit*0;
            top=topUnit*0;
            break;
            case "ABC"://农业银行
            left=leftUnit*1;
            top=topUnit*0;
            break;
            case "BOC"://中国银行
            left=leftUnit*2;
            top=topUnit*0;
            break;
            case "CCB"://建设
            left=leftUnit*3;
            top=topUnit*0;
            break;
            case "BCCB"://北京银行
            left=leftUnit*4;
            top=topUnit*0;
            break;
            case "PSBC"://中国邮政
            left=leftUnit*0;
            top=topUnit*1;
            break;
            case "CITIC"://中信银行
            left=leftUnit*1;
            top=topUnit*1;
            break;
            case "CEB"://光大
            left=leftUnit*2;
            top=topUnit*1;
            break;
            case "GBD"://广东发展
            left=leftUnit*3;
            top=topUnit*1;
            break;
            case "CMBC"://民生
            left=leftUnit*4;
            top=topUnit*1;
            break;
            case "CMB"://招商
            left=leftUnit*0;
            top=topUnit*2;
            break;
            case "COMM"://交通
            left=leftUnit*1;
            top=topUnit*2;
            break;
            case "BOS"://上海
            left=leftUnit*2;
            top=topUnit*2;
            break;
            case "SPDB"://浦东发展
            left=leftUnit*3;
            top=topUnit*2;
            break;
            case "HXB"://华夏
            left=leftUnit*4;
            top=topUnit*2;
            break;
            case "CIB"://兴业
            left=leftUnit*0;
            top=topUnit*3;
            break;
            case "SZPAB"://平安SZPAB
            left=leftUnit*1;
            top=topUnit*3;
            //目前没有的
            case "UNIONPAY"://银联扫码
            left=leftUnit*1;
            top=topUnit*3;
            case "JDPAY"://京东扫码
            left=leftUnit*1;
            top=topUnit*3;
            case "GZCB"://广州银行
            left=leftUnit*1;
            top=topUnit*3;
            break;
            case "BJRCB"://北京农商行
            left=leftUnit*1;
            top=topUnit*3;
            break;
            case "SDB"://深圳发展银行
            left=leftUnit*1;
            top=topUnit*3;
            break;
            
        }
        button.css("background-position",`${left} ${top}`)
    }
}
"use strict";

var Base = require('../../../../app/base');
import Uri from "../../../../app/uri";

export default class Verify extends Base {
    constructor(config) {
        super(config);
        this._bind();

        $('.phone').val(this.cookie.get('phone'));

        //通道列表信息,以及最大入金与最小入金
        this.passWayMessage={
            list:[],
            min_amount_per_deposit:"",
            max_amount_per_deposit:""
        };
        this.subscribe("app:joinGoldMsg",this.setPassWayMessage,this);
    }

    //设置从服务器或取得通道数据
    setPassWayMessage(data){

        var obj={};
        data.map((n,i)=>{
            var attr=n.code;
            // n.min_amount_per_deposit=400;
            // n.max_amount_per_deposit=2000;
            obj[attr]=n; 
        })
        this.passWayMessage.list=obj;
        this.getPassWayMessage();
    }

    //获取通道列表数据 渲染页面
    getPassWayMessage(){
        
        var list=this.passWayMessage.list;
        
        var passWay=new Uri().getParam("code");
        //最小入金金额 和最大入金金额

        this.passWayMessage.min_amount_per_deposit=list[passWay].min_amount_per_deposit +"" || getMinDepositWL(); 
        this.passWayMessage.max_amount_per_deposit =list[passWay].max_amount_per_deposit +"" || getMaxDepositWL();
        $(".num").attr("placeholder",`请输入金额 单笔最低${this.passWayMessage.min_amount_per_deposit}美元 最高${this.passWayMessage.max_amount_per_deposit}美元`);
    }

    _bind() {
        var doc = $(document);

        doc.on('focusout', '.phone', _.bind(this._verifyPhone, this));
        doc.on('focusout', '.num', _.bind(this._verfiyNum, this));
        doc.on('focusout', '#card_no', _.bind(this._verifyBankNumber, this));
        //协议选中事件
        doc.on("change",".check[type=checkbox]",_.bind(this._verifyCheck,this));
    }

    _verifyBankNumber(e) {
        var curEl = $((e && e.currentTarget) || '#card_no'),
            val = curEl.val(),
            parent = curEl.parent('.wrapper'),
            message;
        if(curEl.length==0){
           return true;
        }
        if (!val) {
            message = '银行卡号不能为空';
        }else if (!/^\d{19}$/.test(val) && !/^\d{18}$/.test(val)) {
            var message = '';
  
            if ((/^\d{16}$/.test(val) || /^\d{15}$/.test(val)) && /^(6225)|(4514)|(4392)|(4367)|(5187)|(5236)|(5218)|(5194)|(5123)|(3568)/.test(val)) {
                message = '十分抱歉！暂时不支持信用卡'
            } else if (!/^\d{16}$/.test(val)) {
                message = '银行卡号错误';       
            }
  
            
            
          }
        console.log(message)
        if (message) {
            this._showError(parent, message);
        } else {
            this._hideError(parent);
        }

        return !message;
    }

    _verifyPhone(e) {
        var curEl = $((e && e.currentTarget) || '.form_phone'),
            val = curEl.val(),
            parent = curEl.parent('.wrapper'),
            message;

        if (!val) {
            message = '手机号码不能为空';
        } else {
            if (!/^1[3|4|5|7|8][0-9]\d{8}$/.test(val)) {
                message = '手机号码不正确';
            }
        }
        console.log(message)
        if (message) {
            this._showError(parent, message);
        } else {
            this._hideError(parent);
        }

        return !message;
    }

    _verfiyNum(e) {
        var curEl = $((e && e.currentTarget) || '.num'),
            val = curEl.val(),
            parent = curEl.parent('.wrapper'),
            message;

        if (!val) {
            message = '充值金额不能为空';
        } else {
            if (!/\d+/.test(val)) {
                message = '充值金额必须为数字';
            }
            if (val*1 < this.passWayMessage.min_amount_per_deposit*1) {
               message = '充值金额必须大于'+this.passWayMessage.min_amount_per_deposit;
            }
            if (val*1 > this.passWayMessage.max_amount_per_deposit*1) {
                message = '充值金额不能高于'+this.passWayMessage.max_amount_per_deposit;
            }
        }

        var extraMoneyEl = $('.extra-money');


        if (message) {
            this._showError(parent, message);
            extraMoneyEl.val('');
        } else {
            var bonus = this.parent.countBonus(val);
            extraMoneyEl.val(bonus);

            this._hideError(parent);
        }

        return !message;
    }

    _verifyCheck(e) {
        var curEl = $((e && e.currentTarget) || '.check'),
            parent = curEl.parents('.wrapper'),
            message;

        if (!curEl.prop('checked')) {
            message = '请阅读并同意用户注册协议';
        }

        if (message) {
            this._showError(parent, message);
        } else {
            this._hideError(parent);
        }

        return !message;
    }

    _showError(parent, message) {
        var errorEl = $('.message', parent);

        if (errorEl.length === 0) {
            errorEl = '<p class="message">' + message + '</p>';
            parent.append(errorEl);
        } else {
            errorEl.text(message);
        }

        parent.addClass('error');
    }

    _hideError(parent) {
        parent.removeClass('error');
    }

    validate() {
        //新版UI
        if(getPayWayNewUi()){
            return this._verfiyNum() && this._verifyPhone() && this._verifyBankNumber();
        }else{
            return this._verfiyNum() && this._verifyPhone() && this._verifyCheck();       
        }
       
        
    }

    getVal() {
        return {
            amount: parseFloat($('.num').val().trim()),
            phone: $('.phone').val().trim(),
            bonus: $('.extra-money').val()
        }

    }
}
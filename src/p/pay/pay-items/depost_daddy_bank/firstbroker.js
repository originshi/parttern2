"use strict";

var Base = require('../../../../app/base');
var Uri = require('../../../../app/uri');
var Header = require('../../../../common/header');
var Verify = require('../common/verify.js');
var PayPass = require('../common/pay-pass.js');
var bonusTmpl = require('../commonTmpl/bonus.ejs.html');
var tmpl = require('./index.ejs.html');

class Guide extends Base {
    constructor() {
        super();

        this.login().then(() => {
            this._init();
        });
        this.clickOnly=false;
        
    }

    _init() {
        new Header();
        new PayPass({
            el: $('#J_SelectPass')
        })

        this._initAttrs();
        this._bind();
        this._getBonus();
        this._getBankList();
        
        this.verify = new Verify({
            parent: this
        });
    }


    _bind() {
        var doc = $(document);

        doc.on('click', '.J_BankItem', _.bind(this._select, this));
        doc.on('click', '.order-bg', _.bind(this._hideorder, this));
        doc.on('click', '.submit', _.bind(this._submit, this));
        doc.on('click', '.closeOrder', _.bind(this._hideorder, this));
    }

    _getBankList() {
        this.ajax({
            url: '/v1/user/pay/channel/bank/list/',
            data: {
                access_token: this.cookie.get('token'),
                pay_channel_code: this.bankCode
            }
        }).then((data) => {
            data = data.data;
            console.log("银行数据",data[0].bank_code);
            this.bankId=data[0].bank_code;
            this.render(this.tmpl, data, $('#J_List'));
        })

    }

    _getBonus() {
        this.ajax({
            url: '/v1/deposit_bonus/config',
            data: {
                access_token: this.cookie.get('token')
            }
        }).then((data) => {
            data = data.data.config.deposit_bonus.real;
            this.bonusRate = data.ratio;

            if(data.ratio[0].ratio!==0 || data.ratio[1].ratio!==0 || data.ratio[2].ratio!==0 ){
               this.render(bonusTmpl, data, $('#J_Bonus'));
            } else {
                $('.extra-money').parent().hide();
            }
        });
    }


    _select(e) {
        var curEl = $(e.currentTarget);
        this.bankId = curEl.attr('data-id');
        //this._showOrder();
        $(e.currentTarget).addClass("checked").siblings().removeClass("checked");
    }

    _submit(e) {
        e.preventDefault();

        //var formEl = $('form');
        //var amount = $(".item .num").val();
        var amount = $(".num").val();
        
        if (!this.verify.validate()) {
            return;
        }
        if(this.clickOnly){
            return;
        }
        console.log("上传数据",amount+"id"+this.bankId)
        this.clickOnly=true;
        this.ajax({
            url: '/v1/user/pay/depost_daddy_bank/',
            data: {
                amount: amount,
                access_token: this.cookie.get('token'),
                bank_id: this.bankId
            }
        }).then((data) => {
           
            data = data.data;
            
            this._hideorder();
            this.render(tmpl, data, $('.content'));
            
            
            this.clickOnly=false;

        }).catch((e) => {
            this.clickOnly=false;
            console.log(e);
        })
    }

    countBonus(val) {

        var bonus = 0;

        this.bonusRate = this.bonusRate.sort(function(val1, val2) {
            if (val1.limit > val2.limit) {
                return -1;
            } else if (val1.limit === val2.limit) {
                return 0;
            } else {
                return 1;
            }
        });

        for (var i = 0, len = this.bonusRate.length; i < len; i++) {
            var deposit = this.bonusRate[i];

            if (val >= deposit.limit) {
                bonus = val * deposit.ratio;
                break;
            }
        }

        return bonus.toFixed(2);
    }

    _showOrder() {
        $(".order-bg").show();
        $(".order").show();
    }

    _hideorder(){
        $(".order-bg").hide();
        $(".order").hide();
    }

    _initAttrs() {
        this.bankCode = new Uri().getParam('code');

        $('.extra').html(getExtraHtml());
        $('.company-name').val(getCompanyName());
        $('.statement-link').text("我已阅读并同意 《" + getCompanyName() + "用户注册协议》");
    }

    defaults() {
        return {
            tmpl: [
                '<% data.forEach(function(item,index) { %>',
                    '<li class="item J_BankItem <%= index==0? "checked":"" %>" data-id="<%= item.bank_code %>" >',
                        '<a href="javascript:;" class="link"><%= item.bank_name %></a>',
                    '</li>',
                '<% }) %>'
            ].join('')
        }
    }
}
export default Guide;


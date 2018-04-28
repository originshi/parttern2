"use strict";

var Base = require('../../../../app/base');
var Uri = require('../../../../app/uri');
var Header = require('../../../../common/header');
var bonusTmpl = require('../commonTmpl/bonus.ejs.html');
var Verify = require('../common/verify.js');
var PayPass = require('../common/pay-pass.js');
import NewGuide from "./firstbroker"

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
        this._showOrder();
       
    }

    _submit(e) {
        e.preventDefault();

        var formEl = $('form');
        var amount = $(".item .num").val();
        
        if (!this.verify.validate()) {
            return;
        }
        if(this.clickOnly){
            return;
        }

        this.ajax({
            url: '/v1/user/pay/depost_daddy_third/',
            type: 'post',
            data: {
                amount: amount,
                access_token: this.cookie.get('token'),
                bank_id: this.bankId
            }
        }).then((data) => {
            data = data.data;
            this.openUrl(data.break_url);
            this.clickOnly=false;
        }).catch((e) => {
            console.log(e);
            this.clickOnly=false;
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

    openUrl(url) {
        var form = document.createElement('FORM');
        form.action = url;
        form.method = 'POST';

        document.body.appendChild(form);
        form.submit();
        form.remove();
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
                    '<li class="item J_BankItem " data-id="<%= item.bank_code %>" >',
                        '<a href="javascript:;" class="link"><%= item.bank_name %></a>',
                    '</li>',
                '<% }) %>'
            ].join('')
        }
    }
}
if(getPayWayNewUi()){
    $(".old_ui").remove();
    $("#joinGoldContent").show();
    new NewGuide();
}else{
    $("#joinGoldContent").remove();
    $(".old_ui:not(#order)").show();
    new Guide();
}
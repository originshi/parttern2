"use strict";

var Base = require('../../../app/base');
var bankList = require('./bank');
var Header = require('../../../common/header');
var bonusTmpl = require('./bonus.ejs.html');
var Verify = require('./verify');
var Uri = require('../../../app/uri');
var Dialog = require('./dialog');
// var Cookie = require('../../../lib/cookie');

class Guide extends Base {
    constructor() {
        super();

        this.login().then(() => {
            this._payWay();

            this.verify = new Verify({
                parent: this
            });

            new Header();
            this._bind();
            this._getBonus();
        });
        var data;
    }

    _bind() {
        var doc = $(document);

        doc.on('click', '.clearfix .item', _.bind(this._select, this));
        doc.on('click', '.order-bg', _.bind(this._hideorder, this));
        doc.on('click', '.submit', _.bind(this._submit, this));
        doc.on('click', '.closeOrder', _.bind(this._hideorder, this));
        
        $('.logo-link').attr("href", getHomeUrl());
        $('.company-name').val(getCompanyName());
        $('.avatar-img').attr('src', getDefaultAvatarUrl());

        $('.extra').html(getExtraHtml())
        $('.statement-link').text("我已阅读并同意 《" + getCompanyName() + "用户注册协议》");
        $('.view-bank').attr("href", getBankListHref());

        if ( getWLName() == 'thetradestar' ) {
            $('.num').attr('placeholder','请输入充值金额');
            $('.extra-money').attr('placeholder', '— —')
            $('.desc_sign').hide();
        }
    }

    _payWay() {

        if (getIsNewpay()) {
            window.location.href = './select-payItem.html';
        }

        if ( getIsThirdPartyPay() ) {
            var href = './recharge.html';
            window.location.href = href;
        }
    }

    _getBonus() {
        this.ajax({
            url: '/v1/deposit_bonus/config',
            data: {
                access_token: this.cookie.get('token')
            }
        }).then((data) => {
            // console.log(data)
        });

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
                $('.extra-money').hide();
            }
            
            if ( getWLName() == 'thetradestar' ) {
                $('.de_sign').hide();
            }
    });
    }


    _select(e) {
        var curEl = $(e.currentTarget),
            index = curEl.index();
        var bank = bankList[index];
        var paid_thru = 'chinagpay_web';
        var data =  {"bank":bank.name,"paid_thru":"chinagpay_web","bank_code":bank.code[paid_thru],'ahcode':bank.code['aihuicode'],"paid_thru":paid_thru};
        var bankcode = bank.code[paid_thru];
        var ahcode = bank.code['aihuicode'];
        if (getPayWay() == 'depost_daddy') {
            data.bank_id = bank.code['id'];
        } else {
            if (!bank.code[paid_thru]) {
                console.log('不支持')
            }
        }
        this.data = data;
        $(".order-bg").show();
        $(".order").show();

    }

    _submit(e) {
        e.preventDefault();

        var formEl = $('form');

        if (!this.verify.validate()) {
            return;
        }

        var amount = $(".item .num").val();

        this.ajax({
            url: getUrl(),
            type: 'post',
            data: {
                paid_thru: this.data.paid_thru,
                bank_code: this.data.bank_code,
                amount: amount,
                access_token: this.cookie.get('token'),
                back_url: '',
                bank_id: this.data.bank_id
            }
        }).then((data) => {
            data = data.data;
            if (getPayWay() == 'depost_daddy') {
                // window.open(data.break_url);
                this.openUrl(data.break_url)
                return
            }
            var url = data.post_url + '?' + data.post_data;
            this.postURL(url,data)
        }, (data) => {}).catch((e) => {
            console.log(e);
        })

        function getUrl() {
            var url = '/v1/user/real/deposit/chinagpay_web/?';
            if (getPayWay() == 'depost_daddy') {
                url = '/v1/user/pay/depost_daddy_third/';
            } else if(getPayWay() == 'deposit_shande') {
                url = '/v1/user/pay/deposit_shande/';
            }
            return url;
        }   
    }

    _superStarPay() {
        var self = this;
        var param = {
            access_token: this.cookie.get('token'),
            amount: $('.num').val(),
            channel: 'card',
        }

        self.ajax({
            url: '/v1/user/pay/deposit_superstarpay_order/',
            type: 'POST',
            data: param,
        })
            .then(function( data ) {
                var url = data.data.post_url + '?' + data.data.post_data;
                self.postURL(url);

            },function( err ) {
             
            })
    }

    _charge(bankInfo) {
        var data = this.verify.getVal();

        data = _.extend(data, {
            paid_thru: bankInfo.paid_thru,
            bank_code: bankInfo.bankcode,
            bankName: bankInfo.bank
        });
        console.log(data);
        if ( getWLName() == 'thetradestar' ) {
            $('.unit').hide();
        }
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

    postURL(url,data) {
        var form = document.createElement("FORM");
        form.method = "POST";
        form.style.display = "none";
        document.body.appendChild(form);
        form.action = url.replace(/\?(.*)/, function(_, urlArgs) {
            urlArgs.replace(/\+/g, " ").replace(/([^&=]+)=([^&=]*)/g, function(input, key, value) {
                input = document.createElement("INPUT");
                input.type = "hidden";
                input.name = decodeURIComponent(key);
                input.value = decodeURIComponent(value);
                form.appendChild(input);
            });
            if (getPayWay() != 'deposit_shande') {
                $('form input:last').val(data.signature);
            }
            
            return "";
        });
        form.submit();
    }

    /**
     * 点击背景隐藏  表单
     * @private
     */

    _hideorder(){

        $(".order-bg").hide();
        $(".order").hide();

    }
}

new Guide();
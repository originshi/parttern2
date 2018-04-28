"use strict";

var Base = require('../../../../app/base');
var Uri = require('../../../../app/uri');
var Header = require('../../../../common/header');
var Verify = require('../common/verify.js');
var PayPass = require('../common/pay-pass.js');
var bonusTmpl = require('../commonTmpl/bonus.ejs.html');

class Recharge extends Base {
    constructor() {
        super();

        this.login().then(() => {
            this._init();
        });
    }

    _init() {
        new Header();
        new PayPass({
            el: $('#J_SelectPass')
        })

        this._initAttrs();
        this._bind();
        this._getBonus();

        this.verify = new Verify({
            parent: this
        });
    }

    _bind() {
        var doc = $(document);

        $('#J_Form').on('submit', _.bind(this._submit, this));
    }

    _submit(e) {
        e.preventDefault();

        var formEl = $('form');

        if (!this.verify.validate()) {
            return;
        }

        this._submitPay();
       
    }

    _submitPay() {
        this.ajax({
            url: '/v1/user/pay/deposit_onionpay/',
            type: 'POST',
            data: {
                access_token: this.cookie.get('token'),
                amount: $('.num').val()
            },
        })
        .then(( data ) => {
            var url = data.data.post_url + '?' + data.data.post_data;
            this.postURL(url);

        },function( err ) {
            
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
                $('.J_BonusWrapper').remove();
                $('#J_Bonus').remove();
            }
        });
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

    _initAttrs() {
        $('.extra').html(getExtraHtml())
        $('.statement-link').text("我已阅读并同意 《" + getCompanyName() + "用户注册协议》");
    }
}

new Recharge();
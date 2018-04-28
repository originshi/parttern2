"use strict";

var Base = require('../../../../app/base');
var Uri = require('../../../../app/uri');
var Header = require('../../../../common/header');
var Verify = require('../common/verify.js');
var PayPass = require('../common/pay-pass.js');
var bonusTmpl = require('../commonTmpl/bonus.ejs.html');
var tmpl = require('./index.ejs.html');
class Recharge extends Base {
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

        this.verify = new Verify({
            parent: this
        });
    }

    _bind() {
        var doc = $(document);

        //$('#J_Form').on('submit', _.bind(this._submit, this));
        $(".submit").on("click",_.bind(this._submit,this));
        doc.on('focusout', '.zhifubao-name', _.bind(this._verifyName, this));
    }

    _submit(e) {
        e.preventDefault();
        if(this.clickOnly){
            return;
        }

        var formEl = $('form');

        if (!this.verify.validate()) {
            return;
        }

        if (!this._verifyName()) {
            return
        }

        this._submitPay();
       
    }

    _submitPay() {
        this.clickOnly=true;
        this.ajax({
            url: '/v1/user/pay/depost_daddy_alipay_bank/',
            data: {
                access_token: this.cookie.get('token'),
                amount: $('.num').val(),
                note: $('.zhifubao-name').val()
            }
        })
        .then(( data ) => {
            this.clickOnly=false;
            data = data.data;
            this.render(tmpl, data, $('.content'))
        },function( err ) {
            this.clickOnly=false;
            console.log(err)
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

    _verifyName(e) {
        var curEl = $((e && e.currentTarget) || '.zhifubao-name'),
            parent = curEl.parents('.wrapper'),
            message;

        if (!curEl.val()) {
            message = '不能为空';
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

    _initAttrs() {
        $('.extra').html(getExtraHtml())
        $('.statement-link').text("我已阅读并同意 《" + getCompanyName() + "用户注册协议》");
    }
}
export default Recharge;
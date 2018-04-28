/**
 * 出金板块
 */

 'use strict';

require('./index.css');
var Base = require('../../../../../app/core');
var app = require('../../../../../app');
var Config = require('../../../../../app/config');
var message = require('../message');
var toast = require('../../../../../common/toast');
var tmpl = require('./withdraw.ejs.html');
var validateIdCard = require('../../../../../lib/validate-idcard');
var Toast = toast;

export default class ExtractMoney extends Base {
	constructor(config) {
    super(config);
    this.onlyOne=false;
    this.getOpenAccountMsg().then((data)=>{
       console.log(data)
       data=data.data;
       this.el.empty();
       this.renderTo(tmpl, data, this.el);
       this._bind();
       this._saveMony();
    })
    
    
  }

  _bind () {
  	var doc = $(document);
  	$('#truephone').val(this.cookie.get('phone'));//用户手机号
  	$('.E_amount_itt,.E_amount_i').attr('placeholder',getMinWithdrawWL());//默认出金金额

  	//弹出出金页面
    //doc.on('click', '.extract', _.bind(this._saveMony, this));
  	//关闭出金页面
  	doc.on('click','.closeX',_.bind(this._closeMonyPage, this));
  	//确认提交
  	doc.on('click','.add_ackBtn,.ackBtn',_.bind(this.submitExactMoney, this));
    //金额的blur事件
    doc.on('blur','.E_amount_i',_.bind(this._vaildateMoney, this));
  }

  //提取资金页面
  _saveMony () {
    $('.user_name_').html(getCompanyName())
    // $(".draw_down").show()
    $('.upload-input').val("");
    this.el.show();
    
    this.ajax({
      url: '/v1/user/real/withdraw/',
       data: {
          access_token: this.cookie.get('token'),
          real_token: this.cookie.get('real_token')
        }

    }).then((data)=>{
      data = data.data;
      
      
      $('.E_amount_i2').val(data.extractable_amount);
      $('#J_Loading_w').hide();
      $(".add_pop_up_box").show();
      
      
    })
  };
  
  //提出金blur事件
  _vaildateMoney(e){
     var el=$(e.currentTarget);
     this._validate(el, 'compareTotal');

     
  }
  //关闭提取资金页面
  _closeMonyPage () {
  	$('#J_Loading_w').show()
    $(".J_withdraw,.I_content,.add_pop_up_box").hide();
    $('.preview').html("")
    $('.error').removeClass('error');
    $('.err').remove()
    $('.J_CardName,.J_CardId,#obligatephone,.J_BankId,.J_BankName_tt').val("")
  }
  
  _showError(curEl, message) {
      var parent = $(curEl.parents('div')[0]);
      var messageEl = curEl.siblings('.err');

      if (messageEl.length === 0) {
        curEl.after('<p class="err">' + message + '</p>');
      } else {
        messageEl.text(message);
        messageEl.show();
      }
      parent.addClass('error');
  }

  _hideError(curEl) {
      var parent = $(curEl.parents('div')[0]);
      var messageEl = curEl.siblings('.err');

      parent.removeClass('error');
      messageEl.hide();
  }


  _getParams() {
        //判断获取那个页面内容的银行
        
        var ret =  {
          access_token: this.cookie.get('token'),
          real_token: this.cookie.get('real_token'),
          amount : $('.E_amount_i').val()//提取金额
        }
        return ret;
  }

  _validate (curEl, type) {
    var val = curEl.val(),
    val = val && val.trim();
    if (type === 'compareTotal') {
      if (!val) {
        this._showError(curEl, '不能为空');
        return false;
      } else if (!/^\d+(\.\d+)?$/.test(val)) {
        this._showError(curEl, '金额只能为数字');
        return false;
      } else if (parseFloat($('.E_amount_i2').val() || 0) < parseFloat(val)) {
        this._showError(curEl, '出金金额应小于可提金额');
        return false;
      } else if (parseFloat(val) < getMinWithdrawWL()) {
        this._showError(curEl, '出金金额应大于' + getMinWithdrawWL() + '美元');
        return false;
      }
    }
    this._hideError(curEl)
    return true;
  }

  // 提交 (提取资金)
  submitExactMoney(){
    
    if(!this._validate($(".E_amount_i"),'compareTotal')||this.onlyOne){
       return;
    }    
    this.onlyOne=true;   
    var params=this._getParams();
    this.ajax({
      url: "/v2/user/real/withdraw/",
      data: params,
      type: 'post'
    }).then((data) => {
      this.onlyOne = false;
      new Toast("出金成功");
      this.el.hide();
      window.location.reload();
    },(data) => {
      this.onlyOne = false;
      new Toast("出金失败");
      this.el.hide();
          
    });
  }

  //获取用户开户信息
  getOpenAccountMsg(){
    
    return this.ajax({
      url: '/v1/deposit/user/info/',
      data: {
          access_token: Cookie.get('token')
      },
      noToast: true
    });
  }

  _initAttrs() {
    this.el.html(tmpl);
  }

}
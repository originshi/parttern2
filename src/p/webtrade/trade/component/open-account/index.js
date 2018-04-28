"use strict";
require('./index.css');
var Base = require('../../../../../app/base');
var Uri = require('../../../../../app/uri');
var Header = require('../../../../../common/header');
var toast = require('../../../../../common/toast');
var validateIdCard = require('../../../../../lib/validate-idcard');
var Toast = toast;
var tmpl = require('./index.ejs.html');
var login = require('../../../../../app/login');
var ExtractMoney=require("../extract-money");
var Cookie = require('../../../../../lib/cookie');
import AddressLinkage from "./addresslinkage/addresslinkage"

class OpenAccount extends Base {
    constructor(config) {
        //config 中如果有 extractGold则要显示出金页面
        super(config);
        this.login().then(() => {
            new Header();
           
            this.getBankMessage().then((list) => {
              //如果页面中不存在则创建实例
              //if(!$(".open-account-content-userInfo").length){
                $(".extract").off().on("click", _.bind(this.openExtractPage, this))
                this.renderTo(tmpl, list, $('body')); 
                //新版网点
                if(getNewNetPoint()){
                  new AddressLinkage({el:$("#addressLinkage")});
                }           
                this._bind();
                $('#U_truephone').val(this.cookie.get('phone'));
                this.onlyOne = false;
                $('#company').html(getCompanyName());
                $('.company-name').text(getCompanyName());
                $('.cmay-name').text(getCompanyName());
                if(getTrueMsg()){
                  $('#trueMsg').html(getTrueMsg());
                }
              //}
              
            })
            
            
        });
        
    }

    //弹出出金页面
    openExtractPage(){
      $(".open-account-content-userInfo").show();
    }

    _exit() {
        //login.logout(true);
        $(".open-account-content-userInfo").hide();
      }
    _bind() {
       var doc = $(document);
       doc.on('change', '.upload-input', _.bind(this._preview, this));
//       doc.on('blur', '.U_BankName', _.bind(this._vaildateCardName, this));
       doc.on('blur', '.U_CardName', _.bind(this._vaildateCardName, this));
       doc.on('blur', '.U_CardId', _.bind(this._vaildateCardId, this));
       doc.on('blur', '.U_BankId', _.bind(this._vaildateBankId, this));
       doc.on('blur', '#U_obligatephone', _.bind(this._vaildateCardName, this));
       doc.on('blur', '#addressLinkage .detailedAddress', _.bind(this._vaildateCardName, this));
       doc.on('click', '.J_Submit', _.bind(this._submit, this));
       doc.on('click', '#agreeMsg', _.bind(this._agreeMsg, this));
       // 隐藏 开户页面
       doc.on('click', '.J_Exit', _.bind(this._exit, this));
    }

    _agreeMsg(e){
        if( $("#trueMsg").css("display")=='none' ){
            $("#trueMsg").show();
        }else{
            $("#trueMsg").hide();
        }
    }
    _submit(e) {
      var self = this;
      var curEl = $(e.currentTarget);
      if (!this._validates()) {
        return;
      }

      var params = this._getParams();
      if ($('.U_CardFront').length > 0 && !params.id_front){
        new Toast('请上传身份证正面照片');
        return;
      }
      if ($('.U_CardBack').length > 0 && !params.id_back){
        new Toast('请上传身份证背面照片');
        return;
      }
      if ($('.U_CardFront').length > 0 && !params.withdraw_card_front){
        new Toast('请上传银行卡正面照片');
        return;
      }
      if ($('.U_CardFront').length > 0 && !params.withdraw_card_back){
        new Toast('请上传银行卡背面照片');
        return;
      }

      if (!$("#agree").is(":checked")){
        new Toast('未选中 我以阅读以上安全协议,请勾选');
        return;
      }
      
      if(!this.onlyOne){
        this.onlyOne = true;
        this.ajax({
            url: '/v1/deposit/user/info/',
            type: 'post',
            data: params
        }).then(function(data) { 
          new Toast('提交成功');
          //设置开户信息,不同的电话有不同的判断
          var openAccountMeaage = localStorage.getItem("openAccountMeaage");
                
          if(openAccountMeaage){
              openAccountMeaage=JSON.parse(openAccountMeaage)
              openAccountMeaage[Cookie.get("phone")] = 1;
          }else{
              openAccountMeaage = {[Cookie.get("phone")]:1};
          }
          openAccountMeaage=JSON.stringify(openAccountMeaage)
          localStorage.setItem('openAccountMeaage',openAccountMeaage)
          //设置开户信息结束
        
          setTimeout(function(){
            //window.location.href = './trade.html';
            $(".open-account-content-userInfo").hide();
            $('.preview').html("")
            $('.error').removeClass('error');
            $('.err').remove()
            $('.U_CardName,.U_CardId,#U_obligatephone,.U_BankId').val("");
            //如果是在点击了出金,并且没有开户,然后开过户后,展示出出金页面
            if(self.extractGold){
              new ExtractMoney({el : $('.J_withdraw')});
            }
          },1000);
          
        }, function(data){
          self.onlyOne = false;
          //new Toast(data.message + ',请修改后再提交');
          
        });
      }
    }

    _getParams() {
        var access_token = this.cookie.get('token'),
            phoneEl = $('.J_UserPhone'),
            nameEl = $('.J_UserName'),
            idNoEl = $('.J_UserIdNo'),
            idFrontEl = $('#J_IdFront'),
            idReverEl = $('#J_IdRever'),
            accountNameEl = $('.J_AccountName'),//暂时与姓名相同
            accountBankNoEl = $('.J_AccountBankNo'),
            bankNameEl = $('.J_BankList'),
            openNameEl = $('.J_OpenName'),
            bankFrontEl = $('#J_BankFront'),
            bankReverEl = $('#J_BankRever'),
            idTypeEl=$(".J_idTypeList");
        var bank_branch="";
            //新版网点
            if(getNewNetPoint()){
              var detailMsg=$("#addressLinkage .detailedAddress").val();
              var privince=$("#addressLinkage .province").val();
              var city=$("#addressLinkage .city").val();
              bank_branch=privince+city+detailMsg;
            }else{
              bank_branch=openNameEl.val();
            }
            console.log("bank_barnch",bank_branch)
             
        return {
            access_token: access_token,
            phone: phoneEl.val(),
            true_name: nameEl.val(),
            id_type: idTypeEl.val() || 0 ,
            id_no: idNoEl.val(),
            withdraw_card_user_name: nameEl.val(),
            withdraw_card_bank: bankNameEl.val(),
            withdraw_card_no: accountBankNoEl.val(),
            withdraw_card_bank_branch: bank_branch,//新版网点
            id_front: $('.img', idFrontEl).attr('src'),
            id_back: $('.img', idReverEl).attr('src'),
            withdraw_card_front: $('.img', bankFrontEl).attr('src'),
            withdraw_card_back:$('.img', bankReverEl).attr('src')
        }
    }

    _validates() {
      var self = this;
      var els;
      //新版网点


      if(getNewNetPoint()){
        els = ['.U_CardName', '.U_CardId', '.U_BankId','#addressLinkage .detailedAddress'];    
      }else{
        els = ['.U_CardName', '.U_CardId', '.U_BankId','#U_obligatephone'];
      }
     
      var types = ['empty', 'cardId', 'bankId','empty'];
      var pass = true;

      for (var i = 0, len = els.length; i < len; i++) {
        var el = $(els[i]);
        $.each(el, function(index, item) {
          item = $(item);
          if (item.hasClass('new') && self.newBank && i === 2) {
            return;
          }

          if (item.hasClass('U_BankId')) {

            if (!self.newBank) {
              if (index === 1) {
                return;
              }
            }
          }

          var result = self._validate(item, types[i]);
          console.log(result, types[i])

          if (!result) {
            pass = false;
          }
        });
      }

      return pass;
    }
    _vaildateCardName(e) {
      var curEl = $(e.currentTarget);
      this._validate(curEl, 'empty');
    }

    _vaildateCardId(e) {
      var curEl = $(e.currentTarget);
      this._validate(curEl, 'cardId');
    }

    _vaildateBankId(e) {
      var curEl = $(e.currentTarget);
      this._validate(curEl, 'bankId');
    }
    
    _vaildatePhone(e) {
      var curEl = $(e.currentTarget);
      this._validate(curEl, 'm_phone');
    }


    _validate(curEl, type) {
      var val = curEl.val(),
        val = val && val.trim();
      if (type === 'empty') {
        if (!val) {
          this._showError(curEl, '不能为空');
          return;
        }
      }

      if (type === 'cardId') {
        if (!val) {
          this._showError(curEl, '不能为空');
          return;
        } else if (!validateIdCard(val)) {
          this._showError(curEl, '身份证号码错误');
          return;
        }
      }
      if (type === 'm_phone') {
        if (!val) {
          this._showError(curEl, '不能为空');
          return;
        }else if (!(/^1[34578]\d{9}$/.test(val))) {
          this._showError(curEl, '手机号错误');
          return;
        }
      }

      /**
       * 1|允许出金条件修改为：卡号位数等于16位、18位、19位允许出金。
       * 2、卡号位数为15位、16位时，卡号前四位是6225、4514、4392、4367、5187、5236、5218、5194、5123、3568则判断为信用卡，
       * 输入框下方文案提示“十分抱歉！暂时不支持出金到信用卡”。
       */

      if (type === 'bankId' && curEl.parent().css('display') !== 'none') {
        if (!val) {
          this._showError(curEl, '不能为空');
          return;
        } else if (!/^\d{19}$/.test(val) && !/^\d{18}$/.test(val)) {
          var msg = '银行卡号错误';

          if ((/^\d{16}$/.test(val) || /^\d{15}$/.test(val)) && /^(6225)|(4514)|(4392)|(4367)|(5187)|(5236)|(5218)|(5194)|(5123)|(3568)/.test(val)) {
            msg = '十分抱歉！暂时不支持信用卡'
          } else if (/^\d{16}$/.test(val)) {
            this._hideError(curEl);
            return true;
          }

          this._showError(curEl, msg);
          return;
        }
      }

      this._hideError(curEl);
      return true;
    }
    _preview(e) {
      var self = this;
      var preivewEl = $(e.currentTarget).siblings('.preview');

      // resize and serial image
      var file = e.currentTarget.files[0];

      // Ensure it's an image
      if(file.type.match(/image.*/)) {
          console.log('An image has been loaded');

          // Load the image
          var reader = new FileReader();
          reader.onload = function (readerEvent) {

              console.log('origin image length = ' + reader.result.length);
              var image = new Image();
              image.onload = function (imageEvent) {

                  // Resize the image
                  var canvas = document.createElement('canvas'),
                      max_size = 800,// TODO : pull max size from a site config
                      width = image.width,
                      height = image.height;
                  if (width > height) {
                      if (width > max_size) {
                          height *= max_size / width;
                          width = max_size;
                      }
                  } else {
                      if (height > max_size) {
                          width *= max_size / height;
                          height = max_size;
                      }
                  }
                  canvas.width = width;
                  canvas.height = height;
                  canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                  var dataUrl = canvas.toDataURL('image/jpeg');
                  console.log('resized image length = ' + dataUrl.length);
                  var resizedImage = self._dataURLToBlob(dataUrl);
                  /*
                  $.event.trigger({
                      type: "imageResized",
                      blob: resizedImage,
                      url: url
                  });
                  */
                  preivewEl.html('<img class="img" src="' + dataUrl + '">');
                  self._hideError(preivewEl);
              }
              image.src = readerEvent.target.result;
              // preivewEl.html('<img class="img" src="' + readerEvent.target.result + '">');
              // self._hideError(preivewEl);
          }
          reader.readAsDataURL(file);
      }

      /*
      // if (Config.isAndroidAPK()) {
        var reader = new FileReader();
        console.log("reader: " + reader);
        reader.onloadend = function() {
          var dataUrl = reader.result;
          console.log("dataUrl.length = " + dataUrl.length);
          if (reader.error != null) {
            console.log("input_img_error reader.error.code=" + reader.error.code);
            var debug_url = 'https://p.invhero.com/debug/android/input_img_error/?error_code=' + this.error.code + "&access_token=" + Cookie.get('token');
            console.log("debug_url: " + debug_url);
            self.ajax({
              url: debug_url,
              type: 'post',
              unjoin: true,
              data: {}
            }).then(function(data) {
              console.log("input_img_error debug done.");
            });
          } else {
            console.log("input_img_ok.");
          }
          var index = 0;
          while (index + 512 < dataUrl.length) {
            var res = dataUrl.substring(index, index + 512);
            console.log(res);
            index += 512;
          }
          preivewEl.html('<img class="img" src="' + dataUrl + '">');
          self._hideError(preivewEl);
        }
        reader.readAsDataURL(e.currentTarget.files[0]);
      */
      // } else {


      //   lrz(e.currentTarget.files[0], {
      //     // 压缩开始
      //     before: function() {
      //       console.log('压缩开始');
      //     },
      //     // 压缩失败
      //     fail: function(err) {
      //       console.error(err);
      //     },
      //     // 压缩结束（不论成功失败）
      //     always: function() {
      //       console.log('压缩结束');
      //     },
      //     // 压缩成功
      //     done: function(results) {
      //       // 你需要的数据都在这里，可以以字符串的形式传送base64给服务端转存为图片。
      //       preivewEl.html('<img class="img" src="' + results.base64 + '">');

      //       self._hideError(preivewEl);
      //     }
      //   });
      // }
    }
    _dataURLToBlob(dataURL) {
      var BASE64_MARKER = ';base64,';
      if (dataURL.indexOf(BASE64_MARKER) == -1) {
          var parts = dataURL.split(',');
          var contentType = parts[0].split(':')[1];
          var raw = parts[1];

          return new Blob([raw], {type: contentType});
      }

      var parts = dataURL.split(BASE64_MARKER);
      var contentType = parts[0].split(':')[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;

      var uInt8Array = new Uint8Array(rawLength);

      for (var i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
      }

      return new Blob([uInt8Array], {type: contentType});
    }
    _showError(curEl, message) {
      var parent = $(curEl.parents('div')[0]);
      console.log(parent);
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

  getBankMessage (){
    return this.ajax({
      url: '/v1/user/real/withdraw/bank_list/',
      data: {
          access_token: this.cookie.get('token')
      }
    }).then((data) => {
        return data.data;
    })
  }
    
}

module.exports = OpenAccount;
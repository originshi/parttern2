"use strict";

var Base = require('../../../../app/base');
var Uri = require('../../../../app/uri');
var Cookie = require('../../../../lib/cookie');
var md5 = require('../../../../lib/md5');
var Config = require('../../../../app/config');
var Util = require('../../../../app/util');
var Toast = require('../../../../common/toast');

class Login extends Base {
	constructor(config){
		super(config);

		var inviteCode=new Uri().getParam('inviteCode');
		if(inviteCode){
			$(".J_Refer").val(inviteCode);
		}
		
		this._bind();
		// this._render();
		
	}

	_bind() {
		var doc = $(document);
		doc.on('submit', '.J_Form', _.bind(this._actionControls, this));

		// focus
		doc.on('focusout', '.J_Focus', _.bind(this._verifyFocus, this));

		// 图片验证码
		doc.on('focusout', '.J_ImageCode', _.bind(this._verifyImageCode, this));

		// 获取验证码
		doc.on('click', '.J_GetCode', _.bind(this._getVcode, this));

		// 忘记密码
		doc.on('click', '.reset-password', _.bind(this._showResetPasswordTmpl, this));

		// 注册
		doc.on('click', '.login-register', _.bind(this._showRegisterTmpl, this));

		//  切换账号
		doc.on('click', '.reset-login', _.bind(this._goFirstLoginTmpl, this));

		// 回滚到上一页
		doc.on('click', '.back-icon', _.bind(this._backBeforeTmpl, this));

		// 验证码
		doc.on('click', '.J_ImgCode', _.bind(this._updateImageCode, this));

	}

	

	_actionControls(e) {
		e.preventDefault();
		var curFormEl = $(e.currentTarget);
		var sourceForm = "register";
		
		var referCode = new Uri().getParam('refer') || new Uri().getParam('inviteCode');
		var source = new Uri().getParam('source') || getRegisterReferCode();
		var rigisterParams = {
			cc:86,
		    uuid: Util.guid(),
		    nickname: getRegisterDefaultNickname(),
		    refer: referCode || getRegisterReferCode(),
		    source: source,
		    wl: getWLName()
		}
		 
		var params = this._getParams(curFormEl, sourceForm);


		var verifySuccess = this._verifyControls(params);
       
		
			params = _.extend(rigisterParams, params);
		

		if (verifySuccess) {
			this._submit(params, sourceForm, curFormEl);
		}
	}


	_submit(params, sourceForm, curFormEl) {
		var url = this._getRequestUrl(sourceForm);
		if (sourceForm.indexOf('login') !== -1) {
			this.login(url, params, curFormEl);
		} else if (sourceForm.indexOf('register') !== -1) {
			this._register(url, params, curFormEl);
		} else if (sourceForm.indexOf('reset_password') !== -1) {
			this._resetPassword(url, params, curFormEl);
		}
	}

	login(url, params, curFormEl) {
		this._login(url, params, curFormEl).then((token) => {
			var password = params.password;
			this._setRealToken(password);
		})
	}

	_login(url, params, curFormEl) {
		params.password = md5(params.password);
		return this._request(url, params, curFormEl).then((data) => {
	        Cookie.set('token', data.token, {
	          	expires: Infinity
	      	});
	      	Cookie.set('phone', data.phone, {
	        	expires: Infinity
	      	});
	      	Cookie.set('nickname', data.nickname, {
	        	expires: Infinity
	      	});
	      	Cookie.set('type', 'real');

	      	if (data.avatar) {
	        	Cookie.set('avatar', data.avatar, {
	          		expires: Infinity
	        	});
	      	}
		    return data.token;
		})
	}

	_setRealToken(password) {
		this.ajax({
		    url: '/v1/user/real/tradepassword/verify/',
		    type: 'post',
		    data: {
		        access_token: Cookie.get('token'),
		        password: password,
		        wl: getWLName()
		    }
		}).then((data)=>{
		    Cookie.set('real_token', data.data.real_token, {
		        expires: $Global.getRealPasswordExpireTime()
		    });
		    location.href = './trade.html';
		      // window.top.location.href = getTradePageUrl(); //getTradePageUrl是r.js里的函数。
		}, (data)=>{
		    // this._showError($('.J_SubmitWrapper'), '手机号或交易密码错误');
		});
	}

	_register(url, params, curFormEl) {
		this._request(url, params, curFormEl).then((data) => {

			Cookie.set('real_token', data.real_token, {
              expires: Config.getRealPasswordExpireTime()
            });

            Cookie.set('type', 'real');
		    Cookie.set('goType', 'real');

		    Cookie.set('phone', params.phone, {
		      expires: Infinity
		    });
		    Cookie.set('token', data.token, {
		      expires: Infinity
		    });
		    Cookie.set('inviteCode', data.invite_code, {
		      expires: Infinity
		    });
		    Cookie.set('uuid', data.uuid, {
		      expires: Infinity
		    });

		    if (getRegisterReferCode()) {
			    this._getLottery();
			} else {
		        setTimeout(function() {
		           window.top.location.href = '../trade.html';
		        }, 1500);
			}
		})
	}

	_getLottery() {
	    this.ajax({
	      url: '/v1/hongbao/use/',
	      type: 'post',
	      data: {
	        access_token: Cookie.get('token')
	      }
	    }).then(() => {
	      	setTimeout(function() {
	        	window.top.location.href = './trade.html';
	        	// window.top.location.href = getTradePageUrl();
	      	}, 1500);
	  });
  	}

  	_resetPassword(url, params, curFormEl) {
  		this._request(url, params, curFormEl).then((data) => {
  			console.log('reser:success');
  			clearTimeout(this.createCodeCountControl);
  			curFormEl.find('.J_GetCode').val('修改成功');

  			setTimeout(() => {
  				this._backBeforeTmpl();
  				curFormEl.find('.J_GetCode').val('获取验证码');
  			}, 1500)
  		})
  	}

	_request(url, params, curFormEl) {
		var submitEl = curFormEl.find('.J_Submit');
		params.wl = getWLName();
		submitEl.prop('disabled', true);
		return this.ajax({
			url: url,
			type: 'post',
			data: params
		}).then((res) => {
			submitEl.removeProp('disabled');
			Cookie.set('deposits',res.data.deposits);
			return res.data;
		}, (err) => {
			submitEl.removeProp('disabled');
			// new Toast(err.message, 1500);
			new Toast(
      			
      			 err.message
      		);
			console.log(err)
		})
	}

	_getVcode(e) {
		var curEl = $(e.target);
		var curFormEl = curEl.parents('form');
		var tel = curFormEl.find('.J_Phone').val();
		var imageCode = curFormEl.find('.J_ImageCode').val();
        
		this.ajax({
	        url: '/v1/captcha/' + tel,
	        type: 'post',
	        crossDomain: true,
	        data: {
	            cc: 86,
	            captcha: imageCode,
	            wl: getWLName()
	        }
      	}).then((data)=> {
      		if (data.status == 200) {
      			curEl.val('短信发送成功');
      			curFormEl.find('.J_Submit').removeProp('disabled');
      			setTimeout(() => {
      				curEl.val(60);
      				this._createCodeCount(curEl);
      			}, 1000);

      		} else {
      			// new Toast('验证码错误', 1500);
      			this._createImageCode(tel, curFormEl)
      			new Toast(
	      			 
	      			 '图片验证码错误'
				  );
				  $(".new-toast .content p").css("font-size","13px")
      		}
      		
      	}, () => {
      		// 验证码错误
      		// new Toast('验证码错误', 1500);
      		this._createImageCode(tel, curFormEl)
      		new Toast( 
      			'图片验证码错误'
			  );
			  $(".new-toast .content p").css("font-size","13px")
      	})

	}

	_updateImageCode(e) {
		var curEl = $(e.target);
		var formEl = curEl.parents('form');
		var phone = formEl.find('.J_Phone').val();
		if (phone) {
			this._createImageCode(phone, formEl);
		}	
	}

	_createImageCode(tel, formEl) {
		var imgCodeEl = formEl.find('#J_ImgCode');

		this.ajax({
			url: '/v1/imagevcode/' + tel,
            type: 'get'
		}).then((data) => {
			imgCodeEl.prop('src', data.data);
		})
	}

	_createCodeCount(curEl) {
		curEl.prop('disabled', true);
		this.createCodeCountControl = setTimeout(() => {
			var time = parseFloat(curEl.val());

			if ( time == 0 ) {
				clearTimeout(this.createCodeCountControl);
				curEl.removeProp('disabled');
				curEl.val('重新获取');
				return;
			}

			curEl.val(--time);
			this._createCodeCount(curEl);
		}, 1000)
	}

	_verifyControls(params) {
		var verifyResult = true;
		Object.keys(params).forEach((key) => {
			var _verifyFn  = '_verify_' + key;
            var parentEl= $("[data-focus="+key+"]").parent();
			if ( !this[_verifyFn](params[key],parentEl) ) {
				verifyResult = false;
			}

		});
		return verifyResult;
	}

	_verifyFocus(e) {
		var curEl = $(e.target);
		var parentEl = curEl.parent();
		var val = curEl.val();
		var fn = '_verify_' + curEl.attr('data-focus');
		this[fn](val, parentEl);
	}

	// 图形验证
	_verifyImageCode(e) {
		var curEl = $(e.target);
		var formEl = curEl.parents('form');
		var val = curEl.val();
		if ( !val ) {
			this._showError(curEl.parent(), '不能为空');
			return false;
		}

		this._hideError(curEl.parent());
		formEl.find('.J_GetCode').removeProp('disabled');
		return true;
	}

	/**
	 * 验证手机号
	 */

	_verify_phone(tel, parentEl) {
	    if (!tel) {
	    	parentEl && this._showError(parentEl, '不能为空');
	      	return false;
	    }

	    // 验证手机号，默认是11位
	    if (!/^1[3|4|5|7|8][0-9]\d{8}$/.test(tel)) {
	       parentEl && this._showError(parentEl, '手机号错误');
	       return false;
	    }

	    if ( parentEl ) {
	    	var formEl = parentEl.parents("form");
	    	this._hideError(parentEl);
	    	this._createImageCode(tel, formEl);
	    	var password = formEl.find('.J_Passeord').val();
	    	password && formEl.find('.J_ImageCode').removeAttr('disabled');
	    }

	    return true;
	}

	/**
	 * 验证密码
	 */
	_verify_password(password, parentEl) {
		if (!password) {
			parentEl && this._showError(parentEl, '不能为空');
			return false;
		}

		if ( parentEl ) {
	    	this._hideError(parentEl);
	    	var phone = parentEl.parents("form").find('.J_Phone').val();
	    	phone && this._verify_phone(phone) && parentEl.parents("form").find('.J_ImageCode').removeAttr('disabled');
	    }

		return true;
	}

	/**
	 * 验证邮箱
	 */
	
	_verify_email(email, parentEl) {
		if (!email) {
			parentEl && this._showError(parentEl, '不能为空');
			return false;
		}

		parentEl && this._hideError(parentEl);

		return true;
	}

	_verify_refer(refer, parentEl) {
		
		if(getWLName()=="firstbroker"){
			return true;
		}
		if (!refer) {
			parentEl && this._showError(parentEl, '不能为空');
			return false;
		}

		parentEl && this._hideError(parentEl);
		return true;
	}

	/**
	 * 验证手机短信验证码
	 */

	_verify_vcode(code, parentEl) {
		if (!code) {
			parentEl && this._showError(parentEl, '不能为空');
			return false;
		}

		parentEl && this._hideError(parentEl);
		return true;
	}

	_showError(parent, message) {
	    var errorEl = $('.J_Message', parent);

	    if (errorEl.length === 0) {
	      errorEl = '<label for="firstName " class="fxc-error-msg message J_Message">' + message + '</label>';
	      parent.append(errorEl);
	    } else {
	    	errorEl.text(message);
	    }

	    parent.addClass('error');
  	}

	_hideError(parent) {
	    parent.removeClass('error');
	}

	_setTitle(message) {
		var titleEl = $('title');
		titleEl.text(message);
	}

	_getParams(form, sourceForm) {
		var params = {
			phone: $('.J_Phone', form).val(),
			password: $('.J_Passeord', form).val(),
			vcode: $('.J_PhoneCode', form).val(),
		}

		switch(sourceForm) {
			case 'register': 
				params.email = $('.J_Email', form).val();
				if (getRegisterHasReferCode()) {
					params.refer = $('.J_Refer', form).val();
				}
				break;
			default: 
				break;
		}
		return params;
	}

	_getRequestUrl(sourceForm) {
		var urlParams = {
			'login': '/v1/user/login/real/',
			'first-login': '/v1/user/login/real/',
			'register': '/v1/user/create',
			'reset_password': '/v1/user/real/tradepassword/setnew/'
		}

		return urlParams[sourceForm];
	}

	_showResetPasswordTmpl(e) {
		var contentsWrapperEl = $('.contents-wrapper')
		this.render(resetWordTmpl, {}, this.sliderContentEl);
		contentsWrapperEl.addClass('move');
		this._setTitle('重置密码');
	}

	_showRegisterTmpl() {
		var contentsWrapperEl = $('.contents-wrapper')
		this.render(registerTmpl, {
			hasRefer: getRegisterHasReferCode()
		}, this.sliderContentEl);
		contentsWrapperEl.addClass('move');
		this._setTitle('注册');
	}

	_goFirstLoginTmpl() {
		var self = this;
		this.secondContentEl.animate({
			opacity:'0'
		}, 500, function() {
			self.secondContentEl.hide();
			self.contentEl.show();
			self._setTitle('登录');
		})
	}

	_backBeforeTmpl() {
		var contentsWrapperEl = $('.contents-wrapper')
		contentsWrapperEl.removeClass('move');
		this._setTitle('登录');
	}

	_render() {
		// this.render(registerTmpl, {}, this.secondContentEl);
		// this.render(resetWordTmpl, {}, this.sliderContentEl);
	}

	

}

new Login();


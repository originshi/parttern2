'use strict';
var Base = require('../../../../app/base');
var Uri = require('../../../../app/uri');

export default class PayPass extends Base {
	constructor(config) {
		super(config);

		this.login().then(() => {
			this._bind();
			this._initAttrs();
			this._getData();
			
        });
	}

	_bind() {
		this.el.on('change', this._selectPass);
		//设置新版 ui页面的点击事件
		$(".jg_payway ul").on("click","li",this._selectPassBouns);

	}

	_getData() {
		this.ajax({
			url: '/v1/user/pay/channel/list/',
			data: {
				access_token: this.cookie.get('token'),
				env: 'pc'
			}
		}).then((data) => {
			
			data = data.data;
			//通知修改 入金最小价格和入金最大价格
			this.broadcast("app:joinGoldMsg",data);
			
			//老版 使用select
			if(getPayWayNewUi()){
				this.render(this.tmpl_div, {
					data: data || [],
					defaultPass: this.defaultPass
				},$(".jg_payway ul"));
			}else{
				this.render(this.tmpl, {
					data: data || [],
					defaultPass: this.defaultPass
				}, this.el);
			}
			
			
			
		})
	}

	_selectPass(e) {
		var el = $(this),
			code = el.val();
		
		var curUrl = location.href;

		if (curUrl.indexOf('pay-items') === -1) {
			curUrl = './pay-items/' + code + '.html?code=' + code;
		} else {
			curUrl = './' + code + '.html?code=' + code;
		}

		location.href = curUrl;
		
	}

	_selectPassBouns(e){
		var code=$(e.currentTarget).attr("passCode");
		var curUrl = location.href;
        if(curUrl.indexOf(code)!=-1){
			return;
		}
		if (curUrl.indexOf('pay-items') === -1) {
			curUrl = './pay-items/' + code + '.html?code=' + code;
		} else {
			curUrl = './' + code + '.html?code=' + code;
		}

		location.href = curUrl;
	}

	_initAttrs() {
		this.defaultPass = new Uri().getParam('code');
	}

	defaults() {
		return {
			tmpl: [
				'<% data.data.forEach(function(item, index) { %>',
					'<option value="<%= item.code %>" <%= item.code == data.defaultPass ? "selected" : "" %>> 支付通道-<%= index + 1 %> </option>',
				'<% }) %>'
			].join(''),
            tmpl_div:[
				'<% data.data.forEach(function(item,index) { %>',
				        '<%  %>',
						'<li passCode="<%= item.code %>" class="<%= item.code==data.defaultPass ? "checked":""%>">',
							'支付方式<%= (index+1) %>'+'  '+'<%= item.name %>',
						'</li>',
					
                '<% }) %>'
            ].join('')
		}
	}
}

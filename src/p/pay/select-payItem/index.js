'use strict';
var Base = require('../../../app/base');
var Uri = require('../../../app/uri');
var Header = require('../../../common/header');
var tmpl = require('./index.ejs.html');

class SelectPayItem extends Base {
	constructor(config) {
		super(config);

		this.login().then(() => {
            new Header();

            this._getData();
        });
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

			if (data && data[0] && data[0].code) {
				var code = data[0].code;

				location.href = './pay-items/' + code + '.html?code=' + code;
			}

			this.render(tmpl, data, $('#J_List'));
		})
	}
}

new SelectPayItem();
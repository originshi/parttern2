/**
 * 当前交易
 */

"use strict";
require('./index.css');
var Core = require('../../../../../../app/core');
var Config = require('../../../../../../app/config');
var app = require('../../../../../../app');
var tmpl = require('./index.ejs.html');

class TradeCurrent extends Core{
	constructor(config) {

		super(config);

		this.orderList = [];
		this._initAttrs();
		this._init();
	}

	_init() {
		this._bind();
		this._getData();
	}

	_bind() {
		this.on('destroy', this.destroy);

		// 在这里判断是否有无刷新浮动盈亏
		if ( this.isMy ) {
			this._updateFollowOrderProfit();
		} else {
			this.subscribe('stomp:price:update', this._updateFollowOrderPrice, this);
		}
	}

	_getData() {
		var data = {
			access_token: this.cookie.get('token'),
			expert_id: this.id
		}
		this.ajax({
			url: this._getUrl(),
			data: data
		}).then((data) => {
			data = data.data;
			// 我的跟单与榜单下行的数据有所不同
			if( !$.isArray(data) ) {
				data = []
			}

			data = data.reverse(); // 倒排一下
			var symbols = [];
			for ( var i = 0; i < data.length; i++ ) {
				var symbol = data[i].symbol;
				if (symbols.indexOf(symbol) === -1) {
					symbols.push(symbol)
				}
			}

			this.orderList = data;
			this.render(tmpl, data, this.el);

			this._getAllPrices(symbols);
		})

		this._interval();
	}

	_updateFollowOrderPrice(price) {
		this._update(price);	
	}

	_updateFollowOrderProfit() {
		var account = this._getAccount();
		this._getFloatingProfitListAdapter(account).then((profrit) => {
			if (!profrit) {
				return;
			}

			var listEls = $('.J_FollowerOrder', this.el);
			for ( var i = 0, len = listEls.length; i < len; i++ ) {
				var curListEl = $(listEls[i]);
				var ticket = curListEl.attr('data-ticket');
				var profit = parseFloat(profrit[ticket]).toFixed(2);

				if (profit > 0) {
					$('.J_TradeCurrentProfit', curListEl).addClass('up');
				} else {
					$('.J_TradeCurrentProfit', curListEl).removeClass('up');
				}

				$('.J_TradeCurrentProfit', curListEl).text(profit);
			}
		})

		this.updateProfitController = setTimeout(() => {
			this._updateFollowOrderProfit();
		}, 1000);
	}

	_getFloatingProfitListAdapter(account) {
		var accountAdapter = {
			real: {
				currency: 'USD'
			},
			demo: {
				currency: 'USD'
			}
		}

		account = account || accountAdapter;

		var symbols = [],
			orderList = this.orderList;
		orderList.forEach((item) => {
			if (symbols.indexOf(item.symbol) === -1) {
		        symbols.push(item.symbol);
		    }
		});
		return this.getFloatingProfitList(account, orderList, symbols).then((obj) => {
			if ( orderList.length === 0 ) {
				return false;
			}
			var prices = obj.prices;
			if (prices && $.isArray(prices) && prices.length > 0) {
				for (var j = 0, len = prices.length; j < len; j++) {
					this._update(prices[j]);
				}
			}

			return obj.floatList;
		})

	}

	_getAllPrices(symbols) {
		this.getCurrentPrice(symbols, true).then((symbols) => {
			symbols.forEach((item) => {
				this._update(item);
			})
		})
	}

	_update(priceObj) {
		try{
			var symbol = priceObj.symbol.replace(/\./g, '-');
			var priceEls = $('.J_TardeCurrentPrice[data-symbol='+ symbol +']', this.el);
			$.each(priceEls, function (index, item) {
				var item = $(item),
					cur_price = priceObj.ask_price[0];

				if (item.attr('data-cmd').indexOf('buy') !== -1) {
					cur_price = priceObj.bid_price[0];
				} else {
					cur_price = priceObj.ask_price[0];
				}
				item.text(cur_price)
			})
		}catch(e){
		}
	}

	_interval() {
		clearTimeout(this.getController);
		this.getController = setTimeout(() => {
			this._getData();
			this._interval();
		}, 1000 * 30)
	}

	_getAccount() {
		if (this.__acconut) {
			return this.__acconut;
		} else {
    		this.__acconut = app.proxy('account', 'getValue');
    		return this.__acconut;
    	}
	}

	_getUrl() {
		var url = this.isMy ? '/v1/follow/follower/expert/'+ this.id +'/ticket/current/' : '/v1/follow/rank/expert/'+ this.id +'/ticket/current/';
		return url;
	}

	destroy() {
		this.orderList = null;
		this.__acconut = null;
		clearTimeout(this.getController);
		clearTimeout(this.updateProfitController);
		this.unsubscribe('stomp:price:update', this._updateFollowOrderPrice, this);
	}

	_initAttrs() {
	}
}

module.exports = TradeCurrent;
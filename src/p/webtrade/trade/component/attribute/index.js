'use strict';

require('./index.css');
var Core = require('../../../../../app/core');
var tmpl = require('./index.ejs.html');

export default class Attribute extends Core {
  constructor(config) {
    super(config);

    $('#J_Attribute').remove();

    this._getCommision(this.symbolValue);

    if (this.symbolValue.policy.category.slice(0, 7) === 'FUTURE_') {
      this.symbolValue.future = true;
    }

    this.symbolValue.isHasFixedMargin = this.symbolValue.policy.margin_is_fixed == '1' ? true : false;
    //设置把 币种缩写转为中文
    var currencyType ;
    //固定保证金则 fixed_margin_currency,非固定保证金 trading_currency
    if(this.symbolValue.isHasFixedMargin){
      currencyType= this.symbolValue.policy.fixed_margin_currency;
    }else{
      currencyType= this.symbolValue.policy.trading_currency;
    }
    currencyType=this.getCurrencyToCn(currencyType);//转为中文
    this.symbolValue.policy.currentType=currencyType;
    
    this.renderTo(tmpl, this.symbolValue, $('body'));
    this.el = $('#J_Attribute');

    this._bind();
    this._initAttrs();
    this.setPos(this.referEl);
  }

  //根据币种的 英文缩写 获取中文名
  getCurrencyToCn(type){
    type=type.toUpperCase();
    var obj={
      USD:"美元",
      CNH:"人民币",
      EUR:"欧元",
      HKD:"港元",
      GBP:"英镑"
    }
    if(obj[type]){
      return obj[type]
    }else{
      return "美元"
    }
}

  setPos(referEl) {
    var position = referEl.offset();
    var attributeHeight = this.el.height();
    var top = position.top + referEl.height() - 161;

    if ( top < this.headerHeight ) {
      top = this.headerHeight + 4;
    } else if((top + attributeHeight - this.contentHeight) > 0) {
      top = this.contentHeight - attributeHeight + this.headerHeight - 52;
    }

    this.el.css({
      left: position.left - this.el.width() - 7,
      top: top
    });

    this.show();
  }

  _bind() {
    this.el.on('click', '.close', (e) => {
      // this.hide();
      this.el.remove();
    });
  }

  hide() {
    this.el.hide();
  }

  show() {
    this.el.show();
  }

  destroy() {
    this.el.off('click');
    this.el.remove();
  }

  _getCommision(data) {
    /** 
     * event为on_ticket_open的话，代表同组内的desc是建仓的手续费
     * event为on_ticket_close的话，代表同组内的desc是平仓的手续费
     */
    data.ticketOpen = '0.00';
    data.ticketClose = '0.00'
    var commissions = data.policy.commissions;
    for (var i = 0, len = commissions.length; i < len; i++) {
      if (commissions[i].event === 'on_ticket_open') {
        data.ticketOpen = commissions[i].desc;
      } else if (commissions[i].event === 'on_ticket_close') {
        data.ticketClose = commissions[i].desc;
      }
    }
  }

  _initAttrs() {
    this.headerHeight = $('header').height();
    this.contentHeight = $('.content-inner').height();
  }
}
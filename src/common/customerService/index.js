'use strict';
require('./index.css');

var Base = require('../../app/base');

class CustomerService extends Base {
	constructor(config) {
		super(config);
		var el=$("<div id='comm100-button-241'></div>");
		var sc="var Comm100API=Comm100API||{};(function(t){function e(e){var a=document.createElement('script'),c=document.getElementsByTagName('script')[0];a.type='text/javascript',a.async=!0,a.src=e+t.site_id,c.parentNode.insertBefore(a,c)}t.chat_buttons=t.chat_buttons||[],t.chat_buttons.push({code_plan:241,div_id:'comm100-button-241'}),t.site_id=228223,t.main_code_plan=241,e('https://chatserver.comm100.com/livechat.ashx?siteId= '),setTimeout(function(){t.loaded||e('https://hostedmax.comm100.com/chatserver/livechat.ashx?siteId= ')},5e3)})(Comm100API||{})";
		
		
		$("body").append(el);
		var scri=document.createElement("script");
		scri=$(scri).attr("type","text/javascript");
        scri[0].innerHTML=sc;
		$("body").append(scri);
	}

	

	
}

module.exports = CustomerService;
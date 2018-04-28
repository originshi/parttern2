'use strict';

var PageBase = require('../../../../../app/core');
var Cookie = require('../../../../../lib/cookie');
var OpenAccount=require("../open-account");
var ExtractMoney=require("../extract-money");
export default class CheckOpenAccount extends PageBase{
    //需要传入给出金按钮的  el的选择器
    constructor(config) {
        super(config);
        //this._check();
        // 分两种情况
        // 1.进入trade页面就开始判断
        //   afterJoinGold  true/fasle
        this.check();
        // 2.点击出金时
        //   extractGold    true/false
        
        this.el.on("click",_.bind(this._clickExtractMoneyBtn,this))
    }

    check() {
       
             this._isNeedOpenAccount().then(()=>{
                  //需要开户
                  if(this.extractGold){
                    //点击出金按钮
                    new OpenAccount({
                      extractGold:true
                    });
                  }else{
                    //进入trade页面后,判断是否入金
                    this._isRechargeSuccess().then(()=>{
                      //入金则开户
                      new OpenAccount();
                    },()=>{})
                    
                  }
                    
                
             },()=>{
               //不需要开户
               
                if(this.extractGold){
                  
                  new ExtractMoney({el : $('.J_withdraw')})
                }
             }) 
        
    }

    _check() {
        // 先判断入金, 再判断开户
        this._isNeedOpenAccount().then(() => {
            this._isRechargeSuccess().then((data) => {
                location.href = './open-account.html?src=' + encodeURIComponent(location.href);
            }, () => {})
        }, () => {});
    }

    _isRechargeSuccess() {
        return new Promise((resolve, reject) => {
            var deposits = Cookie.get('deposits');

            // 只要入过金，并且没有开过户，就应该去开户
            if (!isNaN(deposits) && deposits > 0) {
                resolve();
                return;
            }

            this.getAccount().then((data) => {
                var deposits = data.deposits;
                if (deposits > 0) {
                    resolve();
                } else {
                    reject();
                }
            })
        })
    }

    _isNeedOpenAccount() {
        return new Promise((resolve, reject) => {

            //判断当前用户是否开户
            var isOpendAccount;
            var openAccountMessage = localStorage.getItem("openAccountMessage");
            if(openAccountMessage){
                openAccountMessage = JSON.parse(openAccountMessage);
                if(openAccountMessage[Cookie.get("phone")]){
                    isOpendAccount = 1;
                }else{
                    isOpendAccount = 0;
                }
            }else{
                isOpendAccount=0;
            }

            if (isOpendAccount == 1) {
                reject();
                return;
            }

            this._getUserInfo().then((data) => {
                //this.broadcast('get:user:open-account', data);
                
                if (data.data.have_info == 1) {
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

                    reject()
                } else {
                    resolve();
                }
            }, () => {
                resolve();
            });
        })
    }

    _getUserInfo() {
        return this.ajax({
            url: '/v1/deposit/user/info/',
            data: {
                access_token: Cookie.get('token')
            },
            noToast: true
        });
    }

    //出金按钮点击事件
    _clickExtractMoneyBtn(){
      this.extractGold=true;
      this.check();
    }

}
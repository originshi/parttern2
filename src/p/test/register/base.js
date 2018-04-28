
"use strict";
export  class Base {
    AA = 1;
    constructor(config) {
        this.BB=2;
        Object.assign(this, config)
    }

    _clone(origon) {

        return JSON.parse(JSON.stringify(origon));

    }

    _protypeClone(origon) {

        var origon =this._clone(origon);

        var protype = Reflect.getPrototypeOf(origon);

        return Object.assign(protype, origon)

    }

}
export function log(arg1,arg2){
    if(!arg2){
        console.log(arg1)
    }else{
        console.log(arg1,arg2)
    }
    
}

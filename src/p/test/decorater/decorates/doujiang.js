import Decorate from "../base/a_decorate"
export default class DouJiang extends Decorate{
      constructor(cofee){
        super(cofee);
        this.burdeningCost=.15;
      }
      
      getDscription(){
          return "DouJiang"
      }
      
}
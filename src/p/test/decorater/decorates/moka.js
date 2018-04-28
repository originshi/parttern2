import Decorate from "../base/a_decorate"
export default class Moka extends Decorate{
      constructor(cofee){
         super(cofee);
         this.burdeningCost=.20;
      }
      
      getDscription(){
          return "Moka"
      }
      
}
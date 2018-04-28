import Decorate from "../base/a_decorate"
export default class Milk extends Decorate{
      constructor(cofee){
        super(cofee);
        this.burdeningCost=.10;
      }
      
      getDscription(){
          return "NongSuo"
      }
      
}
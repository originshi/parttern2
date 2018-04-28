
export default class Client{
   constructor(el,command,control){
     // el   command    control
     this.el=el;
     this.command=command;
     this.control=control;
    this.bind();
   }
   bind(){
      this.el.click(()=>{
          if(!this.command){
            this.control.undo();
            return;
          }
          this.control.setCommand(this.command);
      })
      
    }
}
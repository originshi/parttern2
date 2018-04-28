export default class Control{
    commands=[];
    constructor(){
       
    }
    setCommand(command){
        this.commands.push(command);
        this.length=this.commands.length;
        this.command=command;
        this.command.excute();
    }
    undo(){
        let command=this.commands.pop();
        if(command){
            command.undo();
        }
        
    }
}
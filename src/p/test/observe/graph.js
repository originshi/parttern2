


class Graph{
    vertexts=new Set();
    edgesMap=new Map();
    paths=[];
    constructor(v){
        
    }
    addVertex(v){
        this.vertexts.add(v);
        return this;
    }
    addEdge(start,end,power){
        let edgesMap=this.edgesMap;
        let edges=edgesMap.get(start);
        if(edges){
            edges.add({edge:end,power:power});
        }else{
            let edges=new Set();
            edges.add({edge:end,power:power});
            edgesMap.set(start,edges);
        }
        return this;
    }
    getPaths(start,end,type ='name'){
        this.paths=[];
        let obj={arr:[start[type]]};
        this.getPath(start,end,type,obj);
        return this.paths;
    }
    getPath(start,end,type,obj){
        let edgesMap=this.edgesMap;
        let edges=edgesMap.get(start);
        if(edges){
            let edge;
            for( {edge} of edges){
                obj.arr.push(edge[type]);
                if(edge!=end){
                    this.getPath(edge,end,type,obj);
                }else{                  
                    this.paths.push([...obj.arr]);
                    obj.arr.pop();//把自己删除
                    obj.arr.pop();//把上级删除
                    break;
                }
                
            }
            //如果循环完下级,发现最后一个下级不是end对象
            if(edge!=end){
                obj.arr.pop();
            }
        }else{
            //可以访问到的最后一个顶点不是end对象 
            obj.arr.pop();
        }

    }
}
class Vertex{
    name='';
    constructor(name,length){
        this.name=name;
        this.length=length;
    }
}
export default class Test{
    constructor(){
        let g=new Graph();
        let A=new Vertex('A',1),
            B=new Vertex('B',2),
            C=new Vertex('C',3),
            D=new Vertex('D',4),
            E=new Vertex('E',1),
            F=new Vertex('F',4),
            G=new Vertex('G',2),
            H=new Vertex('H',1),
            I=new Vertex('I',1);
        g.addVertex(A).addVertex(B).addVertex(C).addVertex(E)
        .addVertex(D);
        g.addEdge(A,B,1).addEdge(B,C,1).addEdge(D,E,1)
        .addEdge(E,F,1).addEdge(G,H,1).addEdge(H,I,1)
        .addEdge(A,D,1).addEdge(D,G,1).addEdge(B,E,1)
        .addEdge(E,H,1).addEdge(C,F,1).addEdge(F,I,1).addEdge(A,E,1);
        console.log(g.getPaths(A,E));
        

    }
}
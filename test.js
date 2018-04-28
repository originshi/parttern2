var fs = require('fs');
var path = require('path');
var glob = require('glob');
const HtmlwebpackPlugin = require('html-webpack-plugin');
function entries (globPath) {
    var files = glob.sync(globPath);
    files=files.filter(function(n){
        return n.indexOf("index") != -1;
    })
    var entries = {}, entry, dirname, basename;
    
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        
        dirname = path.dirname(entry).replace("./src/p/","");
        
        basename = path.basename(entry, '.js');
        
        entries[dirname+"/"+ basename] =  entry;
    }
    
    return entries;
}
function PageEntries (globPath,isjoin) {
    var files = glob.sync(globPath);
    files=files.filter(function(n){
        return n.indexOf("index") != -1;
    })
    var entries = [], entry, dirname, basename;
    
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry).replace("./s/","");
        basename = path.basename(entry, '.html');
        filename=entry.substring(0,entry.lastIndexOf("/")+1)+basename+".html";
        var obj={
          isjoin:isjoin,
          title:'rd平台',
          url:"../build/"+dirname+"/index.js",
          template: entry, // 源模板文件
          filename: filename, // 输出文件【注意：这里的根路径是module.exports.output.path】
          showErrors: true,
          inject: 'body',
          chunks: dirname+"/"+basename //js在入口里面的key值
        };
        
        
        
        
        entries.push(obj)
    }

    return entries;
}

module.exports={entries,PageEntries};
console.log(entries ("./src/p/test/**/*.js"))
console.log(PageEntries ("./s/test/**/*.html",false))

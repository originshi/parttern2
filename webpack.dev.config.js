var webpack = require('webpack');
//var underscore = require('underscore');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
require("babel-polyfill");

var fs = require('fs');
var path = require('path');
var glob = require('glob');
var root="HTML5";
let demo_worker="demo_worker";
module.exports = {
    entry: entries (`./src/p/test/${root}/*.js`),
    // {
    //     index:"./src/my/index"
    // },
    output: {
        path: __dirname + '/build/',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /(\.js)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
            presets: ['es2015', 'stage-0'],
            "plugins": [
              "add-module-exports",
              "transform-decorators-legacy",
              "transform-class-properties",
            ]
          }
        }, 
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.ejs\.html$/,
            loader: "ejs-loader"
        }, {
            test: /.*\.(gif|png|jpe?g|svg)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
            ]
        }]
    },
    devtool: 'source-map',
    devServer: {
        disableHostCheck: true,
        port:7777
    },
    plugins: plugins(PageEntries (`./s/test/${root}/*.html`,false))
    //[
        
        // new HtmlwebpackPlugin({
        //     title:'rd平台',
        //     aaa:"11111111111",
        //   template: 's/my/index.html', // 源模板文件
        //   filename: './index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
        //   showErrors: true,
        //   inject: 'body',
        //   chunks: ["common",'index']
        // }),//在build目录下自动生成index.html，指定其title
        // new webpack.HotModuleReplacementPlugin(),
        // new OpenBrowserPlugin({ url: 'http://localhost:7777'
        // 实现刷新浏览器必写
        
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    //]
};

function plugins(arr){
    var array=[];
    for(var i=0;i<=arr.length;i++){
        array.push(new HtmlwebpackPlugin(arr[i]))
    }
    array.push(new webpack.HotModuleReplacementPlugin())
    array.push( new OpenBrowserPlugin({ url: `http://localhost:7777/${root}.html` }) )
    
    return array;
}


function entries (globPath) {
    var files = glob.sync(globPath);
    // files=files.filter(function(n){
    //     return n.indexOf("index") != -1;
    // })
    var entries = {}, entry, dirname, basename;
    
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        
        dirname = path.dirname(entry).replace("./src/p/","");
        
        basename = path.basename(entry, '.js');
        
        entries[dirname+"/"+ basename] =  entry;
    }
    console.log(entries)
    return entries;
}
function PageEntries (globPath,isjoin) {
    var files = glob.sync(globPath);
    let imp=0;
    files=files.filter(function(n){
        if(n.indexOf("imp") != -1){
            imp=1;
            return true;
        }
        return n.indexOf("index") != -1;
    })
    var entries = [], entry, dirname, basename;
    
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry).replace("./s/","");
        basename = path.basename(entry, '.html');
        filename=dirname.substring(dirname.lastIndexOf("/")+1);
        
        var obj={
          isjoin:isjoin,
          title:'rd平台',
          url:"../build/"+dirname+"/index.js",
          template: entry, // 源模板文件
          filename: "./"+filename+".html", // 输出文件【注意：这里的根路径是module.exports.output.path】
          showErrors: true,
          inject: 'body',
          chunks: imp? "all" :[dirname+"/"+basename] //js在入口里面的key值
        };
        
        
        
        
        entries.push(obj)
    }
    console.log(entries)
    return entries;
}
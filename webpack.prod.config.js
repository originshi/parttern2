var webpack = require('webpack');
//var underscore = require('underscore');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
var fs = require('fs');
var path = require('path');
var glob = require('glob');
require("babel-polyfill");


module.exports = {
    entry: entries("./src/p/test/**/*.js"),
    // {
    //     index:"./src/my/index"
    // },
    output: {
        path: __dirname + '/build/',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
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
    plugins: plugins(PageEntries ("./s/test/**/*.html",true))
};

function plugins(arr){
    var array=[];
    for(var i=0;i<=arr.length;i++){
        array.push(new HtmlwebpackPlugin(arr[i]))
    }
    array.push(new webpack.HotModuleReplacementPlugin())
    array.push( new OpenBrowserPlugin({ url: 'http://localhost:7777' }) )
    console.log("plugins",array)
    return array;
}



function entries (globPath) {
    console.log(globPath)
    var files = glob.sync(globPath);
    files=files.filter(function(n){
        return n.indexOf("index") != -1 || n.indexOf("imp") != -1 ;
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
        filename=entry.substring(0,entry.lastIndexOf("/")+1)+dirname.substring(dirname.lastIndexOf("/")+1)+".html";
        console.log(filename)
        var obj={
          isjoin:isjoin,
          title:'rd平台',
          url:"../build/"+dirname+"/index.js",
          template: entry, // 源模板文件
          filename: "."+filename, // 输出文件【注意：这里的根路径是module.exports.output.path】
          showErrors: true,
          inject: 'body',
          chunks: [dirname+"/"+basename],//js在入口里面的key值
        };
        
        
        
        
        entries.push(obj)
    }

    return entries;
}
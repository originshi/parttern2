var webpack = require('webpack');
var fs = require('fs');
var path = require('path');
var glob = require('glob');
require("babel-polyfill");
const debug = process.env.NODE_ENV !== 'production';

function entries (globPath) {
    var files = glob.sync(globPath);
    var entries = {}, entry, dirname, basename;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        basename = path.basename(entry, '.js');
        entries[path.join(dirname, basename)] = './' + entry;
    }

    return entries;
}

module.exports = {
    entry: entries('./src/my/**/*.js'),
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/assets/',
        filename: '[name]' + (debug ? '' : '-[chunkhash]') + '.js',
        chunkFilename: '[id]' + (debug ? '' : '-[chunkhash]') + '.js'
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
    plugins: [
        function () {
            this.plugin('done', function (stats) {
                stats = stats.compilation.getStats().toJson({
                    hash: true,
                    publicPath: true,
                    assets: true,
                    chunks: false,
                    modules: false,
                    source: false,
                    errorDetails: false,
                    timings: false
                });

                var json = {}, chunk;
                
                for (var key in stats.assetsByChunkName) {
                    if (stats.assetsByChunkName.hasOwnProperty(key)) {
                        chunk = stats.assetsByChunkName[key];
                        json[key + '.js'] = chunk;
                    }
                }

                fs.writeFileSync(
                    path.join(__dirname,  'assets', 'rev-manifest.json'),
                    JSON.stringify(json, null, 2)
                );
            });
        }
    ]
};
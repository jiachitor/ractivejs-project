var path = require('path'),
    webpack = require('webpack');

var vue = require('vue-loader'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: [
            path.resolve(__dirname, "src", config_appName, "js", "app.js")
        ]
    },
    output: {
        path: path.resolve(__dirname, "src", config_appName, "assets"),
        filename: 'app.bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("app.bundle.css")
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules'],
        alias: {
            "_api": path.join(__dirname, "src/" + config_appName + "/js/api"),
            "_common": path.join(__dirname, "src/" + config_appName + "/js/common"),
            "_components": path.join(__dirname, "src/" + config_appName + "/js/components"),
            "_store": path.join(__dirname, "src/" + config_appName + "/js/store"),
            "_templates": path.join(__dirname, "src/" + config_appName + "/js/templates"),
            "_uiModules": path.join(__dirname, "src/" + config_appName + "/js/uiModules"),
            '_sass': path.join(__dirname, "src/" + config_appName + "/sass"),
        },
        root: [
            path.join(__dirname, "")
        ]
    },
    module: {
        loaders: [{
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }, {
            test: /\.html$/,
            loader: 'ractive'
        }, {
            test: /\.js$/,
            exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
            loader: 'babel',
            query: {
                presets: ['es2015'],
                plugins: ['transform-runtime']
            }
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
        }, {
            test: /\.css$/,
            loaders: ["style", "css", "sass"]
        }, {
            test: /\.scss$|\.sass$/,
            loader: ExtractTextPlugin.extract("style", "css!sass")
        }]
    }
};

var path = require('path'),
    webpack = require('webpack');

var vue = require('vue-loader'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var node_modules_dir = path.join(__dirname, 'node_modules');

var deps = [
  'ractive/react.min.js'
];

module.exports = {
    entry: {
        app: [
            path.resolve(__dirname, "src", config_appName, "js", "app.js")
        ],
        /*mobile: path.resolve(__dirname, "src", config_appName, "js", "components", "home", "mobile.js"),*/
    },
    output: {
        path: path.resolve(__dirname, "src", config_appName, "assets"),
        filename: '[name].js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("app.css")
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules'],
        alias: {
            "_actions": path.join(__dirname, "src/" + config_appName + "/js/actions"),
            "_common": path.join(__dirname, "src/" + config_appName + "/js/common"),
            "_components": path.join(__dirname, "src/" + config_appName + "/js/components"),
            "_data": path.join(__dirname, "src/" + config_appName + "/js/data"),
            "_stores": path.join(__dirname, "src/" + config_appName + "/js/stores"),
            "_templates": path.join(__dirname, "src/" + config_appName + "/js/templates"),
            "_uiModules": path.join(__dirname, "src/" + config_appName + "/js/ui-modules"),
            "_utils": path.join(__dirname, "src/" + config_appName + "/js/utils"),
            '_sass': path.join(__dirname, "src/" + config_appName + "/sass"),
        },
        root: [
            path.join(__dirname, "")
        ]
    },
    module: {
        // 使用暴露全局加载器来暴露压缩版的 Ractive Js。
        loaders: [{
            test: path.resolve(node_modules_dir, deps[0]),
            loader: "expose?Ractive"
        }, {
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

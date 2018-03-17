let webpack = require('webpack');
let path  = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin = require('html-webpack-plugin');

let DIST_DIR = path.resolve(__dirname, 'dist');
let SRC_DIR = path.resolve(__dirname, 'src');

let config = (env) => {
    let isProd = env ? env.prod === 'true' : false;

    let extractSass = new ExtractTextPlugin({
        filename: "css/style.css",
        disable: !isProd
    });

    let plugins = [
        extractSass,
        new HtmlWebpackPlugin({
            template: SRC_DIR + '/index.html',
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: 'admin/index.html',
            template: SRC_DIR + '/admin/index.html',
            inject: false
        })
    ];

    if(isProd) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            minimize: true
        }));
    }

    return {
        entry: {
            app: SRC_DIR + '/app/index.js',
            admin: SRC_DIR + '/app/admin/index.js'
        },
        output: {
            path: DIST_DIR,
            filename: '[name].js',
            publicPath: ''
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    include: SRC_DIR,
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'es2015']
                    }
                },
                {
                    test: /\.scss$/,
                    use: extractSass.extract({
                        use: [{
                            loader: "css-loader"
                        }, {
                            loader: "sass-loader"
                        }],
                        // use style-loader in development
                        fallback: "style-loader"
                    })
                },
                {
                    test: /\.css$/,
                    use: [ 'style-loader', 'css-loader' ]
                }
            ]
        },
        plugins: plugins,
        devServer: {
            historyApiFallback: true,
            disableHostCheck: true,
            host: '0.0.0.0'
        }
    }
};

module.exports = config;
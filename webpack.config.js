let webpack = require('webpack');
let path  = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin = require('html-webpack-plugin');

let DIST_DIR = path.resolve(__dirname, 'dist');
let SRC_DIR = path.resolve(__dirname, 'src');

let config = (env) => {
    let isProd = env ? env.prod === 'true' : false;

    console.log('isProd: ', isProd);
    let extractSass = new ExtractTextPlugin({
        filename: "css/style.css",
        disable: !isProd
    });

    let plugins = [
        extractSass,
        new HtmlWebpackPlugin({
            template: SRC_DIR + '/index.html'
        })
    ];

    if(isProd) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            minimize: true
        }));
    }

    return {
        entry: SRC_DIR + '/app/index.js',
        output: {
            path: DIST_DIR,
            filename: 'bundle.js',
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
                }
            ]
        },
        plugins: plugins,
        devServer: {
            // contentBase: DIST_DIR,
            historyApiFallback: true
        }
    }
};

module.exports = config;
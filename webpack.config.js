let webpack = require('webpack');
let path  = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let autoprefixer = require('autoprefixer');

let DIST_DIR = path.resolve(__dirname, 'dist');
let SRC_DIR = path.resolve(__dirname, 'src');

let config = (env, argv) => {
    let isProd = argv.mode === 'production';

    let plugins = [
        new webpack.DefinePlugin({
            IS_PROD: JSON.stringify(isProd)
        }),
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
            rules: [
                {
                    test: /\.js$/,
                    include: SRC_DIR,
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'es2015']
                    }
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                minimize: isProd
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [autoprefixer('last 2 versions', 'ie 10')]
                                }
                            }
                        },
                        "sass-loader"
                    ]
                },
                {
                    test: /\.css$/,
                    use: [ 'style-loader', 'css-loader' ]
                },
                {
                    test: /\.svg$/,
                    use: [
                        "babel-loader",
                        {
                            loader: "react-svg-loader",
                            options: {
                                svgo: {
                                    plugins: [
                                        { removeTitle: false }
                                    ],
                                    floatPrecision: 2
                                }
                            }
                        }
                    ]
                }
            ]
        },
        plugins: plugins,
        devServer: {
            // historyApiFallback: true,
            historyApiFallback: {
                rewrites: [
                    { from: /^\/$/, to: '/' },
                    { from: /^\/admin\//, to: '/admin' }
                ]
            },
            disableHostCheck: true,
            host: '0.0.0.0'
        }
    }
};

module.exports = config;
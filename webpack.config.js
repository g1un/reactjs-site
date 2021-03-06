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
        // new HtmlWebpackPlugin({
        //     filename: 'admin/index.html',
        //     template: SRC_DIR + '/admin/index.html',
        //     inject: false
        // })
    ];

    return {
        entry: {
            app: SRC_DIR + '/app/index.js',
            // admin: SRC_DIR + '/app/admin/index.js'
        },
        output: {
            path: DIST_DIR,
            filename: '[name].js',
            publicPath: ''
        },
		resolve: {
			modules: [
				'node_modules',
				'.',
				'src',
			]
		},
        module: {
            rules: [
				{
					test: /\.js$/,
					include: SRC_DIR,
					loader: 'babel-loader',
					query: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
						plugins: ['@babel/plugin-proposal-class-properties']
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
                        {
							loader: 'babel-loader',
							query: {
								presets: ['@babel/preset-env', '@babel/preset-react'],
								plugins: ['@babel/plugin-proposal-class-properties']
							}
                        },
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
                    // { from: /^\/admin\//, to: '/admin' }
                ]
            },
            disableHostCheck: true,
            host: '0.0.0.0'
        }
    }
};

module.exports = config;
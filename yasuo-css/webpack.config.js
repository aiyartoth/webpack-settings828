let webpack = require('webpack');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
// var extractCSS = new ExtractTextPlugin('[name].bundle.css')

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        main: __dirname + '/app/main.js',
        vendor: ['jquery', 'moment']
    },
    output: {
        path: __dirname + '/public',
        filename: '[name].[id].js',
        publicPath: '/public/'
    },
    module: {
        rules: [{
            test: /\.js$/, //解析文件类型
            exclude: /node_modules/, //排除mode_modules文件
            loader: 'babel-loader', //使用哪种loader解析
            query: {
                presets: ['es2015', 'stage-0'] //loader的配置项，解析es6
            }
        },
            {
                test: /\.(less|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader', options: {importLoaders: 1, minimize: true}},
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(
            ['public/main.*.js', 'public/manifest.*.js', 'public/*.*.css'], {
                root: __dirname,
                verbose: true,
                dry: false
            }
        ),

        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new ExtractTextPlugin("[name].bundle.css"),
        new UglifyJsPlugin({
            beautify: true,
            exclude: ['/node_modules/'],
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new HtmlWebpackPlugin({
            title: 'webpack-demo',
            template: 'index.html'
        })
    ],
    devServer: {
        inline: true,
        hot: true,
        port: 8181
    }
};
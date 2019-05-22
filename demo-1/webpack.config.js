let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
let webpack = require('webpack')

module.exports = {
    optimization: { // 优化项
        minimizer: [
            new UglifyjsWebpackPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsWebpackPlugin()
        ]
    },
    devServer: {
        port: 3000,
        progress: true,
        contentBase: './build'
    },
    mode: 'development', // development, production
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
        // publicPath: 'https://abc/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            // minify: {
            //     removeAttributeQuotes: true,
            //     collapseWhitespace: true
            // },
            // hash: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        })
        // new webpack.ProvidePlugin({ // 在每个模块中都注入$
        //     $: 'jquery'
        // })
    ],
    externals: {
        jquery: '$'    // 外部引入的 并不需要打包 防止在模板中script引入了cdn 又在js中import
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.(jpg|png|gif)$/,
                // use: 'file-loader'
                use: {
                    loader: 'url-loader',
                    options: {
                        // limit: 200*1024 // 小于200k的图片用datauri 大于的用file-loader
                        limit: 1,
                        outputPath: 'img/',
                        publicPath: 'https://abc/'
                    }
                }
            },
            // {
            //     test: require.resolve('jquery'),
            //     use: 'expose-loader?$'
            // },
            // {
            //   test: /\.js$/,
            //   use: {
            //       loader: 'eslint-loader',
            //       options: {
            //           enforce: 'pre' // pre在普通loader之前 post在普通loader之后
            //       }
            //   }
            // },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                },
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // {
                    //     loader: 'style-loader',
                    //     options: {
                    //         insertAt: 'top'
                    //     }
                    // },
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    }
}

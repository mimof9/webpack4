let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

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
    mode: 'production', // development, production
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.resolve(__dirname, 'build')
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
            filename: 'main.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insertAt: 'top'
                        }
                    },
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

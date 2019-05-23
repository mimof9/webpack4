let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let CopyWebpackPlugin = require('copy-webpack-plugin')
let webpack = require('webpack')

module.exports = {
    devServer: {
        // 前端模拟数据
        // before(app) {
        //     app.get('/user', (req, res) => {
        //         res.json({name: '简单的node服务端'})
        //     })
        // }
      proxy: {
          // '/api': 'http://localhost:3000' // 配置了一个代理 访问api开头 转发到3000
          '/api': {
              target: 'http://localhost:3000',
              pathRewrite: {'/api': ''}     // 重写路径
          }
      }
    },
    // 多入口
    mode: 'production',
    entry: {
        index: './src/index.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            DEV: JSON.stringify('production'),
            FLAG: 'true'
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['./dist']
        }),
        // new CopyWebpackPlugin([
        //     { from: './doc', to: './doc'}
        // ]),
        // new webpack.BannerPlugin('mimof9版权所有')
    ],
    resolve: { // 导入第三方模块 默认先从当前目录下寻找 然后一层层往上找
        modules: [path.resolve('node_modules')], // 配置旨在当前目录找
        extensions: ['.js', '.css', '.json'],    // 从左到右依次补全后缀
        mainFields: ['style', 'main']
        // alias: {    // 别名
        //     bootstrap: 'bootstrap/dist/css/bootstrap.css'
        // }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    watch: false,
    watchOptions: {
        poll: 1000, // 每秒问1000次
        aggregateTimeout: 500, // 防抖 连续输入后500毫秒再打包
        ignored: /node_modules/
    }
    // 增加映射 帮助调试源代码
    // devtool: 'source-map'
    // devtool: 'eval-source-map'
    // devtool: 'cheap-module-source-map'
    // devtool: 'cheap-module-eval-source-map'
}

let express = require('express')

let app = express()

// 在nodejs中启动webpack

let webpack = require('webpack')

let middle = require('webpack-dev-middleware')

let config = require('./webpack.config')

let compiler = webpack(config)

app.use(middle(compiler))

// 结束

app.get('/user', (req, res) => {
    res.json({name: '简单的node服务端'})
})

app.listen(3000)

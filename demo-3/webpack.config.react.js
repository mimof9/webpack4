let path = require('path')
let webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: {
        react: ['react', 'react-dom']
    },
    output: {
        filename: '_dir_[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]',
        libraryTarget: 'var' // commonjs umd var this
    },
    plugins: [
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.resolve(__dirname, 'dist', 'manifest.json')
        })
    ]
}

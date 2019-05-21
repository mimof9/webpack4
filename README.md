# 准备
- 先全局安装yarn：npm install yarn -g
- 初始化项目，创建package.json: yarn init -y

# 安装webpack webpack-cli 配置文件默认为webpack.config.js
- yarn add webpack webpack-cli -D
- 通过 --config 选项 修改默认配置文件

## webpack是打包工具 打包结果为node模块 

### 为了运行node模块 
- 可以使用node环境直接运行
- 或者使用html页面导入(webpack实现了__webpack_require__让浏览器能require)
- 更简单得做法是使用webpack-dev-server模块

# 安装webpack-dev-server 配置字段为devServer 可以指定端口，和运行时的入口初始目录
- yarn add webpack-dev-server -D

## 基于express 打包到内存而不是硬盘运行

### 这些命令 都可以在package.json中配置"scripts"
### 一般常用配置的两个是 "dev" "build" 对应开发和生产环境打包

# 使用devServer 可以配置入口，但是入口并不会平白无故生成，需要再配置模板，在打包文件中生成html
- 安装html-webpack-plugin插件 yarn add html-webpack-plugin -D
- 在plugins 中配置模板文件位置和输出文件名

# 处理css
- yarn add css-loader -D 解析@import
- yarn add style-loader -D 把css用style标签插入到模板head的后面
- yarn add less less-loader -D 预处理器(也可以用sass的)

## css添加浏览器前缀
- yarn add postcss-loader -D 添加loader
- 要在css之前做处理，也就是放在less-loader 左边 css-loader右边
- 依赖autoprefixer 所有要安装 yarn add autoprefixer -D

# 提取css
- 安装mini-css-extract-plugin插件 yarn add mini-css-extract-plugin -D
- 配置提取文件名
- 在css rules的loader全部解析完成后做提取，MiniCssExtractPlugin.loader

## 压缩提取出来的css 压缩就是把代码多余的格式去掉，变成一行，变量名修改简洁
- 安装optimize-css-assets-webpack-plugin： yarn add optimize-css-assets-webpack-plugin -D
- 在optimization对象中minimizer数组中配置 new OptimizeCssAssetsWebpackPlugin() 对css进行压缩

### 但是这样配置之后，js代码就不会压缩了，需要配置js代码的压缩
- 安装uglifyjs-webpack-plugin： yarn add uglifyjs-webpack-plugin -D
- 和上述相同，配置new UglifyjsWebpackPlugin()即可




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
- 需要注意 一个rule里的loader从右向左执行，rules里大方向的loader也是从后向前执行，可以使用enforce:pre改变顺序

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

# es6转换成es5
- 安装babel: yarn add babel-loader @babel/core @babel/preset-env -D
- babel-loader是loader @babel/core是解析js，调用转换 @babel/preset-env是具体做转换的
- ES7的类属性 yarn add @babel/plugin-proposal-class-properties -D 其中proposal说明这个插件还在提案中
- 还有其他的比如说装饰器 都需要安装相应插件 可以在babel官网查找如何配置 yarn add @babel/plugin-proposal-decorators -D

## js优化 抽离公共方法
- yarn add @babel/plugin-transform-runtime -D 开发阶段时使用
- 运行时需要依赖 yarn add @babel/runtime

### 需要注意 上述方法不能对实例的方法进行优化 需要安装@babel/polyfill
- yarn add @babel/polyfill 运行时依赖
- 然后在js中require('@babel/polyfill')

### js代码的校验 ESLint
- yarn add eslint eslint-loader -D
- 配置文件可以直接在官网的demo(演示中)选择下载

# 引入第三方模块(三种方式 expose-loader暴露到window providePlugin给每个模块注入 引入不打包)
- 安装jquery： yarn add jquery

## 浏览器上的jquery是绑定到window上了的为了实现一样的效果
- 导入import $ from 'jquery'
- 安装expose-loader：yarn add expose-loader

## 补充loader的分类： pre normal post 内联 四种loader
- 内联导入jquery,暴露$给全局变量: import $ from 'expose-loader?$!jquery'
- 当然也可以直接在webpack.config.js的loader中配置
- use: 'expose-loader?$'

## 这样使用的话 每次都还是需要去import 如果想直接使用$的话 就需要想每个模块中注入
- 使用webpack插件 ProvidePlugin 注入
- new webpack.ProvidePlugin({ $: 'jquery' })
- 不需要import 不需要loader

## 在模板中引入cdn的jquery 此时如果在js文件中又import了 就会打包 需要配置externals说明是外部引入的不打包
- externals: { jquery: '$' }
- 不需要loader 需要考虑import的多余打包



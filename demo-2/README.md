# 多页配置
- output的filename: [name].js 不能写死 用[name]指代entry里入口的键名
- 模板html可以只写一个

## 多页对应的html
- 针对每个页面需要的html都需要单独写一个new HtmlWebpackPlugin
- 默认情况下每个html页面会把所有的js都引入进模板
- 通过chunks 根据entry的键名可以选择只引入哪些js文件

# 调式 devtool: 
- 'source-map' 生成map文件 显示出错行列信息
- 'eval-souce-map' 不生成map文件 显示出错行列信息(在打包的时候，生成的bundle.js文件，模块都被eval包裹，并且后面跟着sourceUrl,指向的是原文件index.js，调试的时候，就是根据这个sourceUrl找到的index.js文件的)
- 简而言之：就是映射继承在打包后的模块中
- 'cheap-module-source-map' 生产环境使用 集成会增大体积
- cheap只生成行信息 不生成列 module代表会生成loader的source-map
- 所以 这样写代表 生成单独的source-map 只显示行信息
- ‘cheap-module-eval-source-map’ 开发环境使用 调试更加清晰

# webapck-dev-server默认是可以实时打包到内存的 也就是热更新
# 但是webpack打包的话 需要配置watch: true 并且watchOptions可以配置监控频率和防抖时间
- 配置好之后npx webpack不要关闭 就可以热打包到硬盘

# 强迫症的最爱 clean-webpack-plugin 插件
- 打包前会清空配置文件指定的目录

# 一些没有参与打包的文件 需要拷贝到打包目录中 copy-webpack-plugin 插件
- 通过{ from: './doc', to: './doc'} 把doc文件夹下内容拷贝到打包目录doc中

# 版权声明插件 是webpack内置插件
- webpack.BannerPlugin('版权声明')

# 服务端代理 只有webpack-dev-server 有作用 当build之后是静态页面 需要自己部署到服务器上 一般是nginx
- devServer: { proxy: { '/api': 'http://localhost:3000' } } 配置对内存中运行的前端的请求转发
## 假如说前端只是想模拟获取一些数据
- devServer: before(app) {} 钩子 自己在里面返回数据即可
## 在nodejs中启动webpack 相当于前后端不分离了 服务端和前端启动在一个端口上
- yarn add webpack-dev-middleware -D
- 然后在express代码中 启动它 代码比较固定

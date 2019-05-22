# 多页配置
- output的filename: [name].js 不能写死 用[name]指代entry里入口的键名
- 模板html可以只写一个

## 多页对应的html
- 针对每个页面需要的html都需要单独写一个new HtmlWebpackPlugin
- 默认情况下每个html页面会把所有的js都引入进模板
- 通过chunks 根据entry的键名可以选择只引入哪些js文件 

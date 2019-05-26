# 默认情况下 webpack对导入的模块 也会进去解析它的依赖项
- 如果明确知道某些模块是独立的，就不需要去解析它的依赖，耽误时间
- 在module中配置noParse进行忽略

# 关于时间的一个库 moment 直接在github上搜索 就这么个简单的东西4万星星了
- yarn add moment 安装 模块默认会去找package.json里的main 然后main去找了comment.js
- comment.js里面引入了locale文件夹下的所有语言包
- 因此打包会特别大，为了优化这种现象，打包的时候可以配置忽略不需要的
- 使用webpack内置插件忽略 new webpack.IgnorePlugin(/\.\/locale/, /moment/)
- 如果忽略的语言包里面想用中文的 自己手动import即可

# 以react react-dom 配置动态链接库
- yarn add react react-dom 打包过程比较慢 因为react react-dom都要重新打包
- 正常的思路应该是这样，react react-dom这种单独打包 因为他们根本不会修改
- 然后每次打包只打包自己的代码，具体做法如下
## 补充知识点， 要让打得包能够被引用 需要让打得包把自己暴露出去
- 在output中配置library和libraryTarget
## 动态链接库具体做法
- 1. 另写一个配置文件 用于打包react 叫webpack.config.react.js
- 2. 配置react打包把自己用_dll_[name].js(名字随便起)暴露出去
- 3. 使用webpack.DllPlugin内置插件输出清单文件manifext.json(随便起)提供暴露变量的映射表
- 4. 在模板中使用script标签引入_dll_[name].js 这时候它不知道怎么找 并且在js文件中import的react还是会继续打包
- 5. 需要在配置文件中配置 import react和reatc-dom的时候先去配置文件中找 找不到再打包
- new webpack.DllReferencePlugin({ mani~~~~fest: path.resolve(__dirname, 'dist', 'manifest.json') })

# 多线程打包 happypack插件
- 安装 yarn add happypack -D
- 基本用法：
- 替换loader happypack/loader?id=js 表明这个loader是给js打包的
- 在plugins中new 插件 把原来的babel那一套loader添加到插件的参数中 两者通过id关联
- 需要注意的是，当项目不大的时候 开启多线程消耗的资源会比带来的收益更大

# webpack自带的import打包优化 tree-shaking
- import 进去的模块 如果没用到 在开发模式下会打包 在生产环境下不打包
- 需要注意 require不会有tree-shaking优化
# scope hoisting 作用域提升
- Scope Hoisting 的实现原理其实很简单：分析出模块之间的依赖关系，尽可能的把打散的模块合并到一个函数中去，但前提是不能造成代码冗余。
  因此只有那些被引用了一次的模块才能被合并。
- 由于 Scope Hoisting 需要分析出模块之间的依赖关系，因此源码必须采用 ES6 模块化语句，不然它将无法生效

import small from './small.jpg' // 图片也是一个模块 需要引入 也需要loader
// import './index.css'

let image = new Image()
// image.src = './small.jpg'   // 就是一个普通的字符串
image.src = small
document.body.appendChild(image)

// import $ from 'jquery'

console.log($)
console.log(window.$)

// let str = require('./a.js')
//
// console.log(str)
//
require('./index.css')
require('./index.less')
//
// let fn = () => {
//     console.log('123')
// }
//
// fn()
//
// @log
// class A {
//     a = 1
// }
//
// let a = new A()
// console.log(a.a)
//
// function log(target) {
//     console.log(target, '23')
// }

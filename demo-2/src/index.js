// ajax四部曲
let xhr = new XMLHttpRequest()
// xhr.open('GET', '/api/user', true)
xhr.open('GET', '/user', true)
xhr.onload = function(){
    console.log(xhr.response)
}
xhr.send()

console.log('index')

class Log {
    constructor() {
        console.log('出错了')
    }
}

let log = new Log()


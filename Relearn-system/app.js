var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')
var router = require('./router')
var app = express()

//开放资源文件
app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules',express.static(path.join(__dirname,'./node_modules/')))

//引入模板引擎渲染页面
app.engine('html', require('express-art-template'))
app.set('views',path.join(__dirname,'./views/'))

//配置body——parser处理post请求
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//配置使用session express不支持Session和Cookie
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized:true
}))




//把路由挂载到 app 中
app.use(router)

app.listen(3000, function () {
    console.log('runing 3000 .....')
})
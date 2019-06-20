/**
 * Created by Administrator on 2019/5/9 0009.
 */
//用户信息数据模型
var mongoose = require('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost/relearn')

var Schema = mongoose.Schema

//设计学生信息文档
var userSchema = new Schema({
    //账号
    account: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        require: true,
        default: '123456'
    },
    level: {
        type: Number,
        required: true,
        default: 0
    }
})

 module.exports = mongoose.model('User',userSchema)
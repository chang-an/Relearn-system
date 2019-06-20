/**
 * Created by Administrator on 2019/5/20 0020.
 */
//新闻通知数据模型
var mongoose = require('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost/relearn')

var Schema = mongoose.Schema

//设计学生信息文档
var noticeSchema = new Schema({
    //标题
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Notice',noticeSchema)
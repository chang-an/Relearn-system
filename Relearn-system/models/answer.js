/**
 * Created by Administrator on 2019/6/9 0009.
 */
var mongoose = require('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost/relearn')

var Schema = mongoose.Schema
//设计文档结构
var answerSchema = new Schema({
    //问题编号
    qno: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Answer',answerSchema)
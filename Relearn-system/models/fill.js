/**
 * 填空题.
 */
var mongoose = require('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost/relearn')

var Schema = mongoose.Schema

//设计填空题文档
var fillSchema = new Schema({
    //试卷编号
    paper: {
        type: Number,
        required: true
    },
	//题目
    title: {
        type: String,
        require: true,
    },
	//答案
    right: {
        type: String,
        required: true
    },
    tno: Number
})

 module.exports = mongoose.model('Fill',fillSchema)
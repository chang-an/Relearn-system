/**
 * 多选题.
 */
var mongoose = require('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost/relearn')

var Schema = mongoose.Schema

//设计多选题文档
var checkSchema = new Schema({
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
	//选项
    ma: String,
	mb: String,
	mc: String,
	md: String,
	me: String,
	mf: String,
    right: {
        type: String,
        required: true
    },
    tno: Number
})

 module.exports = mongoose.model('Check',checkSchema)
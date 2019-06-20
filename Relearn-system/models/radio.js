/**
 * 单选题.
 */
var mongoose = require('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost/relearn')

var Schema = mongoose.Schema

//设计单选题文档
var radioSchema = new Schema({
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
    ra: String,
	rb: String,
	rc: String,
	rd: String,
    right: {
        type: String,
        required: true
    },
    tno: Number
})

 module.exports = mongoose.model('Radio',radioSchema)
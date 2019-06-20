/**
 * 判断题.
 */
var mongoose = require('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost/relearn')

var Schema = mongoose.Schema

//设计单选题文档
var judgeSchema = new Schema({
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
    rkey: {
        type: String,
        required: true
    },
    tno: Number
})

 module.exports = mongoose.model('Judge',judgeSchema)
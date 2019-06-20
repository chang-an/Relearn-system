/**
 * Created by Administrator on 2019/5/9 0009.
 */
//学生信息数据模型
var mongoose = require('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost/relearn')

var Schema = mongoose.Schema

//设计学生信息文档
var studentSchema = new Schema({
    //学号
    sno: {
        type: Number,
        required: true
    },
    pwd: {
        type: String,
        require: true,
        default: '123456'
    },
    name: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true,
        default: 0
    },
    sex: {
        type: Number,
        required: true,
        enum: [0, 1]
    },
    //学院
    college: {
        type: String,
        required: true
    },
    //专业
    major: String,
    //年级
    grade: Number,
    class: String,
    course: String,
    enroll: String,
		//是否缴费
	state: {
		type: String,
		required: true
	},
    tel: Number,
    exam: Number
})

 module.exports = mongoose.model('Student',studentSchema)
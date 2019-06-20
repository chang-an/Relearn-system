/**
 * Created by Administrator on 2019/5/9 0009.
 */
//教师信息数据模型
var mongoose = require('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost/relearn')

var Schema = mongoose.Schema

//设计教师信息文档
var teacherSchema = new Schema({
    //职工号
    tno: {
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
    //辅导课程
	course: {
		type: String,
		required: true
	},
    
    tel: Number
})

 module.exports = mongoose.model('Teacher',teacherSchema)
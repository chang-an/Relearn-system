/**
 * Created by Administrator on 2019/5/27 0027.
 */

var mongoose = require('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost/relearn')

var Schema = mongoose.Schema
//设计文档结构
var testSchema = new Schema({
    //试卷编号
    pno: {
        type: Number,
        required: true,
        default: 1001
    },
    //学号
    sno: {
        type: Number,
        required: true
    },
    //科目
    course: {
        type: String,
        required: true
    },
    //出题教师号
    tno:{
        type: Number,
        required: true,
    },
    //测试时间
    time:{
        type: Date,
        default: Date.now
    },
    //测试成绩
    tscore: Number
})

//导出模型构造函数
module.exports = mongoose.model('Test',testSchema)
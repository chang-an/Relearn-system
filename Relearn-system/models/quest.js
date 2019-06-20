/**
 * Created by Administrator on 2019/6/4 0004.
 */

var mongoose = require('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost/relearn')

var Schema = mongoose.Schema
//设计文档结构
var questSchema = new Schema({
    //问题编号
    qno: {
        type: Number,
        required: true,
    },
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
//添加数据
//var Quest = mongoose.model('Quest',questSchema)
// var qno = new Quest({
//     qno: 001,
//     title: '1+5=?',
//     name: '张璐',
//     time: '	2019-06-09 21:38:48',
//     content: '5'
// })
//
// //持久化存储数据
// qno.save(function (err, ret) {
//     if(err) {
//         console.log('保存失败')
//     } else {
//         console.log('保存成功')
//         console.log(ret)
//     }
// })

//导出模型构造函数
module.exports = mongoose.model('Quest',questSchema)
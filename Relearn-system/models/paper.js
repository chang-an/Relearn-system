
var mongoose = require('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost/relearn')

var Schema = mongoose.Schema
//设计文档结构
var paperSchema = new Schema({
	//试卷编号
    pno: {
        type: Number,
        required: true,
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
	//出题时间
	time:{
		type: Date,
		default: Date.now
	}
})
// var Paper = mongoose.model('Paper',paperSchema)
// //添加数据
//  var par = new Paper({
//      pno: 10090100,
//      course: '大学英语I',
//      tno: 10090101,
//  })
//
//  //持久化存储数据
//  par.save(function (err, ret) {
//      if(err) {
//          console.log('保存失败')
//      } else {
//          console.log('保存成功')
//          console.log(ret)
//      }
//  })

//导出模型构造函数
module.exports = mongoose.model('Paper',paperSchema)
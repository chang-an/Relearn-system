/**
 * Created by Administrator on 2019/5/12 0012.
 */
//课程信息数据模型
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/relearn',{ useNewUrlParser: true })
var Schema = mongoose.Schema

var courseSchema = new Schema({
    //课程编号
    cno: {
        type: Number,
        required: true
    },
    //课程名称
    cname: String,
    //费用
    ccost: Number,
    //上课人数
    cnum: Number,
    //上课地点
    cplace: String,
    //上课时间
    ctime: String,
    //是否开班
    cstate: String,
    //考试时间
    cexam: String

})
//将文档结构发布为模型
//  var Course = mongoose.model('Course',courseSchema)
//
// //添加数据
//  var cor = new Course({
//      cno: '120403',
//      cname: '大学英语I',
//      ccost: '100',
//      cnum: '60',
//      cplace: 'A106',
//      ctime: '6-12周 周六 8：00',
//      cstate: '开班',
//      cexam: '2019-06-12 15:10'
//  })
//
//  //持久化存储数据
//  cor.save(function (err, ret) {
//      if(err) {
//          console.log('保存失败')
//      } else {
//          console.log('保存成功')
//          console.log(ret)
//      }
//  })

module.exports = mongoose.model('Course',courseSchema)
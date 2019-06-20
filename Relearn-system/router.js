//路由处理
var express = require('express')
var User = require('./models/user')
var Student = require('./models/student')
var Teacher = require('./models/teacher')
var Course = require('./models/course')
var Paper = require('./models/paper')
var Radio = require('./models/radio')
var Check = require('./models/checkbox')
var Judge = require('./models/judge')
var Fill = require('./models/fill')
var Notice = require('./models/notice')
var Quest = require('./models/quest')
var Answer = require('./models/answer')
var router = express.Router()


//登录路由
router.get('/login', function (req, res) {
    res.render('login.html')
})
router.post('/login', function (req, res) {
    //获取表单数据 查询数据库用户名密码是否正确 发送响应数据
    var body = req.body
    console.log(body)
    User.findOne({
        account: body.account,
        password: body.password

    },function (err,user) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }

        if(!user) {
            return res.status(200).json({
                err_code: -1,
                message: '账号或者密码错误.'
            })
        }

        req.session.user = user

        if(user.level == 0){
            res.status(200).json({

                err_code: 0,
                message: '学生用户登录成功'
            })
        }
        if(user.level == 1){
            res.status(200).json({

                err_code: 1,
                message: '教师用户登录成功'
            })
        }
        if(user.level == 2){
            res.status(200).json({

                err_code: 2,
                message: '管理员登录成功'
            })
        }
    })

})
//退出登录路由
router.get('/logout', function (req, res) {
    req.session.user = null
    res.redirect('/login')
})

/* 
	********************
	*****学生***********
	********************
*/

//通知
router.get('/s_notice', function (req, res) {
    Notice.find(function (err, noi) {
        if(err) {
            return res.status(500).json({
                err_code: 500,
                message: '拉取失败'
            })
        }
        res.render('student/s_notice.html', {
            noi: noi,
            user:req.session.user
        })
    })
})
//报名
router.get('/s_enroll', function(req, res) {
    var user = req.session.user
    var sno = user.account
    Student.find({
        sno: sno
    }, function (err, stu) {
        if(err){
            return res.status(500).json({
                err_code: 500
            })
        }
        res.render('student/s_enroll.html', {
            stu: stu,
            user: req.session.user
        })
    })
})
router.post('/s_enroll', function (req, res) {
    var sno = req.body.sno
    Student.update({sno: sno},{enroll:'已报名'},function (err, ret) {
        if (err) {
            return res.status(500).json({
                err_code: 500
            })
        }
        res.status(200).json({
            err_code: 0
        })
    })
})
//考试信息
router.get('/s_exam', function (req, res) {
    var user = req.session.user
    var sno = user.account
    Student.find({
        sno: sno
    },function (err, stu) {
        if(err){
            console.log('Server error！')
        }
        var obj = null 
        for(var k in stu){
            obj = stu[k]
        }
        Course.find({
            cname: obj.course
        },function (err, cor) {
            if(err){console.log('Server error!')}
            res.render('student/s_exam.html', {
                stu: stu,
                cor: cor,
                user: req.session.user
            })
        })
    })
})
router.post('/s_exam', function (req, res) {
    var sno = req.body.sno
    Student.update({sno: sno},{enroll:'已报名'},function (err, ret) {
        if (err) {
            return res.status(500).json({
                err_code: 500
            })
        }
        res.status(200).json({
            err_code: 0
        })
    })
})
//个人信息
router.get('/s_info', function (req, res) {
    var user = req.session.user
    var sno = user.account
    Student.find({
        sno: sno
    },function (err, stu) {
        if(err){console.log('Server error')}
        res.render('student/s_info.html',{
            stu: stu,
            user: req.session.user
        })
    })
})
//成绩查询
router.get('/s_result', function (req, res) {
    var user = req.session.user
    var sno = user.account
    Student.find({
        sno: sno
    },function (err, stu) {
        if(err){
            console.log('Server error！')
        }
        var obj = null
        for(var k in stu){
            obj = stu[k]
        }
        Course.find({
            cname: obj.course
        },function (err, cor) {
            if(err){console.log('Server error!')}
            res.render('student/s_result.html', {
                stu: stu,
                cor: cor,
                user: req.session.user
            })
        })
    })
})
//课表查询
router.get('/s_tabll', function (req, res) {
    var user = req.session.user
    var sno = user.account
    Student.find({
        sno: sno
    },function (err, stu) {
        if(err){
            console.log('Server error！')
        }
        var obj = null
        for(var key in stu){
            obj = stu[key]
        }
        console.log(obj.course)
        Course.find({
            cname: obj.course
        },function (err, cor) {
            if(err){console.log('Server error!')}
			console.log(cor)
            res.render('student/s_tabll.html', {
                stu: obj,
                cor: cor,
                user: req.session.user
            })
        })
    })
})
//在线测试
router.get('/s_test', function (req, res) {
    Paper.find(function (err, par) {
        if(err){console.log('Server error!')}
        res.render('student/s_test.html', {
            par: par,
            user: req.session.user
        })
    })
})
router.get('/s_paper', function (req, res) {
    var pno = req.query.pno
    Radio.find({paper:pno},function (err, radi) {
        Check.find({paper:pno},function (err, ch) {
            Judge.find({paper:pno},function (err, jud) {
                Fill.find({paper:pno},function (err, fil) {
                    if(err){console.log('失败！')}
                    res.render('student/s_paper.html',{
                        radi: radi,
                        ch: ch,
                        jud: jud,
                        fil: fil,
                        user: req.session.user
                    })
                })
            })
        })

    })
})
//答疑
router.get('/s_quest', function (req, res) {
    var user = req.session.user
    var sno = user.account
    Student.find({sno: sno}, function (err, stu) {
        Quest.find().sort({qno:-1}).limit(1).exec(function (err, qu){
            if(err){console.log('失败')}
            res.render('student/s_quest.html',{
                stu: stu,
                qu: qu,
                user: req.session.user
            })
        })
    })
})
router.post('/s_quest', function (req, res) {
    var body = req.body
    var qu = new Quest({
        qno: body.qno,
        title: body.title,
        name: body.name,
        time: body.time,
        content: body.content
    })
    qu.save(function (err, ret) {
        if(err){
            return res.status(500).json({
                err_code: 500,
                message: 'error!'
            })
        }
        res.status(200).json({
            err_code: 17,
            message: 'ok!'
        })
    })
    
})
router.get('/s_ask', function (req, res) {
    Quest.find().sort({qno:-1}).exec(function (err, qu) {
        if(err){console.log('Server error!')}
        res.render('student/s_ask.html', {
            qu: qu,
            user: req.session.user
        })
    })
})
router.get('/s_answer', function (req, res) {
    var qno = req.query.qno
    var sno = req.session.user.account
    Quest.find({qno: qno},function (err, qu) {
        Answer.find({qno: qno},function (err, an) {
            Student.find({sno: sno}, function (err, st) {
                if(err){console.log('error!')}
                res.render('student/s_answer.html', {
                    qu: qu,
                    an: an,
                    st: st,
                    user: req.session.user
                })
            })
        })
    })
})
router.post('/s_answer', function (req, res) {
    var body = req.body
    console.log(body)
    var an = new Answer({
        qno: body.qno,
        name: body.name,
        time: body.time,
        answer: body.answer 
    })
    an.save(function (err, ret) {
        if(err){
            return res.status(500).json({
                err_code: 500,
                message: 'error'
            })
        }
        res.status(200).json({
            err_code: 13,
            message: 'ok!'
        })
    })
})
/* 
	******************
	*****教师*********
	******************
*/
//通知
router.get('/t_notice', function (req, res) {
    Notice.find(function (err, noi) {
        if(err) {
            return res.status(500).json({
                err_code: 500,
                message: '拉取失败'
            })
        }
        res.render('teacher/t_notice.html', {
            noi: noi,
            user:req.session.user
        })
    })
})
//个人信息
router.get('/t_info', function (req, res) {
    var user = req.session.user
    var tno = user.account
    Teacher.find({
        tno: tno
    },function (err, tec) {
        if(err){console.log('Server error')}
        console.log(tec)
        res.render('teacher/t_info.html',{
            tec: tec,
            user: req.session.user
        })
    })
})
//学生名单
router.get('/t_stu', function (req, res) {
    var user = req.session.user
    var tno = user.account
    Teacher.find({
        tno: tno
    },function (err, tec) {
        if(err){console.log('Server error!')}
        var course = tec[0].course
        console.log(tec[0].course)
        Student.find({
            course: course
        },function (err, stu) {
            if (err){console.log('error')}
            res.render('teacher/t_stu.html',{
                stu: stu,
                user: req.session.user
            })
        })
    })
})
//课表
router.get('/t_tabll', function (req, res) {
    var user = req.session.user
    var tno = user.account
    Teacher.find({
        tno: tno
    },function (err, tec) {
        var course = tec[0].course
        console.log(course)
        Course.find({
            cname: course
        },function (err, cor) {
            if (err){console.log('error')}
            res.render('teacher/t_tabll.html',{
                tec: tec,
                cor: cor,
                user: req.session.user
            })
        })
    })
})
router.post('/t_tabll', function (req, res) {
    var body = req.body
    Course.updateOne({cno:body.cno},{$set:{ctime:body.ctime}},function (err, ret) {
        if(err){
            return res.status(500).json({
                err_code: 500
            })
        }
        res.status(200).json({
            err_code: 28
        })
    })
})
//考试时间
router.get('/t_exam', function (req, res) {
    var user = req.session.user
    var tno = user.account
    Teacher.find({
        tno: tno
    },function (err, tec) {
        if(err){console.log('Server error!')}
        var obj = null
        for(var k in tec){
            obj = tec[k]
        }
        Course.find({
            cname: obj.course
        },function (err, cor) {
            if (err){console.log('error')}
            res.render('teacher/t_exam.html',{
                tec: tec,
                cor: cor,
                user: req.session.user
            })
        })
    })
})
//录入成绩
router.get('/t_result', function (req, res) {
    Student.find(function (err, stu) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '拉取失败'
            })
        }
        res.render('teacher/t_result.html',{
            st: stu,
            user:req.session.user
        })
    })
})
router.post('/t_result', function (req, res) {
    var body = req.body
    var sno = body.sno
    Student.update({sno:sno},{exam:body.exam},function (err, ret) {
        if(err){
            return res.status(500).json({
                err_code: 500
            })
        }
        res.status(200).json({
            err_code: 0
        })
    })
})



//教师创建试题页面路由
router.get('/t_test', function (req, res) {
    var tno = req.session.user.account
    Paper.find({tno: tno}).sort({pno:-1}).limit(1).exec(function (err, pa) {
        if(err){
            console.log('err')
        }
        res.render('teacher/t_test.html',{
            user: req.session.user,
            pno: pa
        })
    })
})
router.post('/t_test', function (req, res) {
    var body = req.body
    var tno = req.session.user.account
    console.log(body)
    var par = new Paper({
        pno: body.pno,
        course: body.course,
        tno: tno
    })
    par.save(function (err, ret) {
        if(err){
            return res.status(500).json({
                err_code: 500,
                message: 'Server error!'
            })
        }
        res.status(200).json({
            err_code: 29,
            message: 'ok'
        })
    })
})
//教师出题页面
router.get('/t_paper', function (req, res) {
    var tno = req.session.user.account
    Paper.find({tno: tno}).sort({pno:-1}).limit(1).exec(function (err, par) {
        if(err){console.log('err')}
        res.render('teacher/t_paper.html',{
            user: req.session.user,
            par: par
        })
    })
})
router.post('/t_paper', function (req, res) {
    var body = req.body
    var tno = req.session.user.account
    console.log(body)
    if (body.rtitle) {
        var ra = new Radio({
            paper: body.pno,
            title: body.rtitle,
            ra: body.ra,
            rb: body.rb,
            rc: body.rc,
            rd: body.rd,
            right: body.rad,
            tno: tno
        })
        ra.save(function (err, ret) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: 'Server error!'
                })
            }
            res.status(200).json({
                err_code: 25,
                message: 'ok'
            })
        })
    }
    if (body.mtitle) {
        var ch = new Check({
            paper: body.pno,
            title: body.mtitle,
            ma: body.ma,
            mb: body.mb,
            mc: body.mc,
            md: body.md,
            me: body.me,
            mf: body.mf,
            right: body.che,
            tno: tno
        })
        ch.save(function (err, ret) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: 'Server error'
                })
            }
            res.status(200).json({
                err_code: 25,
                message: 'ok'
            })

        })
    }
    if(body.jtitle) {
        var jud = new Judge({
            paper: body.pno,
            title: body.jtitle,
            rkey: body.rkey,
            tno: tno
        })
        jud.save(function (err, ret) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: 'Server error'
                })
            }
            res.status(200).json({
                err_code: 25,
                message: 'ok'
            })
        })
    }
    if(body.ftitle) {
        var fil = new Fill({
            paper: body.pno,
            title: body.ftitle,
            right: body.filla,
            tno: tno
        })
        fil.save(function (err, ret) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: 'Server error'
                })
            }
            res.status(200).json({
                err_code: 25,
                message: 'ok'
            })
        })
    }
})
//提问路由
router.get('/t_quest', function (req, res) {
    Quest.find().sort({qno:-1}).exec(function (err, qu) {
        if(err){console.log('Server error!')}
        res.render('teacher/t_quest.html', {
            qu: qu,
            user: req.session.user
        })
    })
})
router.get('/t_ask', function (req, res) {
    var user = req.session.user
    var tno = user.account
    Teacher.find({tno: tno}, function (err, tec) {
        Quest.find().sort({qno:-1}).limit(1).exec(function (err, qu){
            if(err){console.log('失败')}
            res.render('teacher/t_ask.html',{
                tec: tec,
                qu: qu,
                user: req.session.user
            })
        })
    })
})
router.post('/t_ask', function (req, res) {
    var body = req.body
    var qu = new Quest({
        qno: body.qno,
        title: body.title,
        name: body.name,
        time: body.time,
        content: body.content
    })
    qu.save(function (err, ret) {
        if(err){
            return res.status(500).json({
                err_code: 500,
                message: 'error!'
            })
        }
        res.status(200).json({
            err_code: 24,
            message: 'ok!'
        })
    })
})
router.get('/t_answer', function (req, res) {
    var qno = req.query.qno
    var tno = req.session.user.account
    Quest.find({qno: qno},function (err, qu) {
        Answer.find({qno: qno},function (err, an) {
            Teacher.find({tno: tno}, function (err, tec) {
                if(err){console.log('error!')}
                res.render('teacher/t_answer.html', {
                    qu: qu,
                    an: an,
                    tec: tec,
                    user: req.session.user
                })
            })
        })
    })
})
router.post('/t_answer', function (req, res) {
    var body = req.body
    console.log(body)
    var an = new Answer({
        qno: body.qno,
        name: body.name,
        time: body.time,
        answer: body.answer
    })
    an.save(function (err, ret) {
        if(err){
            return res.status(500).json({
                err_code: 500,
                message: 'error'
            })
        }
        res.status(200).json({
            err_code: 23,
            message: 'ok!'
        })
    })
})
/* 
	******************
	*****管理员*******
	******************
*/
//管理员通知页面路由
router.get('/ad_notice', function (req, res) {
    Notice.find(function (err, noi) {
        if(err) {
            return res.status(500).json({
                err_code: 500,
                message: '拉取失败'
            })
        }
        res.render('admin/ad_notice.html', {
                    noi: noi,
                    user:req.session.user
        })
    })
    
})
//发布通知
router.get('/ad_pull', function (req, res) {
    res.render('admin/ad_pull.html',
        {user:req.session.user})
})
router.post('/ad_pull', function (req, res) {
    var body = req.body
    console.log(req.body)
    var noi = new Notice({
        title: body.title,
        name: body.name,
        time: body.time,
        content: body.content
    })
    noi.save(function (err, ret) {
        if(err){
            return res.status(500).json({
                err_code: 500,
                message: 'Server error!'
            })
        }
        res.status(200).json({
            err_code: 0,
            message:'ok'
        })
    })
})
//管理员添加用户路由
router.get('/ad_create', function (req, res) {
    res.render('admin/ad_create.html',
        {user:req.session.user})
})
router.post('/ad_create', function (req, res) {
    var body = req.body
		console.log(body)
    var usr = new User({
        account: body.sno,
        password: body.pwd,
        level: body.level
    })
    usr.save(function (err, ret) {
        if(err){
            console.log(err)
        }else {
            console.log('该用户已经拥有了登陆权限了！')
            console.log(ret)
        }
    })
    if(body.level == 0) {
        var stu = new Student({
            sno: body.sno,
            pwd: body.pwd,
            name: body.name,
            level: body.level,
            sex: body.sex,
            college: body.college,
            major: body.major,
            grade: body.grade,
            class: body.class,
            course: body.course,
            enroll: body.enroll,
			state: body.state,
            tel: body.tel
        })
        stu.save(function (err, ret) {
            if (err) {
                return res.status(500).json({
                    err_code: 500
                })
            } else {
                res.status(200).json({
                    err_code: 0
                })
            }
        })


    }
    if(body.level == 1) {
        var tea = new Teacher({
            tno: body.sno,
            pwd: body.pwd,
            name: body.name,
            level: body.level,
            sex: body.sex,
            college: body.college,
            course: body.course,
            tel: body.tel
        })
        tea.save(function (err, ret) {
            if (err) {
                return res.status(500).json({
                    err_code: 500
                })
            } else {
                res.status(200).json({
                    err_code: 0
                })
            }
        })
    }
})
//查看用户信息
router.get('/ad_users', function (req, res) {
    Student.find(function (err, stu) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '拉取失败'
            })
        }
        res.render('admin/ad_users.html',{
                    st: stu,
                    user:req.session.user
        })
    })
    
})
//添加课程
router.get('/ad_course', function (req, res) {
    res.render('admin/ad_course.html',
        {user:req.session.user})
})
router.post('/ad_course', function (req, res) {
    var body = req.body
    var cor = new Course({
        cno: body.cno,
        cname: body.cname,
        ccost: body.ccost,
        cnum: body.cnum,
        cplace: body.cplace,
        ctime: body.ctime,
        cstate: body.cstate,
        cexam: body.cexam
    })

    cor.save(function (err, ret) {
        if(err){
            return res.status(500).json({
                err_code: 500,
                message: 'Server error！'
            })
        }
        res.status(200).json({
            err_code: 0,
            message: 'ok'
        })
    })
})
//缴费状态管理
router.get('/ad_state', function (req, res) {
    Student.find(function (err,stu) {
        if(err) {
            return res.status(500).json({
                err_code: 500,
                message: 'Server error!'
            })
        }
        res.render('admin/ad_state.html',{
            st: stu,
            user: req.session.user
        })
    })
})
router.get('/ad_state/edit', function (req, res) {
    var sno = req.query.sno
    console.log(sno)
    Student.update({sno:sno},{
        state: '已缴费',
        enroll: '已报名'
    },function (err, ret) {
        if(err) {
            return res.status(500).json({
                err_code: 500,
                message: 'Server error!'
            })
        }
        res.redirect('/ad_state')
    })
})
//编辑学生信息
router.get('/ad_edit', function (req, res) {
    var id = req.query.id
    console.log(req.query.id)
    Student.findById(id, function (err, stu) {
        if(err) {
            console.log('失败')
        }
        res.render('admin/ad_edit.html',{
            stu: stu,
            user: req.session.user
        })
    })
})
router.post('/ad_edit', function (req, res) {
    var body = req.body
    Student.findByIdAndUpdate(body.id,body,function (err, ret) {
        if(err){
            return res.status(500).json({
                err_code: 500,
                message: 'Server error!'
            })
        }
        res.status(200).json({
            err_code: 10,
            message: 'ok'
        })
        //res.redirect('/ad_users') 服务端异步请求重定向无效
    })
})
//课程信息管理
router.get('/ad_showc', function (req, res) {
    Course.find(function (err, cor) {
        if(err) {
            return res.status(500).json({
                err_code: 500,
                message: 'Server error'
            })
        }
        res.render('admin/ad_showc.html',{
            cor: cor,
            user:req.session.user
        })
    })
})
router.post('/ad_showc', function (req, res) {
    var body = req.body
    Course.remove({
        cno: body.cno
    }, function (err, ret) {
        if(err){
            return res.status(500).json({
                err_code: 500,
                message: '失败'
            })
        }
        res.status(200).json({
            err_code: 9,
            message: 'ok'
        })
    })
})
//编辑课程信息
router.get('/ad_editc', function (req, res) {
    var cno = req.query.cno
    Course.find({cno: cno}, function (err, cor) {
        if(err) {
            console.log('失败！')
        }
        res.render('admin/ad_editc.html',{
            cor: cor,
            user: req.session.user
        })
    })
})
router.post('/ad_editc', function (req, res) {
    var body = req.body
    Course.update({cno: body.cno},body,function (err, ret) {
        if(err){
            return res.status(500).json({
                err_code: 500,
                message: 'Server error'
            })
        }
        res.status(200).json({
            err_code: 9,
            message: 'ok'
        })
    })
})
//查看学生成绩
router.get('/ad_result', function (req, res) {
    Student.find(function (err, stu) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '拉取失败'
            })
        }
        res.render('admin/ad_result.html',{
            st: stu,
            user:req.session.user
        })
    })
})
router.post('/ad_result', function (req, res) {
    var body = req.body
    Student.find({name:body.sname}, function (err, st) {
        if(err) {
            return res.status(500).json({
                err_code: 501,
            })
        }
        res.render('admin/ad_result', {
            st: st,
            user: req.session.user
        })
    })
})

module.exports = router
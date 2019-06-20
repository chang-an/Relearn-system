// +----------------------------------------------------------------------
// | 表单提交页面通用表单监听（如有特殊需求可参照此文件写一个单独的js文件，如:sys_config.js）
// +----------------------------------------------------------------------
layui.use(['element','form'], function(){
    var element = layui.element;
    var form = layui.form;
    //监听提交
    form.on('submit(formDemo)', function(data){
        var action = data.form.action;//表单提交URL地址
        console.log(JSON.stringify(data.field));//表单数据
        $.post(action,data.field,function(obj){
            var err_code = obj.err_code
            if (err_code === 501){
                window.alert('没有找到这个人！')
            }else if(err_code == 500){
                window.alert('失败！')
            } else if(err_code == 0){
                window.alert('成功！')
            }else if(err_code ==10){
                window.location.href = 'ad_users'
            }else if(err_code ==9){
                window.alert('操作成功！')
                window.location.href = 'ad_showc'
            }else if(err_code ==29){
                window.location.href = 't_paper'
            }else if(err_code ==25){
                window.location.href = 't_paper'
            }else if(err_code == 28){
                window.location.href = 't_tabll'
            }else if(err_code ==13){
                window.location.reload()
            }else if(err_code ==17){
                window.location.href = 's_ask'
            }else if(err_code ==24){
                window.location.href = 's_quest'
            }else if(err_code ==23){
                window.location.reload()
            }else if(err_code ==11){
                window.location.href = 'ad_state'
            }

        });
        return false;//注释掉这行代码后，表单将会以普通方式提交表单，否则以ajax方式提交表单
    });
});
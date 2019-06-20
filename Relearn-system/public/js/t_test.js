$(function() {
	var $lis = $(".layui-col-md3 .layui-card-body li");
	var $ul = $(".layui-col-md9 .t-paper ul");
	$lis.eq(0).on("click",function(){
		$ul.append('<li class="t-li">' +
                        '<label class="layui-form-item">' +
                            '<big class="layui-form-label">单选题: </big>' +
                            '<div class="layui-input-block">' +
                                '<input type="text" name="rtitle" placeholder="请输入题目" autocomplete="off" class="layui-input">' +
                            '</div>' +
                        '</label>' +
                        '<label class="layui-form-item op-text">' +
                            '<input type="radio" name="rad" value="a" title="xuan" class="op-radio">' +
                            '<label>' +
                                '<input type="text" name="ra" placeholder="请输入选项" autocomplete="off" class="input-size">' +
                            '</label>' +
                        '</label>' +
                        '<label class="layui-form-item op-text">' +
                            '<input type="radio" name="rad" value="b" class="op-radio">' +
                            '<label>' +
                                '<input type="text" name="rb" placeholder="请输入选项" autocomplete="off" class="input-size">' +
                            '</label>' +
                        '</label>' +
                        '<label class="layui-form-item op-text">' +
                            '<input type="radio" name="rad" value="c" class="op-radio">' +
                            '<label>' +
                                '<input type="text" name="rc" placeholder="请输入选项" autocomplete="off" class="input-size">' +
                            '</label>' +
                        '</label>' +
                        '<label class="layui-form-item op-text">' +
                            '<input type="radio" name="rad" value="d" class="op-radio">' +
                            '<label>' +
                                '<input type="text" name="rd" placeholder="请输入选项" autocomplete="off" class="input-size">' +
                            '</label>' +
                        '</label>' +
                    '</li>' );
        
    });
	$lis.eq(1).on("click",function(){
		$ul.append('<li class="t-li">' +
                        '<label class="layui-form-item">' +
                            '<big class="layui-form-label">多选题: </big>' +
                            '<div class="layui-input-block">' +
                                '<input type="text" name="mtitle" placeholder="请输入题目" autocomplete="off" class="layui-input">' +
                            '</div>' +
                        '</label>' +
                        '<label class="layui-form-item op-text">' +
                            '<input type="checkbox" name="che" value="a" class="op-radio">' +
                            '<label>' +
                                '<input type="text" name="ma" placeholder="请输入选项" autocomplete="off" class="input-size">' +
                            '</label>' +
                        '</label>' +
                        '<label class="layui-form-item op-text">' +
                            '<input type="checkbox" name="che" value="b" class="op-radio">' +
                            '<label>' +
                                '<input type="text" name="mb" placeholder="请输入选项" autocomplete="off" class="input-size">' +
                            '</label>' +
                        '</label>' +
                        '<label class="layui-form-item op-text">' +
                            '<input type="checkbox" name="che" value="c" class="op-radio">' +
                            '<label>' +
                                '<input type="text" name="mc" placeholder="请输入选项" autocomplete="off" class="input-size">' +
                            '</label>' +
                        '</label>' +
                        '<label class="layui-form-item op-text">' +
                            '<input type="checkbox" name="che" value="d" class="op-radio">' +
                            '<label>' +
                                '<input type="text" name="md" placeholder="请输入选项" autocomplete="off" class="input-size">' +
                            '</label>' +
                        '</label>' +
						'<label class="layui-form-item op-text">' +
                            '<input type="checkbox" name="che" value="e" class="op-radio">' +
                            '<label>' +
                                '<input type="text" name="me" placeholder="请输入选项" autocomplete="off" class="input-size">' +
                            '</label>' +
                        '</label>' +
						'<label class="layui-form-item op-text">' +
                            '<input type="checkbox" name="che" value="f" class="op-radio">' +
                            '<label>' +
                                '<input type="text" name="mf" placeholder="请输入选项" autocomplete="off" class="input-size">' +
                            '</label>' +
                        '</label>' +
                '</li>' );
    });
	$lis.eq(2).on("click",function(){
		$ul.append('<li class="judge">' +
                        '<label class="layui-form-item">' +
                            '<big class="layui-form-label">判断题: </big>' +
                            '<div class="layui-input-block">' +
                                '<input type="text" name="jtitle" placeholder="请输入题目" autocomplete="off" class="layui-input">' +
                            '</div>' +
                        '</label>' +
                        '<label class="layui-form-item op-text">' +
                            '<input type="radio" name="rkey" value="right" class="op-radio">' +
                            '<i class="layui-icon icon-radio">&#xe605;</i>' +
                        '</label>' +
                        '<label class="layui-form-item op-text">' +
                            '<input type="radio" name="rkey" value="wrong" class="op-radio">' +
                            '<i class="layui-icon icon-radio">&#x1006;</i>' +
                        '</label>' +
                    '</li>' );
    });
    $lis.eq(3).on("click",function(){
        $ul.append('<li class="fill">' +
                        '<label class="layui-form-item">' +
                            '<big class="layui-form-label">填空题: </big>' +
                            '<div class="layui-input-block">' +
                                 '<input type="text" name="ftitle" placeholder="请输入题目" autocomplete="off" class="layui-input">' +
                            '</div>' +
                        '</label>' +
                        '<label class="layui-form-item fill-input">' +
                            '<input type="text" name="filla" placeholder="请输入答案" autocomplete="off" class="input-size fill-size">' +
                        '</label>'+
                    '</li>' );
    });

});

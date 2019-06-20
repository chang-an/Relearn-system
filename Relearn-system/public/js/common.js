layui.use(['element','form'], function(){
    var element = layui.element;
    var form = layui.form;
    // +----------------------------------------------------------------------
    // | ������
    // +----------------------------------------------------------------------
    $(".dw-dailog").click(function(){
      var dw_url = $(this).attr("dw-url");//URL��ַ������
      var dw_title = $(this).attr("dw-title");//��������⣬����
      var dw_width = $(this).attr("dw-width");//�������ȣ���80%��500px�����û��Ĭ��Ϊ��Ļ��ȵ�50%
      var dw_height = $(this).attr("dw-height");//������߶ȣ���50%��500px�����û��Ĭ��Ϊ��Ļ�߶ȵ�50%
      if(dw_url == undefined) {
        layer.msg("���button����dw-url����");
        return false;
      }
      if(dw_title == undefined) {
        layer.msg("���button����dw-title����");
        return false;
      }
      if(dw_width == undefined) dw_width = '50%';
      if(dw_height == undefined) dw_height = '50%';
      layer.open({
        type: 2,
        title: dw_title,
        shadeClose: true,
        shade: 0.8,
        area: [dw_width, dw_height],
        content: dw_url,
        cancel: function (index, layero) {
          $(".dw-refresh").trigger('click');
          return false;
        }    
      }); 
    });
    
});
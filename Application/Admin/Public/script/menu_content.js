/**
 * Created by spen on 2017/5/2.
 */
(function (main) {
    var menu_content = {};

    menu_content.init = function () {
        $.ajax({
            url: '/admin/menu/content',
            type: 'POST',
            dataType: 'json',
            data: {'id': $("#id").val()},
            success: function (resp) {
                //查询成功
                if (resp.code == 0) {
                    menu_content.fillTable(resp.data);
                    
                }
            }


        });
    };
    /**
     * 绑定
     */
    menu_content.bindEvent = function () {
        $("#add-link").click(function () {
            layer.open({
                type: 2,
                area: ['940px', '600px'],
                fixed: false, //不固定
                maxmin: true,
                title: '添加子菜单',
                content: '/admin/block/blockselect?menu_id='+$("#id").val()
            });
        });
    };
    menu_content.callback = function () {
        layer.alert('添加成功！');
        menu_content.init();
    }

    menu_content.dynamicBind = function () {
        $(".content-remove").click(function () {
            var id = $(this).attr('data-id');

            layer.confirm('确定要取消挂载这条文章吗？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                $.ajax({
                    url: '/admin/menu/content_remove',
                    type: 'POST',
                    dataType: 'json',
                    data: {'menu_id': $("#id").val() , 'article_id':id},
                    success: function (resp) {
                        //查询成功
                        if (resp.code == 0) {
                            menu_content.init();
                            layer.closeAll();
                        }
                    }
                });
            }, function () {

            });
        });
    }
    /**
     * 填充表
     * @param result
     */
    menu_content.fillTable = function (result) {
        var tbody = '';

        for (var i = 0; i < result.length; i++) {
            var row = result[i];
            tbody += '<tr>';
            tbody += "<td>" + row['title'] + "</td>";

            tbody += "<td  style='text-align:center;'>" +
                "<a class='content-remove' data-id='"+row['id']+"' style='color: #d43f3a'>[删除]</a>";

            tbody += "</td></tr>";
        }
        $('#result-body').empty().append(tbody);
        menu_content.dynamicBind();
    };

    main.menu_content = menu_content;

    menu_content.bindEvent();
    menu_content.init();


})(window);
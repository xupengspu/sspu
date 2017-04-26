/**
 * 菜单
 * Created by spen on 2017/4/20.
 */
(function (main) {

    var menulist = {};

    //添加事件监听
    menulist.addListener = function () {

        //添加一级菜单按钮事件
        $("#btn_add_menu").click(function () {
            layer.open({
                type: 2,
                area: ['700px', '300px'],
                fixed: false, //不固定
                maxmin: true,
                title: '添加子菜单',
                content: '/admin/menu/addMenu',
                end: function () {
                    layer.alert('保存成功');
                }
            });
        });

        //查询事件监听
        $("#search-btn").click(function () {
            menulist.search();
        });

        $(".fa-trash").click(function () {
            var id = $(this).attr('data-id');

            layer.confirm('确定要删除该菜单以及菜单子项吗？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                $.ajax({
                    url: '/admin/menu/delete',
                    type: 'POST',
                    dataType: 'json',
                    data: {'id': id},
                    success: function (resp) {
                        //查询成功
                        if (resp.code == 0) {
                            menulist.search();
                        }
                    }


                });
            }, function () {

            });
        });


    };

    menulist.search = function () {
        $.ajax({
            url: '/admin/menu/search',
            type: 'POST',
            dataType: 'json',
            data: {'menu_name': $("#menu_name").val()},
            success: function (resp) {
                //查询成功
                if (resp.code == 0) {
                    menulist.fillTable(resp.data);
                    $(".slider").click(function () {
                        var id = $(this).attr('id');
                        if ($(this).hasClass('s-open')) {
                            $(this).removeClass('s-open').addClass('s-close');
                        } else {
                            $(this).removeClass('s-close').addClass('s-open');
                        }
                        $("[parent_id='" + id + "']").toggle('normal')
                    });
                }
            }


        });
    }
    /**
     * 填充表格
     * @param result
     */
    menulist.fillTable = function (result) {
        var html = "";
        for (var i = 0; i < result.length; i++) {
            var row = result[i];
            html = html + '<tr><td><span class="slider s-close" id="' + row['id'] + '"></span>' + row.menu_name
                + '</td><td>' + row.level + '</td><td>' +
                '<i class="fa fa-pencil operator"></i> <i class="fa fa-trash operator" data-id="' + row['id'] + '"></i></td></tr>';

            for (var j = 0; j < row['children'].length; j++) {
                var sub = row['children'][j];
                html = html + '<tr class="sub-datagrid" parent_id="' + row['id'] + '"><td></td><td>' + sub['menu_name'] + '</td><td colspan="2">' + sub['level'] + '</td></tr>';
            }
        }

        $("#result-body").empty().append(html);
    }

    menulist.callback = function (flag) {

    };

    main.menulist = menulist;


    //
    menulist.addListener();

})(window);
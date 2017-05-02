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
                content: '/admin/menu/addMenu'
            });
        });

        //查询事件监听
        $("#search-btn").click(function () {
            menulist.search();
        });
    };

    //动态绑定事件
    menulist.dynamicBind = function(){

        //添加事件监听
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
                            layer.closeAll();
                        }
                    }
                });
            }, function () {

            });
        });

        //添加一级菜单按钮事件
        $(".fa-plus").click(function () {
            layer.open({
                type: 2,
                area: ['700px', '300px'],
                fixed: false, //不固定
                maxmin: true,
                title: '添加子菜单',
                content: '/admin/menu/addMenu?id='+$(this).attr('data-id')
            });
        });

        //添加一级菜单按钮事件
        $(".fa-pencil").click(function () {
            layer.open({
                type: 2,
                area: ['700px', '300px'],
                fixed: false, //不固定
                maxmin: true,
                title: '添加子菜单',
                content: '/admin/menu/editMenu?id='+$(this).attr('data-id')
            });
        });
    }
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
    };

    /**
     * 格式化层级
     */
    menulist.formatLevel = function(level){
        if(level == 0) return "顶级菜单";
        return "二级菜单";
    };
    /**
     * 填充表格
     * @param result
     */
    menulist.fillTable = function (result) {
        var html = "";
        for (var i = 0; i < result.length; i++) {
            var row = result[i];
            html = html + '<tr>' +
                '<td><span class="slider s-close" id="' + row['id'] + '"></span>' + row.menu_name + "</td>"
                + '<td>' + menulist.formatLevel(row.level) + '</td>' +
                '<td colspan="2">' +

                '<i class="fa fa-pencil operator" data-id=' + row['id'] + '"></i>' +
                '<i class="fa fa-trash operator" data-id="' + row['id'] + '"></i>' +
                '<a target="_blank" href="/admin/menu/menucontent?id='+row['id']+'"><i class="fa fa-file operator"></i></a>' +
                '<i class="fa fa-plus operator" data-id="' + row['id'] + '">' +
                '</td></tr>';

            for (var j = 0; j < row['children'].length; j++) {
                var sub = row['children'][j];
                html = html + '<tr class="sub-datagrid" parent_id="' + row['id'] + '"><td></td><td>' + sub['menu_name'] + '</td>' +
                    '<td>' + menulist.formatLevel(sub['level']) + '</td>' +
                    '<td>' +
                    '<i class="fa fa-pencil operator" data-id=' + sub['id'] + '"></i>' +
                    '<i class="fa fa-trash operator" data-id="' + sub['id'] + '"></i>' +
                    '<a target="_blank" href="/admin/menu/menucontent?id='+sub['id']+'"><i class="fa fa-file operator"></i></a>' +
                    '</td>' +
                    '</tr>';
            }
        }

        $("#result-body").empty().append(html);

        menulist.dynamicBind();
    }

    menulist.callback = function (flag) {
        if(flag == 0){
            layer.alert('操作成功！');
            menulist.search();

        }
    };

    main.menulist = menulist;


    //
    menulist.addListener();
    menulist.search();

})(window);
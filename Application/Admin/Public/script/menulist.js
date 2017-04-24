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
            $.ajax({
                url:'/admin/menu/search',
                type:'POST',
                dataType:'json',
                data:{'menu_name' : $("#menu_name").val()},
                success:function (resp) {
                    //查询成功
                    if(resp.code == 0){
                        menulist.fillTable(resp.data);
                    }
                }
                

            });
        });

        $(".slider").click(function () {
            if ($(this).hasClass('s-open')) {
                $(this).removeClass('s-open').addClass('s-close');
            } else {
                $(this).removeClass('s-close').addClass('s-open');
            }
            $(".sub-datagrid.s998").toggle('normal')
        });
    };

    /**
     * 填充表格
     * @param result
     */
    menulist.fillTable = function (result) {
        
    }
    
    menulist.callback = function (flag) {

    };

    main.menulist = menulist;


    //
    menulist.addListener();

})(window);
/**
 * 菜单
 * Created by spen on 2017/4/20.
 */
(function (main) {

    var menulist = {};

    //添加事件监听
    menulist.addListener = function(){

        //添加一级菜单按钮事件
        $("#btn_add_menu").click(function () {
            layer.open({
                type: 2,
                area: ['700px', '300px'],
                fixed: false, //不固定
                maxmin: true,
                title:'添加子菜单',
                content: '/admin/menu/addMenu'
            });
        })
    };


    //
    menulist.addListener();

})(window);
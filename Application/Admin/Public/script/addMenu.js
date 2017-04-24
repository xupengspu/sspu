/**
 * Created by spen on 2017/4/21.
 */
(function (main) {

    var addMenu = {};

    /**
     * 添加事件监听
     */
    addMenu.addListener = function () {
        //保存操作
        $("#saveMenu").click(function () {

            $.ajax({
                url: '/admin/menu/saveMenu',
                type: 'post',
                dataType: 'json',
                data: {'menu_name': $('#menu_name').val(), 'parent_id': $('#parent_id').val()},
                success: function (resp) {
                    if (resp.code == 0) {
                        //再执行关闭
                        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                        parent.layer.close(index);
                        window.parent.menulist.callback(0);

                    } else {
                        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                        parent.layer.close(index);
                    }
                }
            });
        });
    }
    addMenu.addListener();
})(window);
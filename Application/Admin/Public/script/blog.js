/**
 * Created by spen on 2017/4/30.
 */
(function (main) {
    var blog = {};


    /**
     *
     */
    blog.addListener = function () {
        $("#save-btn").click(function () {
            $.ajax({
                url: '/admin/block/saveNews',
                type: 'post',
                dataType: 'json',
                data: {'title': $('#title').val(), 'content': encodeURIComponent( window.ue.getContent()) ,'type': $('#type').val(), 'id': $('#id').val()},
                success: function (resp) {
                    if (resp.code == 0) {
                        layer.alert("文章保存或者更新成功！");
                        if ($('#id').val() == '') {
                            $('#title').val('');
                            window.ue.setContent('');
                        }

                    }
                }
            });
        });
    };

    blog.init = function () {
        if ($("#id").val()) {
            $.ajax({
                url: '/admin/block/loadblock',
                type: 'post',
                dataType: 'json',
                data: {'id': $('#id').val()},
                success: function (resp) {
                    if (resp.code == 0) {

                        $('#title').val(resp.data.title);

                        window.ue.addListener("ready", function () {
                            // editor准备好之后才可以使用
                            window.ue.setContent(resp.data.content);

                        });

                    }
                }
            });
        }
    };

    blog.init();
    blog.addListener();
})(window);
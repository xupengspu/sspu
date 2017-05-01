/**
 * 文章列表
 * Created by spen on 2017/5/1.
 */
(function (main) {

    var blocklist = {};

    /**
     * 添加事件监听
     */
    blocklist.addListener = function () {
        //查询事件监听
        $("#search-btn").click(function () {
            blocklist.search();
        });

    };

    /**
     * 动态绑定
     */
    blocklist.dynamicBind = function () {
        //删除按钮
        $(".remove-btn").click(function () {
            var id = $(this).attr('data-id');

            layer.confirm('确定要删除这条文章吗？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                $.ajax({
                    url: '/admin/block/remove',
                    type: 'POST',
                    dataType: 'json',
                    data: {'id': id},
                    success: function (resp) {
                        //查询成功
                        if (resp.code == 0) {
                            blocklist.search();
                            layer.closeAll();
                        }
                    }
                });
            }, function () {

            });
        });
    }
    /**
     * 搜索
     */
    blocklist.search = function () {
        $.ajax({
            url: '/admin/block/search',
            type: 'POST',
            dataType: 'json',
            data: {'title': $("#title").val()},
            success: function (resp) {
                //查询成功
                if (resp.code == 0) {
                    blocklist.fillTable(resp.data);
                }
            }
        });
    };

    /**
     *
     * @param result
     */
    blocklist.fillTable = function (result) {
        var tbody = '';

        for (var i = 0; i < result.length; i++) {
            var row = result[i];
            tbody += '<tr>';
            tbody += "<td>" + row['title'] + "</td>";
            tbody += "<td class='content'>" + row['content'] + "</td>";
            tbody += "<td>" + row['create_time'] + "</td>";
            tbody += "<td>" + row['update_time'] + "</td>";
            tbody += "<td>" +
                "<a href='/admin/block/editblock?id=" + row['id'] + "' style='color: #00aeef'>[查看详情]</a>" +
                "<a href='#' class='remove-btn' style='color: #d43f3a' data-id='" + row['id'] + "'>[删除]</a>" +
                "</td>";
        }
        $('#result-body').empty().append(tbody);
        blocklist.dynamicBind();
    }

    main.blocklist = blocklist;

    blocklist.addListener();


})(window);
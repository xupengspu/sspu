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

        //推荐按钮事件
        $(".btn-recommend").click(function () {
            var _this = $(this);
            layer.open({
                type: 2,
                area: ['400px', '400px'],
                fixed: true, //不固定
                maxmin: false,
                title: '上传封面图片',
                content: '/admin/block/recommend?id=' + _this.attr('data-id')
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


    blocklist.format_type = function (type) {
        if (type == "0") {
            return "新闻动态";
        } else if (type == "1") {
            return "菜单";
        } else if (type == "2") {
            return "合作范例";
        }else if (type == "3") {
            return "图标导航";
        }
    }

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
            // tbody += "<td class='content' style='overflow: hidden;'>" + row['content'] + "</td>";
            tbody += "<td>" + blocklist.format_type(row['type']) + "</td>";
            tbody += "<td>" + row['create_time'] + "</td>";
            tbody += "<td>" + row['update_time'] + "</td>";
            tbody += "<td  style='text-align:center;'>" +
                "<a href='/admin/block/editblock?id=" + row['id'] + "' style='color: #00aeef'>[查看详情]</a>" +
                "<a href='#' class='remove-btn' style='color: #d43f3a' data-id='" + row['id'] + "'>[删除]</a>";
            if (row['type'] == "0" || row['type'] == "3") {
                tbody += "<a class='btn-recommend' data-id='" + row['id'] + "' href='#' style='color: #245269'>[设置封面]</a>"
            }
            tbody += "</td></tr>";
        }
        $('#result-body').empty().append(tbody);
        blocklist.dynamicBind();
    }

    main.blocklist = blocklist;

    blocklist.addListener();
    blocklist.search();

})(window);
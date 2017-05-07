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

        //确定事件
        $("#confirm").click(function () {
            var article_id = $(".check-article:checked").attr("data-id");

            $.ajax({
                url: '/admin/banner/addArticle',
                type: 'POST',
                dataType: 'json',
                data: {'banner_id': $('#banner_id').val(), 'article_id': article_id},
                success: function (resp) {
                    //查询成功
                    if (resp.code == 0) {
                        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                        parent.layer.close(index);
                        window.parent.banner.callback(resp.data);
                    }
                }
            });
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
            data: {'title': $("#title").val(), 'type': 1},
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
            tbody += '<td><input class="check-article" type="checkbox" data-id="' + row['id'] + '"></td>';
            tbody += "<td>" + row['title'] + "</td>";
            tbody += "<td class='content'>" + row['content'] + "</td>";
            tbody += "<td>" + blocklist.format_type(row['type']) + "</td>";
            tbody += "<td>" + row['create_time'] + "</td>";
            tbody += "<td>" + row['update_time'] + "</td>";

            tbody += "</td></tr>";
        }
        $('#result-body').empty().append(tbody);

    }

    main.blocklist = blocklist;

    blocklist.addListener();
    blocklist.search();

})(window);
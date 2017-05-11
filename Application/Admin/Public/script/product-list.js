/**
 * 产品列表页面
 * Created by spen on 2017/5/10.
 */
(function (main) {

    var product_list = {};

    //添加事件监听
    product_list.query = function () {
        $.ajax({
            url: '/admin/product/search',
            dataType: 'json',
            type: 'post',
            data: {'product_name': $('#product_name').val(),'product_code': $('#product_code').val()},
            success: function (resp) {
                product_list.fillTable(resp.data);
            }
        });

    };

    //填充表格
    product_list.fillTable = function (result) {
        var tbody = '';

        for (var i = 0; i < result.length; i++) {
            var row = result[i];
            tbody += '<tr>';
            tbody += "<td>" + row['product_code'] + "</td>";
            tbody += "<td>" + row['product_name'] + "</td>";
            tbody += "<td  style='text-align:center;'>" +
                "<a href='/admin/product/addProduct?id=" + row['id'] + "' style='color: #00aeef'>[查看详情]</a>" +
                "<a href='#' class='remove-btn' style='color: #d43f3a' data-id='" + row['id'] + "'>[删除]</a>";

            tbody += "</td></tr>";
        }
        $('#result-body').empty().append(tbody);
        //动态添加事件监听
        product_list.dynamicBind();
    };


    product_list.dynamicBind = function () {
        //删除按钮
        $(".remove-btn").click(function () {
            var id = $(this).attr('data-id');

            layer.confirm('确定要删除该条产品信息吗？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                $.ajax({
                    url: '/admin/product/remove',
                    type: 'POST',
                    dataType: 'json',
                    data: {'id': id},
                    success: function (resp) {
                        //查询成功
                        if (resp.code == 0) {
                            product_list.query()
                            layer.closeAll();
                        }
                    }
                });
            }, function () {

            });
        });

    }
    /**
     * 添加事件
     */
    product_list.addListener = function () {
        $("#search-btn").click(function () {
            product_list.query();
        });
    };

    product_list.addListener();
    product_list.query();

})(window);
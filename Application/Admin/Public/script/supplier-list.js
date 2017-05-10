/**
 * Created by spen on 2017/5/7.
 */
(function (main) {

    var supplier = {};

    /**
     * 查询
     */
    supplier.query = function () {
        $.ajax({
            url: '/admin/supplier/search',
            dataType: 'json',
            type: 'post',
            data: {'supplier_name': $('#supplier_name').val(), "supplier_level": $('#supplier_level').val()},
            success: function (resp) {
                supplier.fillTable(resp.data);
            }
        });
    };
    /**
     * 填充表格
     */
    /**
     *
     * @param result
     */
    supplier.fillTable = function (result) {
        var tbody = '';

        for (var i = 0; i < result.length; i++) {
            var row = result[i];
            tbody += '<tr>';
            tbody += "<td>" + row['supplier_name'] + "</td>";
            tbody += "<td class='content'>" + row['supplier_level'] + "</td>";
            tbody += "<td>" + row['contact'] + "</td>";
            tbody += "<td>" + row['tel'] + "</td>";
            tbody += "<td>" + row['mobile'] + "</td>";
            tbody += "<td>" + row['address'] + "</td>";
            tbody += "<td  style='text-align:center;'>" +
                "<a href='/admin/supplier/addsupplier?id=" + row['id'] + "' style='color: #00aeef'>[查看详情]</a>" +
                "<a href='#' class='remove-btn' style='color: #d43f3a' data-id='" + row['id'] + "'>[删除]</a>";

            tbody += "</td></tr>";
        }
        $('#result-body').empty().append(tbody);
        //动态添加事件监听
        supplier.dynamicBind();
    }
    supplier.dynamicBind = function () {
        //删除按钮
        $(".remove-btn").click(function () {
            var id = $(this).attr('data-id');

            layer.confirm('确定要删除该条供应商信息吗？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                $.ajax({
                    url: '/admin/supplier/remove',
                    type: 'POST',
                    dataType: 'json',
                    data: {'id': id},
                    success: function (resp) {
                        //查询成功
                        if (resp.code == 0) {
                            supplier.query()
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
    supplier.addListener = function () {
        $("#search-btn").click(function () {
            supplier.query();
        });
    };

    supplier.addListener();
    supplier.query();
    main.supplier = supplier;

})(window);
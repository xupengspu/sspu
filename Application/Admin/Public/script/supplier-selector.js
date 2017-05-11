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
     *
     * @param level
     * @returns {*}
     */
    supplier.formatLevel = function (level) {
        if (level == "1") {
            return "一级供应商"
        } else if (level == "2") {
            return "二级供应商"
        }
        else if (level == "3") {
            return "三级供应商"
        }
    }
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
            tbody += '<td><input class="check-supplier" type="checkbox" data-id="' + row['id'] + '"></td>';
            tbody += "<td>" + row['supplier_name'] + "</td>";
            tbody += "<td class='content'>" + supplier.formatLevel(row['supplier_level']) + "</td>";
            tbody += "<td>" + row['contact'] + "</td>";
            tbody += "<td>" + row['tel'] + "</td>";
            tbody += "<td>" + row['mobile'] + "</td>";
            tbody += "<td>" + row['address'] + "</td>";


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

        $("#confirm").click(function () {
            var supplier_ids = [];
            $(".check-supplier:checked").each(function () {
                //由于复选框一般选中的是多个,所以可以循环输出
                supplier_ids.push($(this).attr('data-id'));
            });

            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.layer.close(index);
            window.parent.add_product.callback(supplier_ids);
        });
    };

    supplier.addListener();
    supplier.query();
    main.supplier = supplier;

})(window);
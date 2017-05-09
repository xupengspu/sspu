/**
 * Created by spen on 2017/5/8.
 */
(function (main) {

    var add_supplier = {};

    /**
     * 绑定监听事件
     */
    add_supplier.bindEvent = function () {

        //保存按钮事件
        $("#save-btn").click(function () {

            var param = {
                'id': $("#id").val(),
                'supplier_name': $('#supplier_name').val(),
                'supplier_level': $('#supplier_level').val(),
                'contact': $('#contact').val(),
                'tel': $('#tel').val(),
                'mobile': $('#mobile').val(),
                'address': $('#address').val()
            };
            $.ajax({
                url: '/admin/supplier/save',
                type: 'post',
                dataType: 'json',
                data: {'supplier': param},
                success: function (resp) {
                    if (resp.code == 0) {
                        layer.alert("供应商保存成功！");
                        if ($('#id').val() == '') {
                            $('#supplier_name').val('');
                            $('#supplier_level').val('');
                            $('#contact').val('');
                            $('#tel').val('');
                            $('#mobile').val('');
                            $('#address').val('');
                        }

                    }
                }
            });
        });
    };

    //初始化数据
    add_supplier.initData = function () {
        if ($("#id").val()) {
            $.ajax({
                url: '/admin/supplier/load',
                dataType: 'json',
                type: 'post',
                data: {'id': $("#id").val()},
                success: function (resp) {
                    var supplier = resp.data;
                    $('#supplier_name').val(supplier['supplier_name']);
                    $('#supplier_level').val(supplier['supplier_level']);
                    $('#contact').val(supplier['contact']);
                    $('#tel').val(supplier['tel']);
                    $('#mobile').val(supplier['mobile']);
                    $('#address').val(supplier['address']);


                }

            })
        }

    }

    add_supplier.initData();
    add_supplier.bindEvent();


})(window);
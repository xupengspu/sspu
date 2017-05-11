/**
 * Created by spen on 2017/5/5.
 */
(function (main) {

    var add_product = {};

    add_product.buildUploader = function (container_id) {
        var uploader = new plupload.Uploader({
            browse_button: container_id, 					//触发文件选择对话框的按钮，为那个元素id

            url: '/admin/product/upload',    //服务器端的上传页面地址

            filters: {
                mime_types: [{
                    title: "Image files",
                    extensions: "jpg,gif,jpeg,png" 			//只允许上传图片和zip文件
                }],
                max_file_size: '2048kb' 					//最大只能上传400kb的文件
            },

            flash_swf_url: 'js/Moxie.swf', 				//swf文件，当需要使用swf方式进行上传时需要配置该参数
            silverlight_xap_url: 'js/Moxie.xap' 			//silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
        });

        //上传组件初始化
        uploader.init();


        //上传组件选择后直接上传
        uploader.bind('FilesAdded', function (uploader, files) {
            uploader.start();
        });

        //上传完成后触发事件
        uploader.bind("FileUploaded", function (up, file, result) {
            var re = JSON.parse(result.response);
            $("#" + container_id).empty();
            $("#" + container_id).append("<img src='" + re.data + "'>");
            $("#" + container_id).attr('path', re.data);

        });

        //报错信息输出
        uploader.bind('Error', function (uploader, errObject) {
            layer.alert(errObject.message, '图片大小超出了2M或其他错误');
        });
    };
    //保存教师信息
    add_product.save_product = function () {
        $("#save-btn").click(function () {
            var supplier_ids = [];
            //供应商列表
            $("#supplier_table_body tr").each(function (index, ele) {
                supplier_ids.push($(ele).attr("data-id"));
            })

            var param = {
                'id': $("#id").val(),
                'product_name': $('#product_name').val(),
                'product_code': $('#product_code').val(),
                'cover_image': $('#photo_picker').attr('path'),
                'detail': encodeURIComponent(window.ue.getContent()),
                'supplier_ids': supplier_ids
            };
            $.ajax({
                url: '/admin/product/save',
                type: 'post',
                dataType: 'json',
                data: {'product': param},
                success: function (resp) {
                    if (resp.code == 0) {
                        layer.alert("产品保存或者更新成功！");
                        if ($('#id').val() == '') {
                            $('#product_name').val('');
                            $('#product_code').val('');

                            $('#photo_picker').empty();
                            window.ue.setContent('');
                        }

                    }
                }
            });
        });
    };
    /**
     *
     * @param level
     * @returns {*}
     */
    add_product.formatLevel = function (level) {
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
     * 绑定事件
     */
    add_product.bindEvent = function () {
        $("#add-supplier").click(function () {
            layer.open({
                type: 2,
                area: ['900px', '600px'],
                fixed: true, //不固定
                maxmin: false,
                title: '选择供应商',
                content: '/admin/supplier/supplier_selector?id=' + $("#id").val()
            });
        });
    };
    //初始化数据
    add_product.initData = function () {
        if ($("#id").val()) {
            $.ajax({
                url: '/admin/product/load',
                dataType: 'json',
                type: 'post',
                data: {'id': $("#id").val()},
                success: function (resp) {
                    var product = resp.data;

                    $('#product_name').val(product['product_name']);
                    $('#product_code').val(product['product_code']);
                    $('#photo_picker').append("<img src='" + product['cover_image'] + "'>");
                    window.ue.addListener("ready", function () {
                        // editor准备好之后才可以使用
                        window.ue.setContent(product['detail']);

                    });


                }

            })
        }

    };

    add_product.lazyBind = function () {
        $(".remove-supplier").unbind("click"); //移除click
        $(".remove-supplier").click(function () {
            var _this = $(this);
            var supplier_id = $(this).attr('data-id');
            $.ajax({
                url: '/admin/supplier/removeProSupplier',
                dataType: 'json',
                type: 'post',
                data: {'product_id': $("#id").val(), 'supplier_id': supplier_id},
                success: function (resp) {
                    $(_this).closest('tr').remove();

                }

            });
        });
    }

    /**
     * 查新供应商
     */
    add_product.querySupplier = function () {

        $.ajax({
            url: '/admin/supplier/querySupplierByProduct',
            dataType: 'json',
            type: 'post',
            data: {'product_id': $("#id").val()},
            success: function (resp) {
                var suppliers = resp.data;

                for (var i = 0; i < suppliers.length; i++) {
                    var tr = "<tr data-id='" + suppliers[i]['id'] + "'>";
                    tr += "<td>" +  add_product.formatLevel(suppliers[i]['supplier_level']) + "</td>";
                    tr += "<td>" + suppliers[i]['supplier_name'] + "</td>";
                    tr += "<td  style='text-align:center;'>" +
                        "<a href='#' class='remove-supplier' style='color: #d43f3a' data-id='" + suppliers[i]['id'] + "'>[删除]</a></td>";
                    tr += "</tr>";


                    $("#supplier_table_body").append(tr);
                    add_product.lazyBind();
                }

            }

        });
    }

    add_product.callback = function (supplier_ids) {

        $.ajax({
            url: '/admin/supplier/loadByIds',
            dataType: 'json',
            type: 'post',
            data: {'ids': supplier_ids},
            success: function (resp) {
                var suppliers = resp.data;

                for (var i = 0; i < suppliers.length; i++) {
                    var tr = "<tr data-id='" + suppliers[i]['id'] + "'>";
                    tr += "<td>" +  add_product.formatLevel(suppliers[i]['supplier_level']) + "</td>";
                    tr += "<td>" + suppliers[i]['supplier_name'] + "</td>";
                    tr += "<td  style='text-align:center;'>" +
                        "<a href='#' class='remove-supplier' style='color: #d43f3a' data-id='" + suppliers[i]['id'] + "'>[删除]</a></td>";
                    tr += "</tr>";

                    $("#supplier_table_body").append(tr);
                }

            }

        })
    }
    //


    add_product.buildUploader('photo_picker');
    add_product.save_product();
    add_product.initData();
    add_product.bindEvent();
    add_product.querySupplier();
    main.add_product = add_product;

})(window);
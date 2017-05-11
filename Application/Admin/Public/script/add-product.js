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
            var param = {
                'id': $("#id").val(),
                'product_name': $('#product_name').val(),
                'product_code': $('#product_code').val(),
                'cover_image': $('#photo_picker').attr('path'),
                'detail': encodeURIComponent(window.ue.getContent()),
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

    }

    //


    add_product.buildUploader('photo_picker');
    add_product.save_product();
    add_product.initData();
})(window);
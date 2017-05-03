/**
 * Created by spen on 2017/5/4.
 */
(function ($) {

    var banner = {};

    banner.buildUploader = function (container_id) {
        var uploader = new plupload.Uploader({
            browse_button: container_id, 					//触发文件选择对话框的按钮，为那个元素id

            url: '/admin/banner/upload',    //服务器端的上传页面地址

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
            $("#" + container_id).append("<img src='" + re.data + "'>")
        });

        //报错信息输出
        uploader.bind('Error', function (uploader, errObject) {
            layer.alert(errObject.message, '图片大小超出了2M或其他错误');
        });
    };


    //绑定事件
    banner.bindEvent = function () {
        $("#add-banner").click(function () {
            var container_id = "pick" + $(".image-container").length + 1;
            $(".x_content").append('<span class="image-container" id="' + container_id + '"><span class="tool"></span></span>');

            banner.buildUploader(container_id);
        });
    };


    banner.bindEvent();
    banner.buildUploader("pick1");

})(jQuery);
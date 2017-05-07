/**
 * Created by spen on 2017/5/4.
 */
(function (main) {

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
            $("#" + container_id).append("<img src='" + re.data.path + "'>");
            $("#" + container_id).attr('data-id', re.data.id);

            banner.lazyBind($('.toolbar[target="' + container_id + '"]'));

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
            $(".x_content").append('<span class="image-container" id="' + container_id + '"><span class="tool"></span></span>' +
                ' <span class="toolbar" target="' + container_id + '"><a href="#" class="btn btn-warning link-block">链接到文章</a>' +
                '<a href="#" class="btn btn-danger remove-banner">删除Banner</a></span><span>当前文章： <span class="banner-title" target="' + container_id + '"></span></span>');

            banner.buildUploader(container_id);
        });
    };

    //动态绑定事件
    banner.lazyBind = function (ele) {
        ele.find(".remove-banner").click(function () {
            var target_id = $(this).closest('.toolbar').attr('target');

            if ($("#" + target_id).attr('data-id')) {
                $.ajax({
                    url: '/admin/banner/remove',
                    data: {'id': $("#" + target_id).attr('data-id')},
                    type: 'post',
                    dataType: 'json',
                    success: function () {

                    }
                });
            }

            $("#" + target_id).remove();
            $(this).closest('.toolbar').remove();

            $(".banner-title[target='"+target_id+"']").parent().remove();
        });

        ele.find(".link-block").click(function () {
            var target_id = $(this).closest('.toolbar').attr('target');
            layer.open({
                type: 2,
                area: ['900px', '600px'],
                fixed: true, //不固定
                maxmin: false,
                title: '选择文章',
                content: '/admin/banner/selectArticle?banner_id=' + $("#" + target_id).attr('data-id')
            });

        });
    };

    banner.callback = function (banner) {

        var target_id = $("[data-id='" + banner.id + "']").attr('id');
        $.ajax({
            url: '/admin/block/loadblock',
            data: {'id': banner.article_id},
            type: 'post',
            dataType: 'json',
            success: function (resp) {
                $('.banner-title[target="' + target_id + '"]').text(resp.data.title);
            }
        });


    };

    banner.initControl = function (id, title, path) {
        var container_id = "pick" + $(".image-container").length + 1;
        $(".x_content").append('<span class="image-container" data-id="' + id + '" id="' + container_id + '">' +
            '<img src="' + path + '">' +
            '<span class="tool"></span></span>' +
            ' <span class="toolbar" target="' + container_id + '"><a href="#" class="btn btn-warning link-block">链接到文章</a>' +
            '<a href="#" class="btn btn-danger remove-banner">删除Banner</a></span><span>当前文章： <span class="banner-title" target="' + container_id + '">' +
            title +
            '</span></span>');

        $(".image-container .tool").hide();
        // banner.buildUploader(container_id);
        banner.lazyBind($('.toolbar[target="' + container_id + '"]'));
    }
    //初始化
    banner.initData = function () {
        $.ajax({
            url: '/admin/banner/load',
            type: 'post',
            dataType: 'json',
            data: {},
            success: function (resp) {
                var result = resp.data;
                if (result.length > 0) {
                    $(".x_content").empty();
                    //构造
                    for (var j = 0; j < result.length; j++) {
                        banner.initControl(result[j]['id'],result[j]['title'],result[j]['path']);
                    }

                }

            }
        });
    }

    banner.bindEvent();
    banner.buildUploader("pick1");
    banner.initData();


    main.banner = banner;

})(window);
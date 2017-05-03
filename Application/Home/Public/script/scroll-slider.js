/**
 * 首页轮播插件特效
 * Created by spen on 2017/5/3.
 */
(function ($) {
    //banner 轮播
    var unslider04 = $('#banner-scroll').unslider({
            dots: true
        }),
        data04 = unslider04.data('unslider');

    $('.unslider-arrow04').click(function() {
        var fn = this.className.split(' ')[1];
        data04[fn]();
    });

    //新闻轮播
    $('#news-scroll').unslider({
        dots: true
    });
})(jQuery);
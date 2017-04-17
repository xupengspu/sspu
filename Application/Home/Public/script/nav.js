/**
 * Created by spen on 2017/4/17.
 */
(function ($) {
    $(".drop").mouseenter(function(){
        $(this).find('.sub_menu').show();
    });

    $(".drop").mouseleave(function(){
        $(this).find('.sub_menu').hide();
    });
})(jQuery);
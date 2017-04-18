/**
 * Created by hc on 2017/4/18.
 */

function autoScroll(obj) {
    $(obj).find(".moveBox").animate({
        marginTop: "-200px"
    }, 800, function () {
        $(this).css({marginTop: "0px"}).find(".moveBoxItem:first").appendTo(this);
    })
}
$(function () {
    setInterval('autoScroll(".moveContainer")', 5000);
})

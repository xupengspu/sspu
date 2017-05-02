/**
 *
 */
LoginPage = {
    'BindEvent': function () {
        $('#btnSubmit').bind('click', function () {
            var user_id = $('#txtUserId').val();
            var pwd = $('#txtPwd').val();

            $.ajax({
                type: 'post',
                url: '/admin/admin/dologin',
                data: {'user_id': user_id, 'password': pwd},
                dataType: 'json',
                success: function (resp) {
                    if (resp.code == "0") {
                        window.location.href = '/admin/menu/menulist';
                    }
                }

            });
        });

    }
};


$(document).ready(function () {
    LoginPage.BindEvent();
});



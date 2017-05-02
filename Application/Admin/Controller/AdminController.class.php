<?php
/**
 * Created by PhpStorm.
 * User: hc
 * Date: 2017/5/2
 * Time: 14:48
 */

namespace Admin\Controller;


use Admin\Biz\AdminBiz;

class AdminController extends BaseController
{

    /**
     *
     */
    public function login()
    {
        $this->display('/admin/login');
    }

    /**
     * 登录
     */
    public function dologin()
    {
        //用户登陆
        $user_id = I('user_id');
        $password = I('password');

        $error_msg = AdminBiz::login($user_id, $password);

        if (empty($error_msg)) {
            $this->ajaxSuccess();
        } else {
            $this->ajaxFail($error_msg);
        }
        return;

    }

    /**
     *
     */
    public function edit()
    {
        $user_name = cookie('login_user_id');
        $user = M("user")->where("user_name ='$user_name'")->find();
        $this->assign('user',$user);
        $this->display('/user/update_user');
    }

    public function update()
    {
        $password = I("password");
        $encrypt_password = md5('rlQu78NZpd2OwhQG' . $password);
        $user_name = cookie('login_user_id');
        $user = M("user")->where("user_name ='$user_name'")->find();
        $user['password'] = $encrypt_password;
        $id = $user['id'];

        M("user")->where("id='$id'")->save($user);
        $this->ajaxSuccess();

    }
}
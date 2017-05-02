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
    public function dologin ()
    {
        //用户登陆
        $user_id = I('user_id');
        $password = I('password');

        $error_msg = AdminBiz::login($user_id, $password);

        if(empty($error_msg)){
            $this->ajaxSuccess();
        }
        else{
            $this->ajaxFail($error_msg);
        }
        return;

    }
}
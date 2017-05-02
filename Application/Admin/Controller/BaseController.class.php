<?php
/**
 * Created by PhpStorm.
 * User: spen
 * Date: 2017/4/21
 * Time: 21:15
 */

namespace Admin\Controller;


use Think\Controller;

class BaseController extends Controller
{

    function _initialize()
    {
        //验证当前用户是否登陆
        $user_id = cookie('login_user_id');
        if (empty($user_id)) {

            if($_SERVER['REQUEST_URI'] != '/admin/admin/login' && $_SERVER['REQUEST_URI'] != '/admin/admin/dologin' ){
                //未登录
                redirect('/admin/admin/login');
                return;
            }

        }
    }

    /**
     * 成功返回
     * @param $msg
     * @param array $data
     */
    protected function ajaxSuccess($msg = '', $data = array())
    {

        $response = array(
            'code' => 0,
            'data' => $data,
            'msg' => $msg
        );
        $this->ajaxReturn($response);
    }

    /**
     * 失败返回
     * @param $response
     * @internal param $msg
     * @internal param array $data
     */
    protected function ajaxFail($msg)
    {

        $response = array(
            'code' => 1,
            'msg' => $msg
        );
        $this->ajaxReturn($response);
    }
}
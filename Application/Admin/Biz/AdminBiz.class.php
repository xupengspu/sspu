<?php
/**
 * Created by PhpStorm.
 * User: hc
 * Date: 2017/5/2
 * Time: 15:20
 */

namespace Admin\Biz;


class AdminBiz extends BaseBiz
{
    /**
     * 用户登陆
     */
    public static function login($user_id, $password)
    {
        $user_info = M('user')->where("user_name='%s'", $user_id)->find();
        if (empty($user_info)) {
            return '用户不存在';
        }

        $user_id = $user_info['user_name'];
        $encrypt_password = md5('rlQu78NZpd2OwhQG' . $password);
        if ($user_info['password'] != $encrypt_password) {
            return '用户名密码不匹配';
        }

        $safe_code = md5($user_id . C('SystemConfig.encrypt_key') . date("y-m-d", time()));


        cookie(C('AdminConfig.login_cookie_name'),
            $user_id,
            array('expire' => C('AdminConfig.login_cookie_expire')));
        cookie(C('AdminConfig.login_safecode_cookie_name'),
            $safe_code,
            array('expire' => C('AdminConfig.login_cookie_expire')));

        return '';
    }

    public static function logout($user_id)
    {
        cookie('login_user_id', $user_id, array('expire' => -1));
    }
}
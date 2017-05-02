<?php
return array(
    'DEFAULT_MODULE' => 'Home',
    'MODULE_ALLOW_LIST' => array('Home','Admin'),
    'URL_MODEL' => '2',
    'SHOW_PAGE_TRACE' => false,

    'DB_TYPE' => 'mysql', // 数据库类型
    'DB_HOST' => '119.23.55.54', // 服务器地址
    'DB_NAME' => 'sspu', // 数据库名
    'DB_USER' => 'root', // 用户名
    'DB_PWD' => 'hiker123', // 密码
    'DB_PORT' => 3306, // 端口
    'DB_CHARSET' => 'utf8', // 字符集
    'SystemConfig'	=> array(
        'encrypt_key'			=> 'rlQu78NZpd2OwhQG'
    ),
    'AdminConfig'	=> array(
        //登陆的cookie参数设置
        'login_cookie_expire'	=> '7200',
        'login_cookie_name'		=> 'login_user_id',
        'login_safecode_cookie_name'	=> 'admin_safecode_login',
    ),
);
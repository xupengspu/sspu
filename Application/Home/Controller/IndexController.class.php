<?php

namespace Home\Controller;

use Admin\Biz\MenuBiz;
use Think\Controller;

/**
 * 首页控制器
 * Class IndexController
 * @package Home\Controller
 */
class IndexController extends Controller
{

    /**
     * 跳转至首页
     */
    public function index()
    {
        $menus = MenuBiz::search(I('menu_name'));
        $this->assign('menus', $menus);

        //
        $banner = M("banner")->find();
        $this->assign('banner', $banner['path']);


        $this->display('/index');
    }


}
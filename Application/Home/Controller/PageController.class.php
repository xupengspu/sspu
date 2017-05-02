<?php
/**
 * Created by PhpStorm.
 * User: spen
 * Date: 2017/5/2
 * Time: 22:50
 */

namespace Home\Controller;


use Admin\Biz\MenuBiz;
use Think\Controller;

class PageController extends Controller
{
    /**
     * 跳转至首页
     */
    public function content()
    {
        $menus = MenuBiz::search(I('menu_name'));
        $sid = I('sid');

        //查询文章

//        $menu
        $banner = M("banner")->find();
        $this->assign('banner', $banner['path']);


        $this->assign('menus', $menus);
        $this->display('/contet');
    }

    /**
     * 跳转至首页
     */
    public function lists()
    {
        $banner = M("banner")->find();
        $this->assign('banner', $banner['path']);

        $menus = MenuBiz::search(I('menu_name'));
        $this->assign('menus', $menus);
        $this->display('/contet-list');
    }
}
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
        $sid = I("sid");
        $menus = MenuBiz::search(I('menu_name'));
        $banner = M("banner")->find();
        $menu = M("menu")->where("id='$sid'")->find();

        $this->assign('banner', $banner['path']);
        $this->assign('menus', $menus);
        $this->assign('title', $menu['menu_name']);

        //查询文章
        $sql = "select a.title,a.id,a.content ,a.create_time from menu_article ma , article a where ma.article_id=a.id and ma.menu_id='" . I('sid') . "' order by a.create_time desc";
        $result = M()->query($sql);


        if (sizeof($result) > 1) {
            $this->assign('contents', $result);
            $this->display('/contet-list');
        } else {
            $this->assign('content', $result[0]);
            $this->display('/contet');
        }
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

    /**
     * 查看详情
     */
    public function detail()
    {
        $menus = MenuBiz::search();
        $banner = M("banner")->find();
        $article_id = I("aid");

        $this->assign('banner', $banner['path']);
        $this->assign('menus', $menus);

        $result = M("article")->where("id='$article_id'")->find();
        $this->assign('content', $result);
        $this->assign('title', $result['title']);
        $this->display('/contet');
    }
}
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

        //banner 图片
        $banner = M("banner")->select();
        $this->assign('banners', $banner);

        //新闻动态图片轮播
        $new_rec = M("article")->where("type=0 and recommend=1")->select();
        $this->assign('rec_articles', $new_rec);

        //查看产品
        $products = M("product")->limit(8)->select();
        $this->assign('products', $products);

        //合作范例
        $coper = M("article")->where("type=2")->select();
        $this->assign('copers', $coper);

        //视频
        $video = M("video")->find();
        $this->assign('video', $video);

        //教师范例

        //查询新闻列表
        $articles = M("article")->where("type=0")->order("create_time desc")->select();
        $this->assign('top_article', $articles[0]);
        unset($articles[0]);
        $this->assign('arts', $articles);

        $this->display('/index');
    }


}
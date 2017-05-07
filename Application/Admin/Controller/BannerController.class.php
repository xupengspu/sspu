<?php
/**
 * Created by PhpStorm.
 * User: spen
 * Date: 2017/5/1
 * Time: 20:01
 */

namespace Admin\Controller;

use Admin\Biz\BannerBiz;

/**
 * 横幅图片管理
 * Class BannerController
 * @package Admin\Controller
 */
class BannerController extends BaseController
{
    public function banner()
    {
        $this->display('/banner/upload');
    }

    /**
     * 上传
     */
    public function upload()
    {
        $upload = new \Think\Upload();// 实例化上传类
        $upload->maxSize = 3145728;// 设置附件上传大小
        $upload->exts = array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
        $upload->rootPath = './Uploads/'; // 设置附件上传根目录
        $upload->savePath = ''; // 设置附件上传（子）目录
        // 上传文件
        $info = $upload->upload();

        if (!$info) {// 上传错误提示错误信息
            $this->error($upload->getError());
        } else {// 上传成功
            $banner = BannerBiz::savePath('/Uploads/' . $info['file']['savepath'] . $info['file']['savename']);
            $this->ajaxSuccess('', $banner);
        }
    }

    /**
     * 获取图片
     */
    public function load()
    {
        $banners = BannerBiz::listBanner();
        $this->ajaxSuccess('', $banners);
    }

    /**
     *
     */
    public function remove()
    {
        BannerBiz::removeBanner();
        $this->ajaxSuccess();
    }

    /**
     * 添加文章
     */
    public function addArticle()
    {
        $banner = BannerBiz::addArticle();
        $this->ajaxSuccess('', $banner);
    }

    /**
     * 选择文章
     */
    public function selectArticle()
    {
        $this->assign('banner_id', I('banner_id'));
        $this->display('/banner/article-selector');
    }


}
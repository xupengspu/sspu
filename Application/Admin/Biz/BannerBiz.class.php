<?php
/**
 * Created by PhpStorm.
 * User: spen
 * Date: 2017/5/1
 * Time: 22:35
 */

namespace Admin\Biz;


class BannerBiz extends BaseBiz
{
    /**
     * 保存路径
     * @param $path
     * @return array
     */
    public static function savePath($path)
    {
//        M('banner')->execute('delete from banner');
        $banner = array(
            'id' => self::getUUID(),
            'path' => $path
        );
        M('banner')->add($banner);

        return $banner;
    }

    /**
     * 删除Banner
     */
    public static function removeBanner()
    {
        $banner_id = I('id');
        M('banner')->where("id='$banner_id'")->delete();
    }

    /**
     * 添加文章
     */
    public static function addArticle()
    {
        $article_id = I('article_id');
        $banner_id = I("banner_id");

        $banner = M("banner")->where("id = '$banner_id'")->find();
        $banner['article_id'] = $article_id;

        M('banner')->where("id = '$banner_id'")->save($banner);
        return $banner;
    }

    /**
     *
     */
    public static function listBanner()
    {
        $sql = "select a.title as title , b.id as id , b.path as path from banner b INNER  JOIN  article a where a.id = b.article_id";
        $result = M()->query($sql);
        return $result;
    }


}
<?php
/**
 * Created by PhpStorm.
 * User: spen
 * Date: 2017/4/30
 * Time: 23:37
 */

namespace Admin\Biz;


class BlogBiz extends BaseBiz
{

    public static function saveNews()
    {
        $id = I('id');
        if (empty($id)) {
            $news = array(
                'id' => self::getUUID(),
                'title' => I('title'),
                'type' => I('type'),
                'content' => urldecode(I('content')),
                'create_time' => date("Y-m-d H:i:s", time()),
                'update_time' => date("Y-m-d H:i:s", time())

            );
            M('article')->add($news);
        } else {
            $news = array(
                'title' => I('title'),
                'type' => I('type'),
                'content' => urldecode(I('content')),
                'update_time' => date("Y-m-d H:i:s", time())

            );
            M('article')->where("id='$id'")->save($news);
        }

    }

    /**
     * 查询文章
     */
    public static function search()
    {
        $title = I('title');
        $condition = array();
        if (!empty($title)) {
            $condition['title'] = array('like', "%$title%");
        }
        $result = M('article')->where($condition)->select();
        return $result;
    }

    /**
     * 删除行
     */
    public static function removeRow()
    {
        $id = I('id');
        M('article')->where("id='$id'")->delete();
    }

    /**
     * @param $coverpath
     */
    public static function saveCover($id, $coverpath)
    {
        $article = M('article')->where("id = '$id'")->find();
        $article['coverage'] = $coverpath;
        $article['recommend'] = 1;

        M('article')->where("id = '$id'")->save($article);
    }


}
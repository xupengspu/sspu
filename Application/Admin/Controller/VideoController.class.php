<?php
/**
 * Created by PhpStorm.
 * User: spen
 * Date: 2017/5/7
 * Time: 22:01
 */

namespace Admin\Controller;


use Admin\Biz\BaseBiz;

class VideoController extends BaseController
{

    public function video()
    {
        $video = M("video")->find();
        $this->assign('video', $video);
        $this->display('/video/video');
    }

    /**
     * 更新
     */
    public function update()
    {
        $url = urldecode(I('url'));
        $v = M('video')->find();
        if (sizeof($v) == 0) {
            $video_new = array(
                'id' => BaseBiz::getUUID(),
                'url' => $url
            );
            M('video')->add($video_new);
        } else {
            $id = $v['id'];
            $v['url'] = $url;
            M('video')->where("id='$id'")->save($v);
        }


        $this->ajaxSuccess();
    }
}
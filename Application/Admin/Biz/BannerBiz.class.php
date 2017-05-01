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
    public static  function savePath($path)
    {
        M('banner')->execute('delete from banner');
        $banner = array(
            'id' => self::getUUID(),
            'path' => $path
        );
        M('banner')->add($banner);
    }
}
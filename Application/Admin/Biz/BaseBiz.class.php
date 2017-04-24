<?php
/**
 * Created by PhpStorm.
 * User: spen
 * Date: 2017/4/21
 * Time: 22:50
 */

namespace Admin\Biz;


class BaseBiz
{

    public static function getUUID()
    {
        $result = M()->query("select uuid() as uuid");
        return $result[0]['uuid'];

    }

}
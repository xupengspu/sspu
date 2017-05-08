<?php
/**
 * Created by PhpStorm.
 * User: spen
 * Date: 2017/5/8
 * Time: 22:08
 */

namespace Admin\Biz;


class SupplierBiz extends BaseBiz
{

    public static function search()
    {
        $supplier_name = I('supplier_name');
        $supplier_level = I('supplier_level');

        $condition = array();
        if (!empty($supplier_level)) {
            $condition['supplier_level'] = $supplier_level;
        }
        if (!empty($supplier_name)) {
            $condition['supplier_name'] = array('like', "%$supplier_name%");
        }

        $result = M('supplier')->where($condition)->select();
        return $result;
    }

}
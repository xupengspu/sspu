<?php
/**
 * Created by PhpStorm.
 * User: hc
 * Date: 2017/5/11
 * Time: 17:15
 */

namespace Admin\Biz;

/**
 * 产品业务类
 * Class ProductBiz
 * @package Admin\Biz
 */
class ProductBiz extends BaseBiz
{

    /**
     * 查询
     * @param $product_name
     * @param $product_code
     * @return mixed
     */
    public static function search($product_name, $product_code)
    {
        $condition = array();
        if (!empty($product_name)) {
            $condition['product_name'] = array('like', "%" . $product_name . "%");
        }
        if (!empty($product_code)) {
            $condition['product_code'] = array('like', "%" . $product_code . "%");
        }


        $result = M("product")->where($condition)->select();

        return $result;
    }
}
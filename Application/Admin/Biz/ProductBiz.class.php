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

    /**
     * 保存供应商
     */
    public static function addSupplier()
    {
        $product_id = I("product_id");
        $supplier_ids = I("supplier_ids");
        foreach ($supplier_ids as $supplier_id) {

            $supplier_product = array(
                'id' => self::getUUID(),
                'product_id' => $product_id,
                'supplier_id' => $supplier_id
            );
            M('supplier_product')->add($supplier_product);
        }
    }
    /**
     * 保存供应商
     */
    public static function addSuppliers($product_id,$supplier_ids)
    {

        foreach ($supplier_ids as $supplier_id) {

            $supplier_product = array(
                'id' => self::getUUID(),
                'product_id' => $product_id,
                'supplier_id' => $supplier_id
            );
            M('supplier_product')->add($supplier_product);
        }
    }
}
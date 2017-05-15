<?php
/**
 * Created by PhpStorm.
 * User: spen
 * Date: 2017/5/14
 * Time: 0:30
 */

namespace Home\Controller;


use Think\Controller;

class ProductController extends Controller
{

    public function detail()
    {
        $id = I("pid");
        $product = M("product")->where("id='$id'")->find();
        $this->assign('product', $product);

        //查询供应商
        $sql = "select s.supplier_name ,s.supplier_level,s.contact,s.tel,s.mobile,s.address from
                supplier s , supplier_product sp where sp.product_id='" . $id . "' order by s.supplier_level asc";
        $result = M()->query($sql);
        $this->assign('suppliers', $result);

        $this->display('/product_detail');
    }
}
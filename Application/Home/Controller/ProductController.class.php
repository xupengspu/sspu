<?php
/**
 * Created by PhpStorm.
 * User: hc
 * Date: 2017/5/16
 * Time: 13:58
 */

namespace Home\Controller;


use Think\Controller;

class ProductController extends Controller
{

    /**
     * 列表
     */
    public function lists()
    {
        $product = M("product")->select();
        $this->assign('products' , $product);
        $this->display('/product-list');
    }
}
<?php
/**
 * Created by PhpStorm.
 * User: spen
 * Date: 2017/5/10
 * Time: 22:57
 */

namespace Admin\Controller;

/**
 * 产品控制器
 * Class ProductController
 * @package Admin\Controller
 */
class ProductController extends BaseController
{

    /**
     * 产品列表
     */
    public function productlist()
    {
        $this->display("/product/product_list");
    }

    /**
     * 添加产品
     */
    public function addproduct()
    {
        $this->display("/product/add_product");
    }

}
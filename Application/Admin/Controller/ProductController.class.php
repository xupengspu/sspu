<?php
/**
 * Created by PhpStorm.
 * User: spen
 * Date: 2017/5/10
 * Time: 22:57
 */

namespace Admin\Controller;

use Admin\Biz\BaseBiz;
use Admin\Biz\ProductBiz;

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
        $this->assign("id", I("id"));
        $this->display("/product/add_product");
    }

    /**
     * 加载信息
     */
    public function load()
    {
        $id = I('id');
        $product = M('product')->where("id = '$id'")->find();
        $this->ajaxSuccess('', $product);
    }

    /**
     * 查询
     */
    public function search()
    {
        $product_name = I("product_name");
        $product_code = I("product_code");

        $result = ProductBiz::search($product_name, $product_code);
        $this->ajaxSuccess('', $result);
    }


    /**
     * 上传
     */
    public function upload()
    {
        $upload = new \Think\Upload();// 实例化上传类
        $upload->maxSize = 3145728;// 设置附件上传大小
        $upload->exts = array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
        $upload->rootPath = './Uploads/'; // 设置附件上传根目录
        $upload->savePath = ''; // 设置附件上传（子）目录
        // 上传文件
        $info = $upload->upload();

        if (!$info) {// 上传错误提示错误信息
            $this->error($upload->getError());
        } else {// 上传成功
            $this->ajaxSuccess('', '/Uploads/' . $info['file']['savepath'] . $info['file']['savename']);
        }
    }

    /**
     * baocun
     */
    public function save()
    {

        $product = I('product');
        $product_id = $product['id'];
        $supplier_ids = $product['supplier_ids'];

        $product['detail'] = urldecode($product['detail']);
        if (empty($product['id'])) {
            $product['id'] = BaseBiz::getUUID();
            $product_id = $product['id'];
            M('product')->add($product);
        } else {
            $id = $product['id'];
            M('product')->where("id='$id'")->save($product);
        }

        //清空
        M("supplier_product")->where("product_id='$product_id'")->delete();
        ProductBiz::addSuppliers($product_id, $supplier_ids);

        $this->ajaxSuccess();
    }

    /**
     * 删除信息
     */
    public function remove()
    {
        $id = I('id');

        M('product')->where("id = '$id'")->delete();
        $this->ajaxSuccess();
    }

    public function addsupplier()
    {
        ProductBiz::addSupplier();
        $this->ajaxSuccess();
    }
}
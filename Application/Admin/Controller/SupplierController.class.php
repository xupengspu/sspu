<?php
/**
 * Created by PhpStorm.
 * User: spen
 * Date: 2017/5/8
 * Time: 21:49
 */

namespace Admin\Controller;

use Admin\Biz\BaseBiz;
use Admin\Biz\SupplierBiz;

/**
 * 供应商控制器
 * Class SupplierController
 * @package Admin\Controller
 */
class SupplierController extends BaseController
{

    /**
     * 供应商
     */
    public function supplierlist()
    {
        $this->display('/supplier/supplier-list');
    }

    /**
     * 查询
     */
    public function search()
    {
        $result = SupplierBiz::search();
        $this->ajaxSuccess('', $result);
    }

    public function load()
    {
        $id = I('id');
        $teacher = M('supplier')->where("id = '$id'")->find();
        $this->ajaxSuccess('', $teacher);
    }

    /**
     * 跳转到添加教师页面
     */
    public function addSupplier()
    {
        $this->assign('id', I('id'));
        $this->display('/supplier/add-supplier');
    }

    /**
     * 保存供应商信息
     */
    public function save()
    {
        $supplier = I('supplier');
        if (empty($supplier['id'])) {

            $supplier['id'] = BaseBiz::getUUID();
            M('supplier')->add($supplier);
        } else {
            $id = $supplier['id'];
            M('supplier')->where("id='$id'")->save($supplier);
        }

        $this->ajaxSuccess();
    }


    /**
     * 删除信息
     */
    public function remove()
    {
        $id = I('id');
        M('supplier')->where("id = '$id'")->delete();
        $this->ajaxSuccess();
    }

    /**
     * supplier 选择
     */
    public function supplier_selector()
    {
        $this->assign("product_id", I('id'));
        $this->display("/supplier/supplier_selector");
    }

    public function loadByIds()
    {
        $ids = I("ids");
        $condition['id'] = array("in", $ids);
        $result = M("supplier")->where($condition)->select();
        $this->ajaxSuccess('', $result);
    }

    /**
     * 查询产品供应商
     */
    public function querySupplierByProduct()
    {
        $product_id = I("product_id");

        $sql = "SELECT  s.supplier_name,s.supplier_level,s.id FROM supplier_product sp  INNER JOIN   supplier s 
                WHERE sp.supplier_id = s.id and sp.product_id='" . $product_id . "' ";

        $result = M()->query($sql);

        $this->ajaxSuccess('', $result);

    }

    public function removeProSupplier()
    {
        $supplier_id = I("supplier_id");
        $product_id = I("product_id");
        $condition = array();

        $condition['supplier_id'] = $supplier_id;
        $condition['product_id'] = $product_id;

        M('supplier_product')->where($condition)->delete();

        $this->ajaxSuccess();
    }
}
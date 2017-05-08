<?php
/**
 * Created by PhpStorm.
 * User: spen
 * Date: 2017/5/8
 * Time: 21:49
 */

namespace Admin\Controller;

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
    public function addTeacher()
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

}
<?php
/**
 * Created by PhpStorm.
 * User: spen
 * Date: 2017/5/2
 * Time: 23:59
 */

namespace Admin\Controller;


use Admin\Biz\BaseBiz;

class AddressController extends BaseController
{

    /**
     * 显示页面
     */
    public function edit()
    {
        $address = M('address')->find();
        $this->assign('address', $address['address']);
        $this->display("/address/address");
    }

    /**
     * 更新
     */
    public function update()
    {
        $add = I('address');
        $address = M('address')->find();
        if (sizeof($address) == 0) {
            $address_new = array(
                'id' => BaseBiz::getUUID(),
                'address' => $add
            );
            M('address')->add($address_new);
        } else {
            $id = $address['id'];
            $address['address'] = $add;
            M('address')->where("id='$id'")->save($address);
        }


        $this->ajaxSuccess();
    }
}
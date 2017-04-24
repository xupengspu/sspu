<?php

namespace Admin\Controller;

use Admin\Biz\MenuBiz;

/**
 * 菜单控制器
 * Class MenuController
 * @package Admin\Controller
 */
class MenuController extends BaseController
{

    /**
     * 菜单列表
     */
    public function menulist()
    {
//        echo phpinfo();

        $this->display("/menu/menu-list");
    }

    /**
     * 添加菜单
     */
    public function addMenu()
    {
        $this->display("/menu/addMenu");
    }

    /**
     * 保存菜单
     */
    public function saveMenu()
    {
        $menu_name = I('menu_name');
        $parent_id = I('parent_id');
        MenuBiz::save($menu_name, $parent_id);
        $this->ajaxSuccess();
    }

    /**
     * 查询菜单
     */
    public function search()
    {
        $result = MenuBiz::search(I('menu_name'));
        $this->ajaxSuccess('' , $result);
    }
}
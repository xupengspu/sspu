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
        $id = I('id');
        $menu = M('menu')->where("id='$id'")->find();
        $this->assign('parent' , $menu);

        $this->display("/menu/addMenu");
    }

    /**
     * 更新菜单
     */
    public function editMenu()
    {
        $id = I('id');
        $menu = M('menu')->where("id='$id'")->find();
        $this->assign('menu_name' , $menu['menu_name']);
        $this->assign('id' , $menu['id']);

        $this->display("/menu/editMenu");
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
     * 更新菜单
     */
    public function updateMenu()
    {
        $menu_name = I('menu_name');
        $id = I('id');
        MenuBiz::update($menu_name, $id);
        $this->ajaxSuccess();
    }


    /**
     * 查询菜单
     */
    public function search()
    {
        $result = MenuBiz::search(I('menu_name'));
        $this->ajaxSuccess('', $result);
    }

    /**
     * 查询菜单
     */
    public function delete()
    {
        MenuBiz::delete(I('id'));
        $this->ajaxSuccess('');
    }
}
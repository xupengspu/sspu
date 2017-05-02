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
        $this->assign('parent', $menu);

        $this->display("/menu/addMenu");
    }

    /**
     * 更新菜单
     */
    public function editMenu()
    {
        $id = I('id');
        $menu = M('menu')->where("id='$id'")->find();
        $parent_id = $menu['parent_id'];
        $parent = M('menu')->where("id ='$parent_id'")->find();
        $this->assign('menu_name', $menu['menu_name']);
        $this->assign('parent', $parent);
        $this->assign('id', $menu['id']);

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
        $result = MenuBiz::search();
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

    /**
     * 菜单文章
     */
    public function menucontent()
    {
        $id = I('id');
        $menu = M('menu')->where("id='$id'")->find();
        $parent_id = $menu['parent_id'];
        $parent = M('menu')->where("id ='$parent_id'")->find();

        $this->assign('menu', $menu);
        $this->assign('parent', $parent);

        $this->display('/menu/menu_content');

    }

    public function content()
    {
        $id = I('id');
        $article_ids = M('menu_article')->field('article_id')->where("menu_id='$id'")->select();
        $id_array = array();
        foreach ($article_ids as $article_id){
            array_push($id_array,$article_id['article_id']);
        }

        $condition = array();
        $condition['id'] = array('in', $id_array);
        $articles = M('article')->where($condition)->select();

        $this->ajaxSuccess('', $articles);
    }

    /**
     * 删除文章
     */
    public function content_remove()
    {
        $menu_id = I('menu_id');
        $article_id = I("article_id");

        M('menu_article')->where("menu_id='$menu_id' and article_id='$article_id'")->delete();

        $this->ajaxSuccess();
    }


    public function addcontent()
    {
        $menu_id = I('menu_id');
        $article_ids = I("article_ids");

        MenuBiz::addcontent($menu_id ,$article_ids );

        $this->ajaxSuccess();
    }
}
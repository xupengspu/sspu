<?php
namespace Admin\Controller;
use Think\Controller;

/**
 * 菜单控制器
 * Class MenuController
 * @package Admin\Controller
 */
class MenuController extends Controller {

    /**
     * 菜单列表
     */
    public function menulist(){
        $this->display("/menu/menu-list");
    }

    public function addMenu(){
        $this->display("/menu/addMenu");
    }
}
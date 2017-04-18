<?php
namespace Admin\Controller;
use Think\Controller;

/**
 * 菜单控制器
 * Class MenuController
 * @package Admin\Controller
 */
class MenuController extends Controller {
    public function menulist(){
        $this->display("/menu/menu-list");
    }
}
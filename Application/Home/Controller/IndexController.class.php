<?php
namespace Home\Controller;
use Think\Controller;

/**
 * 首页控制器
 * Class IndexController
 * @package Home\Controller
 */
class IndexController extends Controller {

    /**
     * 跳转至首页
     */
    public function index(){
        $this->display('/index');
    }

    /**
     * 跳转至首页
     */
    public function content(){
        $this->display('/contet');
    }

    /**
     * 跳转至首页
     */
    public function lists(){
        $this->display('/contet-list');
    }
}
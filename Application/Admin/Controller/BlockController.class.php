<?php
/**
 * Created by PhpStorm.
 * User: spen
 * Date: 2017/4/30
 * Time: 14:02
 */

namespace Admin\Controller;


use Admin\Biz\BlogBiz;
use Think\Upload;

class BlockController extends BaseController
{

    /**
     * 打开页面
     */
    public function blog()
    {
        $this->display('/block/blog');
    }

    //上传图片
    public function upload()
    {
        date_default_timezone_set("Asia/chongqing");
        error_reporting(E_ERROR);
        header("Content-Type: text/html; charset=utf-8");

        $CONFIG = json_decode(preg_replace("/\/\*[\s\S]+?\*\//", "", file_get_contents("config.json")), true);
        $action = $_GET['action'];
        if ('uploadimage' == $action) { //上传图片
            //处理图片上传开始
            //实例化上传类
            $upload = new Upload();
            //配置
            $upload->subName = array('date', 'Ym');//子目录创建方式
            //上传
            $info = $upload->upload();
            //p($info);//上传信息
            if ($info) {
                /**
                 * 得到上传文件所对应的各个参数,数组结构
                 * array(
                 *     "state" => "",          //上传状态，上传成功时必须返回"SUCCESS"
                 *     "url" => "",            //返回的地址
                 *     "title" => "",          //新文件名
                 *     "original" => "",       //原始文件名
                 *     "type" => ""            //文件类型
                 *     "size" => "",           //文件大小
                 * )
                 */
                $arr = array(
                    'state' => 'SUCCESS',
                    'url' => 'http://' . $_SERVER['SERVER_NAME'] . '/Uploads/' . $info['upfile']['savepath'] . $info['upfile']['savename'],
                    'title' => $info['upfile']['savename'],
                    'original' => $info['upfile']['name'],
                    'type' => $info['upfile']['ext'],
                    'size' => $info['upfile']['size']
                );
                //print_r($arr);
                /* 返回数据 */
                $result = json_encode($arr);
            } else {
                $arr = array('state' => $upload->getError());
            }
            //图片上传结束
        } elseif ('config' == $action) { //加载配置
            $result = json_encode($CONFIG);
        }
        /* 输出结果 */
        if (isset($_GET["callback"])) {
            if (preg_match("/^[\w_]+$/", $_GET["callback"])) {
                echo htmlspecialchars($_GET["callback"]) . '(' . $result . ')';
            } else {
                echo json_encode(array(
                    'state' => 'callback参数不合法'
                ));
            }
        } else {
            echo $result;
        }
    }

    /**
     * 保存新闻
     */
    public function saveNews()
    {
        BlogBiz::saveNews();
        $this->ajaxSuccess();
    }

    /**
     * 查询文章
     */
    public function search()
    {
        $result = BlogBiz::search();
        $this->ajaxSuccess('', $result);
    }

    /**
     *
     */
    public function blocklist()
    {
        $this->display('/block/block-list');
    }

    /**
     * 删除
     */
    public function remove()
    {
        BlogBiz::removeRow();
        $this->ajaxSuccess();
    }

    /**
     * 打开页面
     */
    public function editblock()
    {
        $this->assign('id', I('id'));
        $this->display('/block/blog');
    }

    public function loadblock()
    {
        $id = I('id');
        $result = M('news')->where("id='$id'")->find();
        $this->ajaxSuccess('',$result);
    }
}
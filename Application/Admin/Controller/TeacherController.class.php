<?php
/**
 * Created by PhpStorm.
 * User: spen
 * Date: 2017/5/5
 * Time: 21:07
 */

namespace Admin\Controller;


use Admin\Biz\BaseBiz;

class TeacherController extends BaseController
{

    public function lists()
    {
        $this->display('/teacher/list');
    }

    public function load()
    {
        $id = I('id');
        $teacher = M('teacher')->where("id = '$id'")->find();
        $this->ajaxSuccess('' , $teacher);
    }

    /**
     * 跳转到添加教师页面
     */
    public function addTeacher()
    {
        $this->assign('id' , I('id'));
        $this->display('/teacher/addTeacher');
    }

    /**
     * 上传
     */
    public function upload()
    {
        $upload = new \Think\Upload();// 实例化上传类
        $upload->maxSize = 3145728;// 设置附件上传大小
        $upload->exts = array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
        $upload->rootPath = './Uploads/'; // 设置附件上传根目录
        $upload->savePath = ''; // 设置附件上传（子）目录
        // 上传文件
        $info = $upload->upload();

        if (!$info) {// 上传错误提示错误信息
            $this->error($upload->getError());
        } else {// 上传成功
            $this->ajaxSuccess('', '/Uploads/' . $info['file']['savepath'] . $info['file']['savename']);
        }
    }


    public function save()
    {
        $teacher = I('teacher');
        $teacher['introduction'] = urldecode($teacher['introduction']);
        if (empty($teacher['id'])) {

            $teacher['id'] = BaseBiz::getUUID();
            M('teacher')->add($teacher);
        } else {
            $id = $teacher['id'];
            M('teacher')->where("id='$id'")->save($teacher);
        }

        $this->ajaxSuccess();
    }

    public function search()
    {
        $name = I('name');
        $teacher = M('teacher')->where("name like '%$name%'")->select();
        $this->ajaxSuccess('', $teacher);
    }


    /**
     * 删除信息
     */
    public function remove()
    {
        $id = I('id');

        M('teacher')->where("id = '$id'")->delete();
        $this->ajaxSuccess();
    }


}
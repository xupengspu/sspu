<?php

namespace Admin\Biz;
/**
 * Created by PhpStorm.
 * User: spen
 * Date: 2017/4/21
 * Time: 21:07
 */
class MenuBiz extends BaseBiz
{

    /**
     * 保存菜单
     * @param $menu_name 菜单名称
     * @param $parent_id 父亲ID
     */
    public static function save($menu_name, $parent_id)
    {
        $level = 0;
        if (!empty($parent_id)) {
            $level = 1;
        }
        $menu = array(
            'id' => self::getUUID(),
            'level' => $level,
            'menu_name' => $menu_name,
            'parent_id' => $parent_id
        );

        M('menu')->add($menu);
    }

    /**
     * 查询菜单
     * @param $menu_name 菜单名称
     * @return mixed 结果集
     */
    public static function search($menu_name)
    {
        $main_menus = M('menu')->where('level = 0')->select();


        foreach ($main_menus as &$main_menu) {
            $parent_id = $main_menu['id'];
            $sub_menus = M('menu')->where("parent_id = '$parent_id'")->select();
            $main_menu['children'] = $sub_menus;
        }
        return $main_menus;
    }

    /**
     * 删除
     * @param $id
     */
    public static function delete($id)
    {
        M('menu')->where("id='$id' or parent_id='$id'")->delete();

    }

    /**
     * 更新菜单
     * @param $menu_name
     * @param $id
     */
    public static function update($menu_name, $id)
    {
        $menu = M('menu')->where("id='$id'")->find();
        $menu['menu_name'] = $menu_name;
        M('menu')->where("id='$id'")->save($menu);
    }

    public static function addcontent($menu_id, $article_ids)
    {
        foreach ($article_ids as $article_id) {

            $menu_article = array(
                'id' => self::getUUID(),
                'menu_id' => $menu_id,
                'article_id' => $article_id
            );
            M('menu_article')->add($menu_article);
        }
    }


}
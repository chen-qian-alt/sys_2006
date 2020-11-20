//根据服务器用户返回的menuList数据和allRoutees进行匹配

// const { default: allRoutes } = require("../router/allRouters");


/**
 * 
 * @param {Array} allRoutes  用户的有效的完整路由配置
 * @param {Array} menuList  服务器妇女会的用户菜单名字
 */

import allRouters from "../router/allRouters"

const recursionRoutes = (allRoutes,menuList) => {
    let userRoutes = []
    allRoutes.forEach(item => {
        menuList.forEach(v => {
            if(item.meta.name === v.name) {
                if(v.children&&v.children.length>0){
                    item.children = recursionRoutes(item.children,v.children)
                }
                userRoutes.push(item)
            }
        })
    })
    return userRoutes
}

export default recursionRoutes

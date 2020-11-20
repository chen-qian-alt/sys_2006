import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/styles/base.css";
import "@/assets/styles/el-reset.css";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入iconont
import './assets/iconfont/iconfont.css'
// Vue.config.productionTip = false;


//引入subMenu组件
import qfSubMenu from "qf-sub-menu"
//nprogress进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(ElementUI);
Vue.use(qfSubMenu);

//按需引入
// import { Carousel,CarouselItem } from 'element-ui';

//注册组件
// Vue.component('el-carousel',Carousel)
// Vue.component('el-carousel-item',CarouselItem)


//路由前置钩子（导航守卫）
router.beforeEach((to, from, next) => {
  NProgress.start()
  //用户登入之后,localstorage中有token
  let token = localStorage.getItem('qf2006-token') || null;
  // console.log(token);
  // console.log(to);
  if(token) {
    // console.log("有token");
    //如果是注册页面或者是登入页面，直接放行;
    if(store.state.menuList.length == 0) {
      //说明没有用户路由，触发action获取用户路由
      store.dispatch('FETCH_MENULIST').then(()=>{
        next({path: to.path })
      })
    }else{
      next()
    }

  }else {//没token
    // console.log("有token");
    if(to.path === "/login") {
      
      next()
    }else { //访问的不是登入页，就要跳转到登入页
      next({ path:"/login" })
    }
  }
   
})


import "./utils/recursionRoutes"


//使用路由购置钩子处理面包屑
router.afterEach((to,from) => {
  console.log(to);
  let crumblist = to.matched.slice(1)
  console.log(crumblist);
  store.commit("SET_CRUMBS",crumblist)
  NProgress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

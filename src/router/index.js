// 路由组件文件
import VueRouter from 'vue-router'
// 引入vue
import Vue from 'vue'

// 引入Login组件
import login from '@/views/login'
// 引入首页组件
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
Vue.use(VueRouter)

// 实例化
export default new VueRouter({
  routes: [
    // {
    //   // 打开项目默认地址为"/"时,跳转至登陆界面
    //   path: '/',
    //   redirect: '/login'
    // },

    {
      // 登陆路由 - 一级路由
      path: '/login',
      component: login
    },
    {
      // 首页路由 - 一级路由
      path: '/',
      component: Home,
      // 设置二级路由
      children: [
        {
          path: '/',
          component: Welcome
        }
      ]
    },
    { path: '*', component: NotFound }
  ]
})

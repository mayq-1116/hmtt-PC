// 路由组件文件
import VueRouter from 'vue-router'
// 引入vue
import Vue from 'vue'

// 引入Login组件
import login from '@/views/login'
// 引入首页组件
import Home from '@/views/home'
Vue.use(VueRouter)

// 实例化
export default new VueRouter({
  routes: [
    {
      // 打开项目默认地址为"/"时,跳转至登陆界面
      path: '/',
      redirect: '/login'
    },
    {
      // 登陆路由
      path: '/login',
      component: login
    },
    {
      // 首页路由
      path: '/home',
      component: Home
    }
  ]
})

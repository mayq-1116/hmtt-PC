// 路由组件文件
import VueRouter from 'vue-router'
// 引入vue
import Vue from 'vue'

// 引入Login组件
import login from '@/views/login'
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
      path: '/login',
      component: login
    }
  ]
})

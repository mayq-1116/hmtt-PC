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
import Article from '@/views/article'
import Image from '@/views/image'
import Publish from '@/views/publish'

// 引入存储API文件
import localStore from '@/utils/store'
Vue.use(VueRouter)

// 实例化
const router = new VueRouter({
  routes: [
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
        { path: '/', component: Welcome },
        // 内容管理
        { path: '/article', component: Article },
        // 素材管理
        { path: '/image', component: Image },
        // 发布文章
        { path: '/publish', component: Publish }
      ]
    },
    { path: '*', component: NotFound }
  ]
})

// 添加路由的导航守卫(前置导航守卫)
router.beforeEach((to, from, next) => {
  /*
      参数:
        to: 跳转到的目标 路由对象
        from 从哪里跳转到目标 路由对象
        next: 下一步方法
          - 放行: next('/login')
          - 拦截: 写处理函数
    */
  // 当每次跳转路由前触发(获取数据时)
  const user = localStore.getUser()
  // 判断是否获取到用户信息,并且携带token
  if (user && user.token) {
    // 登陆成功,放行
    next()
  } else {
    // 登陆不成功,跳转回登陆界面
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

export default router

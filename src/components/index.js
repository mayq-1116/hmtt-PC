// 用于封装Vue插件的文件

// 引入封装的面包屑导航文件
import BreadCrumbs from '@/components/breadCrumbs'

export default {
  install (Vue) { // Vue 是一个构造函数
    // 注册全局面包屑组件
    Vue.component('bread-crumbs', BreadCrumbs)
  }
}

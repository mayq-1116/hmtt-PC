// 用于封装Vue插件的文件

// 引入封装的面包屑导航文件
import BreadCrumbs from '@/components/breadCrumbs'
// 引入封装频道组件
import Channel from '@/components/channel'
// 引入封面组件
import MyImage from '@/components/my-image'

export default {
  install (Vue) { // Vue 是一个构造函数
    // 注册全局面包屑组件
    Vue.component('bread-crumbs', BreadCrumbs)
    // 注册频道组件
    Vue.component('my-channel', Channel)
    // 注册封面组件
    Vue.component('my-image', MyImage)
  }
}

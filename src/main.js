import Vue from 'vue'
import App from './App.vue'

// 引入elementUi
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入vue-router
import router from '@/router'

// 引入封装的面包屑导航文件
import BreadCrumbs from '@/components/breadCrumbs'
// 引入axios
import axios from '@/api'
// 注册全局组件
Vue.component('bread-crumbs', BreadCrumbs)
// 将axios设置在原型上
Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  // 挂载router
  router,
  render: h => h(App)
}).$mount('#app')

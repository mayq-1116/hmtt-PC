import Vue from 'vue'
import App from './App.vue'

// 引入elementUi
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入vue-router
import router from '@/router'

// 引入axios
import axios from '@/api'

// 引入封装的Vue插件
import plugin from '@/components'

// 将axios设置在原型上
Vue.prototype.$http = axios

// 注册Vue插件
Vue.use(plugin)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  // 挂载router
  router,
  render: h => h(App)
}).$mount('#app')

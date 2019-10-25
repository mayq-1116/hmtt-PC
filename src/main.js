import Vue from 'vue'
import App from './App.vue'

// 引入elementUi
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入vue-router
import router from '@/router'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  // 挂载router
  router,
  render: h => h(App)
}).$mount('#app')

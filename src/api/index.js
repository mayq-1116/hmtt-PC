// 导出配置好的axios文件
// 引入axios
import axios from 'axios'

// 引入存储API
import localStore from '@/utils/store'

// 引入路由
import router from '@/router'

// 设置基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 配置默认的自定义请求头
// 如果有用户信息,才能获取到token,才执行判断内的代码,如果没有(未登录),不会验证token
// if (localStore.getUser()) {
//   axios.defaults.headers.Authorization = `Bearer ${localStore.getUser().token}`
// }

// 设置请求拦截器 / 在每次请求前获取token,而不是在页面初始化时获取token
axios.interceptors.request.use((config) => {
  // 拦截成功,往请求头中添加token
  // 如果拿到就用localStore.getUser(),没有拿到就返回一个空对象
  const user = localStore.getUser() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, (err) => {
  return Promise.reject(err)
})

// 由于token有时效,会时效,或会有无效token
// 设置响应拦截器,当token时效后,自动跳转至登陆界面,需要重新登陆获取token
axios.interceptors.response.use(res => {
  return res
}, (err) => {
  // 获取响应体中的状态码 err.response.status
  // 如果token失效,状态为401时,跳转到登陆页面
  if (err.response.status === 401) {
    //   直接返回,跳转到登陆页面
    return router.push('/login')
  }
  // 失败必须返回一个promise对象
  return Promise.reject(err)
})

// 导出axios文件
export default axios

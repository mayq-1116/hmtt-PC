// 设置存储用户信息的相关API
// session保存数据的格式为键值对,约定key='hmtt-pc-user-key'
const KEY = 'hmtt-pc-user-key'
// 定义相关API
const localStore = {
  // 存储用户数据
  setUser (user) {
    // 将user对象转换成json字符串
    let jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },

  // 获取用户数据
  getUser () {
    // 获取json数据,并转换为js对象
    const jsonStr = window.sessionStorage.getItem(KEY)
    return JSON.parse(jsonStr)
  },

  // 清除用户数据
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}

// 导出文件
export default localStore

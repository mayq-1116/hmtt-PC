<template>
  <div class="welcome">
    <img src="../.././assets/welcome.jpg" alt class="welcome_bj" />
  </div>
</template>

<script>
export default {
  created () {
    // 测试发送请求数据
    this.$http.get('http://ttapi.research.itcast.cn/mp/v1_0/articles').then(res => {
      console.log(res.data)
    }).catch(() => {
      console.log('error')
    })
  }
}
</script>

<style>
.welcome_bj {
  display: block;
  margin: 30px auto;
}
</style>

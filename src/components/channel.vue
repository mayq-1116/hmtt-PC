<template>
  <!-- 下拉菜单 -->
  <el-select :value="value" @change="childValue" placeholder="请选择" clearable>
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  // 接收父组件的值
  props: ['value'],
  data () {
    return {
    //   value: null,
      channelOptions: []
    }
  },
  created () {
    // 获取下拉菜单数据
    this.getChannelOptions()
  },
  methods: {
    // 定义获取下拉菜单数据的方法
    async getChannelOptions () {
      // 结构赋值获取数据中的data
      let {
        data: { data }
      } = await this.$http.get('channels')
      // 赋值给下拉菜单依赖的数据
      this.channelOptions = data.channels
    },
    // 子组件的值改变
    childValue (channelId) {
      // 当值为空时,赋值为null
      if (channelId === '') channelId = null
      // 将数据提交给父组件
      this.$emit('input', channelId)
    }
  }
}
</script>

<style>
</style>

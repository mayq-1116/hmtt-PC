<template>
  <!-- 卡片 -->
  <el-card>
    <div slot="header">
      <!-- 面包屑导航 -->
      <bread-crumbs>内容管理</bread-crumbs>
    </div>
    <!-- 表单内容 -->
    <el-form label-width="80px" size="small">
      <el-form-item label="状态">
        <!-- 下拉菜单 -->
        <el-radio-group v-model="reqParams.status">
          <el-radio :label="null">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
          <el-radio :label="4">已删除</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <!-- 下拉框 -->
        <el-select v-model="reqParams.channel_id" placeholder="请选择">
          <el-option
            v-for="item in channelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <!-- 日期选择 -->
        <el-date-picker
          v-model="dateAry"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">筛选</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 筛选参数
      reqParams: {
        // axios提交数据请求,如果数据的值为null,是不会提交该字段,不要值为空,会提交空字符
        status: null,
        channel_id: null,
        // 开始时间
        begin_pubdate: null,
        // 结束时间
        end_pubdate: null
      },
      // 定义频道选项数据
      channelOptions: [
        { value: 1, label: 'HTML' },
        { value: 2, label: 'JavaScript' }
      ],
      // 日期数组
      dateAry: []
    }
  }
}
</script>

<style scoped lang='less'>
</style>

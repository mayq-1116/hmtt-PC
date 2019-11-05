<template>
  <div class="container-comment">
    <el-card>
      <div slot="header">
        <bread-crumbs>评论管理</bread-crumbs>
      </div>
      <!-- 表格 -->
      <el-table :data="articles">
        <el-table-column prop="title" label="标题" width="400"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <!-- false为关闭状态,true为打开状态 -->
            <el-button @click="toggleCommentStatus(scope.row.id,false)" v-if="scope.row.comment_status" type="danger" size="small">关闭评论</el-button>
            <el-button @click="toggleCommentStatus(scope.row.id,true)" v-else type="success" size="small">打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: [],
      reqParams: {
        // 传入comment值,会获取评论相关数据
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      total: 0
    }
  },
  // 组件加载时查询列表数据
  created () {
    this.getArticles()
  },
  methods: {
    // 发送请求获取列表数据 - 文章列表包含评论数据
    async getArticles () {
      let { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      //   // 渲染数据
      this.articles = data.results
      // 渲染总条数
      this.total = data.total_count
    },

    // 分页功能
    pager (newPage) {
      // 渲染分页
      this.reqParams.page = newPage
      // 更新列表
      this.getArticles()
    },

    // 修改评论状态 打开或关闭
    async toggleCommentStatus (id, status) {
      // 设置提示语
      let hint = status ? '您确认要打开评论吗？' : '您确认关闭评论吗，关闭后用户将无法对该文章进行评论。'
      this.$confirm(hint, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 确认时候
        let { data: { data } } = await this.$http.put(`comments/status?article_id=${id}`, {
          allow_comment: status
        })
        // 提示
        this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
        // 更新当前列表
        this.getArticles()
      })
    }
  }
}
</script>

<style scoped lang='less'></style>

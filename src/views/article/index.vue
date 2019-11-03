<template>
  <div>
    <!-- 内容模块筛选布局 -->
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
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期">
          <!-- 日期选择 -->
          <el-date-picker
            v-model="dateAry"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 筛选的内容布局 -->
    <el-card style="margin-top:20px">
      <div slot="header">
        <!-- 头部内容 -->
        <span>根据筛选条件共查询到 {{total}} 条结果</span>
      </div>
      <!-- 表格 -->
      <el-table :data="articles" style="width: 100%;margin-top:15px">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <!-- 获取第一张图谱 -->
            <el-image :src="scope.row.cover.images[0]" fit="fill" style="width:150px;height:100px">
              <div slot="error">
                <img src="../../assets/error.gif" alt style="width:150px;height:100px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.status===0">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag type="success" v-if="scope.row.status===2">审核通过</el-tag>
            <el-tag type="warning" v-if="scope.row.status===3">审核失败</el-tag>
            <el-tag type="danger" v-if="scope.row.status===4">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click="toEdit(scope.row.id)"
              type="primary"
              icon="el-icon-edit"
              circle
              plain
            ></el-button>
            <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" circle plain></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- total是总条数,需要根据服务器数据动态赋值 -->
      <!-- page-size 默认显示10条每一页,需要根据服务器数据动态赋值 -->
      <!-- current-page 动态激活当前的页码对应的按钮 -->
      <!-- current-change 事件: 点击改变页码 -->
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
      // 筛选参数
      reqParams: {
        // axios提交数据请求,如果数据的值为null,是不会提交该字段,不要值为空,会提交空字符
        status: null,
        channel_id: null,
        // 开始时间
        begin_pubdate: null,
        // 结束时间
        end_pubdate: null,
        // 设置当前页码,每页显示条数
        page: 1,
        per_page: 15
      },
      // 定义频道选项数据
      channelOptions: [
        // { value: 1, label: 'HTML' },
        // { value: 2, label: 'JavaScript' }
      ],
      // 日期数组
      dateAry: [],
      // 文章列表
      articles: [],
      // 定义分页总条数
      total: 0
    }
  },
  created () {
    // 在组件初始化时执行
    // 获取下拉菜单数据
    // this.getChannelOptions()

    // 获取文章列表数据
    this.getArticles()
  },
  methods: {
    // // 定义获取下拉菜单数据的方法
    // async getChannelOptions () {
    //   // 结构赋值获取数据中的data
    //   let {
    //     data: { data }
    //   } = await this.$http.get('channels')
    //   // 赋值给下拉菜单依赖的数据
    //   this.channelOptions = data.channels
    // },

    // 获取文章列表的数据
    async getArticles () {
      // 结构赋值获取数据中的data
      let {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      // 赋值给依赖的数据
      this.articles = data.results
      // 赋值给总条数依赖的数据
      this.total = data.total_count
    },

    // 设置分页功能
    pager (newPager) {
      // 根据新的页码和当前的筛选条件,重新查询数据
      this.reqParams.page = newPager
      // 重新查询渲染数据
      this.getArticles()
    },

    // 设置选择日期触发的事件函数
    changeDate (dateAry) {
      // dateAry的数据格式为 : [date,date]
      // 后端需要字符串格式的数据,dateAry的数据格式: [string,string]
      if (dateAry) {
        // 开始日期
        this.reqParams.begin_pubdate = dateAry[0]
        // 结束日期
        this.reqParams.end_pubdate = dateAry[1]
      } else {
        // 如果日期的值为'',需要设置为null不传值
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },

    // 设置点击筛选事件
    search () {
      // 准备日期数据
      // 进行获取数据
      // 如果频道的值是空的,需要修改为null,不能传空字符串给服务器
      if (this.reqParams.channel_id === '') {
        this.reqParams.channel_id = null
      }
      // 不传入查询的值,需要重新将页码指定到第一页,并重新查询数据
      this.reqParams.page = 1
      this.getArticles()
    },

    // 设置编辑事件
    toEdit (id) {
      // 第一种传参方法 (不推荐,若参数过多,不方便)
      // this.$router.push('/pubish?id=' + id)
      // 第二种传参方法(query)
      this.$router.push({ path: '/publish', query: { id } })
    },

    // 设置删除文章事件
    async del (id) {
      // 发送请求
      await this.$http.delete(`articles/${id}`)
      // 提示删除成功
      this.$message.success('删除文章成功')
      // 重新查询刷新列表
      this.getArticles()
    }
  }
}
</script>

<style scoped lang='less'>
</style>

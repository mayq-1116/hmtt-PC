<template>
  <div class="container_image">
    <el-card>
      <div slot="header">
        <!-- 面包屑导航 -->
        <bread-crumbs>素材管理</bread-crumbs>
      </div>
      <!-- 按钮 -->
      <div>
        <!-- 按钮单选框 label就是值 -->
        <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 绿色按钮 -->
        <el-button @click="open" style="float:right" type="success" size="small">添加素材</el-button>
      </div>
      <!-- 对话框 -->
      <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleSuccess"
          name="image"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-dialog>
      <!-- 图片列表 -->
      <div class="img_list">
        <!-- 图片内容 -->
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" />
          <!-- 图片底部收藏与删除图标 -->
          <div class="footer_icon" v-if="!reqParams.collect">
            <span
              @click="toggleStatus(item)"
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
            ></span>
            <span @click="delImage(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
        <!-- 分页 -->
        <!-- total是总条数,需要根据服务器数据动态赋值 -->
        <!-- page-size 默认显示10条每一页,需要根据服务器数据动态赋值 -->
        <!-- current-page 动态激活当前的页码对应的按钮 -->
        <!-- current-change 事件: 点击改变页码 -->
        <el-pagination
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="pager"
          background
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入存储API文件
import localStore from '@/utils/store'
export default {
  // 定义数据
  data () {
    return {
      reqParams: {
        // false选中全部  true选中收藏
        collect: false,
        // 设置页码
        page: 1,
        per_page: 10
      },
      // 素材列表数据
      images: [],
      // 定义总条数
      total: 0,
      // 控制对话框显示隐藏, 默认隐藏
      dialogVisible: false,
      // 定义上传后的图片地址
      imageUrl: null,
      // 定义上传请求头
      headers: {
        // 设置授权格式 , 通过本地存储
        Authorization: `Bearer ${localStore.getUser().token}`
      }

    }
  },
  // 组件加载发送请求
  created () {
    // 查询显示数据
    this.getImages()
  },
  // 定义方法
  methods: {
    // 定义查询列表数据
    async getImages () {
      // 解构赋值获取data数据
      let {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      // 将查询的数据赋值给定义的数据
      this.images = data.results
      // 获取总条数并赋值数据
      this.total = data.total_count
    },

    // 定义点击分页功能
    pager (newPage) {
      // 设置点击后的页码
      this.reqParams.page = newPage
      // 根据新页面刷新页面
      this.getImages()
    },

    // 定义切换全部与收藏功能呢
    toggleList () {
      // 点击后默认将页码回归到第一页
      this.reqParams.page = 1
      // 重新查询渲染数据
      this.getImages()
    },

    // 设置点击收藏与取消收藏事件
    async toggleStatus (item) {
      // 发送状态修改请求
      let {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      // 修改成功后,给收藏赋值样式
      item.is_collected = data.collect
      // 提示语
      this.$message.success((data.collect ? '添加收藏' : '取消收藏') + '成功')
    },

    // 设置删除事件
    async delImage (id) {
      // 使用确认框组件
      this.$confirm('是否删除该图片?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 确认删除,发送删除请求
        await this.$http.delete(`user/images/${id}`)
        // 提示删除成功
        this.$message.success('删除成功')
        // 列表重新查询加载
        this.getImages()
      })
    },

    // 设置图片上传成功后的事件
    handleSuccess (res) {
      // res是响应体 , 需要从响应体中获取url,给imageUrl赋值
      this.imageUrl = res.data.url
      // 提示上传成功
      this.$message.success('上传成功')
      // 预览2s后,关闭对话框
      window.setTimeout(() => {
        this.dialogVisible = false
        // 重新刷新列表
        this.getImages()
      }, 2000)
    },
    // 定义打开兑换框时,清空数据
    open () {
      this.dialogVisible = true
      this.imageUrl = null
    }
  }
}
</script>

<style scoped lang='less'>
.img_list {
  padding: 20px;
  .img_item {
    width: 180px;
    height: 180px;
    position: relative;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 40px;
    margin-bottom: 20px;
    margin-left: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    .footer_icon {
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      width: 100%;
      color: #fff;
      span {
        margin: 0 20px;
        cursor: pointer;
        &.red {
          color: red;
        }
      }
    }
  }
}
.el-pagination {
  margin-left: 20px;
}
</style>

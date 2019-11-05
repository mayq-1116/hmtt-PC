<template>
  <!-- 封装封面组件 -->
  <div class="my-image">
    <!-- 按钮盒子 -->
    <div class="btn_box" @click="open">
      <!-- value的值是父组件传的参数,如果未传参,为空时,显示默认按钮图片 -->
      <img class="btn_img" :src="value || btnImage" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="650px">
      <!-- tab栏 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 按钮 -->
          <div>
            <!-- 按钮单选框 label就是值 -->
            <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 图片列表 -->
          <div class="img_list">
            <!-- 图片内容 -->
            <div
              class="img_item"
              :class="{selected: selectedImageUrl === item.url}"
              @click="selectedImage(item.url)"
              v-for="item in images"
              :key="item.id"
            >
              <img class="images" :src="item.url" />
            </div>
            <!-- 分页 -->
            <el-pagination
              :total="total"
              :page-size="reqParams.per_page"
              :current-page="reqParams.page"
              @current-change="pager"
              background
              layout="prev, pager, next"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleSuccess"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog_footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入存储API文件
import localStore from '@/utils/store'
// 导入按钮图
import btnImage from '../assets/default.png'
export default {
  // 接收父组件数据
  props: ['value'],
  data () {
    return {
      // 对话框显示隐藏
      dialogVisible: false,
      // 当前激活的选项卡name的值
      activeName: 'image',
      // 定义素材请求参数
      reqParams: {
        // false选中全部  true选中收藏
        collect: false,
        // 设置页码
        page: 1,
        per_page: 8
      },
      // 素材列表
      images: [],
      // 分页总条数
      total: 0,
      // 选中图片的url地址
      selectedImageUrl: null,
      // 上传图片的地址
      uploadImageUrl: null,
      // 定义上传请求头
      headers: {
        // 设置授权格式 , 通过本地存储
        Authorization: `Bearer ${localStore.getUser().token}`
      },
      // 按钮图地址
      btnImage: btnImage
    }
  },
  methods: {
    // 打开对话框方法
    open () {
      this.dialogVisible = true
      // 打开后查询显示素材
      this.getImages()
    },
    // 定义查询素材列表数据
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
    // 定义点击图片,选中图片
    selectedImage (url) {
      this.selectedImageUrl = url
    },

    // 图片上传成功后的函数
    handleSuccess (res) {
      // res是响应体 , 需要从响应体中获取url,给imageUrl赋值
      this.uploadImageUrl = res.data.url
      // 提示上传成功
      this.$message.success('上传成功')
    },

    // 确认图片事件
    confirmImage () {
      // 判断activeName值是否为image,选中的为素材库
      if (this.activeName === 'image') {
        // 选中素材库
        // 当selectedImageUrl有值时,代表选中了图片,没值时,代表没有
        if (!this.selectedImageUrl) {
          // 如果没有选中的图片URL,提示选择图片
          this.$message.warning('请选择一张图片')
        }
        // 选中后,将默认图片更换为选中的图片预览
        // this.btnImage = this.selectedImageUrl
        // 将选择的图片数据提交给父组件
        this.$emit('input', this.selectedImageUrl)
        // 对话框
        this.dialogVisible = false
      } else {
        // 选择上传图片
        // 当uploadImageUrl,代表选中了图片,没值时,代表没有
        if (!this.uploadImageUrl) {
          // 如果没有选中的图片URL,提示选择图片
          this.$message.warning('请上传一张图片')
        }
        // 上传后,将默认图片替换为上传的图片预览
        // this.btnImage = this.uploadImageUrl
        // 将上传的图片数据提交给父组件
        this.$emit('input', this.uploadImageUrl)
        // 对话框
        this.dialogVisible = false
      }
    }

  }
}
</script>

<style scoped lang='less'>
.my-image {
  display: inline-block;
  margin: 5px 15px 0 0;
}
.btn_box {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  .btn_img {
    width: 100%;
    height: 100%;
    display: block;
    cursor: pointer;
  }
}
.dialog_footer {
  text-align: center;
  width: 100%;
  display: block;
}
.img_list {
  margin-top: 10px;
  .img_item {
    width: 130px;
    height: 120px;
    position: relative;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    .images {
      width: 100%;
      height: 100%;
    }
    // 通过伪元素定义选中样式
    &.selected::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url("../assets/selected.png") no-repeat
        center / 50px;
    }
  }
}
</style>

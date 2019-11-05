<template>
  <div class="publish">
    <!-- 卡片 -->
    <el-card>
      <!-- 头部面包屑导航 -->
      <div slot="header">
        <bread-crumbs >{{$route.query.id?'修改':'发布'}}文章</bread-crumbs>
      </div>
      <!-- 表单元素 -->
      <el-form label-width="120px">
        <!-- 标题 -->
        <el-form-item label="标题:">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <!-- 内容 -->
        <el-form-item label="内容:">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <!-- 封面 -->
        <el-form-item label="封面:">
          <!-- 单选框组件 -->
          <el-radio-group v-model="articleForm.cover.type" @change="articleForm.cover.images=[]">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 一张封面图图片 -->
          <div v-if="articleForm.cover.type === 1">
            <!-- 封面图组件 -->
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <!-- 三张封面图 -->
          <div v-if="articleForm.cover.type === 3">
            <my-image v-for="i in 3" :key="i" v-model="articleForm.cover.images[i-1]"></my-image>
          </div>
        </el-form-item>
        <!-- 频道 -->
        <el-form-item label="频道:">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <!-- 发表/存入草稿按钮 -->
        <!-- 地址栏中有id值时,修改文章状态 -->
        <el-form-item v-if="$route.query.id">
          <el-button type="success" @click="update(false)">修改</el-button>
          <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
        <!-- 地址栏没有id值时,发布状态 -->
        <el-form-item v-else>
          <el-button type="primary" @click="create(false)">发表</el-button>
          <el-button @click="create(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入富文本的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  // 挂载富文本
  components: { quillEditor },
  data () {
    return {
      articleForm: {
        content: null,
        // 标题数据
        title: null,
        // 频道id
        channel_id: null,
        // 默认选择单图
        cover: {
          type: 1,
          // 接收封面图片
          images: []
        }
      },
      // 配置富文本
      editorOption: {
        // 清空富文本内容
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  watch: {
    // 监听地址栏参数的变化，toggleArticleStatus 切换发布与修改状态
    '$route.query.id': function () {
      this.toggleArticleStatus()
    }
  },
  // 在组件初始化时,判断是编辑文章状态还是发布文章状态
  created () {
    // 组件初始化时,判断当前文章状态,对应切换
    this.toggleArticleStatus()
  },
  methods: {
    // 切换发布与修改状态
    toggleArticleStatus () {
      // 通过url中参数是否有id判断编辑文章
      let articleId = this.$route.query.id
      // 如果有id,则是编辑文章状态
      if (articleId) {
      // 获取当前文章信息
        this.getArticle(articleId)
      } else {
      // 重置表单数据 , 重置的对象不能为空,为空会报错undefined
        this.articleForm = {
          content: null,
          // 标题数据
          title: null,
          // 频道id
          channel_id: null,
          // 默认选择单图
          cover: {
            type: 1,
            // 接收封面图片
            images: []
          }
        }
      }
    },
    // 获取文章方法
    async getArticle (id) {
      let { data: { data } } = await this.$http.get('articles/' + id)
      // 表单填充 面包屑文字 按钮文字
      this.articleForm = data
    },
    // 发布文章 或 存入草稿
    async create (draft) {
      // 发表 | 存入草稿 请求(需要传入query参数与body参数)
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      // 提示
      this.$message.success(draft ? '存入草稿成功' : '发表文章成功')
      // 跳转内容管理查看
      this.$router.push('/article')
    },
    // 修改文章
    async update (draft) {
      // 发表 | 存入草稿 请求(需要传入query参数与body参数)
      await this.$http.put(`articles/${this.articleForm.id}?draft=${draft}`, this.articleForm)
      // 提示
      this.$message.success(draft ? '存入草稿成功' : '修改文章成功')
      // 跳转内容管理查看
      this.$router.push('/article')
    }
  }

}
</script>

<style scoped lang='less'>
</style>

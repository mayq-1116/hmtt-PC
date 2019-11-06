<template>
  <div class='container-setting'>
    <el-card>
      <div slot="header">
        <bread-crumbs>个人设置</bread-crumbs>
      </div>
      <!-- 栅格 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form label-width="120px">
            <el-form-item label="编号：">{{userInfo.id}}</el-form-item>
            <el-form-item label="手机：">{{userInfo.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="userInfo.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item >
              <el-button type="primary" @click="saveUserInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传 -->
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="uploadPhoto"
          >
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
// 导入eventBus
import eventBus from '@/eventBus'
// 导入本地存储
import localStore from '@/utils/store'
export default {
  data () {
    return {
      userInfo: {
        name: '',
        intro: '',
        email: '',
        photo: null
      }
    }
  },
  // 组件初始化
  created () {
    // 获取用户信息数据
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息数据
    async getUserInfo () {
      // 发送请求并赋值数据
      let { data: { data } } = await this.$http.get('user/profile')
      // 赋值数据
      this.userInfo = data
    },

    // 设置保存用户信息事件
    async saveUserInfo () {
      // 只需要保存用户 name email intro
      let { name, email, intro } = this.userInfo
      // 发送请求,获取对应数据
      await this.$http.patch('user/profile', { name, email, intro })
      // 修改成功提示
      this.$message.success('保存成功')
      // 修改home组件name显示
      eventBus.$emit('updateName', name)
      // 更改本地存储信息
      let user = localStore.getUser()
      user.name = name
      localStore.setUser(user)
    },

    // 设置修改用户头像事件
    async uploadPhoto ({ file }) {
      // result.file 是选择图片后的文件对象,直接解构file
      // 获取文件对象
      let formData = new FormData()
      formData.append('photo', file)
      // 发送修改请求
      let { data: { data } } = await this.$http.patch('user/photo', formData)
      // 修改成功后提示
      this.$message.success('修改头像成功')
      // 预览头像
      this.userInfo.photo = data.photo
      // 更新home的头像
      eventBus.$emit('updatePhoto', data.photo)
      // 更改本地头像信息
      let user = localStore.getUser()
      user.photo = data.photo
      localStore.setUser(user)
    }
  }
}
</script>

<style scoped lang='less'></style>

<template>
  <!-- login登陆组件 -->
  <div class="container">
    <el-card>
      <!-- 黑马头条logo -->
      <img src="../../assets/logo_index.png" width="200px" alt />

      <!-- 登陆表单控件 -->
      <el-form ref="numberValidateForm" :model="loginForm">
        <!-- 输入手机号 -->
        <el-form-item>
          <el-input v-model="loginForm.name" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 输入验证码 -->
        <el-form-item>
          <el-input
            placeholder="请输入验证码"
            style="width:238px;margin-right:10px;"
            :model="loginForm"
            v-model="loginForm.cod"
          ></el-input>
          <!-- 发送按钮 -->
          <el-button>发送验证码</el-button>
        </el-form-item>
        <!-- 复选框 -->
        <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        <!-- 登陆按钮 -->
        <el-form-item>
          <el-button type="primary" style="width:100%;margin-top:10px">立即登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  // 设置数据
  data () {
    return {
      // 登陆数据
      loginForm: {
        mobile: '',
        code: ''
      }
    }
  }
}
</script>

<style>
/* 全屏容器 */
.container {
  width: 100%;
  height: 100%;
  background: url("../../assets/login_bg.jpg") no-repeat center / cover;
  /* background-color: pink; */
  position: absolute;
  left: 0;
  top: 0;
}
/* 设置卡片 - 登陆窗口 */
.el-card {
  width: 400px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
img {
  display: block;
  margin: 0 auto;
  margin-bottom: 30px;
}
</style>

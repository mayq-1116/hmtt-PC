<template>
  <!-- login登陆组件 -->
  <div class="container-login">
    <el-card>
      <!-- 黑马头条logo -->
      <img class="logo" src="../../assets/logo_index.png" width="200px" alt />

      <!-- 登陆表单控件 -->
      <el-form ref="loginForm" status-icon :model="loginForm" :rules="loginRules">
        <!-- 输入手机号 -->
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 输入验证码 -->
        <el-form-item prop="code">
          <el-input
            placeholder="请输入验证码"
            style="width:238px;margin-right:10px;"
            v-model="loginForm.code"
          ></el-input>
          <!-- 发送按钮 -->
          <el-button>发送验证码</el-button>
        </el-form-item>
        <!-- 复选框 -->
        <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        <!-- 登陆按钮 -->
        <el-form-item>
          <el-button type="primary" style="width:100%;margin-top:10px" @click="login">立即登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入存储信息API文件
import localStore from '@/utils/store'
export default {
  // 设置数据
  data () {
    // 设置手机号匹配规则
    const checkMobile = (rule, value, callback) => {
      // 校验逻辑判断手机号是否正确
      // 手机号格式: 开头数为1,第二位3-9,加后面9位,共11位
      if (/^1[3-9]\d{9}$/.test(value)) {
        // 成功调用回调函数
        callback()
      } else {
        // 失败,调用回调,提示错误
        callback(new Error('手机号格式错误'))
      }
    }
    return {
      // 登陆数据
      loginForm: {
        mobile: '14444444444',
        code: '246810'
      },
      // 设置校验规则
      loginRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          // { type: 'number', message: '内容必须为数字' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          // { type: 'number', message: '内容必须为数字' },
          { len: 6, message: '验证码格式错误', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs['loginForm'].validate(async valid => {
        if (valid) {
          // 整体校验通过,登陆成功,发送接口请求,跳转主页
          // this.$http
          //   .post('authorizations', this.loginForm)
          //   .then(res => {
          //     // 登陆成功后,跳转页面
          //     // 登陆时需要保存用户信息(token)
          //     localStore.setUser(res.data.data)
          //     this.$router.push('/')
          //   })
          //   .catch(() => {
          //     // 验证失败,弹出警告提示
          //     this.$message.error('手机号或验证码错误')
          //   })

          // 使用async&await 改造登陆的请求
          // 当一段代码不能保证一定没有报错  try {} catch (e) {} 捕获异常处理异常
          try {
            // 通过解构赋值获取data
            let { data: { data } } = await this.$http.post('authorizations', this.loginForm)
            localStore.setUser(data)
            this.$router.push('/')
          } catch (e) {
            // 登陆失败,捕获到错误,警告提示
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
/* 全屏容器 */
.container-login {
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
.logo {
  display: block;
  margin: 0 auto;
  margin-bottom: 30px;
}
</style>

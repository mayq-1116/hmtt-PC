<template>
  <el-container>
    <el-container class="container">
      <!-- 左侧导航栏区域 -->
      <!-- 动态给左侧导航设置展开与收起style样式 -->
      <el-aside :width="isOn?'200px':'64px'">
        <!-- 顶部logo -->
        <div class="logo" :class="{sLogin:!isOn}"></div>
        <!-- 导航列表 -->
        <el-menu
          :default-active="$route.path"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="border-right:none"
          :collapse="!isOn"
          router
          :collapse-transition="false"
        >
          <!-- el-submenu 拥有值二级菜单的菜单项目 el-menu-item 没有二级菜单的菜单项-->
          <!-- index作用  当前菜单唯一标识 -->
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/image">
            <i class="el-icon-folder-opened"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <i class="el-icon-document"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/comment">
            <i class="el-icon-chat-line-square"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- 头部区域 -->
        <el-header>
          <!-- 给次图标添加点击事件,控制左侧菜单展开和收起 -->
          <span class="el-icon-s-fold icon" @click="triggerMenu"></span>
          <span class="header_text">江苏传智播客科技教育有限公司</span>
          <!-- 下拉菜单 -->
          <el-dropdown class="dropdown" @command="handleClick">
            <span class="el-dropdown-link">
              <!-- 用户头像 -->
              <img class="headPortrait" :src="userInfo.photo" alt />
              <!-- 用户名称 -->
              <span class="userName">{{userInfo.name}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-unlock" command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <!-- 主体区域 -->
          <!-- 二级路由视图容器 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
// 引入存储文件
import localStore from '@/utils/store'
// 导入eventBus
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      isOn: true,
      // 声明用户信息数据
      userInfo: {
        name: '',
        photo: ''
      }
    }
  },
  methods: {
    triggerMenu () {
      // 设置切换左侧菜单的开关方法
      this.isOn = !this.isOn
    },
    logout () {
      // 用户退出,清除用户信息,跳转至登陆页面
      localStore.delUser()
      this.$router.push('/login')
    },
    setting () {
      // 个人设置页面
      this.$router.push('/setting')
    },
    handleClick (command) {
      this[command]()
    }
  },
  created () {
    // 获取设置用户信息
    let user = localStore.getUser() || {}
    this.userInfo.name = user.name
    this.userInfo.photo = user.photo

    // 绑定事件,接收修改name的参数
    eventBus.$on('updateName', name => {
      this.userInfo.name = name
    })

    // 绑定事件,接收修改头像的参数
    eventBus.$on('updatePhoto', (photo) => {
      this.userInfo.photo = photo
    })
  }
}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url("../../assets/logo_admin.png") no-repeat center /
        140px auto;
    }
    .sLogin {
      background-image: url("../../assets/logo_admin_01.png");
      background-size: 36px auto;
    }
  }
  .el-header {
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    .icon {
      font-size: 30px;
      vertical-align: middle;
      cursor: pointer;
    }
    .header_text {
      margin-left: 10px;
      vertical-align: middle;
      font-weight: 700;
    }
    .dropdown {
      float: right;
      .headPortrait {
        width: 30px;
        height: 30px;
        vertical-align: middle;
        display: inline-block;
      }
      .userName {
        font-weight: 700;
        vertical-align: middle;
        margin-left: 5px;
      }
    }
  }
}
</style>

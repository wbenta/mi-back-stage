<template>
  <div class="head-container">
    <div class="head-box">
      <div class="left-box">
        <span class="head-title">小米商城后台管理系统</span>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3">消息中心</el-menu-item>
          <el-menu-item index="4">
            <a href="https://www.ele.me" target="_blank">订单管理</a>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right-box">
        <el-dropdown @command="handleCommand">
          <div class="el-dropdown-link">
            <el-avatar :size="50" :fit="'scale-down'" :src="circleUrl">
            </el-avatar>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>用户设置</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import { getavatar } from '@/api/user'
export default {
  data() {
    return {
      activeIndex: '1',
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  async created() {
    const { data: res } = await getavatar()
    console.log(res)
    if (res.message === '无效的token') {
      localStorage.removeItem('token')
      this.$router.push('/login')
    } else {
      this.circleUrl = res.data.severUser_avatar
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.$router.push({ path: '/login' })
        localStorage.removeItem('token')
        this.$message({
          message: '您已成功退出登录',
          type: 'warning'
        })
      }
    }
  }
}
</script>
<style lang="less">
.head-container {
  width: 100%;
  height: 60px;
  // background-color: rgb(30, 114, 210);
  background-color: #fff;
  .head-box {
    display: flex;
    justify-content: space-between;
    .left-box {
      // color: #fff;
      font-size: 25px;
      line-height: 60px;
      margin-left: 10px;
      display: flex;
      // .el-menu {
      //   overflow-x: auto;
      //   overflow-y: hidden;
      //   height: 60px;
      //   background-color: aqua;
      //   .el-menu-item {
      //   }
      // }
    }
    .right-box {
      // background-color: cyan;
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
    }
  }
}
</style>

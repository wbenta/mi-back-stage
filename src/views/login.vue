<template>
  <div class="login-container">
    <div class="form-box">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="用户名">
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            v-model="formLabelAlign.password"
          ></el-input>
          <div class="form-button">
            <el-button type="primary" style="width: 100%" @click="login()"
              >登录</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-text">
      <router-link class="routerLink" to="">找回密码</router-link>
      <router-link class="routerLink" to="/register">注册帐号</router-link>
      <router-link class="routerLink" to="">意见反馈</router-link>
    </div>
  </div>
</template>
<script>
import router from '@/router'
export default {
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        username: '',
        password: '',
        type: ''
      }
    }
  },
  methods: {
    login() {
      router.push({ path: '/' })
    }
  }
}
</script>
<style lang="less">
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .form-box {
    width: 400px;
    height: 200px;
    .form-button {
      margin-top: 20px;
    }
  }
  .login-text {
    width: 400px;
    display: flex;
    justify-content: space-between;
  }
}
</style>

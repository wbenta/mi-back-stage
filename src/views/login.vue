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
            <el-button
              type="primary"
              style="width: 100%"
              @click="login(formLabelAlign.username, formLabelAlign.password)"
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
import { login } from '@/api/user'
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
    async login(user, pwd) {
      // if (
      //   this.formLabelAlign.username === 'admin' &&
      //   this.formLabelAlign.password === '666666'
      // ) {
      //   localStorage.setItem('token', 'Bearer bbbb')
      //   this.$router.push('/index')
      // } else {
      //   this.$message({
      //     showClose: true,
      //     message: '密码错误，请重新输入！',
      //     type: 'error'
      //   })
      //   localStorage.removeItem('token')
      // }
      const { data: res } = await login(user, pwd)
      console.log(res)
      if (res.status === 0) {
        localStorage.setItem('token', res.token)
        this.$message({
          message: res.message,
          type: 'success'
        })
        this.$router.push('/index')
      } else if (res.status === 1) {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
        localStorage.removeItem('token')
      }
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

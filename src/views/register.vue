<template>
  <div class="register-container">
    <div class="main-box">
      <div class="title">后台管理用户注册</div>
      <div class="form-box">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          label-position="left"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmpassword">
            <el-input
              v-model="ruleForm.confirmpassword"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <div class="sumbit">
            <el-button type="primary">取消</el-button>
            <el-button type="primary">注册</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
        confirmpassword: '',
        phone: '',
        email: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请选择活动区域',
            trigger: 'change'
          }
        ],
        confirmpassword: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        phone: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        email: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="less">
.register-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .main-box {
    background-color: #fff;
    width: 400px;
    .title {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
    .form-box {
      padding: 15px;
      .sumbit {
        display: flex;
        justify-content: space-around;
      }
    }
  }
}
</style>

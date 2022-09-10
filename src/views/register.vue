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
          status-icon
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1/my/reg"
              :before-upload="beforeAvatarUpload"
              :on-change="onchange"
              :auto-upload="true"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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
            <el-button type="primary" @click="$router.push('/login')"
              >取消</el-button
            >
            <el-button type="primary" @click="submitForm('ruleForm')"
              >注册</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { reg } from '@/api/user'
export default {
  data() {
    // 配置图片校验
    const validateImage = (rule, value, callback) => {
      // 验证器
      if (!this.imageUrl) {
        // 为true代表图片在  false报错
        callback(new Error('请上传图片'))
      } else {
        callback()
      }
    }
    // 配置自定义密码规则
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.confirmpassword !== '') {
          this.$refs.ruleForm.validateField('confirmpassword')
        }
        callback()
      }
    }
    // 配置自定义确认密码规则
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    // 3.配置自定义手机号规则
    const validatePhone = (rule, value, callback) => {
      // console.log(rule);
      // console.log(value);
      // console.log(callback);
      if (!value) {
        callback(new Error('手机号不能为空！'))
      }
      // 使用正则表达式进行验证手机号码
      if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('手机号不正确！'))
      }

      callback()
    }
    // 自定义的邮箱和手机验证规则
    const checkEmail = (rule, value, callback) => {
      // 验证邮箱
      const regEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (this.ruleForm.email !== '' && !regEmail.test(this.ruleForm.email)) {
        callback(new Error('请输入有效的邮箱'))
      }
      callback()
    }
    return {
      ruleForm: {
        username: '',
        avatar: '',
        password: '',
        confirmpassword: '',
        phone: '',
        email: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入活用户名',
            trigger: 'change'
          },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'change'
          }
        ], // 校验规则
        avatar: [
          { required: true, validator: validateImage, trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { validator: validatePass, trigger: 'change' }
        ],
        confirmpassword: [
          { required: true, message: '请确认密码', trigger: 'change' },
          { validator: validatePass2, trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { validator: validatePhone, trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'change' },
          { validator: checkEmail, trigger: 'change' }
        ]
      },
      src: '',
      imageUrl: ''
    }
  },
  methods: {
    // 这个file参数 也就是文件信息，你使用 插件 时 你就可以打印出文件信息 看看嘛
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        let fileResult = ''
        reader.readAsDataURL(file)
        // 开始转
        reader.onload = () => {
          fileResult = reader.result
        }
        // 转失败
        reader.onerror = (error) => {
          reject(error)
        }
        // 转 结束  咱就 resolve 出去
        reader.onloadend = () => {
          resolve(fileResult)
        }
      })
    },

    async submitForm(formName) {
      // eslint-disable-next-line space-before-function-paren
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          alert('submit!')

          const { data: res } = await reg(this.ruleForm)
          console.log(res)
          this.resetForm(formName)
          // TODO: 五秒后回到登录页面
          let i = 4
          setInterval(() => {
            i--
            if (i > 0) {
              this.$message({ message: i + '秒后跳转到login', duration: 900 })
              // eslint-disable-next-line eqeqeq
            } else if (i == 0) {
              this.$router.push('/login')
            }
          }, 1000)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // el-upload
    onchange(file, fileList) {
      const imgType =
        file.raw.type === 'image/png' || file.raw.type === 'image/jpeg'
      const imgSize = file.raw.size / 1024 / 1024 <= 2
      if (!imgType) {
        this.$message.error('只能上传png、jpg、jpeg的图片格式！')
        return false
      }
      if (!imgSize) {
        this.$message.error('图片上传最大限制2MB！')
        return false
      }
      // 如果第二次上传文件，将前一个文件删除
      // 这样fileList就一直保持一个文件
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
      // 获取当前文件的一个内存URL
      // 给图片src赋值
      this.imgUrl = URL.createObjectURL(file.raw)
    },
    handleAvatarSuccess(res, file) {
      console.log('hsrhdrthdtrh')
      this.imageUrl = URL.createObjectURL(file.raw)
      return this.getBase64(file.raw)
        .then((base64Url) => {
          this.ruleForm.avatar = base64Url
        })
        .catch((err) => {
          console.log(err)
        })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      } else {
        this.getBase64(file).then((resBase64) => {
          // 直接拿到base64信息
          this.fileBase64 = resBase64.split(',')[1]
          this.tempUrl = resBase64.split(',')[1]
        })
      }
      return isJPG && isLt2M
    }
    // TODO:设置上传图片的尺寸
    // request(file) {
    //   this.imageUrl = URL.createObjectURL(file.raw)
    //   console.log(file)
    // }
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

      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 16px;
        color: #8c939d;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
      .avatar {
        width: 40px;
        height: 40px;
        display: block;
      }
      .sumbit {
        display: flex;
        justify-content: space-around;
      }
    }
  }
}
</style>

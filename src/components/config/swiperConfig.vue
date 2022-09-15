<template>
  <div class="swiperconfig-container">
    <h3>Swiper轮播图上传</h3>
    <el-upload
      action="http://127.0.0.1/my/setswiper"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleAvatarSuccess"
      :headers="headerObj"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-button type="primary" @click="upload()">上传 </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <div class="table-box"></div>
  </div>
</template>
<script>
import { setSwiper } from '@/api/getnav.js'
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      headerObj: {
        Authorization: localStorage.getItem('token')
      },
      swiperArr: [],
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
    // el-upload
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // on-success
    handleAvatarSuccess(res, file) {
      // console.log(file)
      this.imageUrl = URL.createObjectURL(file.raw)
      this.swiperArr.push(this.imageUrl)
      // console.log(this.imageUrl)
      // return this.getBase64(file.raw)
      //   .then((base64Url) => {
      //     this.fromImg = base64Url
      //     console.log(this.fromImg)
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   })
    },
    async upload() {
      const { data: res } = await setSwiper(this.swiperArr)
      console.log(res)
    }
  }
}
</script>
<style lang="less">
.swiperconfig-container {
  h3 {
    text-align: center;
  }
  .form-box {
    width: 90%;
    background-color: #fff;
    padding: 10px;
    margin: 0 auto;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    .el-form {
      padding: 1px;
    }
  }
}
</style>

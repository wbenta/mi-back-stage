<template>
  <div class="swiperconfig-container">
    <h3>Swiper轮播图上传</h3>
    <el-upload
      action="http://127.0.0.1/my/setswiper"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :headers="headerObj"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-button type="primary" @click="upload('file')">上传 </el-button>
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
      }
    }
  },
  methods: {
    // el-upload
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      console.log('dsgsdg')
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    async upload(file) {
      const { data: res } = await setSwiper()
      console.log(res)
      console.log(file)
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

<template>
  <div class="swiperconfig-container">
    <h3>Swiper轮播图上传</h3>
    <div class="upload-box">
      <el-upload
        class="aaa"
        ref="upload"
        action="http://127.0.0.1/my/setswiper"
        name="swiper"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSwiperSuccess"
        :before-upload="handbeforeupload"
        :headers="headerObj"
        :auto-upload="false"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <!-- <span>只能上传一张图片</span> -->
      <el-button type="primary" class="upload-botton" @click="upload()">
        上传
      </el-button>
      <!-- 照片的大图 -->
      <el-dialog :visible.sync="dialogVisible" name="swiper">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
    <div class="table-box">
      <el-table
        :data="tableData"
        stripe
        :height="screenHeight - 410"
        style="width: 100%"
      >
        <el-table-column prop="id" label="id" width="180"> </el-table-column>
        <el-table-column prop="title" label="图片" width="180">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.imgurl"
              :preview-src-list="srcList"
              fit="contain"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="src" label="href路径">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.href"
              :placeholder="scope.row.href"
              :disabled="scope.row.disabled"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="handleEdit(scope.row)"
              v-if="scope.row.disabled"
              >编辑
            </el-button>
            <el-button
              type="success"
              @click="handleSave(scope.row)"
              v-if="!scope.row.disabled"
              >保存
            </el-button>
            <el-button
              type="danger"
              @click="handleDelete(scope.row.id)"
              v-if="scope.row.disabled"
              >删除
            </el-button>
            <el-button
              type="danger"
              @click="handleCancel(scope.row)"
              v-if="!scope.row.disabled"
              >取消
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {
  // setSwiper,
  getswiper,
  deleteSwiper,
  updateswiperhref
} from '@/api/swiper'
// import request from '@/utils/request'
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      headerObj: {
        Authorization: localStorage.getItem('token')
      },
      swiperArr: [],
      imageUrl: '',
      tableData: [],
      srcList: [],

      screenHeight: 0,
      screenWidth: 0,
      address: ''
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    // Change(file, fileList) {
    //   const imgType =
    //     file.raw.type === 'image/png' || file.raw.type === 'image/jpeg'
    //   const imgSize = file.raw.size / 1024 / 1024 <= 2
    //   if (!imgType) {
    //     this.$message.error('只能上传png、jpg、jpeg的图片格式！')
    //     return false
    //   }
    //   if (!imgSize) {
    //     this.$message.error('图片上传最大限制2MB！')
    //     return false
    //   }
    //   // 如果第二次上传文件，将前一个文件删除
    //   // 这样fileList就一直保持一个文件
    //   if (fileList.length > 1) {
    //     fileList.splice(0, 1)
    //   }
    //   // 获取当前文件的一个内存URL
    //   // 给图片src赋值
    //   this.imgUrl = URL.createObjectURL(file.raw)
    // },
    // 上传文件之前的钩子
    handbeforeupload(file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 jpeg/png/jpg 格式!')
        return false
      } else if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
        return false
      }
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const img = new Image()
          img.src = reader.result
          img.onload = () => {
            if (img.naturalWidth / img.naturalHeight !== 1226 / 460) {
              this.$message.error('请上传宽高比为1226:460的图片!')
              // eslint-disable-next-line prefer-promise-reject-errors
              return reject(false)
            } else {
              return resolve(true)
            }
          }
        }
      })
    },
    // on-success
    handleSwiperSuccess(res, file) {
      console.log(file.uid === this.$refs.upload.uploadFiles[0].uid)
      if (res.status === 1) {
        if (file.uid === this.$refs.upload.uploadFiles[0].uid) {
          console.log(this.$refs.upload.uploadFiles)
          this.$refs.upload.clearFiles()
        }
        return this.$message.error(res.message)
      }
      // this.$refs.upload.clearFiles()
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.inittable()
      // console.log(this.$refs.upload.uploadFiles)
      if (file.uid === this.$refs.upload.uploadFiles[0].uid) {
        this.$refs.upload.clearFiles()
      }
    },
    async upload() {
      this.$refs.upload.submit()
      // console.log(this.$refs.upload.uploadFiles)
      // const { data: res } = await setSwiper(this.swiperArr)
      // console.log(res)
    },
    async inittable() {
      const { data: res } = await getswiper()
      console.log(res)
      // eslint-disable-next-line array-callback-return
      res.data.map((item) => {
        item.disabled = true
        // 预览图
        this.srcList.push(item.imgurl)
      })
      this.tableData = res.data
    },
    // 编辑按钮
    handleEdit(item) {
      item.disabled = false
      // eslint-disable-next-line array-callback-return
      this.tableData.map((item2) => {
        if (item2.id !== item.id) {
          item2.disabled = true
        }
      })
    },
    // 保存按钮
    handleSave(item) {
      this.$confirm('此操作将永久修改信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // eslint-disable-next-line space-before-function-paren
        .then(async () => {
          console.log(item)
          const { data: res } = await updateswiperhref(item.href, item.id)
          console.log(res)
          item.disabled = true
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.inittable()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          })
        })
    },
    // 删除按钮
    handleDelete(id) {
      console.log(id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // eslint-disable-next-line space-before-function-paren
        .then(async () => {
          const { data: res } = await deleteSwiper(id)
          console.log(res)
          this.inittable()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 取消按钮
    handleCancel(item) {
      item.disabled = true
      this.inittable()
    }
  },
  created() {
    this.screenHeight =
      document.documentElement.clientHeight || document.body.clientHeight
    this.screenWidth =
      document.documentElement.clientWidth || document.body.clientWidth
    this.inittable()
  }
}
</script>
<style lang="less">
.swiperconfig-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    text-align: center;
  }
  .upload-box {
    width: 90%;
    background-color: #fff;
    height: 100%;
    padding: 10px;
    margin: 0 auto;
    margin: 10px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .aaa {
      // background-color: aqua;
      width: 100%;
      height: 148px;
      overflow: hidden;
      .el-upload {
        width: 220px;
        height: 148px;
      }
      .el-upload-list {
        // background-color: rgb(90, 255, 90);
        display: inline-block;
        margin: 0;
        padding: 0;
        height: 103%;
        width: calc(100% - 230px);
        float: right;
        overflow-y: auto;
        .el-upload-list__item {
          margin-bottom: 0;
          width: 220px;
        }
      }
    }
  }
  .table-box {
    width: 90%;
    padding: 10px;

    background-color: #fff;
  }
}
</style>

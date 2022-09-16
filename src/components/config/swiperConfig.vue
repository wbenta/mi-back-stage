<template>
  <div class="swiperconfig-container">
    <h3>Swiper轮播图上传</h3>
    <div class="upload-box">
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
  setSwiper,
  getswiper,
  deleteSwiper,
  updateswiperhref
} from '@/api/swiper'
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
      screenWidth: 0
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
      // this.swiperArr.push(this.imageUrl)
      // console.log(this.imageUrl)
      return this.getBase64(file.raw)
        .then((base64Url) => {
          this.swiperArr.push(base64Url)
          console.log(this.swiperArr)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async upload() {
      const { data: res } = await setSwiper(this.swiperArr)
      console.log(res)
    },
    async inittable() {
      const { data: res } = await getswiper()
      console.log(res)
      // eslint-disable-next-line array-callback-return
      res.data.map((item) => {
        item.disabled = true
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
          this.inittabledata()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.inittable()
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
  h3 {
    text-align: center;
  }
  .upload-box {
    width: 95%;
    background-color: #fff;
    padding: 10px;
    margin: 0 auto;
    margin: 10px auto;
    display: flex;
    justify-content: space-between;
  }
}
</style>

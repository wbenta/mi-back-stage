<template>
  <div class="miheadnav-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="formInline.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item label="url路径">
        <el-input v-model="formInline.src" placeholder="url路径"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(1)">添加</el-button>
        <el-button type="primary" @click="onSubmit(2)">取消</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <el-table
        :data="tableData"
        stripe
        :height="screenHeight - 210"
        style="width: 100%"
      >
        <el-table-column prop="id" label="id" width="180"> </el-table-column>
        <el-table-column prop="title" label="标题" width="180">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.title"
              :placeholder="scope.row.title"
              :disabled="scope.row.disabled"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="src" label="url路径">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.src"
              :placeholder="scope.row.src"
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
import { getnav, insertnav, updatenav, deletenav } from '@/api/getnav.js'
export default {
  data() {
    return {
      // el-from
      formInline: {
        title: '',
        src: ''
      },
      // el-table
      tableData: [],
      screenHeight: 0,
      screenWidth: 0
    }
  },
  methods: {
    async inittabledata() {
      const { data: res } = await getnav()
      res.data.map((item) => {
        return (item.disabled = true)
      })
      // console.log(res)
      this.tableData = res.data
    },
    // el-from
    async onSubmit(type) {
      // 添加按钮
      if (type === 1) {
        console.log(this.formInline)
        const { data: res } = await insertnav(
          this.formInline.title,
          this.formInline.src
        )
        console.log(res)
        if (res.status === 1) {
          return this.$message.error(res.message)
        }
        this.inittabledata()
        this.formInline.title = ''
        this.formInline.src = ''
      } else if (type === 2) {
        // 取消提交按钮
        this.formInline.title = ''
        this.formInline.src = ''
      }
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
          const { data: res } = await updatenav(item.title, item.src, item.id)
          console.log(res)
          item.disabled = true
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
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
          const { data: res } = await deletenav(id)
          console.log(res)
          this.inittabledata()
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
      this.inittabledata()
    }
  },
  created() {
    this.screenHeight =
      document.documentElement.clientHeight || document.body.clientHeight
    this.screenWidth =
      document.documentElement.clientWidth || document.body.clientWidth
    this.inittabledata()
  }
}
</script>
<style lang="less">
.miheadnav-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .table-box {
    width: 90%;
  }
  .demo-form-inline {
    display: flex;
    justify-content: center;
  }
}
</style>

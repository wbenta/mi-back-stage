<template>
  <div class="mittopnav-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="formInline.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item label="url路径">
        <el-input v-model="formInline.src" placeholder="url路径"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <el-table :data="tableData" stripe height="550" style="width: 100%">
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
            <el-button type="primary" @click="handleEdit(scope.row)"
              >编辑
            </el-button>
            <el-button type="primary" @click="handleDelete(scope.row.id)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getnav, insertnav } from '@/api/getnav.js'
export default {
  data() {
    return {
      // el-from
      formInline: {
        title: '',
        src: '',
        disabled: false
      },
      // el-table
      tableData: []
    }
  },
  methods: {
    async inittabledata() {
      const { data: res } = await getnav()
      console.log(res)
      this.tableData = res.data
    },
    // el-from
    async onSubmit() {
      // console.log(this.formInline)
      const { data: res } = await insertnav(
        this.formInline.title,
        this.formInline.src
      )
      console.log(res)
      this.inittabledata()
      this.formInline.title = ''
      this.formInline.src = ''
    },
    handleEdit(id) {
      // this
      console.log(id)
    },
    handleDelete(id) {
      console.log(id)
    }
  },
  created() {
    this.inittabledata()
  }
}
</script>
<style lang="less">
.mittopnav-container {
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

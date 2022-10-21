<template>
  <div class="recycle-container">
    <div class="head-box">
      <router-link to="/index/mitopnav">返回</router-link>
      <h2>回收站</h2>
      <div></div>
    </div>

    <div class="recycle-box">
      <template v-if="!isnull">
        <div class="recycle-item" v-for="item in res" :key="item.id">
          <template v-if="item.data.length !== 0">
            <div class="table-box">
              <h3>{{ item.title }}</h3>
              <table>
                <tr>
                  <th
                    style="height: 30px"
                    v-for="(item2, key, index) in item.data[0]"
                    :key="index"
                  >
                    {{ key }}
                  </th>
                  <th>操作</th>
                </tr>
                <tr v-for="(item2, key, index) in item.data" :key="index">
                  <td v-for="(item3, key, index3) in item2" :key="index3">
                    {{ item3 }}
                  </td>
                  <td style="width: 200px">
                    <el-button
                      type="success"
                      @click="handleSave(item.title, item2)"
                      >还原
                    </el-button>
                    <el-button
                      type="danger"
                      @click="handleDelete(item.title, item2)"
                      >删除
                    </el-button>
                  </td>
                </tr>
              </table>
            </div>
          </template>
        </div>
      </template>
      <template v-else>
        <div class="null">暂无数据</div>
      </template>
    </div>
  </div>
</template>
<script>
import { recycle, reduction, deleterow } from '@/api/recycle'

export default {
  data() {
    return {
      res: [],
      isnull: false
    }
  },
  methods: {
    async initdata() {
      const { data: res } = await recycle()
      this.res = res.data
      // eslint-disable-next-line array-callback-return
      this.res.some((item) => {
        if (item.data.length === 0) {
          this.isnull = true
        } else {
          this.isnull = false
          return true
        }
      })
    },
    // 还原
    async handleSave(title, item) {
      // console.log(title)
      // console.log(item)
      const { data: res } = await reduction(title, item)
      this.cc(res)
      this.initdata()
    },
    async handleDelete(title, item) {
      // console.log(title)
      // console.log(item)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // eslint-disable-next-line space-before-function-paren
        .then(async () => {
          const { data: res } = await deleterow(title, item)
          console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.initdata()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  created() {
    this.initdata()
  }
}
</script>
<style lang="less">
.recycle-container {
  // padding: 10px;
  min-height: 100vh;
  height: 100%;
  .head-box {
    display: flex;
    justify-content: space-between;
    width: 1220px;
    margin: 0 auto;
    h2 {
      text-align: center;
    }
  }
  .null {
    margin-top: 200px;
    height: 100%;
    text-align: center;
  }
  .recycle-box {
    padding: 10px;
    .table-box {
      // background-color: #fff;
      width: 1220px;
      margin: 0 auto;
      table {
        // background-color: rgb(0, 0, 0);
        width: 100%;
        overflow: auto;

        td,
        th {
          text-align: center;
          background-color: #fff;
          padding: 5px 0;
        }
      }
    }
  }
}
</style>

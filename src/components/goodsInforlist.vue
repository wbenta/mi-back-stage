<template>
  <div class="goodsinfolist_container">
    <div class="table-box">
      <el-table
        :data="tableData"
        :height="screenHeight - 110"
        stripe
        style="width: 100%"
        :row-class-name="aa"
      >
        <el-table-column type="index" label="编号" width="50">
        </el-table-column>
        <el-table-column prop="goods_id" label="id" width="50">
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="90">
        </el-table-column>
        <el-table-column prop="c_id" label="商品分类" width="150">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格" width="150">
        </el-table-column>
        <el-table-column prop="goods_number" label="商品数量" width="150">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="150">
        </el-table-column>
        <el-table-column prop="big_src" label="商品大图标" width="180">
          <template slot-scope="scope">
            <el-popover placement="right" width="800" trigger="hover">
              <el-table height="350" :data="scope.row.big_src">
                <el-table-column type="index" label="编号"></el-table-column>
                <el-table-column prop="id" label="id"></el-table-column>
                <el-table-column prop="big_src" label="图片" width="200">
                  <template slot-scope="scope2">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="scope2.row.big_src"
                      :preview-src-list="srcBigList"
                    ></el-image>
                  </template>
                </el-table-column>
                <el-table-column prop="big_src" label="地址" width="300">
                  <template slot-scope="scope2">
                    <span>{{ scope2.row.big_src }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="180">
                  <template slot-scope="scope">
                    <el-button
                      type="danger"
                      @click="handleDeleteBig(scope.row.id)"
                      >删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button slot="reference">查看图片 </el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="small_src" label="商品小图标" width="180">
          <template slot-scope="scope">
            <el-popover placement="right" width="800" trigger="hover">
              <el-table height="350" :data="scope.row.small_src">
                <el-table-column label="编号" type="index"></el-table-column>
                <el-table-column label="id" prop="id"></el-table-column>
                <el-table-column prop="small_src" label="图片" width="200">
                  <template slot-scope="scope2">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="scope2.row.small_src"
                      :preview-src-list="srcSmallList"
                    ></el-image>
                  </template>
                </el-table-column>
                <el-table-column prop="small_src" width="300" label="地址">
                  <template slot-scope="scope2">
                    <span>{{ scope2.row.small_src }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="180">
                  <template slot-scope="scope">
                    <el-button
                      type="danger"
                      @click="handleDeleteSmall(scope.row.id)"
                      >删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button slot="reference">查看图片</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="goods_introduce" label="商品描述" width="150">
        </el-table-column>
        <el-table-column prop="add_time" label="商品添加时间" width="200">
        </el-table-column>
        <el-table-column prop="upd_time" label="商品修改时间" width="200">
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="180">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleEdit(scope.row)"
              >编辑
            </el-button>
            <el-button type="danger" @click="handleDelete(scope.row.goods_id)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {
  getgoodslist,
  deleteGoodsItem,
  deleteBiglogo,
  deleteSmalllogo
} from '@/api/goods'
import { getcate } from '@/api/getcate'
export default {
  data() {
    return {
      screenHeight: 0,
      screenWidth: 0,
      // el-table
      tableData: [],
      srcBigList: [],
      srcSmallList: []
    }
  },
  methods: {
    // 编辑按钮
    handleEdit(item) {
      this.$router.push('/index/goodsupload?id=' + item.goods_id)
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
          const { data: res } = await deleteGoodsItem(id)
          // console.log(res)
          this.cc(res)
          this.inittabledata()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 删除大图标按钮
    handleDeleteBig(id) {
      console.log(id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // eslint-disable-next-line space-before-function-paren
        .then(async () => {
          const { data: res } = await deleteBiglogo(id)
          // console.log(res)
          this.cc(res)
          this.inittabledata()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 删除小图标按钮
    handleDeleteSmall(id) {
      console.log(id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // eslint-disable-next-line space-before-function-paren
        .then(async () => {
          const { data: res } = await deleteSmalllogo(id)
          // console.log(res)
          this.cc(res)
          this.inittabledata()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 设置删除行的样式
    aa({ row, rowIndex }) {
      if (row.isdelete === 1) {
        return 'bb'
      }
    },
    async inittabledata() {
      this.screenHeight =
        document.documentElement.clientHeight || document.body.clientHeight
      this.screenWidth =
        document.documentElement.clientWidth || document.body.clientWidth
      const { data: res } = await getgoodslist()
      const { data: rescate } = await getcate()
      console.log(rescate)
      // eslint-disable-next-line array-callback-return
      res.data.map((item) => {
        // eslint-disable-next-line array-callback-return
        item.big_src.map((item2) => {
          // 预览图
          this.srcBigList.push(item2.big_src)
        })
        // eslint-disable-next-line array-callback-return
        item.small_src.map((item2) => {
          // 预览图
          this.srcSmallList.push(item2.small_src)
        })
        // eslint-disable-next-line array-callback-return
        rescate.data.map((item2) => {
          if (item.c_id === item2.c_id) {
            // console.log(item)
            return (item.c_id = item2.cate)
          }
        })
      })
      this.tableData = res.data
    }
  },
  created() {
    this.inittabledata()
  }
}
</script>
<style lang="less">
.goodsinfolist_container {
  overflow: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  -moz-box-sizing: border-box; /* Firefox */
  -webkit-box-sizing: border-box; /* Safari */
  width: 100%;
  margin: 0;

  .table-box {
    // overflow: auto;
    // width: 1200px;
    // background-color: aqua;
    box-sizing: border-box;
    -moz-box-sizing: border-box; /* Firefox */
    -webkit-box-sizing: border-box; /* Safari */
    width: 100%;
    max-width: 1220px;
    .bb {
      color: rgba(255, 0, 0, 0.416);
    }
  }
}
</style>

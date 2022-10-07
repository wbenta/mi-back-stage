<template>
  <div class="goodsinfolist_container">
    <div class="table-box">
      <el-table
        :data="tableData"
        stripe
        :height="screenHeight - 110"
        style="width: 100%"
      >
        <el-table-column type="index" label="编号" width="50">
        </el-table-column>
        <el-table-column prop="goods_id" label="id" width="50">
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="90">
          <!-- <template slot-scope="scope">
            <el-input
              v-model="scope.row.goods_name"
              :placeholder="scope.row.goods_name"
              :disabled="scope.row.disabled"
            ></el-input>
          </template> -->
        </el-table-column>
        <el-table-column prop="c_id" label="商品分类" width="150">
          <!-- <template slot-scope="scope">
            <el-input
              v-model="scope.row.src"
              :placeholder="scope.row.src"
              :disabled="scope.row.disabled"
            ></el-input>
          </template> -->
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格" width="150">
          <!-- <template slot-scope="scope">
            <el-input
              v-model="scope.row.src"
              :placeholder="scope.row.src"
              :disabled="scope.row.disabled"
            ></el-input>
          </template> -->
        </el-table-column>
        <el-table-column prop="goods_number" label="商品数量" width="150">
          <!-- <template slot-scope="scope">
            <el-input
              v-model="scope.row.src"
              :placeholder="scope.row.src"
              :disabled="scope.row.disabled"
            ></el-input>
          </template> -->
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="150">
          <!-- <template slot-scope="scope">
            <el-input
              v-model="scope.row.src"
              :placeholder="scope.row.src"
              :disabled="scope.row.disabled"
            ></el-input>
          </template> -->
        </el-table-column>
        <el-table-column prop="big_src" label="商品大图标" width="180">
        </el-table-column>
        <el-table-column prop="small_src" label="商品小图标" width="180">
        </el-table-column>
        <el-table-column prop="goods_introduce" label="商品描述" width="150">
          <!-- <template slot-scope="scope">
            <el-input
              v-model="scope.row.src"
              :placeholder="scope.row.src"
              :disabled="scope.row.disabled"
            ></el-input>
          </template> -->
        </el-table-column>
        <el-table-column prop="add_time" label="商品添加时间" width="200">
        </el-table-column>
        <el-table-column prop="upd_time" label="商品修改时间" width="200">
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="180">
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
import { getgoodslist } from '@/api/goods'
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
  async created() {
    this.screenHeight =
      document.documentElement.clientHeight || document.body.clientHeight
    this.screenWidth =
      document.documentElement.clientWidth || document.body.clientWidth
    const { data: res } = await getgoodslist()
    console.log(res)
    // eslint-disable-next-line array-callback-return
    res.data.map((item) => {
      item.disabled = true
      // 预览图
      this.srcBigList.push(item.big_src)
      this.srcSmallList.push(item.small_src)
    })
    this.tableData = res.data
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
  }
}
</style>

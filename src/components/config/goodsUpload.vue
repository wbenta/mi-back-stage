<template>
  <div class="goodsupload-container">
    <!-- <div class="aaa">
      <span>goods_id 商品ID</span>
      <span>cat_id 分类ID</span>
      <span>goods_name 商品名称</span><br />
      <span>goods_price 商品价格</span>
      <span>goods_number 商品数量</span>
      <span>goods_weight 商品重量</span><br />
      <span>goods_big_logo 商品大图标</span>
      <span>goods_small_logo 商品小图标</span>
      <span>add_time 商品添加时间</span><br />
      <span>upd_time 商品更新时间</span>
      <span>hot_mumber 热门商品数</span>
      <span>cat_one_id 所属一级分类</span><br />
      <span>cat_two_id 所属二级分类</span>
      <span>cat_three_id 所属三级分类</span>
      <span>goods_introduce 商品介绍</span><br />
      <span>pics 商品图片列表</span>
      <span>attrs 商品属性列表</span>
    </div> -->
    <div class="form-box">
      <el-form ref="form" :inline="true" :model="form" label-width="100px">
        <el-form-item label="商品名称">
          <el-input v-model="form.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品类型">
          <el-select v-model="form.cate" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <br />
        <div style="display: flex">
          <div>
            <el-form-item label="商品价格">
              <el-input-number
                v-model="form.goods_price"
                @change="handleChange"
                label="商品价格"
                :min="0"
              ></el-input-number>
            </el-form-item>
            <br />
            <el-form-item label="商品数量">
              <el-input-number
                v-model="form.goods_number"
                @change="handleChange"
                label="商品数量"
                :min="0"
              ></el-input-number>
            </el-form-item>
            <br />
            <el-form-item label="商品重量">
              <el-input-number
                v-model="form.goods_weight"
                @change="handleChange"
                label="商品重量"
                :min="0"
              ></el-input-number>
            </el-form-item>
          </div>
          <el-form-item label="商品大图标">
            <el-upload
              class="upload-demo"
              ref="uploadBig"
              name="big"
              :action="
                'http://127.0.0.1/my/goodsinfo/addgoodspicturebig?index=' +
                bigitem
              "
              :on-change="handleChangeBig"
              :on-preview="handlePreviewBig"
              :on-remove="handleRemoveBig"
              :on-success="handleBigSuccess"
              :file-list="form.big"
              :headers="headerObj"
              list-type="picture"
              :auto-upload="false"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品小图标">
            <el-upload
              class="upload-demo"
              ref="uploadSmall"
              name="small"
              :action="
                'http://127.0.0.1/my/goodsinfo/addgoodspicturesmall?index=' +
                smallitem
              "
              :on-change="handleChangeSmall"
              :on-preview="handlePreviewSmall"
              :on-remove="handleRemoveSmall"
              :on-success="handleSmallSuccess"
              :file-list="form.small"
              :auto-upload="false"
              :headers="headerObj"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
        </div>
        <el-form-item label="所属一级分类">
          <el-select v-model="form.cat_one_id" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属二级分类">
          <el-select v-model="form.cat_two_id" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属三级分类">
          <el-select v-model="form.cat_three_id" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="商品介绍">
          <el-input
            type="textarea"
            style="width: 300px"
            maxlength="100"
            autosize
            v-model="form.goods_introduce"
            show-word-limit
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { setgoods, getgoodslist } from '@/api/goods'
import { getcate } from '@/api/getcate'
export default {
  data() {
    return {
      value: [],
      options: [],
      headerObj: {
        Authorization: localStorage.getItem('token')
      },
      form: {
        goods_name: '',
        cate: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        big: [],
        small: [],
        cat_one_id: '',
        cat_two_id: '',
        cat_three_id: '',
        goods_introduce: ''
      },
      bigitem: 0,
      smallitem: 0,
      // el-upload
      fileListBig: [],
      fileListSmall: []
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    handleChangeBig(file, fileList) {
      this.form.big = fileList.slice(-3)
    },
    handleChangeSmall(file, fileList) {
      this.form.small = fileList.slice(-3)
    },
    async onSubmit() {
      // console.log(this.$refs)
      const { data: res } = await setgoods(this.form)
      // console.log(res)
      this.bigitem = res.data
      this.smallitem = res.data
      setTimeout(() => {
        this.$refs.uploadBig.submit()
        this.$refs.uploadSmall.submit()
        // console.log(this.bigitem)
      }, 100)
      this.$message({
        message: res.message,
        type: 'success'
      })
    },
    // el-upload
    handleRemoveBig(file, fileList) {
      this.form.big = fileList
      console.log(file, fileList)
    },
    handlePreviewBig(file) {
      console.log(file)
    },
    handleRemoveSmall(file, fileList) {
      this.form.small = fileList
      console.log(file, fileList)
    },
    handlePreviewSmall(file) {
      console.log(file)
    },
    handleBigSuccess(res, file, fileList) {
      // console.log(this.$refs.uploadBig.uploadFiles)
      if (res.status === 1) {
        if (file.uid === this.$refs.uploadBig.uploadFiles[0].uid) {
          console.log(this.$refs.uploadBig.uploadFiles)
          this.$refs.uploadBig.clearFiles()
        }
        return this.$message.error(res.message)
      }
      // this.$refs.uploadBig.clearFiles()
      // this.imageUrl = URL.createObjectURL(file.raw)
      // console.log(this.$refs.uploadBig.uploadFiles)
      if (file.uid === this.$refs.uploadBig.uploadFiles[0].uid) {
        this.$refs.uploadBig.clearFiles()
      }
    },
    handleSmallSuccess(res, file, fileList) {
      if (res.status === 1) {
        if (file.uid === this.$refs.uploadSmall.uploadFiles[0].uid) {
          console.log(this.$refs.uploadSmall.uploadFiles)
          this.$refs.uploadSmall.clearFiles()
        }
        return this.$message.error(res.message)
      }
      if (file.uid === this.$refs.uploadSmall.uploadFiles[0].uid) {
        this.$refs.uploadSmall.clearFiles()
      }
    }
  },
  async created() {
    console.log(this)
    const { data: res } = await getcate()
    // console.log(res)
    const { data: goodsres } = await getgoodslist(this.$route.query.id)
    console.log(goodsres)
    this.form = {
      goods_name: goodsres.data[0].goods_name,
      cate: goodsres.data[0].c_id,
      goods_price: goodsres.data[0].goods_price,
      goods_number: goodsres.data[0].goods_number,
      goods_weight: goodsres.data[0].goods_weight,
      big: [],
      small: [],
      cat_one_id: '',
      cat_two_id: '',
      cat_three_id: '',
      goods_introduce: goodsres.data[0].goods_introduce
    }
    // eslint-disable-next-line array-callback-return
    res.data.map((item) => {
      this.options.push({ value: item.c_id, label: item.cate })
    })
  }
}
</script>
<style lang="less">
.goodsupload-container {
  // .aaa {
  //   span {
  //     margin-left: 100px;
  //   }
  // }
  overflow: auto;
  height: 100%;
  .form-box {
    background-color: #fff;
    padding: 10px;
    .el-upload-list {
      // background-color: aqua;
      height: 200px;
      overflow: auto;
      .el-upload-list__item {
        height: 75px;
        width: 100%;
        padding: 10px 10px 10px 80px;
        display: flex;
        // flex-direction: column;
        justify-content: space-around;
        align-items: center;
        // background-color: aqua;
        .el-upload-list__item-name {
          // background-color: aqua;
          width: 100px;
          margin: 0;
        }
        img {
          width: 60px;
          height: 60px;
        }
        .el-icon-document {
          display: none;
        }
      }
    }
    .el-input__count {
      // background-color: aqua;
      line-height: 16px;
    }
  }
}
</style>

<template>
  <div class="left-container">
    <el-menu
      :default-active="$router.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      :collapse="isCollapse"
      router
    >
      <el-menu-item @click="isCollapse = !isCollapse">
        <i class="el-icon-s-unfold"></i>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">界面管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="item in menuList"
            :key="item.id"
            :index="item.index"
            >{{ item.title }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/index/productinforlist">
        <i class="el-icon-menu"></i>
        <span slot="title">商品信息</span>
      </el-menu-item>
      <el-menu-item index="4" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: '1',
      screenHeight: 0,
      screenWidth: 0,
      isCollapse: true,
      menuList: [
        { id: 0, title: '顶部导航', index: '/index/mitopnav' },
        { id: 1, title: '分类导航', index: '/index/micate' },
        { id: 2, title: '轮播图设置', index: '/index/swiperconfig' },
        { id: 3, title: '楼层设置', index: '/index/fool' },
        { id: 4, title: '商品上传', index: '/index/goodsupload' }
      ]
    }
  },
  computed: {},
  created() {
    this.screenHeight =
      document.documentElement.clientHeight || document.body.clientHeight
    this.screenWidth =
      document.documentElement.clientWidth || document.body.clientWidth
    if (this.screenWidth < 1000) {
      this.isCollapse = true
    } else {
      this.isCollapse = false
    }
  },
  mounted() {
    window.onresize = () => {
      // 屏幕尺寸变化就重新赋值
      return (() => {
        this.screenHeight =
          document.documentElement.clientHeight || document.body.clientHeight
        this.screenWidth =
          document.documentElement.clientWidth || document.body.clientWidth
        if (this.screenWidth < 1000) {
          this.isCollapse = true
        } else {
          this.isCollapse = false
        }
      })()
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      // this.activeIndex = key
    },
    handleChange(val) {
      // console.log(val)
      console.log('handleChange')
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
      console.log('handleOpen')
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="less">
/* 定义滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: rgba(240, 240, 240, 0);
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
  border-radius: 10px;
  background-color: rgb(240, 240, 240);
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
  background-color: rgb(0, 136, 255);
}
.left-container {
  // width: 250px;
  overflow: auto;
  height: 100%;
  // width: 100%;
  // display: block;
  background-color: rgb(211, 221, 255);
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 209px;
    // min-height: 400px;
    // height: 100%;
  }
}
</style>

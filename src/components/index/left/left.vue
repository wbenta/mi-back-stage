<template>
  <div class="left-container" :style="{ height: screenHeight - 81 + 'px' }">
    <el-collapse v-model="activeNames" accordion>
      <el-collapse-item title="导航设置" name="1">
        <router-link class="router-to" to="/index/mitopnav"
          >顶部导航</router-link
        >
        <div class="router-to">中部导航</div>
      </el-collapse-item>
      <el-collapse-item title="反馈 Feedback" name="2">
        <div class="router-to">
          控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
        </div>
        <div class="router-to">
          页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。
        </div>
      </el-collapse-item>
      <el-collapse-item title="效率 Efficiency" name="3">
        <div class="router-to">简化流程：设计简洁直观的操作流程；</div>
        <div class="router-to">
          清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
        </div>
        <div class="router-to">
          帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
        </div>
      </el-collapse-item>
      <el-collapse-item title="可控 Controllability" name="4">
        <div class="router-to">
          用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
        </div>
        <div class="router-to">
          结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeNames: ['1'],
      screenHeight: 0
    }
  },
  created() {
    this.screenHeight =
      document.documentElement.clientHeight || document.body.clientHeight
  },
  mounted() {
    window.onresize = () => {
      // 屏幕尺寸变化就重新赋值
      return (() => {
        this.screenHeight =
          document.documentElement.clientHeight || document.body.clientHeight
      })()
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
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
  width: 250px;
  overflow: auto;
  background-color: rgb(211, 221, 255);
  .el-icon-arrow-right:before {
    // content: url('../assets/images/expand.png');
  }
  // 标题
  .el-collapse-item__header {
    padding-left: 5px;
    background: rgb(209, 229, 255);
    border-bottom: solid white 1px;
    font-weight: bolder;
  }
  // 选中
  .is-active {
    background: rgb(129, 193, 253);
    transform: rotate(0deg);
  }
  .el-collapse {
    // height: 100%;
    // overflow: auto;
    // background-color: aqua;
  }
  .el-collapse-item__wrap {
    overflow: auto;
  }
  .el-collapse-item__content {
    padding-bottom: 0;
    .router-to {
      display: block;
      padding-left: 10px;
      height: 48px;
      line-height: 48px;
      background: rgb(186, 218, 255);
      border-bottom: solid white 1px;
      //   font-weight: bolder;
    }
    // background: rgb(246, 246, 246);
  }
}
</style>

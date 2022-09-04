<template>
  <div class="index-container">
    <Head></Head>
    <div class="index-main">
      <div class="index-main-left">
        <Left></Left>
      </div>
      <div class="index-main-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Head from '@/components/index/head/head.vue'
import Left from '@/components/index/left/left.vue'

export default {
  components: { Head, Left }
}
</script>
<style lang="less">
.index-container {
  width: 100%;
  height: 100vh;
  // background-color: aqua;
  display: flex;
  flex-direction: column;
  .index-main {
    // flex: 1;
    height: 100%;
    overflow: hidden;
    display: flex;
    width: 100%;
    .index-main-left {
      // width: 100%;
      // height: 100%;
      max-width: 220px;
      // overflow: auto;
    }
    .index-main-right {
      width: 100%;
      // flex: 1;
      padding: 15px;
      background-color: rgb(206, 212, 255);
    }
  }
}
</style>

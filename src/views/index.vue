<template>
  <div class="index-container">
    <Head class="index-head"></Head>
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
  background-color: aqua;
  display: flex;
  flex-direction: column;
  .index-head {
    flex: 1;
  }
  .index-main {
    flex: 8;
    display: flex;

    .index-main-left {
      flex: 2;
      max-width: 300px;
      height: 100%;
      // background-color: burlywood;
    }
    .index-main-right {
      flex: 4;
      background-color: cadetblue;
    }
  }
}
</style>

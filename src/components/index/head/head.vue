<template>
  <div class="head-container">
    <div class="head-box">
      <div class="left-box">
        <span>小米商城后台管理系统</span>
      </div>
      <div class="right-box"></div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less">
.head-container {
  width: 100%;
  height: 100%;
  max-height: 100px;
  background-color: chocolate;
  .head-box {
    display: flex;
    justify-content: space-between;
    .left-box {
      background-color: crimson;
    }
    .rigght-box {
      background-color: cyan;
    }
  }
}
</style>

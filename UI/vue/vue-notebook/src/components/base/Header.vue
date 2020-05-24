<template>
  <div class="box2">
    <div class="left">
      <img src="../../assets/images/favicon.png" alt="笔记" />
      <h3>vue笔记本</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped lang="less">
.box2 {
  height: 60px;
  line-height: 60px;
  background: #409eff;
}
.left {
  display: flex;
  align-items: center;
  width: 200px;
  img {
    display: block;
    width: 40px;
    height: 40px;
  }
  h3 {
    margin-left: 10px;
    flex: 1 0 auto;
    color: #f1f1f1;
    font-size: 24px;
    letter-spacing: 1px;
    font-weight: 600;
  }
}
</style>
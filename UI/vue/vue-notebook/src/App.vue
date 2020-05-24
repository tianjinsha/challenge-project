<template>
  <div id="app">
    <!-- 路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
    };
  },
  components: {
  },
  methods: {
  },
  mounted() {
  },
  beforeDestroy() {
  }
};
</script>

<style lang="less">
#app {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
}
</style>

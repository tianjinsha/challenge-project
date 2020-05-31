<template>
  <div class="initPage">
    <img src="../assets/images/loading-open.gif" alt="">
  </div>
</template>

<script>
import commonFunc from '@/utils/commonFunc'
export default {
  name: "initPage",
  data() {
    return {};
  },
  async created(){
    console.debug('enter initPage page')
    await commonFunc.sleep(3000)
    this.$router.push({path:'home'})
  },
  methods:{

  },
  props: {

  }
};
</script>

<style scoped lang="less">
.initPage{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

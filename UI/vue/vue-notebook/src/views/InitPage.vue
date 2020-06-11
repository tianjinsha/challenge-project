<template>
  <div class="initPage">
    <img src="../assets/images/loading-open.gif" alt />
  </div>
</template>

<script>
import commonFunc from "@/utils/commonFunc";
import indexedDB from "@/db/indexedDB";
export default {
  name: "initPage",
  data() {
    return {};
  },
  async created() {
    console.debug("enter initPage page");
    await indexedDB.initDB();
    // 从本地数据库获取文件
    let result = await indexedDB.getAll("todo");
    result = result.map(item => {
      delete item.conttent;
      return {
        ...this.$DataDictionary.todoStruct,
        ...item
      };
    });
    // 设置todo
    this.$store.commit("todo/setTodoList", result);
    //设置为顶级文件夹
    this.$store.commit("todo/setCurrentFolder", {
      id: "",
      pid: ""
    });
    // 初始化成功
    await commonFunc.sleep(2000);
    this.$store.commit("setInit", true);
    this.$router.push({ path: "home" });
  },
  methods: {},
  props: {}
};
</script>

<style scoped lang="less">
.initPage {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

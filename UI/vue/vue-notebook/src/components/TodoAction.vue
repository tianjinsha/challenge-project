<template>
  <div class="todo-action">
    <el-button type="primary" icon="el-icon-top" @click="returnBack()"></el-button>
    <el-input placeholder="请输入内容" v-model="content" clearable>
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TodoAction",
  data() {
    return {
      content: "",
    };
  },
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    returnBack() {
      console.info("return prev folder");
      let prevMenu = this.getPrevFolder;
      let currentMenu = this.getCurrentFolder;
      if (currentMenu && currentMenu.id !== "") {
        if (prevMenu) {
          console.debug("prev folder is ");
          console.debug(prevMenu);
        } else {
          console.debug("prev folder is top folder");
        }

        if (prevMenu && prevMenu.id !== "") {
          this.$store.commit("todo/setCurrentFolder", {
            id: prevMenu.id,
            pid: prevMenu.pid
          });
        } else {
          this.$store.commit("todo/setCurrentFolder", {
            id: "",
            pid: ""
          });
        }
      } 
    }
  },
  computed: {
 ...mapGetters({
      getPrevFolder: "todo/getPrevFolder",
      getCurrentFolder: "todo/getCurrentFolder",
    })
  },
  props: {
  }
};
</script>

<style scoped lang="less">
.todo-action {
  height: 80px;
  line-height: 80px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  .el-input {
    margin-left: 8px;
  }
}
</style>

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
      console.info("return prev menu");
      let prevMenu = this.getPrevMenu;
      let currentMenu = this.getCurrentMenu;
      if (currentMenu && currentMenu.id !== "") {
        if (prevMenu) {
          console.debug("prevMenu is ");
          console.debug(prevMenu);
        } else {
          console.debug("prev Menu is top menu");
        }

        if (prevMenu && prevMenu.id !== "") {
          this.$store.commit("todo/setCurrentMenu", {
            id: prevMenu.id,
            pid: prevMenu.pid
          });
        } else {
          this.$store.commit("todo/setCurrentMenu", {
            id: "",
            pid: ""
          });
        }
      } 
    }
  },
  computed: {
 ...mapGetters({
      getPrevMenu: "todo/getPrevMenu",
      getCurrentMenu: "todo/getCurrentMenu",
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

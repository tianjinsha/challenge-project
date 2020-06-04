<template>
  <div class="box">
    <!-- 搜索 -->
    <div class="action">
      <el-button type="primary" icon="el-icon-top" @click="goBack()" v-if="backEnable"></el-button>
      <el-button type="primary" icon="el-icon-top" @click="goBack()" disabled v-else></el-button>
      <el-input placeholder="请输入内容" v-model="content" clearable>
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <!-- 笔记列表 -->
    <div class="todo-wrap">
      <div class="todo-list">
        <TodoItem v-for="item in getCurrentTodoListEnable" :key="item.id" :content="item" @chanageGoBack = 'changeGoBack'></TodoItem>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";
import { mapGetters } from "vuex";

export default {
  name: "TodoList",
  data() {
    return {
      content: "",
      backEnable:false,
      activeMenu:'',
    };
  },
  created() {
    console.debug("currentTodoList is");
    console.debug(this.getCurrentTodoListEnable);
    this.activeMenu = this.getActiveMenu
  },
  components: {
    TodoItem
  },
  methods: {
    goBack() {
      console.debug("return to the upper level");
      let prevMenu = this.getPrevMenu;
      let currentMenu = this.getCurrentMenu;
      if (currentMenu && currentMenu.id !=="") {
        if (prevMenu) {
          console.debug("prevMenu is ");
          console.debug(prevMenu);
          this.backEnable = true
        } else {
          this.backEnable = false
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
      }else{
        this.backEnable = false
        
      }
    },
    changeGoBack(){
      this.backEnable = true
    }
  },
  computed: {
    ...mapGetters({
      getCurrentTodoListEnable: "todo/getCurrentTodoListEnable",
      getPrevMenu: "todo/getPrevMenu",
      getCurrentMenu: "todo/getCurrentMenu",
      getMenuById: "todo/getMenuById",
      getActiveMenu:'getActiveMenu'
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit less to this component only -->
<style scoped lang="less">
.box {
  width: 280px;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
  border-top: 0;
  border-bottom: 0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}
.action {
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

.todo-wrap {
  flex: 1 0 auto;
  overflow: hidden;
  position: relative;
}

.todo-list {
  width: 295px;
  position: absolute;
  top: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>

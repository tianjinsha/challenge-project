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
        <TodoItem
          v-for="item in todoList"
          :key="item.id"
          :content="item"
          @chanageGoBack="changeGoBack"
        ></TodoItem>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";
import { mapGetters } from "vuex";
import todoFunc from "@/utils/todoFunc";

export default {
  name: "TodoList",
  data() {
    return {
      content: "",
      backEnable: false,
      activeMenu: ""
    };
  },
  created() {
    this.activeMenu = this.getActiveMenu;
    console.debug("activeMenu is :" + this.activeMenu);
  },
  components: {
    TodoItem
  },
  methods: {
    goBack() {
      console.info("return prev menu");
      let prevMenu = this.getPrevMenu;
      let currentMenu = this.getCurrentMenu;
      if (currentMenu && currentMenu.id !== "") {
        if (prevMenu) {
          console.debug("prevMenu is ");
          console.debug(prevMenu);
          this.backEnable = true;
        } else {
          this.backEnable = false;
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
      } else {
        this.backEnable = false;
      }
    },
    changeGoBack() {
      this.backEnable = true;
    },
    selectTodoList(args) {
      let list = [];
      switch (args) {
        case "1":
          list = todoFunc.getLastedNote();
          break;
        case "2":
          list = todoFunc.getCurrentTodoEnable();
          break;
        case "3":
          list = todoFunc.getStarNote();
          break;
        case "4":
          list = todoFunc.getDeletedTodo();
          break;
        default:
          break;
      }
      return list;
    }
  },
  computed: {
    todoList() {
      return this.selectTodoList(this.getActiveMenu);
    },
    ...mapGetters({
      getPrevMenu: "todo/getPrevMenu",
      getCurrentMenu: "todo/getCurrentMenu",
      getMenuById: "todo/getMenuById",
      getActiveMenu: "getActiveMenu"
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

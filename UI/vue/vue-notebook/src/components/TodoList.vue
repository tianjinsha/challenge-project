<template>
  <!-- 笔记列表 -->
  <div class="todo-list">
    <div class="todo-wrap">
      <TodoItem v-for="item in todoList" :key="item.id" :content="item"></TodoItem>
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
      backEnable: false
    };
  },
  created() {},
  components: {
    TodoItem
  },
  methods: {
    selectTodoList(args) {
      let list = [];
      switch (args) {
        case this.$DataDictionary.menuType.latest:
          list = todoFunc.getLastedNote();
          break;
        case this.$DataDictionary.menuType.folder:
          list = todoFunc.getCurrentTodoEnable();
          break;
        case this.$DataDictionary.menuType.star:
          list = todoFunc.getStarNote();
          break;
        case this.$DataDictionary.menuType.trash:
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
      getActiveMenu: "getActiveMenu"
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit less to this component only -->
<style scoped lang="less">
.todo-list {
  flex: 1 0 auto;
  overflow: hidden;
  position: relative;
}

.todo-wrap {
  width: 295px;
  position: absolute;
  top: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>

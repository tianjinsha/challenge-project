<template>
  <!-- 笔记列表 -->
  <div class="todo-list">
    <div class="todo-wrap" v-if="isEmpty">
      <div class="empty">
        <p>没有找到文件</p>
        <el-button @click="addNote">新建笔记</el-button>
      </div>
    </div>
    <div class="todo-wrap" v-else>
      <TodoItem v-for="item in todoList" :key="item.id" :content="item"></TodoItem>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";
import { mapGetters } from "vuex";
import todoFunc from "@/utils/todoFunc";
import commonFunc from "@/utils/commonFunc";

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
    },
    async addNote() {
      let currrentMenu = this.getCurrentFolder;
      await todoFunc.addTodo({
        id: commonFunc.uuid(),
        pid: currrentMenu.id,
        type: this.$DataDictionary.todoType.note,
        title: this.$DataDictionary.default.todoTitle,
        deleted: false,
        createTime: new Date().getTime()
      });
    }
  },
  computed: {
    todoList() {
      return this.selectTodoList(this.getActiveMenu);
    },
    ...mapGetters({
      getActiveMenu: "getActiveMenu",
      getCurrentFolder: "todo/getCurrentFolder"
    }),
    isEmpty() {
      if (this.todoList && this.todoList.length > 0) {
        return false;
      }
      return true;
    }
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
  .empty {
    font-size: 12px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      margin: 8px 0;
    }
  }
}
</style>

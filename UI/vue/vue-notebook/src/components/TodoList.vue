<template>
  <div class="box">
    <!-- 搜索 -->
    <div class="action">
      <el-button type="primary" icon="el-icon-top"></el-button>
      <el-input placeholder="请输入内容" v-model="content" clearable>
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <!-- 笔记列表 -->
    <div class="todo-wrap">
      <div class="todo-list">
        <TodoItem v-for="item in getCurrentTodoList" :key="item.id" :content="item"></TodoItem>
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
      content: ""
    };
  },
  created() {
    console.debug('currentTodoList is')
    console.debug(this.getCurrentTodoList)
  },
  components: {
    TodoItem
  },
  computed: {
    ...mapGetters({
      getCurrentTodoList: "todo/getCurrentTodoList"
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

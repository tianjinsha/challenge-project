<template>
  <div class="home">
    <el-container class="container-1">
      <!-- 头部导航栏 -->
      <el-header style="height:auto">
        <Header></Header>
      </el-header>
      <!-- 内容主体 -->
      <el-container class="container-2">
        <el-aside width="auto">
          <Menu></Menu>
        </el-aside>
        <el-main>
          <div class="main-wrap">
            <div class="todo">
              <!-- 搜索框 -->
              <TodoAction></TodoAction>
              <!-- 笔记列表 -->
              <TodoLsit></TodoLsit>
            </div>
            <!-- 笔记详情 -->
            <div class="article">
              <TodoPanel :noteId="getCurrentNote.id"></TodoPanel>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/base/Header.vue";
import Menu from "../components/base/Menu.vue";
import TodoLsit from "../components/TodoList.vue";
import TodoAction from "../components/TodoAction";
import TodoPanel from "../components/TodoPanel";
import { mapGetters } from "vuex";
export default {
  name: "home",
  data() {
    return {
      title: "",
      content: ""
    };
  },
  components: {
    Header,
    Menu,
    TodoLsit,
    TodoAction,
    TodoPanel
  },
  async created() {
    console.debug("enter Home page");
    if (!this.getInit) {
      this.$router.push({ path: "initPage" });
    }
    this.$store.commit("setActiveMenu", this.$DataDictionary.menuType.folder);
  },
  props: {},
  methods: {},
  computed: {
    ...mapGetters({
      getCurrentNote: "todo/getCurrentNote",
      getInit: "getInit"
    })
  },
  async destroyed() {}
};
</script>

<style scoped lang="less">
.home {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
}
.el-container {
  height: 100%;
}
.el-header {
  margin: 0;
  padding: 0 !important;
  height: 100%;
}

.el-aside {
  background: #f9f9f9;
}

.el-main {
  padding: 0 !important;
  box-sizing: border-box;
  overflow: hidden;
}
.main-wrap {
  display: flex;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}
//
.todo {
  width: 280px;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
  border-top: 0;
  border-bottom: 0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

//
.article {
  
  flex: 1 1 auto;
}
</style>

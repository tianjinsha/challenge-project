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
            <TodoLsit></TodoLsit>
            <div class="article">
              <div class="a-header">
                <h3>文章标题</h3>
                <div class="a-action">
                  <el-button>保存</el-button>
                </div>
              </div>
              
              <div class="a-editor">
                <vue-editor v-model="content"></vue-editor>
              </div>
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
import { VueEditor } from "vue2-editor";
export default {
  name: "home",
  data() {
    return {
      content: "空白笔记……"
    };
  },
  components: {
    Header,
    Menu,
    TodoLsit,
    VueEditor
  },
  created(){
    console.debug('enter Home page')
    this.$store.commit('todo/setCurrentMenu',{
      id:'',
      pid:''
    }),{root:true}
  },
  methods: {},
  props: {}
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

.article {
  width: 100%;
  display: flex;
  flex-direction: column;
  .a-header {
    height: 80px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    display: flex;
    h3 {
      height: 80px;
      line-height: 80px;
      padding: 0 10px;
      flex: 1 0 auto;
      color: #444;
    }
    .a-action {
      padding: 0 10px;
      height: 80px;
      line-height: 80px;
    }
  }
  .a-editor {
    flex: 1 0 auto;
    width: 100%;
  }
}
.quillWrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  .ql-container {
    width: 100%;
    position: relative;
    flex: 1 0 auto;
    height: auto;
    border: none !important;
    .ql-editor {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
    }
  }
}
.ql-toolbar.ql-snow {
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: 1px solid #eee !important;
}
</style>

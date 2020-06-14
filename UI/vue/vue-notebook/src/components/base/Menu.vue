<template>
  <div class="box">
    <!-- 新建文件 -->
    <div class="action">
      <el-dropdown class="dropdown" @command="addTodo" trigger="click">
        <span class="el-dropdown-link">
          <i class="add el-icon-plus"></i>
          <span>新文档</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="note">新建笔记</el-dropdown-item>
          <el-dropdown-item>新建Markdown</el-dropdown-item>
          <el-dropdown-item command="folder" v-show="getActiveMenu ===this.$DataDictionary.menuType.folder">新建文件夹</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 目录列表 -->
    <div class="menu-wrap">
      <ul class="menu-list">
        <li
          class="menu-item"
          v-bind:class="{ active: getActiveMenu === this.$DataDictionary.menuType.latest }"
          @click="changeMenu($DataDictionary.menuType.latest)"
        >
          <i class="el-icon-copy-document"></i> 最新文档
        </li>
        <li
          class="menu-item"
          v-bind:class="{ active: getActiveMenu ===this.$DataDictionary.menuType.folder }"
          @click="changeMenu($DataDictionary.menuType.folder)"
        >
          <i class="el-icon-folder"></i> 我的文件夹
        </li>
        <li
          class="menu-item"
          v-bind:class="{ active: getActiveMenu ===this.$DataDictionary.menuType.star }"
          @click="changeMenu($DataDictionary.menuType.star)"
        >
          <i class="el-icon-star-off"></i> 加星文件
        </li>
        <li
          class="menu-item"
          v-bind:class="{ active: getActiveMenu ===this.$DataDictionary.menuType.trash }"
          @click="changeMenu($DataDictionary.menuType.trash)"
        >
          <i class="el-icon-delete"></i> 回收站
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import commonFunc from "@/utils/commonFunc";
import todoFunc from "@/utils/todoFunc";
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    // 添加todo
    async addTodo(args) {
      console.log("add todo type is: " + args);
      let currrentMenu = this.getCurrentFolder;
      if (args === this.$DataDictionary.todoType.note) {
         this.$store.commit("setActiveMenu", this.$DataDictionary.menuType.folder)
        await todoFunc.addTodo({
          id: commonFunc.uuid(),
          pid: currrentMenu.id,
          type: this.$DataDictionary.todoType.note,
          title: this.$DataDictionary.default.todoTitle,
          deleted: false,
          createTime: new Date().getTime()
        });
      } else if (args === this.$DataDictionary.todoType.folder) {
        await todoFunc.addTodo({
          id: commonFunc.uuid(),
          pid: currrentMenu.id,
          type: this.$DataDictionary.todoType.folder,
          title: this.$DataDictionary.default.todoFolder,
          deleted: false,
          createTime: new Date().getTime()
        });
      }
    },
    // 改变目录
    changeMenu(args) {
      this.activeMenu = args;
      console.debug("current menu is " + this.activeMenu);
      this.$store.commit("setActiveMenu", args);
    }
  },
  computed: {
    ...mapGetters({
      getCurrentFolder: "todo/getCurrentFolder",
      getActiveMenu: "getActiveMenu"
    })
  }
};
</script>

<style scoped lang="less">
.box {
  width: 200px;
  height: 100%;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
}

.action {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #eee;
  .el-dropdown-link {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .add {
    font-size: 18px;
    font-weight: 600;
    padding-right: 15px;
  }
  .dropdown {
    margin-left: 12px;
    font-size: 14px;
    color: #333;
  }
}

.menu-wrap {
  flex: 1 0 auto;
  overflow: hidden;
  position: relative;
  width: 200px;
}

.menu-list {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 215px;
  overflow-x: hidden;
  overflow-y: auto;
  .menu-item {
    cursor: pointer;
    height: 48px;
    line-height: 48px;
    text-indent: 15px;
    font-size: 16px;
    color: #333;
    i {
      font-weight: bold;
      color: #777;
    }
  }
  .active {
    background: #409eff;
    color: #f1f1f1;
    i {
      color: #f1f1f1;
    }
  }
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
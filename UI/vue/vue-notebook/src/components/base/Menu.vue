<template>
  <div class="box">
    <!-- 新建文件 -->
    <div class="action">
      <el-dropdown class="dropdown" @command="addTodo" trigger="click">
        <span class="el-dropdown-link">
          <i class="add el-icon-plus"></i>
          <span> 新文档 </span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="note">新建笔记</el-dropdown-item>
          <el-dropdown-item>新建Markdown</el-dropdown-item>
          <el-dropdown-item command="menu">新建文件夹</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 目录列表 -->
    <div class="menu-wrap">
      <ul class="menu-list">
        <li class="menu-item" v-bind:class="{ active: activeMenu ==='1' }" @click="changeMenu('1')">
          <i class="el-icon-copy-document"></i> 最新文档
        </li>
        <li class="menu-item" v-bind:class="{ active: activeMenu ==='2' }" @click="changeMenu('2')">
          <i class="el-icon-folder"></i> 我的文件夹
        </li>
        <li class="menu-item" v-bind:class="{ active: activeMenu ==='3' }" @click="changeMenu('3')">
          <i class="el-icon-star-off"></i> 加星文件
        </li>
        <li class="menu-item" v-bind:class="{ active: activeMenu ==='4' }" @click="changeMenu('4')">
          <i class="el-icon-delete"></i> 回收站
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import commonFunc from "@/utils/commonFunc";
export default {
  data() {
    return {
      activeMenu:'',
    };
  },
  created(){
    this.activeMenu =this.getActiveMenu
  },
  methods: {
    // 添加todo
    addTodo(args) {
      console.log("add todo type is: " + args);
      let currrentMenu = this.getCurrentMenu;
      if (args === "note") {
        this.$store.commit("todo/addTodo", {
          id: commonFunc.uuid(),
          pid: currrentMenu.id,
          type: "note",
          title: "无标题文档",
          deleted: false,
          createTime: new Date().getTime()
        });
      } else if (args === "menu") {
        this.$store.commit("todo/addTodo", {
          id: commonFunc.uuid(),
          pid: currrentMenu.id,
          type: "menu",
          title: "新建文件夹",
          deleted: false,
          createTime: new Date().getTime()
        });
      }
    },
    // 改变目录
    changeMenu(args){
      this.activeMenu = args
      console.debug("current menu is "+this.activeMenu)
      this.$store.commit('setActiveMenu',args)
    }
  },
  computed: {
    ...mapGetters({
      getCurrentMenu: "todo/getCurrentMenu",
      getActiveMenu:'getActiveMenu'
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
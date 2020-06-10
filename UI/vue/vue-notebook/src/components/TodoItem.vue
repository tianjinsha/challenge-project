<template>
  <div
    class="todo-item"
    @mouseenter="onHover('enter')"
    @mouseleave="onHover('leave')"
    :class="{ active: isActive }"
    :style="{'width':width+'px'}"
  >
    <div class="head">
      <div class="left">
        <i class="el-icon-folder icon" v-if="content.type==='menu'"></i>
        <i class="el-icon-document icon" v-if="content.type==='note'"></i>
        <div class="title">
          <el-input
            v-if="rename"
            size="mini"
            v-model="title"
            class="rename"
            @focus="changeFocus"
            @blur="changeFocus"
          ></el-input>
          <a v-bind:class="{ menu: isMenu }" v-else @click="handle">{{content.title}}</a>
        </div>
      </div>
      <div class="right" v-show="isActive">
        <!-- 收藏文件 -->
        <i
          class="icon"
          v-bind:class="{'el-icon-star-off':!star,'el-icon-star-on':this.star,'star':star}"
          v-if="content.type==='note' && activeMenu !== '4'"
          @click.stop="starNote"
        ></i>
        <!-- 恢复文件 -->
        <i
          class="el-icon-refresh-left icon"
          v-if="activeMenu === $DataDictionary.menuType.trash"
          @click.stop="recoverTodo"
        ></i>
        <!-- 移除文件 -->
        <i class="el-icon-delete icon" v-else @click.stop="removeTodo"></i>
        <!-- 彻底删除 -->
        <i
          class="el-icon-delete icon"
          v-if="activeMenu === $DataDictionary.menuType.trash"
          @click.stop="deleteTodo"
        ></i>
        <!-- 更多选项 -->
        <el-dropdown @command="more" trigger="click">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon-more icon"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-if="activeMenu !== $DataDictionary.menuType.trash"
              command="rename"
            >重命名</el-dropdown-item>
            <el-dropdown-item
              v-if="activeMenu !== $DataDictionary.menuType.trash && content.type===$DataDictionary.todoType.note"
              command="star"
            >
              <span v-if="!content.star">加星</span>
              <span v-else>取消加星</span>
            </el-dropdown-item>
            <el-dropdown-item
              v-if="activeMenu !== $DataDictionary.menuType.trash"
              command="remove"
            >删除</el-dropdown-item>
            <el-dropdown-item
              v-if="activeMenu === $DataDictionary.menuType.trash"
              command="recover"
            >恢复</el-dropdown-item>
            <el-dropdown-item
              v-if="activeMenu === $DataDictionary.menuType.trash"
              command="delete "
            >永久删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div>
      <time>{{createTime}}</time>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import todoFunc from "@/utils/todoFunc";
import { mapGetters } from "vuex";
export default {
  name: "TodoItem",
  data() {
    return {
      dateFormat: "YYYY-MM-DD hh:mm",
      isActive: false, // 鼠标是否正在悬停
      star: false, // 是否标星
      activeMenu: "", // 判断现在在那级目录
      isMenu: false, // 判断该项是否是目录
      rename: false, // 是否要重命名
      title: "",
      inputFocus: false // 输入框是否聚焦
    };
  },

  created() {
    this.star = this.content.star;
    this.activeMenu = this.getActiveMenu;
    this.title = this.content.title;
    if (this.activeMenu !== this.$DataDictionary.menuType.trash) {
      if (this.content.type === this.$DataDictionary.todoType.menu) {
        this.isMenu = true;
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      document.body.addEventListener("click", this.endRenameTitle);
    });
  },
  props: {
    content: {
      type: Object,
      default: () => {
        return {
          id: "",
          pid: "",
          type: "",
          star: false,
          deleted: false,
          title: "",
          createTime: ""
        };
      }
    },
    width: {
      type: [String, Number],
      default: 280
    }
  },
  methods: {
    // 鼠标经过
    onHover(args) {
      if (args === "enter") {
        if (!this.rename) {
          this.isActive = true;
        }
      } else if (args === "leave") {
        this.isActive = false;
      }
    },
    //点击项 显示笔记或者进入下一个目录
    handle() {
      if (this.content.type === this.$DataDictionary.todoType.menu) {
        if (this.activeMenu === this.$DataDictionary.menuType.trash) {
          return;
        }
        this.$emit("chanageGoBack", true);
        console.info("enter next menu");
        this.$store.commit("todo/setCurrentMenu", {
          id: this.content.id,
          pid: this.content.pid
        });
      } else if (this.content.type === this.$DataDictionary.todoType.note) {
        this.showNote(this.content.id);
      }
    },
    // 显示当前几点的笔记
    showNote(id) {
      console.info("set current note : " + id);
      this.$store.commit("todo/setCurrentNote", id);
    },
    // 加星
    starNote() {
      this.star = !this.star;
      todoFunc.toggleStarNote(this.content.id, this.star);
    },
    // 删除
    removeTodo() {
      console.info("remove todo:" + this.content.id);
      todoFunc.toggleRemoveTodo(
        this.content.id,
        this.content.type,
        !this.content.deleted
      );
    },
    // 恢复
    recoverTodo() {
      console.info("recover todo:" + this.content.id);
      todoFunc.toggleRemoveTodo(
        this.content.id,
        this.content.type,
        !this.content.deleted
      );
    },
    // 彻底删除
    deleteTodo() {
      console.info("delete todo:" + this.content.id);
      todoFunc.deleteTodo(this.content.id);
    },
    // 更多
    more(args) {
      console.info("more action args is " + args);
      if (args == "rename") {
        this.rename = true;
      } else if (args === "star") {
        this.starNote();
      } else if (args === "remove") {
        this.removeTodo();
      } else if (args === "delete") {
        this.deleteTodo();
      }
    },
    // 重命名结束
    endRenameTitle() {
      if (this.rename) {
        console.info("end rename title " + this.content.id);
        if (!this.inputFocus) {
          if (this.content.title !== this.title) {
            todoFunc.renameTodo(this.content.id, this.title);
          }
          this.rename = false;
        }
      }
    },
    changeFocus() {
      console.debug("change focus :" + !this.inputFocus);
      this.inputFocus = !this.inputFocus;
    }
  },
  computed: {
    ...mapGetters({
      getActiveMenu: "getActiveMenu"
    }),
    createTime() {
      return moment(this.content.createTime).format(this.dateFormat);
    }
  },
  destroyed() {}
};
</script>

<style scoped lang="less">
.active {
  background: rgba(0, 0, 0, 0.1);
}
.star {
  color: #f60;
}
.todo-item {
  // width: 280px;
  border-bottom: 1px solid #eee;
  .head {
    height: 48px;
    line-height: 48px;
    color: #333;
    display: flex;
    .left {
      flex: 1 0 auto;
      display: flex;
      align-items: center;
      .title {
        font-size: 12px;
        text-overflow: ellipsis;
        flex: 1 0 auto;
        position: relative;
        height: 100%;
        overflow: hidden;
        padding-right: 15px;
        .menu:hover {
          cursor: pointer;
          text-decoration: underline;
        }
        a {
          position: absolute;
          left: 0;
          right: 0;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      .icon {
        margin: 0 5px 0 12px;
      }
    }
    .right {
      flex: 0 0 auto;
      text-align: center;
      .icon {
        font-size: 16px;
        margin-right: 10px;
        padding: 0;
        cursor: pointer;
      }
    }
    .el-icon-folder {
      color: #f60;
    }
    .el-icon-document {
      color: #398dee;
    }
  }
  time {
    display: block;
    font-size: 12px;
    color: #999;
    height: 28px;
    line-height: 28px;
    text-indent: 15px;
  }
}
</style>

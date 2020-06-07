<template>
  <div
    class="todo-item"
    @mouseenter="onHover('enter')"
    @mouseleave="onHover('leave')"
    :class="{ active: isActive }"
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
        <i class="el-icon-refresh-left icon" v-if="activeMenu === '4'" @click.stop="recoverTodo"></i>
        <!-- 移除文件 -->
        <i class="el-icon-delete icon" v-else @click.stop="removeTodo"></i>
        <!-- 彻底删除 -->
        <i class="el-icon-delete icon" v-if="activeMenu === '4'" @click.stop="deleteTodo"></i>
        <!-- 更多选项 -->
        <el-dropdown @command="more" trigger="click">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon-more icon"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="activeMenu !== '4'" command="rename">重命名</el-dropdown-item>
            <el-dropdown-item v-if="activeMenu !== '4' && content.type==='note'" command="star">
              <span v-if="!content.star">加星</span>
              <span v-else>取消加星</span>
            </el-dropdown-item>
            <el-dropdown-item v-if="activeMenu !== '4'" command="remove">删除</el-dropdown-item>
            <el-dropdown-item v-if="activeMenu === '4'" command="recover">恢复</el-dropdown-item>
            <el-dropdown-item v-if="activeMenu === '4'" command="delete ">永久删除</el-dropdown-item>
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
import dataDictionary from "@/utils/dataDictionary";
import todoFunc from "@/utils/todoFunc";
import { mapGetters } from "vuex";
export default {
  name: "TodoItem",
  data() {
    return {
      dateFormat: "YYYY-MM-DD hh:mm",
      isActive: false,
      star: false,
      activeMenu: "",
      isMenu: false,
      rename: false,
      title: "",
      inputFocus: false
    };
  },

  created() {
    this.star = this.content.star;
    this.activeMenu = this.getActiveMenu;
    this.title = this.content.title;
    if (this.activeMenu !== "4") {
      if (this.content.type === "menu") {
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
          id: dataDictionary.default.todoId,
          title: dataDictionary.default.todoTitle,
          type: dataDictionary.todoType.note,
          pid: "",
          star: false,
          deleted: false,
          createTime: ""
        };
      }
    }
  },
  methods: {
    onHover(args) {
      if (args === "enter") {
        if (!this.rename) {
          this.isActive = true;
        }
      } else if (args === "leave") {
        this.isActive = false;
      }
    },
    handle() {
      if (this.content.type === "menu") {
        if (this.activeMenu === "4") {
          return;
        }
        this.$emit("chanageGoBack", true);
        console.info("enter next menu");
        todoFunc.enterNextMenu(this.content.id, this.content.pid);
      } else if (this.content.type === "note") {
        this.showNote(this.content.id);
      }
    },
    showNote(id) {
      console.info("current note id is {" + id + "}");
      this.$store.commit("todo/setCurrentNote", id);
    },
    starNote() {
      this.star = !this.star;
      console.info("star note:" + this.star);
      todoFunc.toggleStarNote(this.content.id, this.star);
    },
    removeTodo() {
      console.info("remove todo:" + this.content.id);
      todoFunc.toggleRemoveTodo(
        this.content.id,
        this.content.type,
        !this.content.deleted
      );
    },
    recoverTodo() {
      console.info("recover todo:" + this.content.id);
      todoFunc.toggleRemoveTodo(
        this.content.id,
        this.content.type,
        !this.content.deleted
      );
    },
    deleteTodo() {
      console.info("delete todo:" + this.content.id);
      todoFunc.deleteTodo(this.content.id);
    },
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
  width: 280px;
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

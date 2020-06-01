<template>
  <div
    class="todo-item"
    @mouseenter="onHover('enter')"
    @mouseleave="onHover('leave')"
    v-bind:class="{ active: isActive }"
  >
    <div class="head" @click="handle">
      <div class="left">
        <i class="el-icon-folder icon" v-if="content.type==='menu'"></i>
        <i class="el-icon-document icon" v-if="content.type==='note'"></i>
        <div class="title">
          <a v-bind:class="{ menu: content.type==='menu' }">{{content.title}}</a>
        </div>
      </div>
      <div class="right">
        <i class="el-icon-star-off icon" v-if="content.type==='menu'"></i>
        <i class="el-icon-delete icon"></i>
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
export default {
  name: "TodoItem",
  data() {
    return {
      dateFormat: "YYYY-MM-DD hh:mm",
      isActive: false
    };
  },

  created() {},
  mounted() {},
  destroyed() {},
  props: {
    content: {
      type: Object,
      default: () => {
        return {
          id: dataDictionary.default.todoId,
          title: dataDictionary.default.todoTitle,
          type: dataDictionary.todoType.note,
          pid: "",
          deleted: false,
          createTime: new Date().getTime()
        };
      }
    }
  },
  methods: {
    onHover(args) {
      if (args === "enter") {
        this.isActive = true;
      } else if (args === "leave") {
        this.isActive = false;
      }
    },
    handle() {
      if (this.content.type === "menu") {
        this.enterNextMenu(this.content.id);
      } else if (this.content.type === "note") {
        this.showNote(this.content.id,this.content.pid);
      }
    },
    enterNextMenu(id,pid) {
      console.info("next menu id is {" + id + "}");
      console.log(this.$store)
       console.log(this.$store._mutations)
       this.$store.commit('todo/setCurrentMenu',{
         id,
         pid
       })
    },
    showNote(id) {
      console.info("current note id is {" + id + "}");
      console.log(this.$store)
      this.$store.commit('todo/setCurrentNote',id)
    }
  },
  computed: {
    createTime() {
      return moment(this.content.createTime).format(this.dateFormat);
    },
  }
};
</script>

<style scoped lang="less">
.active {
  background: rgba(0, 0, 0, 0.1);
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

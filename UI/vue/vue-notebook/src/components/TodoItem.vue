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
        <i class="icon" v-bind:class="{'el-icon-star-off':!star,'el-icon-star-on':this.star,'star':star}" v-if="content.type==='note'" @click.stop="starNote"></i>
        <i class="el-icon-delete icon" @click.stop="removeTodo"></i>
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
      isActive: false,
      star:false,
    };
  },

  created() {
    this.star = this.content.star
  },
  mounted() {
  },
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
          star:false,
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
        this.$emit('chanageGoBack', true);
        this.enterNextMenu(this.content.id,this.content.pid);
      } else if (this.content.type === "note") {
        this.showNote(this.content.id);
      }
    },
    enterNextMenu(id,pid) {
      console.info("current menu id is {" + id + "} and pid is {"+pid +"}");
       this.$store.commit('todo/setCurrentMenu',{
         id,
         pid
       })
    },
    showNote(id) {
      console.info("current note id is {" + id + "}");
      this.$store.commit('todo/setCurrentNote',id)
    },
    starNote(){
      this.star = !this.star
      console.debug("star note:"+this.star);
      
      this.$store.commit('todo/modifyTodo',{
        id:this.content.id,
        star:this.star
      })
    },
    removeTodo(){
       console.debug("delete todo:"+this.content.id);
      this.$store.commit('todo/modifyTodo',{
        id:this.content.id,
        deleted:!this.content.deleted
      })
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
.star{
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

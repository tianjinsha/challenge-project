<template>
  <div class="todo-item">
    <div class="head">{{content.title}}</div>
    <time>{{createTime}}</time>
  </div>
</template>

<script>
import moment from 'moment';
import dataDictionary from "@/utils/dataDictionary";
export default {
  name: "TodoItem",
  data() {
    return {
      dateFormat:'YYYY-MM-DD hh:mm'
    };
  },
  computed:{
    createTime(){
      return moment(this.content.createTime).format(this.dateFormat)
    }
  },
  created() {
  },
  mounted() {},
  destroyed() {},
  methods: {},
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
  }
};
</script>

<style scoped lang="less">
.todo-item {
  border-bottom: 1px solid #eee;
  .head {
    height: 48px;
    line-height: 48px;
    color: #333;
    text-indent: 15px;
    font-size: 14px;
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

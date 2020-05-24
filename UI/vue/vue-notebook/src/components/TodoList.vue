<template>
  <div class="box">
    <!-- 搜索 -->
   <div class="action">
    <el-button type="primary" icon="el-icon-top"></el-button>
    <el-input
    placeholder="请输入内容"
    v-model="content"
    clearable>
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </el-input>
   </div>
   <!-- 笔记列表 -->
   <div class="todo-wrap">
     <ul class="todo-list">
      <li class="todo-item" v-for="i in 10" :key="i">
        <div class="head">笔记标题</div>
        <time>2020-05-21 21:45:11</time>
      </li>
   </ul>
   </div>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
   data() {
    return {
      content: ''
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit less to this component only -->
<style scoped lang="less">
.box{
  width: 280px;
  border-right: 1px solid #eee;
  border-top: 0;
  border-bottom: 0;
  display: flex;
  flex-direction: column;
}
.action{
  height: 80px;
  line-height: 80px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  .el-input{
    margin-left: 8px;
  }
}

.todo-wrap{
  flex: 1 0 auto;
  overflow: hidden;
  position: relative;
}

.todo-list{
  width: 295px;
  position: absolute;
  top: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

.todo-item{
  border-bottom: 1px solid #eee;
  .head{
    height: 48px;
    line-height: 48px;
    color: #333;
    text-indent: 15px;
    font-size: 14px;
  }
  time{
    display: block;
    font-size: 12px;
    color: #999;
    height: 28px;
    line-height: 28px;
    text-indent: 15px;
  }
}
</style>

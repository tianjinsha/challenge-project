<template>
  <div class="box">
    <!-- 新建文件 -->
    <div class="action">
      <i class="add el-icon-plus"></i>
      <el-dropdown class="dropdown">
        <span class="el-dropdown-link">
          新文档
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>新建笔记</el-dropdown-item>
          <el-dropdown-item>新建Markdown</el-dropdown-item>
          <el-dropdown-item>新建文件夹</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 目录列表 -->
    <div class="menu-wrap">
      <ul class="menu-list">
        <li class="menu-item active">
          <i class="el-icon-copy-document"></i> 最新文档
        </li>
        <li class="menu-item">
          <i class="el-icon-folder"></i> 我的文件夹
        </li>
        <li class="menu-item">
          <i class="el-icon-star-off"></i> 加星文件
        </li>
        <li class="menu-item">
          <i class="el-icon-delete"></i> 回收站
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
  line-height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #eee;
  .add {
    color: #409eff;
    font-size: 22px;
    font-weight: 800;
  }
  .dropdown {
    margin-left: 12px;
    font-size: 16px;
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
  left:0;
  width: 215px;
  overflow-x: hidden;
  overflow-y: auto;
  .menu-item {
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
</style>
<template>
  <div class="todo-panel">
    <div class="a-header">
      <h3>{{title}}</h3>
      <div class="a-action">
        <el-button @click="saveNote">保存</el-button>
      </div>
    </div>
    <div class="a-editor">
      <vue-editor v-model="content"></vue-editor>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapGetters } from "vuex";
import indexedDB from "@/db/indexedDB";
export default {
  name: "BlankTemp",
  data() {
    return {
      title: "",
      content: ""
    };
  },
  async created() {
    if (this.noteId) {
      await indexedDB.initDB();
      let data = await indexedDB.get("todo", this.noteId);
      this.content = data.content;
      this.title = data.title;
    }
  },
  mounted() {},
  updated() {},
  async destroyed() {
    await indexedDB.closeDB();
  },
  components: {
    VueEditor
  },
  watch: {
    noteId: async function(val) {
      let data = await indexedDB.get("todo", val);
      this.content = data.content;
      this.title = data.title;
    }
  },
  methods: {
    async saveNote() {
      let data = {
        ...this.getCurrentNote,
        content: this.content
      };
      await indexedDB.initDB();
      await indexedDB.update("todo", data);
      await indexedDB.closeDB();
    }
  },
  computed: {
    ...mapGetters({
      getCurrentNote: "todo/getCurrentNote"
    })
  },
  props: {
    noteId: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped lang="less">
.todo-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  .a-header {
    height: 80px;
    box-sizing: border-box;
    border-bottom: 1px solnoteId #eee;
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
    overflow: hidden;
  }
}
</style>


<style  lang="css">
.quillWrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.ql-toolbar {
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: 1px solnoteId #eee !important;
}
.ql-container {
  width: 100%;
  border: none !important;
  position: relative;
}
.ql-editor {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
</style>


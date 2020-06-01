import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  state: {
    test: 'test'
  },
  getters: {
    getTest: (state) => {
      return state.test
    }
  },
  mutations: {
    setTest: (state, content) => {
      state.test = content
    }
  },
  actions: {},
  modules: {
    // 认证相关
    account: {
      namespaced: true,
      state: {
        username: '',
        token: '',
        loginTime: '',
      },
      mutations: {},
      action: {}
    },
    todo: {
      namespaced: true,
      state: {
        currentMenu: {},
        currentNote:{},
        todoList: [{
            id: '0',
            pid: '',
            type: 'menu',
            title: '新建文件夹',
            deleted: false,
            createTime: new Date().getTime(),
            content: 'test'
          },
          {
            id: '1',
            pid: '',
            type: 'note',
            title: '无标题文档',
            deleted: false,
            createTime: new Date().getTime(),
            content: 'test'
          },
          {
            id: '2',
            pid: '0',
            type: 'note',
            title: '无标题文档',
            deleted: false,
            createTime: new Date().getTime(),
            content: 'test'
          }
        ]
      },
      getters: {
        getMenuList: (state) => {
          return state.todoList.map(item => {
            return {
              id: item.id,
              pid: item.pid,
              deleted: item.deleted,
              title: item.title,
              createTime: item.createTime
            }
          })
        },
        getMenuListByPid: (state, getters) => (pid) => {
          return getters.getMenuList.find(item => {
            return item.pid === pid
          })
        },
        
        getCurrentTodoList: (state) => {
          return state.todoList.filter(item => {
            return state.currentMenu.id === item.pid
          })
        },
        getCurrentNote:(state)=>{
          return state.currentNote
        }
      },
      mutations: {
        setCurrentMenu: (state, content) => {
          state.currentMenu = content
        },
        setCurrentNote:(state,content)=>{
          state.currentNote = state.todoList.find(item=>{
            return item.id === content
          })
        },
        toggleRemoveMenu: (state, content) => {
          state.todoList = state.todoList.map(item => {
            if (item.id === content.id) {
              return {
                ...item,
                deleted: content.deleted
              }
            } else {
              return item
            }
          })
        },
        addMenu: (state, content) => {
          state.todoList.push(content)
        },
        deleteMenu: (state, content) => {
          state.todoList = state.todoList.filter(item => {
            return item.id !== content.id
          })
        },
        clearMenu: (state) => {
          state.todoList.length = 0
        }
      },
      action: {

      }
    }
  }
});

export default store;
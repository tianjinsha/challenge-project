import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  state: {
    test: 'test',
    activeMenu: '1',
    init: false
  },
  getters: {
    getTest: (state) => {
      return state.test
    },
    getActiveMenu: (state) => {
      return state.activeMenu
    },
    getInit: (state) => {
      return state.init
    },
  },
  mutations: {
    setTest: (state, content) => {
      state.test = content
    },
    setActiveMenu: (state, content) => {
      state.activeMenu = content
    },
    setInit: (state, content) => {
      state.init = content
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
        currentNote: {},
        goBackEnable: false,
        todoList: [{
            id: '1',
            pid: '',
            type: 'folder',
            title: '新建文件夹1',
            deleted: false,
            createTime: new Date().getTime(),
          },
          {
            id: '2',
            pid: '',
            type: 'note',
            title: '无标题文档1',
            star: true,
            deleted: false,
            createTime: new Date().getTime(),
            content: 'test'
          },
        ]
      },
      getters: {
        // 获取所有文件夹项
        getTodoList: (state) => {
          return state.todoList.map(item => {
            return {
              id: item.id,
              pid: item.pid,
              deleted: item.deleted,
              star: item.star,
              title: item.title,
              createTime: item.createTime,
              type: item.type
            }
          })
        },
        // 获取属于该pid下的下一级直接子文件夹项
        getTodoListByPid: (state, getters) => (pid) => {
          return getters.getTodoList.find(item => {
            return item.pid === pid
          })
        },
        // 通过id定位文件夹项
        getTodoById: (state, getters) => (id) => {
          return getters.getTodoList.find(item => {
            return item.id === id
          })
        },
        // 上一级文件夹项
        getPrevFolder: (state, getters) => {
          return getters.getTodoList.find(item => {
            return item.id === state.currentMenu.pid

          })
        },
        // 获取当前文件夹下的所有文件夹项和笔记项
        getCurrentTodoList: (state, getters) => {
          return getters.getTodoList.filter(item => {
            return state.currentMenu.id === item.pid
          })
        },
        // 获取当前文件夹项
        getCurrentFolder: (state) => {
          return state.currentMenu
        },
        // 获取当前笔记项
        getCurrentNote: (state) => {
          return state.currentNote
        },
        getGoBackEnable: (state) => {
          return state.goBackEnable
        }
      },
      mutations: {
        // 设置todo列表
        setTodoList: (state, content) => {
          state.todoList = content
        },
        // 设置当前文件夹项（id,pid）
        setCurrentFolder: (state, content) => {
          state.currentMenu = content
        },
        // 设置当前笔记项-通过id
        setCurrentNote: (state, content) => {
          state.currentNote = state.todoList.find(item => {
            return item.id === content
          })
        },
        addTodo: (state, content) => {
          state.todoList.push(content)
        },

        changeTodo: (state, content) => {
          state.todoList = content
        },
        deleteTodo: (state, content) => {
          state.todoList = state.todoList.filter(item => {
            return item.id !== content.id
          })
        },
        clearTodo: (state) => {
          state.todoList.length = 0
        }
      },
      action: {

      }
    }
  }
});

export default store;
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
        currentNote: {},
        goBackEnable: false,
        todoList: [{
            id: '0',
            pid: '',
            type: 'menu',
            title: '新建文件夹1',
            deleted: false,
            createTime: new Date().getTime(),
          },
          {
            id: '1',
            pid: '',
            type: 'menu',
            title: '新建文件夹2',
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
          {
            id: '3',
            pid: '0',
            type: 'note',
            title: '无标题文档2',
            deleted: false,
            star: false,
            createTime: new Date().getTime(),
            content: 'test'
          },
          {
            id: '4',
            pid: '0',
            type: 'menu',
            title: '新建文件夹3',
            deleted: false,
            createTime: new Date().getTime(),
          },
          {
            id: '5',
            pid: '4',
            type: 'note',
            title: '无标题文3',
            deleted: false,
            star: false,
            createTime: new Date().getTime(),
            content: 'test'
          },
        ]
      },
      getters: {
        // 获取所有目录项
        getMenuList: (state) => {
          return state.todoList.map(item => {
            return {
              id: item.id,
              pid: item.pid,
              deleted: item.deleted,
              title: item.title,
              createTime: item.createTime,
              type:item.type
            }
          })
        },
        // 获取属于该pid下的下一级直接子目录项
        getMenuListByPid: (state, getters) => (pid) => {
          return getters.getMenuList.find(item => {
            return item.pid === pid
          })
        },
        // 通过id定位目录项
        getMenuById: (state, getters) => (id) => {
          return getters.getMenuList.find(item => {
            return item.id === id
          })
        },
        // 上一级目录项
        getPrevMenu: (state, getters) => {
          return getters.getMenuList.find(item => {
            return item.id === state.currentMenu.pid

          })
        },
        // 获取当前目录下的所有目录项和笔记项
        getCurrentTodoList: (state, getters) => {
          return getters.getMenuList.filter(item => {
            return state.currentMenu.id === item.pid
          }).sort((a, b) => {
            if (a.type === b.type) {
              return 0
            } else {
              if (a.type === 'menu') {
                return -1
              } else {
                return 1
              }
            }
          })
        },
        // 获取当前目录项
        getCurrentMenu: (state) => {
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
        // 设置当前目录项（id,pid）
        setCurrentMenu: (state, content) => {
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
        modifyTodo: (state, content) => {
          state.todoList = state.todoList.map(item => {
            if (item.id === content.id) {
              return {
                ...item,
                ...content
              }
            }else{
              return item
            }
          })
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
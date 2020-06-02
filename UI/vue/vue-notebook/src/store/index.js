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
        goBackEnable:false,
        todoList: [{
            id: '0',
            pid: '',
            type: 'menu',
            title: '新建文件夹1',
            deleted: false,
            createTime: new Date().getTime(),
            content: 'test'
          },
          {
            id: '1',
            pid: '',
            type: 'menu',
            title: '新建文件夹2',
            deleted: false,
            createTime: new Date().getTime(),
            content: 'test'
          },
          {
            id: '2',
            pid: '',
            type: 'note',
            title: '无标题文档1',
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
            content: 'test'
          },
          {
            id: '5',
            pid: '4',
            type: 'note',
            title: '无标题文3',
            deleted: false,
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
              createTime: item.createTime
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
        getPrevMenu: (state,getters)=>{
          return getters.getMenuList.find(item => {
            // if(state.currentMenu.pid){
            //    return item.id === state.currentMenu.pid
            // }else{
            //   return 
            // }

            return item.id === state.currentMenu.pid

          })
        },
        // 获取当前目录下的所有目录项和笔记项
        getCurrentTodoList: (state) => {
          return state.todoList.filter(item => {
            return state.currentMenu.id === item.pid
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
        getGoBackEnable:(state)=>{
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
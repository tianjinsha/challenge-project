import store from '@/store'
import commonFunc from './commonFunc'
import lambda from './lambda'
// import indexedDB from '@/db/indexedDB'
const todoFunc = {

  addTodo(){
    
  },

  /**
   * 切换 收藏
   * @param {*} id 
   * @param {*} star 
   */
  toggleStarNote(id, star) {
    console.debug("todoFunc toggleStarNote args is " + JSON.stringify({
      id,
      star
    }));
    let list = store.getters['todo/getTodoList']
    list = lambda.toggleChangeTodo(list, {
      id,
      star
    })
    store.commit('todo/changeTodo', list)
  },

  /**
   * 重命名
   * @param {*} id 
   * @param {*} title 
   */
  renameTodo(id,title){
    console.debug("todoFunc toggleStarNote args is " + JSON.stringify({
      id,
      title
    }));
    let list = store.getters['todo/getTodoList']
    list = lambda.toggleChangeTodo(list, {
      id,
      title
    })
    store.commit('todo/changeTodo', list)
  },


  /**
   * 切换 删除
   * @param {*} id 
   * @param {*} type 
   * @param {*} deleted 
   */
  toggleRemoveTodo(id, type, deleted) {
    console.debug("todoFunc toggleRemoveTodo args is " + JSON.stringify({
      id,
      type,
      deleted
    }));
    let list = store.getters['todo/getTodoList']
    if (type === 'menu') {
      list = lambda.toggleChangeTodoRecursion(list, {
        id,
        deleted
      })
    } else {
      list = lambda.toggleChangeTodo(list, {
        id,
        deleted
      })
    }
    store.commit('todo/changeTodo', list)
  },

  /**
   * 彻底删除
   * @param {*} id 
   */
  deleteTodo(id) {
    let list = store.getters['todo/getTodoList']
    list = lambda.deleteTodoRecursive(list, id)
    store.commit('todo/changeTodo', list)
  },

  /**
   * 进入下一级目录
   * @param {*} id 
   * @param {*} pid 
   */
  enterNextMenu(id, pid) {
    console.debug("todoFunc args is " + JSON.stringify({
      id,
      pid
    }))
    store.commit('todo/setCurrentMenu', {
      id,
      pid
    })
  },

  /**
   * 进入上一级目录
   */
  returnPrevMenu() {
    let flag = false
    let prevMenu = store.getters.getPrevMenu
    let currentMenu = store.getters.getCurrentMenu
    if (currentMenu && currentMenu.id !== "") {
      if (prevMenu) {
        flag = true
      }
      if (prevMenu && prevMenu.id !== "") {
        this.$store.commit("todo/setCurrentMenu", {
          id: prevMenu.id,
          pid: prevMenu.pid
        });
      } else {
        this.$store.commit("todo/setCurrentMenu", {
          id: "",
          pid: ""
        });
      }
    }
    return flag
  },


  /**
   * 获取最新的笔记列表
   */
  getLastedNote() {
    let list = store.getters['todo/getTodoList']
    list = list.filter(item => {
      return !item.deleted
    }).filter(item => {
      return item.type === 'note'
    }).sort((a, b) => {
      return new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
    })
    return list
  },

  /**
   * 获取可用笔记列表
   */
  getCurrentTodoEnable() {
    let list = store.getters['todo/getCurrentTodoList']
    list = list.filter(item => {
      return !item.deleted
    })
    let menuList = list
      .filter(item => item.type === 'menu')
      .sort((a, b) => {
        return new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
      })
    let noteList = list
      .filter(item => item.type === 'note').sort((a, b) => {
        return new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
      })

    return [...menuList, ...noteList]
  },

  /**
   * 获取收藏文件
   */
  getStarNote() {
    let list = store.getters['todo/getTodoList']
    list = list.filter(item => {
      return !item.deleted
    }).filter(item => {
      return item.star
    }).sort((a, b) => {
      return new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
    })
    return list
  },

  /**
   * 获取删除文件
   */
  getDeletedTodo() {
    let list = store.getters['todo/getTodoList']
    list = list.filter(item => item.deleted)
    let data = []
    if (list && list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        if (commonFunc.isNull(lambda.getParentTodo(list, list[i].pid))) {
          data.push(list[i])
        }
      }
    }
    return data
  }

}



export default todoFunc;
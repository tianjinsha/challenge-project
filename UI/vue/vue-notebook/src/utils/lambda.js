const lambda = {
  /**
   * 通过ID找到该目录下的所有直接子项
   * @param {*} id 
   */
  getChildTodo(list = [], id) {
    return list.filter(item => {
      return id === item.pid
    })
  },

  /**
   * 通过ID找到改项的直接父目录
   * @param {}} list 
   * @param {*} pid 
   */
  getParentTodo(list = [],pid){
    return list.find(item=>{
      return pid === item.id
    })
  },

  /**
   * 通过ID递归的找到该目录下的所有子项
   * @param {*} list 
   * @param {*} id 
   */
  getChildTodoRecursion(list = [], id) {
    let _this = this
    let data = _this.getChildTodo(list, id)
    for (let i = 0; i < data.length; i++) {
      if (data[i].type === 'folder') {
        let temp = _this.getChildTodoRecursion(list, data[i].id)
        data.push(temp)
      }
    }
    return data
  },
  /**
   * 通过id递归的删除改目录下的所有子项
   * @param {*} list 
   * @param {*} id 
   */
  deleteTodoRecursive(list = [], id) {
    let _this = this
    let data = _this.getChildTodo(list, id)
    list = list.filter(item => {
      return item.id !== id
    })
    for (let i = 0; i < data.length; i++) {
      list = list.filter(item => {
        return item.id !== data[i].id
      })
      if (data[i].type === 'folder') {
        list = _this.deleteTodoRecursive(list, data[i].id)
      }
    }
    return list
  },

  /**
   * 改变数组项中某个变量的值
   * @param {*} list 
   * @param {*} args 
   */
  toggleChangeTodo(list = [], args) {
    if (args) {
      list = list.map(item => {
        if (item.id === args.id) {
          return {
            ...item,
            ...args
          }
        }
        return item
      })
    }
    return list
  },

  /**
   * 递归的改变所有子项的某个值
   * @param {*} list 
   * @param {id,*} args 
   */
  toggleChangeTodoRecursion(list = [], args) {
    console.debug('todoFunc toggleChangeTodoRecursion args is:'+JSON.stringify(args))
    let _this = this
    list = _this.toggleChangeTodo(list, args)
    let data = _this.getChildTodo(list, args.id)
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        list = _this.toggleChangeTodo(list, {
          ...args,
          id: data[i].id,
        })
        if (data[i].type === 'folder') {
          list = _this.toggleChangeTodoRecursion(list, {
            ...args,
            id: data[i].id
          })
        }
      }
    }
    return list
  }
}

export default lambda
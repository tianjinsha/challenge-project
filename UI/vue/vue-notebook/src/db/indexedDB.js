/**
 * IndexedDB 浏览器数据库
 */

const dbName = 'note'
const dbVersion = 1

export default {
  indexedDB: window.indexedDB ||
    window.webkitindexedDB ||
    window.msIndexedDB ||
    window.mozIndexedDB,

  store: {
    todo: {
      name: 'todo',
      key: 'id',
      cursorIndex: [{
        name: "title",
        unique: false
      }]
    }
  },

  /**
   * 初始化数据库
   */
  async initDB() {
    let _this = this
    let request = this.indexedDB.open(dbName, dbVersion)
    request.onerror = function () {
      console.error('打开数据库失败')
    }

    request.onsuccess = function () {
      console.info('打开数据库成功')
    }

    request.onupgradeneeded = function (event) {
      let db = event.target.result

      for (let i in _this.store) {
        if (!db.objectStoreNames.contains(_this.store[i].name)) {
          let objectStore = db.createObjectStore(_this.store[i].name, {
            keyPath: _this.store[i].key,
            autoIncrement: true
          })

          for (let j = 0; i < _this.store[i].cursorIndex.length; j++) {
            const element = _this.store[i].cursorIndex[j]
            objectStore.createIndex(element.name, element.name, {
              unique: element.unique
            })
          }
        }
      }
    }
  },

  /**
   * 打开数据库
   */
  async openDB() {
    return new Promise((resolve, reject) => {
      let request = this.indexedDB.open(dbName, dbVersion)

      request.onerror = function (event) {
        reject("IndexedDB数据库打开错误，" + event)
      }

      request.onsuccess = function (event) {
        resolve(event.target.result)
      }
    })
  },

  // 关闭数据库
  async closeDB(db) {
    try {
      let handle
      if (!db) {
        handle = await this.openDB()
      }
      let closeQuest = handle.closeDB()
      return new Promise(resolve => {
        closeQuest.onerror = function () {
          resolve(false)
        }
        closeQuest.onsuccess = function () {
          resolve(true)
        }
      })
    } catch (error) {
      return Promise.resolve(false)
    }
  },

  /**
   * 删除表
   * @param {*} table 
   */
  async deleteDB(table) {
    let deleteQuest = this.indexedDB.deleteDatabase(table)
    deleteQuest.onerror = function () {
      return Promise.resolve(false)
    }
    deleteQuest.onsuccess = function () {
      return Promise.resolve(true)
    }
  },

  /**
   * 创建游标索引
   * @param {*} table 
   * @param {*} cursorIndex 
   * @param {*} unique 
   */
  async createCursorIndex(table, cursorIndex, unique) {
    var db = await this.openDB()
    let store = db.transaction(table, "readwrite").objectStore(table)
    store.createIndex(cursorIndex, cursorIndex, {
      unique: unique
    })
    return Promise.resolve()
  },

  /**
   * 添加数据
   * @param {*} table 
   * @param {*} data 
   */
  async insert(table, data) {
    try {
      let db = await this.openDB()
      let request = db
        .transaction(table, "readwrite")
        .objectStore(table)
        .add(data)

      return new Promise((resolve, reject) => {
        request.onerror = function () {
          console.error('数据添加失败')
          reject(false)
        }
        request.onsuccess = function () {
          resolve(true)
        }
      })
    } catch (error) {
      console.log(error)
      return Promise.resolve(false)
    }
  },

  /**
   * 更新数据
   * @param {*} table 
   * @param {*} data 
   */
  async update(table, data) {
    try {
      let db = await this.openDB()
      let request = db
        .transaction(table, "readwrite")
        .objectStore(table)
        .put(data)
      return new Promise(resolve => {
        request.onerror = function () {
          console.error('数据跟新失败')
          resolve(false)
        }
        request.onsuccess = function () {
          resolve(true)
        }
      })
    } catch (error) {
      return Promise.resolve(false)
    }
  },

  /**
   * 删除数据
   * @param {*} table 
   * @param {*} keyValue 
   */
  async delete(table, keyValue) {
    try {
      let db = await this.openDB()
      let request = db
        .transaction(table, "readwrite")
        .objectStore(table)
        .delete(keyValue)
      return new Promise(resolve => {
        request.onerror = function () {
          console.error('数据删除失败')
          resolve(false)
        }
        request.onsuccess = function () {
          resolve(true)
        }
      })
    } catch (error) {
      return Promise.resolve(false)
    }
  },

  /**
   * 清空数据
   * @param {*} table 
   */
  clear: async function (table) {
    let db = await this.openDB()
    let store = db.transaction(table.name, "readwrite").objectStore(table.name)
    store.clear()
  },

  /**
   * 查询数据
   * @param {*} table 
   * @param {*} keyValue 
   * @param {*} indexCursor 
   */
  get: async function (table, keyValue, indexCursor) {
    try {
      let db = await this.openDB()
      let store = db
        .transaction(table.name, "readonly")
        .objectStore(table.name)
      let request
      request = !keyValue ?
        store.openCursor() :
        indexCursor ?
        store.index(indexCursor).get(keyValue) :
        store.get(keyValue)
      let data = []
      return new Promise(resolve => {
        request.onerror = function () {
          console.error('查询数据失败')
          resolve([])
        }
        request.onsuccess = function (event) {
          if (!keyValue && !indexCursor) {
            if (event.target.result) {
              data.push(event.target.result.value)
              event.target.result.continue()
            } else {
              resolve(data)
            }
          } else {
            resolve([event.target.result])
          }
        }
      })
    } catch (error) {
      return Promise.reject(error)
    }
  },
  /**
   * 通过索引游标操作数据, callback中要有游标移动方式
   * @param {*} table 
   * @param {*} keyRange 
   * @param {*} cursorIndex 
   */
  handleDataByIndex: async function (table, keyRange, cursorIndex) {
    try {
      let kRange = keyRange || ""
      let db = await this.openDB()
      let store = db.transaction(table, "readwrite").objectStore(table),
        request
      request = store.index(cursorIndex).openCursor(kRange)
      return new Promise(resolve => {
        request.onerror = function () {
          console.error('通过索引游标获取数据报错')
          resolve([])
        }
        request.onsuccess = function (event) {
          let cursor = event.target.result
          if (cursor) {
            resolve(cursor)
          }
        }
      })
    } catch (error) {
      return Promise.reject(error)
    }
  },

  /**
   *  通过游标操作数据
   * @param {*} table 
   * @param {*} keyRange 
   */
  async handleDataByCursor(table, keyRange) {
    try {
      let kRange = keyRange || ""
      let db = await this.openDB()
      let store = db.transaction(table, "readwrite").objectStore(table)
      let request = store.openCursor(kRange)
      return new Promise(resolve => {
        request.onerror = function () {
          console.error('通过游标获取数据报错')
          resolve([])
        }
        request.onsuccess = function (event) {
          let cursor = event.target.result
          resolve(cursor)
        }
      })

    } catch (error) {
      console.error(error)
      return Promise.reject([])
    }
  },

  async read(table, id) {
    try {
      let db = await this.openDB()
      let store = db.transaction(table, "readwrite").objectStore(table)
      let request = store.get(id);

      return new Promise(resolve => {
        request.onsuccess = function () {
          let cursor = request.result
          resolve(cursor)
        }
      })
    } catch (error) {
      console.error(error)
      return Promise.reject([])
    }
  },

  async readAll(table) {
    try {
      let db = await this.openDB()
      let store = db.transaction(table, "readwrite").objectStore(table)
      let request = store.openCursor();
      let data = []
      return new Promise(resolve => {
        request.onsuccess = function () {
          let cursor = event.target.result
          if(cursor){
            data.push(cursor.value)
            cursor.continue()
          }
          resolve(data)
        }
      })
    } catch (error) {
      console.error(error)
      return Promise.reject([])
    }
  }
}
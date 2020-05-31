const commonFunc = {

  /**
   * 休眠
   * @param {*} timeout 休眠时间，单位毫秒
   */
  sleep(timeout) {
    return new Promise(resolve => {
      window.setTimeout(function () {
        resolve()
      }, timeout)
    })
  },

  /**
   * 判断是否为空
   * @param {*} args 
   */
  isEmpty(args) {
    if (args == undefined || args == null || args === '') {
      return true
    } else {
      return false
    }
  },

  /**
   * 判断对象是否为空
   * @param {*} args 
   */
  isNull(args) {
    if (this.isEmpty(args)) {
      return true
    } else {
      for (let i in args) {
        return false
      }
    }
    return true
  }

}
export default commonFunc;
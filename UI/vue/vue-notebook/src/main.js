import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/style/public.css'
import dataDictionary from '@/utils/dataDictionary'

Vue.config.productionTip = false

// 全局变量
Vue.prototype.$DataDictionary = dataDictionary


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

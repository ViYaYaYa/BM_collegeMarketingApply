// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'normalize.css'
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
import api from 'axios'
Vue.use(MintUI)
Object.defineProperty(Vue.prototype, '$tools', {
  get: () => {
    return { api }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

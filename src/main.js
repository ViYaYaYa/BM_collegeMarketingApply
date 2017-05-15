// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'normalize.css'
import 'mint-ui/lib/style.css'

import Vue from 'vue'
import App from './App'
import Router from './router'

import MintUI from 'mint-ui'
import Store from './store'
import Api from './api'
import Validate from './plugins/validate'
import { RegionSelect } from './plugins/regionSelect'
import LoadImage from 'blueimp-load-image'
import Wechat from './plugins/wechat'
Vue.use(MintUI)
Object.defineProperty(Vue.prototype, '$tools', {
  get () {
    return {
      env: process.env.CODE_ENV,
      api: Api,
      validate: Validate,
      regionSelect: RegionSelect,
      loadImage: LoadImage,
      origin: this.env === 'development' ? '//angelapi.bluemoon.com.cn' : '//angel.bluemoon.com.cn',
      wechat: Wechat
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  store: Store,
  template: '<App/>',
  components: { App }
})

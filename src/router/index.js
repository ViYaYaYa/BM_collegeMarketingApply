import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/components/Form.vue'
import Search from '@/components/Search.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Form
    }, {
      path: '/search',
      component: Search
    }
  ]
})

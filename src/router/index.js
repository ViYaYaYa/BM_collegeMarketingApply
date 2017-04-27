import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/components/Form.vue'
import Search from '@/components/Search.vue'
import Finish from '@/components/Finish.vue'
import Preview from '@/components/Preview.vue'
import Page1 from '@/components/Page1.vue'
import Page2 from '@/components/Page2.vue'
import Page3 from '@/components/Page3.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/form'
    }, {
      path: '/form',
      component: Form,
      children: [
        { path: '', redirect: 'page1' },
        { path: 'page1', component: Page1 },
        { path: 'page2', component: Page2 },
        { path: 'page3', component: Page3 }
      ]
    }, {
      path: '/search',
      component: Search
    }, {
      path: '/finish',
      component: Finish
    }, {
      path: '/preview',
      component: Preview
    }
  ]
})

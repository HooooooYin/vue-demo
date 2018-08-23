import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Menu from '@/pages/menu'
import Login from '@/pages/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index
    },
    {
      path: '/dinner',
      name: 'dinner',
      component: Menu
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

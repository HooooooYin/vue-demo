import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Menu from '@/pages/menu'
import Login from '@/pages/login'
import Main from '@/pages/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      redirect: '/index',
      children: [
        {
          path: '/index',
          namme: 'index',
          component: Index
        },
        {
          path: '/dinner',
          name: 'dinner',
          component: Menu
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

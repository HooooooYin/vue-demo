import Vue from 'vue'
import Router from 'vue-router'

// 组件引入
import Home from '@/pages/home'
import Login from '@/pages/login'
import Register from '@/pages/register'
import FAQ from '@/components/FAQ'
// import Footer from '@/components/footer'
// import Header from '@/components/header'
import Manager from '@/components/manager'
import Products from '@/components/products'
import My from '@/components/managers/my'
import Send from '@/components/managers/send'
import MyHistory from '@/components/managers/history'
import Page404 from '@/pages/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      hidden: true,
      component: Home
    },
    {
      path: '/login',
      name: '登录',
      hidden: true,
      component: Login
    },
    {
      path: '/register',
      name: '注册',
      hidden: true,
      component: Register
    },
    {
      path: '/products',
      name: '商品',
      class: 'el-icon-goods',
      component: Products
    },
    {
      path: '/FAQ',
      name: '使用文档',
      component: FAQ
    },
    {
      path: '/manager',
      name: '个人中心',
      redirect: 'manager/my',
      component: Manager,
      hasChild: true,
      children: [
        {path: '/manager/my', name: '我的信息', component: My},
        {path: '/manager/send', name: '发货管理', component: Send},
        {path: '/manager/history', name: '发货记录', component: MyHistory}
      ]
    },
    {
      path: '*',
      name: '404',
      component: Page404
    }
  ]
})

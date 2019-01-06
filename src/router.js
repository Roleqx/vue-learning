import Vue from 'vue'
import Router from 'vue-router'

// Compontents Loading
import Home from '@/views/Home.vue'
import Account from '@/views/Account.vue'
import Stocks from '@/views/Stocks.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      component: Home,
      name: 'homeRoute'
    },
    {
      path: '/account',
      component: Account,
      name: 'accountRoute'
    },
    {
      path: '/stocks',
      component: Stocks,
      name: 'stocksRoute'
    }
  ]
})

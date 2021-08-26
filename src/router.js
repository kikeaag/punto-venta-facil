import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import CashComponent from './views/CashComponent.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App
    },
    {
      path: '/cash',
      name: 'cash',
      component: CashComponent
    },
    {
      path: '/about',
      name: 'AboutComponent',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/AboutComponent.vue')
    }
  ]
})
import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import MainLayout from './modules/common/view/MainLayout.vue'
import Page404 from './modules/common/view/Page404.vue'
import dashboard from './modules/dashboard/router.js'
import system from './modules/system/router'
import publicRouter from './modules/public/router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...publicRouter,
    {
      path: '/',
      component: MainLayout,
      children: [
        ...dashboard,
        ...system
      ]
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
      path: '*',
      component: Page404
    }
  ]
})

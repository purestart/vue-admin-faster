import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index.vue'
import Menus from "../pages/menus/menus.vue";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {path: '/', redirect: 'menus'},
        {
          path:'/menus',
          name:'menus',
          component: Menus
        },
      ]
    }
  ]
})

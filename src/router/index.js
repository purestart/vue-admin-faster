import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index.vue'
import Menus from "../pages/menus/menus.vue";
import Login from "../pages/login.vue";
import NotFound from "../pages/404.vue";
import Home from '../pages/home/home.vue';
import Roles from "../pages/roles/roles.vue";
import Groups from '../pages/groups/groups.vue';
import Users from '../pages/users/users.vue';

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
        {
          path:'/home',
          name:'home',
          component: Home
        },
        {
          path:'/roles',
          name:'roles',
          component: Roles
        },
        {
          path:'/groups',
          name:'groups',
          component: Groups
        },
        {
          path:'/users',
          name:'users',
          component: Users
        },
      ]
    },
    {
      path: '/login',
      component: Login,
      name: 'login'
    },
    {
      path: '/404',
      component: NotFound,
      name: '404',
      hidden: true
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ]
})

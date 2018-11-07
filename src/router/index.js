import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index.vue'
import Menus from "../pages/menus/menus.vue";
import Login from "../pages/login.vue";
import NotFound from "../pages/404.vue";
import Home from '../pages/dashboard/dynamic-layout.vue';
import Roles from "../pages/roles/role.vue";
import Groups from '../pages/dept/tb-depts.vue';
import Users from '../pages/users/user.vue';
import Form from '../pages/form/form.vue';
import ProjectInfo from '../pages/project/project-info.vue';
import PreProject from '../pages/project/pre-project.vue';
import Profile from "../pages/profile/profile.vue";
import FormGenerater from '../pages/form-generater/Container.vue';
import GenList from "../pages/gen/gen-list.vue";
import Databases from "../pages/gen/databases.vue";
import AutoForm from "../pages/auto-form/auto-form.vue";

import Customs from "../pages/sys/customs.vue";
import EngChart from "../pages/sys/eng-chart.vue";
import DealerChart from '../pages/sys/dealer-chart.vue';
import WorkTeam from '../pages/sys/work-team.vue';
import EnterPage from '../pages/project/enter-page.vue';

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
        {
          path:'/form',
          name:'form',
          component: Form
        },
        {
          path:'/project-info',
          name:'project-info',
          component: ProjectInfo
        },
        {
          path:'/pre-project',
          name:'pre-project',
          component: PreProject
        },
        {
          path:'/profile',
          name:'profile',
          component: Profile
        },
        {
          path:'/form-gen',
          name:'form-gen',
          component: FormGenerater
        },
        {
          path:'/gen-list',
          name:'gen-list',
          component: GenList
        },
        {
          path:'/databases',
          name:'databases',
          component: Databases
        },
        {
          path:'/auto-form',
          name:'auto-form',
          component: AutoForm
        },
        {
          path:'/customs',
          name:'customs',
          component: Customs
        },
        {
          path:'/eng-chart',
          name:'eng-chart',
          component: EngChart
        },
        {
          path:'/dealer-chart',
          name:'dealer-chart',
          component: DealerChart
        },
        {
          path:'/work-team',
          name:'work-team',
          component: WorkTeam
        },
        {
          path:'/enter-page',
          name:'enter-page',
          component: EnterPage
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

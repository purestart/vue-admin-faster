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


import Customs from "../pages/sys/customs.vue";
import EngChart from "../pages/sys/eng-chart.vue";
import DealerChart from '../pages/sys/dealer-chart.vue';
import WorkTeam from '../pages/sys/work-team.vue';
import EnterPage from '../pages/project/enter-page.vue';
import ProjectCtrl from "../pages/project/project-ctrl.vue";
import GenTemplate from "../pages/gen/tb-gen-template.vue";
import GenType from '../pages/gen/tb-gen-type.vue';
import projectPlan from '../pages/project/tb-project-plan.vue';
import Sample from '../pages/sample/sample.vue';
import Cate from '../pages/cate/tb-cate.vue';

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
          meta:["菜单"],
          component: Menus
        },
        {
          path:'/home',
          name:'home',
          meta:["首页"],
          component: Home
        },
        {
          path:'/roles',
          name:'roles',
          meta:["角色"],
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
          meta:["用户"],
          component: Users
        },
        {
          path:'/form',
          name:'form',
          meta:["表单"],
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
          meta:["表单生成器"],
          component: FormGenerater
        },
        {
          path:'/gen-list',
          name:'gen-list',
          meta:["数据表单配置"],
          component: GenList
        },
        {
          path:'/databases',
          name:'databases',
          meta:["数据库"],
          component: Databases
        },
        {
          path:'/customs',
          name:'customs',
          meta:["自定义表"],
          component: Customs
        },
        {
          path:'/eng-chart',
          name:'eng-chart',
          meta:["工程线"],
          component: EngChart
        },
        {
          path:'/dealer-chart',
          name:'dealer-chart',
          meta:["经销商"],
          component: DealerChart
        },
        {
          path:'/work-team',
          name:'work-team',
          meta:["施工队"],
          component: WorkTeam
        },
        {
          path:'/enter-page',
          name:'enter-page',
          meta:["业务启动流程管理"],
          component: EnterPage
        },
        {
          path:'/project-ctrl',
          name:'project-ctrl',
          meta:["项目总控表"],
          component: ProjectCtrl
        },
        {
          path:'/gen-template',
          name:'gen-template',
          meta:["模板管理"],
          component: GenTemplate
        },
        {
          path:'/gen-type',
          name:'gen-type',
          meta:["模板类型"],
          component: GenType
        },
        {
          path:'/project-plan',
          name:'project-plan',
          meta:["模板类型"],
          component: projectPlan
        },
        {
          path:'/sample',
          name:'sample',
          meta:["模板类型"],
          component: Sample
        },
        {
          path:'/cate',
          name:'cate',
          meta:["分类管理"],
          component: Cate
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

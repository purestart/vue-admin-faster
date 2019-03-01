// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router';
import axios from 'axios';
import store from './store/index';
import Cookies from 'js-cookie'
import moment from 'moment'
import utils from './assets/utils/index';

Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  if(dataStr){
    return moment(dataStr).format(pattern)
  }else{
    return "";
  }
})

Vue.use(utils);

import { hasPermission } from '@/utils';
import {url} from './config/index';

// 挂载全局
Vue.prototype.$axios = axios;
Vue.prototype.$hasPermission = hasPermission;
Vue.prototype.$baseUrl = url;

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor);

import './assets/styles/transition.scss';
import './assets/styles/el-styles.scss';
import './assets/styles/theme.scss';

import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;
import EditModel from "./components/EditModel/EditModel.vue";
Vue.component(EditModel.name,EditModel);


axios.interceptors.request.use(function (config) {
  //Vue.$vux.loading.show({text: '数据加载中'})
  console.log("数据加载中");
  let token=Cookies.get('token');
  config.headers['token'] = "abc123"

  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  //Vue.$vux.loading.hide()
  if (response.data && response.data.code === 401) { // 401, token失效
    // 清除登录信息
    //clearLoginInfo()
    router.replace({ name: 'login' })
  }
  return response;
}, function (error) {
  // Vue.$vux.loading.hide()
  console.log("网络异常");
  // Vue.$vux.toast.show({
  //   text: '网络异常',
  //   position: 'middle',
  //   type: 'cancel'
  // })

  return Promise.reject(error)
})

NProgress.configure({ showSpinner: false });



router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
      //sessionStorage.removeItem('username');
    }
  //let user = sessionStorage.getItem('username');
  if (false) { //!user && to.path != '/login'
      next({path: '/login'})
    } else {
      NProgress.start();
      next()
    }
  });
  
  router.afterEach(transition => {
    setTimeout(()=>{
      NProgress.done();
    },200)
    
  });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

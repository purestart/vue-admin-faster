// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router';

import store from './store/index';



import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

import './assets/styles/transition.scss';
import './assets/styles/el-styles.scss';

Vue.config.productionTip = false;


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

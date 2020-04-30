import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/element-variables.scss';
import cookie from './utils/cookie';
import axios from './utils/axios'
import common from './utils/common';

Vue.prototype.$cookie = cookie;
Vue.prototype.$axios = axios;
Vue.prototype.$common = common;
Vue.use(Element);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

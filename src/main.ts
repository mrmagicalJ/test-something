import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import createRouter from './router';
import Vuex from 'vuex';
import createStore from './store/store';
import './style/animation.scss';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);
const router = createRouter();
const store = createStore();

// 全局的路由钩子
// router.beforeEach((to, from, next) => {
//   console.log('before Each invoked');
//   if (to.fullPath === '/login') {
//     // 可以做一些登录验证，未验证跳去登录页
//     next('/login');
//   } else {
//     next();
//   }
// });

// router.beforeResolve((to, from, next) => {
//   console.log('before Resolve invoked');
//   next();
// });

// router.afterEach((to, from) => {
//   console.log('after Each invoked');
// });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

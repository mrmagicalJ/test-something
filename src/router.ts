import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default  () => {
  return new Router({
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
          title: 'this is meta title',
          description: 'this is meta des',
        },
        // children: [
        //   {
        //     path: 'child',
        //     // 多个路由的情况
        //     // component: Home,
        //     components: {
        //       default: Home,
        //       a: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        //     },
        //   },
        // ],
      },
      {
        path: '/about/:id',
        name: 'about',
        // 将:id作为props传入组件,可以与vue-router解耦，推荐
        props: true,
        // props: (route) => ({id: route.query.xxx}),
        // ------------------------------------
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      },
    ],
    // mode: 'history',
    // ------------------------------------
    // 部分匹配路径
    // linkActiveClass: '',
    // 完全匹配路径
    // linkExactActiveClass: '',
    // ------------------------------------
    // hash模式下会加在#前，前后的 / 必须写
    // base: '/base/',
    // ------------------------------------
    // scrollBehavior(to, from, savedPosition) {
    //   if (savedPosition) {
    //     return savedPosition;
    //   } else {
    //     return {x: 0, y: 0};
    //   }
    // },
    // ------------------------------------
    // parseQuery(parseQuery) {
    //   return {str: parseQuery};
    // },
    // ------------------------------------
    // 在不支持history模式的浏览器降级为hash模式，默认为true
    // fallback: true,
  });
};

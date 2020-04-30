import Vue from 'vue'
import Router from 'vue-router'
import Main from './components/main.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/m',
      name: 'main',
      component: Main,
      children: [
        {
          path: 'topic',
          name: 'topic',
          label: 'Topic',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/topic.vue')
        },
        {
          path: 'detail',
          name: 'detail',
          component: () => import('./views/detail.vue')
        },
      ]
    },
    {
      /** for whatever unmatched routes */
      path: '/*',
      redirect: { name: 'topic' },
    },
  ]
})

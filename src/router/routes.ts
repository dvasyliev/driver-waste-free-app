import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'welcome',
    component: import(/* webpackChunkName: "welcome" */ '@/pages/Welcome.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    component: import(/* webpackChunkName: "404" */ '@/pages/404.vue'),
  },
]

export default routes

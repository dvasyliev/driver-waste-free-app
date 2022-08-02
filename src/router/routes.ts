import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'welcome',
    redirect: { name: 'route-wizard', params: { routeId: 1 } },
  },

  {
    path: '/route-wizard/:routeId',
    name: 'route-wizard',
    component: import(/* webpackChunkName: "route-wizard" */ '@/pages/RouteWizard.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    component: import(/* webpackChunkName: "404" */ '@/pages/404.vue'),
  },
]

export default routes

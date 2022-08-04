import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'welcome',
    redirect: { name: 'route-wizard', params: { routeId: 1 } },
  },

  {
    path: '/route-wizard/:routeId',
    name: 'route-wizard',
    component: import(/* webpackChunkName: "route-wizard-page" */ '@/pages/RouteWizardPage.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    component: import(/* webpackChunkName: "404-page" */ '@/pages/404.vue'),
  },
]

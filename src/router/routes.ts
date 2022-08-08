import { RouteRecordRaw } from 'vue-router'
import RouteWizard from '../pages/RouteWizardPage.vue'
import NotFound from '../pages/404.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'welcome',
    redirect: { name: 'route-wizard', params: { routeId: 1 } },
  },

  {
    path: '/route-wizard/:routeId',
    name: 'route-wizard',
    component: RouteWizard,
  },

  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
]

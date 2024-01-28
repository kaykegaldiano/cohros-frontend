import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/create-contact',
      name: 'create-contact',
      component: () => import('../views/CreateContactView.vue'),
    }
  ]
})

export default router

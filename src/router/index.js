import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/create-contact',
      name: 'create-contact',
      component: () => import('../views/CreateContactView.vue'),
    },
    {
      path: '/edit-contact/:id',
      name: 'edit-contact',
      component: () => import('../views/EditContactView.vue'),
    },
  ]
})

export default router

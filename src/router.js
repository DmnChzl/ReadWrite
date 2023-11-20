import { createRouter, createWebHistory } from 'vue-router';
import EditView from '~/views/EditView.vue';
import HomeView from '~/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/new',
      name: 'new',
      component: () => import('~/views/NewView.vue') // Lazy Loading
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditView
    }
  ]
});

export default router;

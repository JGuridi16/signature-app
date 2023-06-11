import { createRouter, createWebHistory } from 'vue-router';
import homeRoutes from './home';
import signatureRoutes from './signature';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...homeRoutes,
    ...signatureRoutes,
  ],
});

export default router;
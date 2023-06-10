const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/Main.vue'),
  },
];

export default routes;

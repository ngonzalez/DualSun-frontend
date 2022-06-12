import OrderNew from '../views/OrderNew.vue';
import OrderShow from '../views/OrderShow.vue';
import PageNotFound from '../views/404.vue';

const routes = [
  {
    path: '/',
    redirect: '/orders/new',
  },
  {
    path: '/orders/new',
    name: 'order_new',
    component: OrderNew,
  },
  {
    path: '/orders/new',
    name: 'order_new_redirect',
    component: OrderNew,
  },
  {
    path: '/orders/:id',
    name: 'order_show',
    component: OrderShow,
  },
  {
    path: '/:catchAll(.*)*',
    name: 'PageNotFound',
    component: PageNotFound,
  },
];

export default routes;

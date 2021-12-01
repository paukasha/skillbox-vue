import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage';
import notFound from '@/pages/NotFound';
import ProductPage from '@/pages/ProductPage';
import CartPage from '@/pages/CartPage';

Vue.use(VueRouter);

const routes = [
  //порядок имеет значение
  {
    name: 'main',
    component: MainPage,
    path: '/'
  },
  {
    name: 'product',
    component: ProductPage,
    path: '/product/:id'  //указываем динамический путь, после двоеточия указывает название динмического сегментаб например id
  },
  {
    name: 'cart',
    component: CartPage,
    path: '/cart'
  },
  {
    name: 'notFound',
    component: notFound,
    path: '*'
  },
];

const router = new VueRouter({
  routes
});

export default router;

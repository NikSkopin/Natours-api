import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/components/Login.vue';
import Signup from '@/components/Signup.vue';
import Tours from '@/components/Tours.vue';
import Details from '@/components/Details.vue';
import UserPage from '@/components/UserPage.vue';
import MyTours from '@/components/MyTours.vue';
import PathNotFound from '@/components/PathNotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/tours',
    name: 'Tours',
    component: Tours,
  },
  {
    path: '/tours/tour/:tourName',
    name: 'Details',
    component: Details,
    props: true,
  },
  {
    path: '/me',
    name: 'UserPage',
    component: UserPage,
  },
  {
    path: '/my-tours',
    name: 'MyTours',
    component: MyTours,
  },
  { path: '*', component: PathNotFound },
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

export default router;

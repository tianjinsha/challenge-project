import Vue from 'vue';
import VueRouter from 'vue-router';

import InitPage from '../views/InitPage';
import Login from '../views/Login';
import Home from '../views/Home';

Vue.use(VueRouter);

const routes= [
  {
    path:'/',
    name:'index',
    redirect:'initPage'
  },
  {
    path:'/initPage',
    name:'initPage',
    component:InitPage
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/home',
    name:'home',
    component:Home
  },
]

let router = new VueRouter({
  mode: 'hash',
  routes:routes
});

export default router;
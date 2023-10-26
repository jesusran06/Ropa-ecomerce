import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import login from '../pages/login.vue'
import register from '../pages/register.vue'
import guest from '../pages/guest.vue'
import wholesalerRegister from '../pages/wholesaler-register.vue'
import forgotPassword from '../pages/forgot-password.vue'
import index from '../pages/index.vue'
import secondPage from '../pages/second-page.vue'
import profile from '../pages/profile.vue'
import catalog from '../pages/catalog.vue'
import userList from '../pages/apps/user/list/index.vue'
import productCatalog from '../pages/product-catalog.vue'
import test from '../pages/test.vue'

// import routes from '~pages'
// console.log('routes', routes)

const rutas = [
  {
    name: 'apps-user-list',
    path: '/apps/user/list',
    props: true,
    component: userList,
  },
  {
    name: 'wholesaler-register',
    path: '/wholesaler-register',
    props: true,
    meta: {
      layout: 'blank',
      action: 'read',
      subject: 'Auth',
      redirectIfLoggedIn: true,
    },
    component: wholesalerRegister,
  },
  {
    name: 'register',
    path: '/register',
    props: true,
    meta: {
      layout: 'blank',
      action: 'read',
      subject: 'Auth',
      redirectIfLoggedIn: true,
    },
    component: register,
  },
  {
    name: 'login',
    path: '/',
    props: true,
    meta: {
      layout: 'blank',
    },
    component: login,
  },
  {
    name: 'index',
    path: '/index',
    props: true,
    component: index,
  },
  {
    name: 'second-page',
    path: '/second-page',
    props: true,
    component: secondPage,
  },
  {
    name: 'catalog',
    path: '/catalog',
    props: true,
    component: catalog,
  },
  {
    name: 'products',
    path: '/products',
    props: true,
    component: productCatalog,
  },
  {
    name: 'test',
    path: '/test',
    props: true,
    component: test,
  },
  {
    name: 'profile',
    path: '/profile',
    props: true,
    component: profile,
  },
  {
    name: 'guest',
    path: '/guest',
    props: true,
    meta: {
      layout: 'blank',
    },
    component: guest,
  },
  {
    name: 'forgot-password',
    path: '/forgot-password',
    props: true,
    meta: {
      layout: 'blank',
      action: 'read',
      subject: 'Auth',
      redirectIfLoggedIn: true,
    },
    component: forgotPassword,
  },
  {
    name: 'all',
    path: '/:all(.*)*',
    props: true,
    meta: {
      layout: 'blank',
      action: 'read',
      subject: 'Auth',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(rutas),
  ],
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

export default router

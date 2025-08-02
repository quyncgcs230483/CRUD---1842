import Vue from 'vue';
import Router from 'vue-router';
import Words from './views/Words.vue';
import New from './views/New.vue';
import Show from './views/Show.vue';
import Edit from './views/Edit.vue';
import Test from './views/Test.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import About from './views/About.vue';
Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/words'
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: { requiresAuth: true }
    },
    {
      path: '/words',
      name: 'words',
      component: Words,
      meta: { requiresAuth: true }
    },
    {
      path: '/words/new',
      name: 'new-word',
      component: New,
      meta: { requiresAuth: true }
    },
    {
      path: '/words/:id',
      name: 'show',
      component: Show,
      meta: { requiresAuth: true }
    },
    {
      path: '/words/:id/edit',
      name: 'edit',
      component: Edit,
      meta: { requiresAuth: true }
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
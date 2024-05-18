import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import LoginVue from "./pages/Login.vue";
import RegisterVue from './pages/Register.vue';
import NotFoundVue from './pages/NotFound.vue';
import Users from './pages/Users.vue';
import EditVue from "./pages/Edit.vue";

const isLoggedIn = () => {
  const isLogged = localStorage.getItem('tk');

  if (isLogged !== null && isLogged !== '') {
    return true;
  }

  return false;
};

const requireAuth: RouteRecordRaw['beforeEnter'] = (to, _from, next) => {
  if (to.meta?.auth && !isLoggedIn()) {
    next({ name: 'Login' });
  } else {
    next();
  }
};

const routesList: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: LoginVue
  },
  {
    path: '/cadastrar',
    name: 'Cadastrar',
    component: RegisterVue
  },
  {
    path: '/usuarios',
    children: [
      {
        path: '',
        name: 'Usuarios',
        component: Users,
        meta: { auth: true },
        beforeEnter: requireAuth 
      },
      {
        path: 'editar/:id',
        name: 'Edit',
        component: EditVue,
        props: true,
        beforeEnter: requireAuth
      },
    ]
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundVue,
    meta: { auth: true },
    beforeEnter: requireAuth
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes: routesList
})

export default router;
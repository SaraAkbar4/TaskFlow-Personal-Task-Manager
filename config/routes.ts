export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        name: 'login',
        component: './user/login',
      },
      {
        path: '/user/register',
        name: 'register',
        component: './user/register',
      },
      {
        path: '/user/register-result',
        name: 'register-result',
        component: './user/register-result',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
    ],
  },

  {
    path: '/',
    redirect: '/user/login',
  },

  {
    path: '/dashboard/management',
    name: 'Dashboard',
    icon: 'dashboard',
    component: './Dashboard',
  },

  {
    path: '*',
    component: './exception/404',
  },
];

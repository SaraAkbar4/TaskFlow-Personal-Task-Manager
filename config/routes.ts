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
    path: '/dashboard/search',
    name: 'Search',
    icon: 'search',
    access: 'canAdmin',
    component: './Dashboard/Search',
  },

  {
    path: '/dashboard/management',
    name: 'Management',
    icon: 'table',
    access: 'canAdmin',
    routes: [
      {
        path: '/dashboard/management/create',
        name: 'Create Task',
        access: 'canAdmin',
        component: './Dashboard/Management/CreateTasks',
      },
      {
        path: '/dashboard/management/view',
        name: 'View Tasks',
        access: 'canAdmin',
        component: './Dashboard/Management/ViewTasks',
      },
      {
        path: '/dashboard/management/update',
        name: 'Update Task',
        access: 'canAdmin',
        component: './Dashboard/Management/UpdateTasks',
      },
      {
        path: '/dashboard/management/delete',
        name: 'Delete Task',
        access: 'canAdmin',
        component: './Dashboard/Management/DeleteTasks',
      },
    ],
  },

  {
    path: '*',
    component: './exception/404',
  },
];

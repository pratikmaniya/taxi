import React from 'react';

const Taxis = React.lazy(() => import('./views/Taxis/Taxis'));
const Users = React.lazy(() => import('./views/Users/Users'));

const routes = [
  { path: '/taxis', exact: true, name: 'Taxis', component: Taxis },
  { path: '/users', exact: true, name: 'Users', component: Users },
];

export default routes;

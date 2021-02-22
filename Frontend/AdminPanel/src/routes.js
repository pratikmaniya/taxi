import React from 'react';

const Taxis = React.lazy(() => import('./views/Taxis/Taxis'));
const TaxiDetails = React.lazy(() => import('./views/TaxiDetails/TaxiDetails'));
const Users = React.lazy(() => import('./views/Users/Users'));

const routes = [
  { path: '/taxis', exact: true, name: 'Taxis', component: Taxis },
  { path: '/taxi-details/:taxi_id', exact: true, name: 'Taxis', component: TaxiDetails },
  { path: '/users', exact: true, name: 'Users', component: Users },
];

export default routes;

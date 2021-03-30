import React from 'react';

const Taxis = React.lazy(() => import('./views/Taxis/Taxis'));
const TaxiDetails = React.lazy(() => import('./views/TaxiDetails/TaxiDetails'));
const DriverDetails = React.lazy(() => import('./views/DriverDetails/DriverDetails'));
const Users = React.lazy(() => import('./views/Users/Users'));
const Drivers = React.lazy(() => import('./views/Drivers/Drivers'));
const Reviews = React.lazy(() => import('./views/Reviews/Reviews'));

const routes = [
  { path: '/taxis', exact: true, name: 'Taxis', component: Taxis },
  { path: '/taxi-details/:taxi_id', exact: true, name: 'Taxi Details', component: TaxiDetails },
  { path: '/driver-details/:driver_id', exact: true, name: 'Driver Details', component: DriverDetails },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/drivers', exact: true, name: 'Drivers', component: Drivers },
  { path: '/reviews', exact: true, name: 'Reviews', component: Reviews },
];

export default routes;

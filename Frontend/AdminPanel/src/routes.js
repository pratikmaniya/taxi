import React from 'react';

const Users = React.lazy(() => import('./views/Users/Users'));
const Vehicles = React.lazy(() => import('./views/Vehicles/Vehicles'));
const VehicleTypes = React.lazy(() => import('./views/VehicleTypes/VehicleTypes'))
const AddEditVehicleType = React.lazy(() => import('./views/VehicleTypes/Add-Edit-VehicleType'))
const Brands = React.lazy(() => import('./views/Brands/Brands'))
const AddEditBrand = React.lazy(() => import('./views/Brands/Add-Edit-Brands'))
const Years = React.lazy(() => import('./views/Years/Years'))
const AddEditYear = React.lazy(() => import('./views/Years/Add-Edit-Years'))
const Models = React.lazy(() => import('./views/Models/Models'))
const AddEditModel = React.lazy(() => import('./views/Models/Add-Edit-Model'))

const routes = [
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/vehicles', exact: true, name: 'Vehicles', component: Vehicles },
  { path: '/vehicleTypes', exact: true, name: 'Vehicle Types', component: VehicleTypes },
  { path: '/vehicleTypes/add', exact: true, name: 'VehicleTypes add', component: AddEditVehicleType },
  { path: '/vehicleTypes/edit/:vehicleTypeId', exact: true, name: 'VehicleTypes edit', component: AddEditVehicleType },
  { path: '/brands', exact: true, name: 'Brand', component: Brands },
  { path: '/brands/add', exact: true, name: 'Add Brand', component: AddEditBrand },
  { path: '/brands/edit/:brandId', exact: true, name: 'Edit Brand', component: AddEditBrand },
  { path: '/years', exact: true, name: 'Years', component: Years },
  { path: '/years/add', exact: true, name: 'Add Year', component: AddEditYear },
  { path: '/years/edit/:yearId', exact: true, name: 'Edit Year', component: AddEditYear },
  { path: '/models', exact: true, name: 'Models', component: Models },
  { path: '/models/add', exact: true, name: 'Add Model', component: AddEditModel },
  { path: '/models/edit/:modelId', exact: true, name: 'Edit Model', component: AddEditModel },
];

export default routes;

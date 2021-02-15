import React, { Suspense, useState, useEffect } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarNav,
} from '@coreui/react';

import { logOut, confirmBox } from '../utils/common';
import Messages from '../utils/messages';
import routes from '../routes';
import navigation from '../_nav';
import store from '../utils/store'
import * as actionTypes from '../store/actionTypes'
import config from '../config';


const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

function DefaultLayout(props) {
  const [path, setPath] = useState('/')
  useEffect(() => {
    if (path !== props.location.pathname.split("/")[config.urlCheckIndex]) {
      setPath(props.location.pathname.split("/")[config.urlCheckIndex])
      store.dispatch({
        type: actionTypes.RESET_LISTING_STATES
      })
    }
  }, [props, path])
  const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  async function signOut() {
    let data = await confirmBox(Messages.EN.CONFIRM_BOX_TITLE, Messages.EN.ASK_TO_LOGOUT);
    if (data === 1) {
      logOut();
    }
  }
  if (!localStorage.getItem('MOTO_AUTH_TOKEN')) {
    return <Redirect to={process.env.PUBLIC_URL + '/login'} />
  } else {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={loading()}>
            <DefaultHeader onLogout={() => signOut()} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={navigation} router={router} />
            </Suspense>
            <AppSidebarFooter />
          </AppSidebar>
          <main className="main">
            <Container fluid className="main-container">
              <Suspense fallback={loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={process.env.PUBLIC_URL + route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to={process.env.PUBLIC_URL + "/dashboard"} />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default withRouter(DefaultLayout);
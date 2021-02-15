import React, { Component } from 'react'
import { Route, Switch, withRouter, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/common/header';
import routes from "./Routes";
import LoaderComponent from './components/Loader/Loader';

import './app.scss'

const Home = React.lazy(() => import('./components/home/home'))
const Signin = React.lazy(() => import('./components/signin/signin'))
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

class App extends Component {
	render() {
		return (
			<>
				{this.props.loading === true ? <LoaderComponent /> : null}
				<Header />
				<div style={{ margin: '30px 10px' }}>
					<BrowserRouter>
						<React.Suspense fallback={loading()}>
							<Switch>
								<Route exact path={process.env.PUBLIC_URL + routes.HOME} render={props => <Home {...props} />} />
								<Route exact path={process.env.PUBLIC_URL + routes.SIGNIN} render={props => <Signin {...props} />} />
							</Switch>
						</React.Suspense>
					</BrowserRouter>
				</div>
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.reducer.loading,
		redirect_to_login: state.reducer.redirect_to_login
	}
}

export default withRouter(connect(mapStateToProps, null)(App));
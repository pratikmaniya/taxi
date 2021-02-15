import React, { Component } from 'react'
import { Route, Switch, withRouter, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import store from './utils/store';
import routes from "./Routes";
import LoaderComponent from './components/Loader/Loader';
import './app.scss'
const Home = React.lazy(()=>import('./components/home/home'))
const Signin = React.lazy(()=>import('./components/signin/signin'))
const Signup = React.lazy(()=>import('./components/signup/signup'))
const ProfileSetup1 = React.lazy(()=>import('./components/profileSetup/profileSetup1'))
const ProfileSetup2 = React.lazy(()=>import('./components/profileSetup/profileSetup2'))
const ProfileSetting = React.lazy(()=>import('./components/profileSetting/profileSetting'))
const TenantInof = React.lazy(()=>import('./components/tenantInfo/tenantInfo'))
const Dashboard = React.lazy(()=>import('./components/dashboard/dashboard'))
const NoticeOrdering = React.lazy(()=>import('./components/noticeOrdering/noticeOrdering'))
const Tenants = React.lazy(()=>import('./components/tenants/tenants'))
const TenantInofService = React.lazy(()=>import('./components/tenantInfo/tenantInfo-service'))
const Properties = React.lazy(()=>import('./components/properties/properties'))
const Faq = React.lazy(()=>import('./components/faq/faq'))
const TermsOfUse = React.lazy(() => import('./components/termsOfUse/termsOfUse'))
const PrivacyPolicy = React.lazy(() => import('./components/privacyPolicy/privacyPolicy'))
const AboutUs = React.lazy(()=>import('./components/aboutus/aboutus'))
// const DEBUG = true
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

class App extends Component {
	render() {
		/* var DEBUG = false;
		if (!DEBUG) {
			var methods = ["log", "debug", "warn", "info"];
			for (var i = 0; i < methods.length; i++) {
				console[methods[i]] = function () { };
			}
		}
		if (this.props.redirect_to_login) {
			store.dispatch({
				type: 'SET_REDRECT_TO_LOGIN_FALSE'
			})
			localStorage.removeItem("AUTH_TOKEN")
			this.props.history.push(process.env.PUBLIC_URL + '/')
		} */
		return (
			<BrowserRouter>
			{/* <LoaderComponent />  */}
				{this.props.loading === true ? <LoaderComponent /> : null}
				<React.Suspense fallback={loading()}>
						<Switch>
							<Route exact path={process.env.PUBLIC_URL + routes.HOME} render={props => <Home {...props} />}/>
							<Route exact path={process.env.PUBLIC_URL + routes.SIGNIN} render={props => <Signin {...props}/>}/>
							<Route exact path={process.env.PUBLIC_URL + routes.SIGNUP} render={props => <Signup {...props}/>}/>
							<Route exact path={process.env.PUBLIC_URL + routes.PROFILESETUP1}  render={props => <ProfileSetup1 {...props} />}/>
							<Route exact path={process.env.PUBLIC_URL + routes.PROFILESETUP2}  render={props => <ProfileSetup2 {...props} />}/>
							<Route exact path={process.env.PUBLIC_URL + routes.PROFILESETTING}  render={props => <ProfileSetting {...props}/>}></Route>
							<Route exact path={process.env.PUBLIC_URL + routes.TENANTINFO}  render={props => <TenantInof {...props}/>}/>
							<Route exact path={process.env.PUBLIC_URL + routes.DASHBOARD}  render={props => <Dashboard {...props}/>}/>
							<Route exact path={process.env.PUBLIC_URL + routes.NOTICEORDERING}  render={props => <NoticeOrdering {...props}/>}/>
							<Route exact path={process.env.PUBLIC_URL + routes.TENANTS}  render={props => <Tenants {...props}/>}/>
							<Route exact path={process.env.PUBLIC_URL + routes.TENANTINFOSERVICE}  render={props => <TenantInofService {...props}/>}/>
							<Route exact path={process.env.PUBLIC_URL + routes.PROPERTIES}  render={props => <Properties {...props}/>}/>
							<Route exact path={process.env.PUBLIC_URL + routes.FAQ}  render={props => <Faq {...props}/>}/>
							<Route exact path={process.env.PUBLIC_URL + routes.TERMSOFUSE} render={props => <TermsOfUse {...props} />} />
							<Route exact path={process.env.PUBLIC_URL + routes.PRIVACYPOLICY} render={props => <PrivacyPolicy {...props} />} />
							<Route exact path={process.env.PUBLIC_URL + routes.ABOUTUS}  render={props => <AboutUs {...props}/>}/>
						</Switch>
				</React.Suspense>
			</BrowserRouter>
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

// export default App;

// const mapStateToProps = state => {
// 	return {
// 	  loading: state.reducer.loading,
// 	  redirect_to_login: state.reducer.redirect_to_login
// 	}
//   }
  
//   export default withRouter(connect(mapStateToProps, null)(App));

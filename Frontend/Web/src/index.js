import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import history from './utils/history';
import store from './utils/store';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
const app = (
  <Provider store={store}>
      <Router history={history}>
          {/* Use Router only if you want to use history from package */}
          {/* Always wrap your app with BrowserRouter if not used Router */}
          <App />
      </Router>
  </Provider>  
)
ReactDOM.render(app, document.getElementById('root'));
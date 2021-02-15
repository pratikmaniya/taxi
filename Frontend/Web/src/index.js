import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
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


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

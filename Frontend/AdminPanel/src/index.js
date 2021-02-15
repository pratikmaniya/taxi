import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

import App from './App';
import * as serviceWorker from './serviceWorker';
import history from './utils/history';
import store from './utils/store';

if (process.env.NODE_ENV === "production") {
    console.log = () => { }
}

const app = (
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createStore, applyMiddleware, compose  } from 'redux'
import reducer from './reducers'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
)

ReactDOM.render(
    <Router>
        <Provider store={store}>
                <App />
        </Provider> 
    </Router>   
    , document.getElementById('root'));
registerServiceWorker();

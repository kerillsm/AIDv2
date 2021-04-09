import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import './main.sass';
import 'react-flexbox-grid/dist/react-flexbox-grid.css'
import App from "./components/App";
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(reduxThunk)
));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('app'));

module.hot.accept();

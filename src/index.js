import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import offices from './reducers/offices'
import shipments from './reducers/shipments'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const reducers = combineReducers({
    offices,
    shipments
});
const middleware = () => applyMiddleware(thunk, createLogger());

const store = createStore(reducers, middleware(), undefined);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

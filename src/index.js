import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './js/reducers/index';
import { HashRouter } from 'react-router-dom'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <HashRouter>
          <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);

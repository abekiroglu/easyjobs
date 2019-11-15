import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import './index.css';
import App from './App';
import saga from './sagas';
import root from './reducers';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(root, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(saga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {
  applyMiddleware,
  createStore,
} from 'redux';

import * as serviceWorker from './serviceWorker';

import appReducer from './reducers';
import authSaga from './sagas/auth.saga';
import companySaga from './sagas/company.saga';

import App from './App';

import './stylesheets/app.scss';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(appReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(authSaga);
sagaMiddleware.run(companySaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleWare from 'redux-saga';
import { reducer } from './redux/restaurantRedux.js';
import watcherSaga from './redux/saga.js';

//initialize the saga middleware
const sagaMiddleWare = createSagaMiddleWare('saga');

//store of redux
let store = createStore(reducer, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(watcherSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>

    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

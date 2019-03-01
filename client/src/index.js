import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import { reducer } from './reducers/reducer';
import {getFilmsList} from './action-creators/actions';
import promise from 'redux-promise-middleware';

const store = createStore(reducer, {
  list_loading : true
},
applyMiddleware(promise) );

const run = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
  , document.getElementById('root'));
}

store.dispatch(getFilmsList());

store.subscribe(run);

run();




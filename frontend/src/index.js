import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from 'containers/App';

import configureStore from './store';
import './index.scss';


ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);
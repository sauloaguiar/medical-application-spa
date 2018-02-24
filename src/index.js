import React from 'react';
import { render } from 'react-dom';
import './style/index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

const root = document.querySelector('#root');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
registerServiceWorker();

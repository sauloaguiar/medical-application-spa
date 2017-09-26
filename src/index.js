import React from 'react';
import { render } from 'react-dom';
import './style/index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import store, { history } from './store';
import registerServiceWorker from './registerServiceWorker';

const root = document.querySelector('#root');
render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <App />
      </div>
    </Router>
  </Provider>,
  root
);
registerServiceWorker();

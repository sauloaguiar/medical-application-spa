import React from 'react';
import { render } from 'react-dom';
import './style/index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const root = document.querySelector('#root');

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  root
);
registerServiceWorker();

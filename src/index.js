import ReactDOM from 'react-dom';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import { makeMainRoutes } from './routes';
import { Provider } from 'react-redux';
import store from './store';

const routes = makeMainRoutes();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>{routes}</MuiThemeProvider>
  </Provider>,
  document.querySelector('#root')
);

registerServiceWorker();

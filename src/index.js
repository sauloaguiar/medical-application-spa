import ReactDOM from 'react-dom';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';
import { Provider } from 'react-redux';
import store from './store';
import createHistory from 'history/createBrowserHistory';

// const routes = makeMainRoutes();

const history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Routes />
    </MuiThemeProvider>
  </Provider>,
  document.querySelector('#root')
);

registerServiceWorker();

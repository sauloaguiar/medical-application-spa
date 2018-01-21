import ReactDOM from 'react-dom';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import { makeMainRoutes } from './routes';
import { Provider } from 'react-redux';
import store from './store';
import Test from './components/test';
import Home from './components/home';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import App from './components/App';

const routes = makeMainRoutes();

const history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.querySelector('#root')
);

registerServiceWorker();

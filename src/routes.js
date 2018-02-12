// src/routes.js

import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import App from './components/App';
import Home from './components/home';
import Admin from './components/Admin';
import Callback from './components/Callback';
import Profile from './components/Profile';
import Patients from './containers/Patients';
import Schedule from './containers/Schedule';
import PrivateRoute from './components/PrivateRoute';

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <App />
          <Route path="/home" component={Home} />
          <Route path="/callback" component={Callback} />
          <PrivateRoute exact path="/patients" component={Patients} />
          <PrivateRoute exact path="/patients/:id" component={Schedule} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/admin" component={Admin} />
        </div>
      </BrowserRouter>
    );
  }
}

export default Routes;

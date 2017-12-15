import React from 'react';
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';
import Patients from '../containers/Patients';
import Schedule from '../containers/Schedule';

const login = () => <span>Login</span>;

const App = () => (
  <BrowserRouter>
    <div>
      <header>
        <Link to="/patients">Home</Link>
        <Link to="/logout">Logout</Link>
      </header>
      <main>
        <Switch>
          <Route exact path="/patients/:id" component={Schedule} />
          <Route exact path="/patients" component={Patients} />
          <Route path="/login" component={login} />
          <Redirect from="/" to="/patients/" />
        </Switch>
      </main>
    </div>
  </BrowserRouter>
);

export default App;

import React from 'react';
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';
import PatientList from './PatientList';

const login = () => <span>Login</span>;
const patient = props => {
  console.log(props);
  return <span>Patient</span>;
};

const App = () => (
  <BrowserRouter>
    <div>
      <header>
        <Link to="/patients">Home</Link>
        <Link to="/logout">Logout</Link>
      </header>
      <main>
        <Switch>
          <Route exact path="/patients/:id" component={patient} />
          <Route exact path="/patients" component={PatientList} />
          <Route path="/login" component={login} />
          <Redirect from="/" to="/patients/" />
        </Switch>
      </main>
    </div>
  </BrowserRouter>
);

export default App;

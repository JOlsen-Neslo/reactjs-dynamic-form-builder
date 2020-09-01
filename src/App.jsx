import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import LoginContainer from './containers/auth/login/Login.container';
import RegistrationContainer from './containers/auth/registration/Registration.container';
import PasswordContainer from './containers/auth/password/Password.container';

import AdminContainer from './containers/admin/Admin.container';
// prefix admin container component names with 'Admin'
import AdminHomeContainer from './containers/admin/home/Home.container';
import AdminOperationalProfileContainer from './containers/admin/operationalProfile/OperationalProfile.container';

const App = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route exact path="/" component={LoginContainer} />
      <Route exact path="/register" component={RegistrationContainer} />
      <Route path="/password/:context" component={PasswordContainer} />

      <Route path="/admin">
        <AdminContainer>
          <Route exact name="home" path="/admin/home" component={AdminHomeContainer} />
          <Route
            exact
            name="operationalProfile"
            path="/admin/operational-profile"
            component={AdminOperationalProfileContainer}
          />
        </AdminContainer>
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;

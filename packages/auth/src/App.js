import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

import Signin from './components/Signin';
import Signup from './components/Signup';

const generateClassName = createGenerateClassName({
  productionPrefix: 'au',
});

export default ({ onSignIn, history }) => (
  <div>
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <Switch>
          <Route path="/auth/signin">
            <Route onSignIn={onSignIn} />
          </Route>
          <Route path="/auth/signup">
            <Route onSignIn={onSignIn} />
          </Route>
        </Switch>
      </Router>
    </StylesProvider>
  </div>
);

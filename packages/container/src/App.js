import React, { lazy, Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Router,
  Redirect,
} from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

// import MarketingApp from '../components/MarketingApp';
// import AuthApp from '../components/AuthApp';
import Header from './components/Header';
import Progress from './components/Progress';

const AuthLazyApp = lazy(() => import('./components/AuthApp'));
const MarketingLazyApp = lazy(() => import('./components/MarketingApp'));
const DashboardLazyApp = lazy(() => import('./components/DashboardApp'));

const createClassName = createGenerateClassName({
  productionPrefix: 'co',
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={createClassName}>
        <div>
          <Header
            onSignOut={() => setIsSignedIn(false)}
            isSignedIn={isSignedIn}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path='auth'>
                <AuthLazyApp onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path='/dashboard'>
                {!isSignedIn && <Redirect />}
                <DashboardLazyApp />
              </Route>
              <Route path='/' component={MarketingLazyApp} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};

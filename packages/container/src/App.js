import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
// import MarketingApp from '../components/MarketingApp';
// import AuthApp from '../components/AuthApp';
import Header from './components/Header';
import Progress from './components/Progress';

const AuthLazyApp = lazy(() => import('./components/AuthApp'));
const MarketingLazyApp = lazy(() => import('./components/MarketingApp'));

const createClassName = createGenerateClassName({
  productionPrefix: 'co',
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <BrowserRouter>
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
              <Route path='/' component={MarketingLazyApp} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};

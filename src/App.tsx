/** @jsxImportSource @emotion/react */

import React, { useEffect, useReducer } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import Success from 'components/Success';
import Home from 'components/Home';
import Plans from 'components/Plans';
import PaymentFlow from 'components/PaymentFlow';
import Navigation from 'components/Navigation';
import AppContext from 'context/appContext';
import { initialState, appReducer, actions } from 'store';
import * as styles from './App.styles';

function ScrollToTop({ history }: RouteComponentProps) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return null;
}

const WithRouterScroll = withRouter(ScrollToTop);

function App() {
  const [appState, dispatch] = useReducer<any>(appReducer, initialState);

  return (
    <AppContext.Provider
      value={{
        actions: actions(dispatch),
        appState,
      }}
    >
      <ChakraProvider>
        <Router>
          <Navigation />
          <main css={styles.main}>
            <WithRouterScroll />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/plans">
                <Plans />
              </Route>
              <Route path="/payment-process">
                <PaymentFlow />
              </Route>
              <Route path="/success">
                <Success />
              </Route>
            </Switch>
          </main>
        </Router>
      </ChakraProvider>
    </AppContext.Provider>
  );
}

export default App;

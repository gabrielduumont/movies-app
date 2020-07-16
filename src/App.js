import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider as StoreProvider } from 'react-redux';
import { default as reduxStore } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import {
  MoviesList,
  MovieDetails
} from './views';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import "@mdi/font/css/materialdesignicons.css";
import './assets/css/general.css';

const { store, persistor } = reduxStore();

export default function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router >
          <Switch>
            <Route exact path="/">
              <MoviesList />
            </Route>
            <Route exact path="/details" >
              <MovieDetails />
            </Route>
          </Switch>
        </Router>
      </PersistGate>
    </StoreProvider>
  );
}
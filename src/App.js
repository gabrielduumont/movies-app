import React from 'react';

import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import {
  MoviesList,
  MovieDetails
} from './views';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/general.css';


const hist = createBrowserHistory();

export default function App() {
  return (
    <Router history={hist}>
      <Switch>
        <Route exact path="/"><MoviesList /></Route>
        <Route exact path="/details"><MovieDetails /></Route>
      </Switch>
    </Router>
  );
}
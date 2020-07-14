import React from 'react';

import { Route } from "react-router-dom";

import {
  MoviesList,
  MovieDetails
} from './views';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import "@mdi/font/css/materialdesignicons.css";
import './assets/css/general.css';

export default function App() {
  return (
    <>
      <Route exact path="/">
        <MoviesList />
      </Route>
      <Route exact path="/details" >
        <MovieDetails />
      </Route>
    </>
  );
}
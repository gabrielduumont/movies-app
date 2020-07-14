import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider as StoreProvider } from 'react-redux';
import { default as reduxStore } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = reduxStore();

ReactDOM.render(

  <StoreProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router >
        <Switch>
          <App />
        </Switch>
      </Router>
    </PersistGate>
  </StoreProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

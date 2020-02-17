import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from './utilities/configureStore'
import configureFontLibrary from './utilities/configureFontLibrary'

import "../node_modules/patternfly/dist/css/patternfly.css";
import "../node_modules/patternfly/dist/css/patternfly-additions.css";
import "../node_modules/patternfly-react/dist/css/patternfly-react.css";
import "../node_modules/patternfly-react-extensions/dist/css/patternfly-react-extensions.css";
import "./index.scss";

import App from './App';
import * as serviceWorker from './serviceWorker';

const store = configureStore();
configureFontLibrary();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>
  , document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <App/>
        </Router>
      </Provider>,
      document.getElementById('root'),
    );
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

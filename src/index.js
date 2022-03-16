import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/oauth2/callback" component={App} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
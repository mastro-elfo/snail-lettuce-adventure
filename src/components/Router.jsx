import React from "react";

import {
  // See https://reacttraining.com/react-router/web/guides/quick-start for details
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Dashboard from "./dashboard/Router";

const ROUTES = [
  // {path: '', component: RouterComponent, [exact]}
  { path: "/dashboard", component: Dashboard, exact: true }
];

export default function(props) {
  return (
    <Router basename="/snail-lettuce-adventure">
      <Switch>
        {ROUTES.map((route, i) => (
          <Route key={i} {...route} />
        ))}
        <Redirect to="/dashboard" />
      </Switch>
    </Router>
  );
}

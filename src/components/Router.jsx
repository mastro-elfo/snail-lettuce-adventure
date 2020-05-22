import React from "react";

import {
  // See https://reacttraining.com/react-router/web/guides/quick-start for details
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Dashboard from "./dashboard/Router";
import Help from "./help/Router";
import Settings from "./settings/Router";

const ROUTES = [
  // {path: '', component: RouterComponent, [exact]}
  { path: "/dashboard", component: Dashboard },
  { path: "/help", component: Help },
  { path: "/settings", component: Settings }
];

export default function(props) {
  return (
    <Router>
      <Switch>
        {ROUTES.map((route, i) => (
          <Route key={i} {...route} />
        ))}
        <Redirect to="/dashboard" />
      </Switch>
    </Router>
  );
}

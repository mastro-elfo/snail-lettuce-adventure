import React from "react";

import { Route, Switch } from "react-router-dom";

import View from "./View";

export default function HelpRouter() {
  return (
    <Switch>
      <Route path="/help" component={View} />
    </Switch>
  );
}

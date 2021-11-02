import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { Login } from "../login/Login";
import { Dashboard } from "../dashboard/Dashboard";
import { Transfer } from "../transfer/Transfer";
import { ProtectedRoute } from "./ProtuctedRoute";

const App: React.FC = () => {
  return (
    <div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <ProtectedRoute path="/transfer">
          <Transfer />
        </ProtectedRoute>
        <ProtectedRoute path="/">
          <Dashboard />
        </ProtectedRoute>
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
};

export { App };

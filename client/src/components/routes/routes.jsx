import React from "react";
import { Switch, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard";
import ResetPassword from "../pages/resetPassword";
import ResetPasswordNew from "../pages/resetPasswordNew";
import UserSettings from "../pages/userSettings/index";
import NotFound from "../pages/notFound";

export default function Routes() {
  return (
    <Switch>
      <ProtectedRoute exact path="/" component={Dashboard} />
      <ProtectedRoute path="/settings" component={UserSettings} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/reset-password/:id/:token" component={ResetPasswordNew} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route component={NotFound} />
    </Switch>
  );
}

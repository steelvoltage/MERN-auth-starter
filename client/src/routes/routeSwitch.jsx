import React from "react";
import { Switch, Route } from "react-router-dom";

import ProtectedRoute from "./protectedRoute";

import {
  Login,
  Register,
  Dashboard,
  ResetPassword,
  ResetPasswordNew,
  UserSettings,
  VerifyEmail,
  SendVerifyEmail,
  NotFound
} from "../pages";

export default function RouteSwitch() {
  return (
    <Switch>
      <ProtectedRoute exact path="/" component={Dashboard} />
      <ProtectedRoute path="/settings" component={UserSettings} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/reset-password/:id/:token" component={ResetPasswordNew} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/verify/:id/:token" component={VerifyEmail} />
      <Route path="/verify" component={SendVerifyEmail} />
      <Route component={NotFound} />
    </Switch>
  );
}

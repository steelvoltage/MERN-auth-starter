import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { isAuthenticated, user } = useContext(AuthContext);
  const authCheck = props => {
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }

    if (isAuthenticated && !user.emailVerified) {
      return <Redirect to="/verify" />;
    }

    return <Component {...props} />;
  };
  return <Route {...rest} render={props => authCheck(props)} />;
}

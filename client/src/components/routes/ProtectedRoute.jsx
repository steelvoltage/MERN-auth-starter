import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

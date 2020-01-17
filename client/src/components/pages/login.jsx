import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function Login({ history }) {
  const { login, isAuthenticated } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);

  const handleSubmit = async e => {
    e.preventDefault();
    const loginResult = await login(email, password);
    if (!loginResult || loginResult.error) {
      return setLoginError(loginResult.error);
    }
    return history.push("/");
  };

  return (
    <div>
      <h1>Login</h1>
      {loginError ? <p style={{ color: "red" }}>{loginError}</p> : null}
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        <Link to="/register">Create a new account.</Link>
      </p>
      <p>
        <Link to="/reset-password">Forgot your password?</Link>
      </p>
    </div>
  );
}

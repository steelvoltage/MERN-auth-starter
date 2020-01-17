import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import MessageContext from "../../context/MessageContext";

export default function Login({ history }) {
  const { register, isAuthenticated } = useContext(AuthContext);
  const { showMessage } = useContext(MessageContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [registerError, setRegisterError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);

  const handleSubmit = async e => {
    e.preventDefault();
    const registerResult = await register(name, email, password, passwordTwo);
    if (!registerResult || registerResult.error) {
      return setRegisterError(registerResult.error);
    }
    showMessage(registerResult);
    return history.push("/");
  };

  return (
    <div>
      <h1>Register</h1>
      {registerError ? <p style={{ color: "red" }}>{registerError}</p> : null}
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
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
        <div>
          <label htmlFor="passwordTwo">Confirm Password</label>
          <input
            type="password"
            name="passwordTwo"
            value={passwordTwo}
            onChange={e => setPasswordTwo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? Please <Link to="/login">Login</Link>.
      </p>
    </div>
  );
}

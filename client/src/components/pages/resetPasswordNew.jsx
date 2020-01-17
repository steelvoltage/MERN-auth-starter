import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import MessageContext from "../../context/MessageContext";

export default function ResetPassword({ history }) {
  const { resetPasswordNew, isAuthenticated } = useContext(AuthContext);
  const { showMessage } = useContext(MessageContext);

  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [resetError, setResetError] = useState("");

  const { id, token } = useParams();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);

  const handleSubmit = async e => {
    e.preventDefault();
    const resetResult = await resetPasswordNew(
      id,
      token,
      password,
      passwordTwo
    );
    if (!resetResult || resetResult.error) {
      return setResetError(resetResult.error);
    }
    showMessage(resetResult);
    return history.push("/login");
  };

  return (
    <div>
      <h1>Create New Password</h1>
      {resetError ? <p style={{ color: "red" }}>{resetError}</p> : null}
      <form onSubmit={e => handleSubmit(e)}>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

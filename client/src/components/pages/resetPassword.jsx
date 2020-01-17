import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import MessageContext from "../../context/MessageContext";

export default function ResetPassword({ history }) {
  const { resetPassword, isAuthenticated } = useContext(AuthContext);
  const { showMessage } = useContext(MessageContext);

  const [email, setEmail] = useState("");
  const [resetError, setResetError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const resetResult = await resetPassword(email);
    if (!resetResult || resetResult.error) {
      setIsLoading(false);
      return setResetError(resetResult.error);
    }
    showMessage(resetResult);
    setIsLoading(false);
    return history.push("/login");
  };

  return (
    <div>
      <h1>Reset Password</h1>
      {resetError ? <p style={{ color: "red" }}>{resetError}</p> : null}
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
        <button type="submit">{isLoading ? "Loading..." : "Submit"}</button>
      </form>
    </div>
  );
}

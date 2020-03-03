import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import MessageContext from "../context/MessageContext";

export default function SendVerifyEmail() {
  const { user, isAuthenticated, sendVerifyEmail } = useContext(AuthContext);
  const { showMessage } = useContext(MessageContext);
  const { push } = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      return push("/login");
    }
  }, [isAuthenticated, push]);

  const handleSendVerifyEmail = async () => {
    const verifyResult = await sendVerifyEmail();
    showMessage(verifyResult);
    return push("/");
  };

  return isAuthenticated ? (
    <>
      <h1>Verify Email</h1>
      <p>
        We previously sent a verification email to {user.email}. Please check
        your inbox or spam folders and use the link to complete the
        verification. If you do not see the email, please click resend below.
      </p>
      <p>
        <button onClick={handleSendVerifyEmail}>Resend</button>
      </p>
    </>
  ) : null;
}

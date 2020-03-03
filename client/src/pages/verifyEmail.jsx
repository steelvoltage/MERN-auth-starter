import React, { useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import MessageContext from "../context/MessageContext";

export default function VerifyEmail() {
  const { id, token } = useParams();
  const { push } = useHistory();

  const { verifyEmail, loadUser } = useContext(AuthContext);
  const { showMessage } = useContext(MessageContext);

  const handleVerifyEmail = async () => {
    const verifyResult = await verifyEmail(id, token);
    await loadUser();
    showMessage(verifyResult);
    return push("/");
  };

  useEffect(() => {
    handleVerifyEmail();
    // eslint-disable-next-line
  }, []);

  return <p>Verifying Email...</p>;
}

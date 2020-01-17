import React, { useContext, useState } from "react";
import AuthContext from "../../../../context/AuthContext";
import MessageContext from "../../../../context/MessageContext";

export default function ChangeEmail() {
  const { user, changeEmail, logout } = useContext(AuthContext);
  const { showMessage } = useContext(MessageContext);

  const [newEmail, setNewEmail] = useState(user.email);
  const [changeError, setChangeError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const changeResult = await changeEmail(newEmail);
    if (!changeResult || changeResult.error) {
      return setChangeError(changeResult.error);
    }
    showMessage(changeResult);
    logout();
  };
  return (
    <>
      <h3>Change Email</h3>
      <form onSubmit={e => handleSubmit(e)}>
        {changeError ? <p style={{ color: "red" }}>{changeError}</p> : null}
        <div>
          <label htmlFor="newEmail">New Email</label>
          <input
            type="email"
            name="newEmail"
            value={newEmail}
            onChange={e => setNewEmail(e.target.value)}
            required
          />
          <button type="submit">Change</button>
        </div>
      </form>
    </>
  );
}

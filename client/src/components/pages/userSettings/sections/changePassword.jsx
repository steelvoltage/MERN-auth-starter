import React, { useContext, useState } from "react";
import AuthContext from "../../../../context/AuthContext";
import MessageContext from "../../../../context/MessageContext";

export default function ChangePassword() {
  const { changePassword, logout } = useContext(AuthContext);
  const { showMessage } = useContext(MessageContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordTwo, setNewPasswordTwo] = useState("");
  const [changeError, setChangeError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const changeResult = await changePassword(
      currentPassword,
      newPassword,
      newPasswordTwo
    );
    if (!changeResult || changeResult.error) {
      return setChangeError(changeResult.error);
    }
    showMessage(changeResult);
    logout();
  };
  return (
    <>
      <h3>Change Password</h3>
      <form onSubmit={e => handleSubmit(e)}>
        {changeError ? <p style={{ color: "red" }}>{changeError}</p> : null}
        <div>
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newPasswordTwo">Confirm New Password</label>
          <input
            type="password"
            name="newPasswordTwo"
            value={newPasswordTwo}
            onChange={e => setNewPasswordTwo(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Change</button>
        </div>
      </form>
    </>
  );
}

import React, { useContext, useState } from "react";
import AuthContext from "../../../../context/AuthContext";
import MessageContext from "../../../../context/MessageContext";

export default function ChangeName() {
  const { user, changeName } = useContext(AuthContext);
  const { showMessage } = useContext(MessageContext);

  const [newName, setNewName] = useState(user.name);
  const [changeError, setChangeError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const changeResult = await changeName(newName);
    if (!changeResult || changeResult.error) {
      return setChangeError(changeResult.error);
    }
    showMessage(changeResult);
  };
  return (
    <>
      <h3>Change Name</h3>
      <form onSubmit={e => handleSubmit(e)}>
        {changeError ? <p style={{ color: "red" }}>{changeError}</p> : null}
        <div>
          <label htmlFor="newName">New Name</label>
          <input
            type="text"
            name="newName"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            required
          />
          <button type="submit">Change</button>
        </div>
      </form>
    </>
  );
}

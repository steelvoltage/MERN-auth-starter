import React, { useContext } from "react";
import MessageContext from "../../context/MessageContext";

export default function Message() {
  const { message } = useContext(MessageContext);
  return (
    <div>
      {message ? (
        <div>
          {message.success ? (
            <p style={{ color: "green" }}>{message.success}</p>
          ) : (
            <p style={{ color: "red" }}>{message.error}</p>
          )}
        </div>
      ) : null}
    </div>
  );
}

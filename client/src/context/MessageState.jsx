import React, { useState } from "react";
import MessageContext from "./MessageContext";

export default function MessageState({ children }) {
  const [message, setMessage] = useState(null);

  const showMessage = (msg, timeout = 5000) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, timeout);
  };
  return (
    <MessageContext.Provider value={{ message, showMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AuthState from "./context/AuthState";
import MessageState from "./context/MessageState";

import Routes from "./components/routes/routes";
import Navbar from "./components/layout/navbar";
import Message from "./components/layout/message";

import setHeaderToken from "./helpers/setHeaderToken";

// SET THE AXIOS TOKEN HEADER FOR AUTHENTICATION

if (localStorage.authToken) {
  setHeaderToken(localStorage.authToken);
}

export default function App() {
  return (
    <AuthState>
      <MessageState>
        <Router>
          <Navbar />
          <Message />
          <Routes />
        </Router>
      </MessageState>
    </AuthState>
  );
}

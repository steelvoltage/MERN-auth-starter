import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AuthState from "./context/AuthState";
import MessageState from "./context/MessageState";
import RouteSwitch from "./routes/routeSwitch";
import { Navbar, Message } from "./components/layout";

import { setHeaderToken } from "./helpers";
import "./styles/global.css";

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
          <main style={{ margin: "1rem" }}>
            <Message />
            <RouteSwitch />
          </main>
        </Router>
      </MessageState>
    </AuthState>
  );
}

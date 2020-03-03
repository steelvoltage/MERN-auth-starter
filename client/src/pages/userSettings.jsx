import React from "react";

import {
  ChangeEmail,
  ChangeName,
  ChangePassword
} from "../components/sections/userSettings";

export default function UserSettings() {
  return (
    <div>
      <h1>User Settings</h1>
      <ChangeName />
      <div style={{ margin: "1rem 0" }} />
      <ChangeEmail />
      <div style={{ margin: "1rem 0" }} />
      <ChangePassword />
    </div>
  );
}

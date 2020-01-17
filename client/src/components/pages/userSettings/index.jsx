import React from "react";

import ChangeName from "./sections/changeName";
import ChangeEmail from "./sections/changeEmail";
import ChangePassword from "./sections/changePassword";

export default function UserSettings() {
  return (
    <div>
      <h1>User Settings</h1>
      <ChangeName />
      <hr />
      <ChangeEmail />
      <hr />
      <ChangePassword />
    </div>
  );
}

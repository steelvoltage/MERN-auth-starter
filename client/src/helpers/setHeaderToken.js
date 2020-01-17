import axios from "axios";

export default function setHeaderToken(token) {
  if (token) {
    return (axios.defaults.headers.common["x-auth-token"] = token);
  } else {
    return delete axios.defaults.headers.common["x-auth-token"];
  }
}

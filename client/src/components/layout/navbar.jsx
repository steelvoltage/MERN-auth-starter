import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, loadUser, loading, logout } = useContext(
    AuthContext
  );

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    logout();
  };

  const guestLinks = (
    <>
      <Link to="/register" style={{ display: "block" }}>
        Register
      </Link>
      <Link to="/login" style={{ display: "block" }}>
        Login
      </Link>
    </>
  );

  const userLinks = (
    <>
      <Link to="/settings" style={{ display: "block" }}>
        Settings
      </Link>
      <a href="#!" onClick={handleLogout} style={{ display: "block" }}>
        Logout
      </a>
    </>
  );

  return (
    <>
      <div style={{ textAlign: "right", margin: "1rem" }}>
        <Link to="/" style={{ display: "block" }}>
          Home
        </Link>
        {!loading && <>{isAuthenticated ? userLinks : guestLinks}</>}
      </div>
      <hr />
    </>
  );
}

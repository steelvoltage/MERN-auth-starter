import React, { useState } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import setHeaderToken from "../helpers/setHeaderToken";

export default function AuthState({ children }) {
  const initialState = {
    authToken: localStorage.getItem("authToken"),
    isAuthenticated: null,
    loading: true,
    user: null
  };

  const [authState, setAuthState] = useState(initialState);

  const requestHeaders = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthState({
      authToken: null,
      isAuthenticated: null,
      loading: false,
      user: null
    });
  };

  const login = async (email, password) => {
    const body = JSON.stringify({
      email,
      password
    });
    try {
      const res = await axios.post("/api/auth/", body, requestHeaders);
      const { authToken } = res.data;
      localStorage.setItem("authToken", authToken);
      await loadUser();
      return { message: res.message };
    } catch (err) {
      return { error: err.response.data.error };
    }
  };

  const register = async (name, email, password, passwordTwo) => {
    const body = JSON.stringify({ name, email, password, passwordTwo });
    try {
      const res = await axios.post("/api/user/new", body, requestHeaders);
      return res.data;
    } catch (err) {
      console.error(err);
      return { error: err.response.data.error };
    }
  };

  const loadUser = async () => {
    if (localStorage.authToken) {
      setHeaderToken(localStorage.authToken);
    }

    try {
      const res = await axios.get("/api/auth");
      setAuthState({
        ...authState,
        isAuthenticated: true,
        loading: false,
        user: res.data
      });
    } catch (err) {
      logout();
      setAuthState({ ...authState, loading: false });
    }
  };

  const resetPassword = async email => {
    const body = JSON.stringify({ email });
    try {
      const res = await axios.patch(
        "/api/user/reset-password",
        body,
        requestHeaders
      );
      return res.data;
    } catch (err) {
      console.error(err);
      return { error: err.response.data.error };
    }
  };

  const resetPasswordNew = async (id, token, password, passwordTwo) => {
    const body = JSON.stringify({ id, token, password, passwordTwo });
    try {
      const res = await axios.patch(
        "/api/user/reset-password/new",
        body,
        requestHeaders
      );
      return res.data;
    } catch (err) {
      console.error(err);
      return { error: err.response.data.error };
    }
  };

  const changeName = async name => {
    const body = JSON.stringify({ name });
    try {
      const res = await axios.patch(
        "/api/user/change/name",
        body,
        requestHeaders
      );
      return res.data;
    } catch (err) {
      console.error(err);
      return { error: err.response.data.error };
    }
  };

  const changeEmail = async email => {
    const body = JSON.stringify({ email });
    try {
      const res = await axios.patch(
        "/api/user/change/email",
        body,
        requestHeaders
      );
      return res.data;
    } catch (err) {
      console.error(err);
      return { error: err.response.data.error };
    }
  };

  const changePassword = async (
    currentPassword,
    newPassword,
    newPasswordTwo
  ) => {
    const body = JSON.stringify({
      currentPassword,
      newPassword,
      newPasswordTwo
    });
    try {
      const res = await axios.patch(
        "/api/user/change/password",
        body,
        requestHeaders
      );
      return res.data;
    } catch (err) {
      console.error(err);
      return { error: err.response.data.error };
    }
  };

  const sendVerifyEmail = async () => {
    try {
      const res = await axios.get("/api/user/verify-email");
      return res.data;
    } catch (err) {
      console.error(err);
      return { error: err.response.data.error };
    }
  };

  const verifyEmail = async (id, token) => {
    const body = JSON.stringify({
      id,
      token
    });
    try {
      const res = await axios.patch(
        "/api/user/verify-email",
        body,
        requestHeaders
      );
      return res.data;
    } catch (err) {
      console.error(err);
      return { error: err.response.data.error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        logout,
        login,
        register,
        loadUser,
        resetPassword,
        resetPasswordNew,
        changeName,
        changeEmail,
        changePassword,
        verifyEmail,
        sendVerifyEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

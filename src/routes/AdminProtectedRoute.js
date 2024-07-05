import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { MessageBox } from "../components";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth, selectAuth } from "../features/authSlice";

export default function AdminProtectedRoute({ children }) {
  // const { user } = useSelector(selectAuth);

  const accessToken = localStorage.getItem("accessToken");
  const user = localStorage.getItem("user");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const checkToken = async () => {
      // if (jwt_decode(accessToken)?.exp < Date.now() / 1000) {
      //   dispatch(clearAuth());
      //   navigate("/");
      // }
    };

    checkToken();
  }, [accessToken]);

  return user ? children : <Navigate to="/" />;
}

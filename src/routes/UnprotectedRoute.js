import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";

export default function UnprotectedRoute({ children }) {
  // const { user } = useSelector(selectAuth);
  const user = localStorage.getItem("user");

  return user ? <Navigate to="/user/dashboard" /> : children;
}

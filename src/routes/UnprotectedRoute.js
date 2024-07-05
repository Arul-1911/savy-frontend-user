import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";

export default function UnprotectedRoute({ children }) {
  const { user } = useSelector(selectAuth);

  return user && user?.role === "admin" ? (
    <Navigate to="/user/dashboard" />
  ) : (
    children
  );
}

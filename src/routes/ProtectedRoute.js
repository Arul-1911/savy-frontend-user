import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }) {
 
  const { userInfo } = useSelector((state)=>state.user);
  return userInfo ? children : <Navigate to="/" />;
}
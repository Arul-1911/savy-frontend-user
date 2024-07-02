
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    accessToken: localStorage.getItem("accessToken") ? JSON.parse(localStorage.getItem("accessToken")) : null,
    
  };

const authSlice = createSlice({
  name: 'auth',
   initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", JSON.stringify(action.payload));
    },
      
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.clear();
    },
  },
});

export const { setUser, setAccessToken, clearAuth } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;

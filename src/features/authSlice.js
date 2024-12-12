import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    accessToken: JSON.parse(localStorage.getItem("accessToken")) || null,
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        console.error("setUser called with undefined payload");
      }
    },
    setAccessToken: (state, action) => {
      if (action.payload) {
        state.accessToken = action.payload;
        localStorage.setItem("accessToken", JSON.stringify(action.payload));
      } else {
        console.error("setAccessToken called with undefined payload");
      }
    },
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setUser, setAccessToken, clearAuth } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;

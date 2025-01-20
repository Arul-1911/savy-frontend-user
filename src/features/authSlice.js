import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    accessToken: JSON.parse(localStorage.getItem("accessToken")) || null,
    selectAccountId:null
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
    setSelectAccountId: (state,action) => {
      state.selectAccountId = action.payload
    },
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.selectAccountId = null
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setUser, setAccessToken, clearAuth, setSelectAccountId } = authSlice.actions;
export const selectAccountId = (state) => state.auth.selectAccountId;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;

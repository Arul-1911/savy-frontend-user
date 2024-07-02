import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  domain: localStorage.getItem("domain")
    ? JSON.parse(localStorage.getItem("domain"))
    : null,
  subdomain: localStorage.getItem("subdomain")
    ? JSON.parse(localStorage.getItem("subdomain"))
    : null,
  topic: localStorage.getItem("topic")
    ? JSON.parse(localStorage.getItem("topic"))
    : null,
  subtopic: localStorage.getItem("subtopic")
    ? JSON.parse(localStorage.getItem("subtopic"))
    : null,
};

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    setDomain: (state, action) => {
      state.domain = action.payload;
      localStorage.setItem("domain", JSON.stringify(action.payload));
    },
    setSubdomain: (state, action) => {
      state.subdomain = action.payload;
      localStorage.setItem("subdomain", JSON.stringify(action.payload));
    },
    setTopic: (state, action) => {
      state.topic = action.payload;
      localStorage.setItem("topic", JSON.stringify(action.payload));
    },
    setSubtopic: (state, action) => {
      state.subtopic = action.payload;
      localStorage.setItem("subtopic", JSON.stringify(action.payload));
    },

    // clearAuth: (state) => {
    //   state.user = null;
    //   state.accessToken = null;
    //   localStorage.clear();
    // },
  },
});

export const { setDomain, setSubdomain, setTopic, setSubtopic } =
  optionsSlice.actions;
export const selectOptions = (state) => state.options;
export default optionsSlice.reducer;

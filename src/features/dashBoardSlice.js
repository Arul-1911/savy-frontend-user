import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  disabled: [],
};

const dashboardSlice = createSlice({
  name: "dashboardDisabled",
  initialState,
  reducers: {
    setDisabled: (state, action) => {
      state.disabled = [...action.payload];
    },
  },
});

export const { setDisabled } = dashboardSlice.actions;
export default dashboardSlice.reducer;

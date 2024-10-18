import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  period: "Past months",
};

const periodSlice = createSlice({
  name: "period",
  initialState,
  reducers: {
    setPeriod: (state, action) => {
      state.period = action.payload;
    },
  },
});

export const { setPeriod } = periodSlice.actions;
// export const selectPeriod = (state) => state.period;
export default periodSlice.reducer;

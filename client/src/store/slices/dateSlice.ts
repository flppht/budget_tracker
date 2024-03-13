import { createSlice } from "@reduxjs/toolkit";

const dateSlice = createSlice({
  name: "date",
  initialState: {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  },
  reducers: {
    setDate(state, action) {
      state.month = action.payload.month;
      state.year = action.payload.year;
    },
  },
});

export const { setDate } = dateSlice.actions;
export const dateReducer = dateSlice.reducer;

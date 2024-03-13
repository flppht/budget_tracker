import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "accessToken",
  initialState: { token: localStorage.getItem("accessToken") },
  reducers: {
    setAccessToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    removeAccessToken(state) {
      state.token = "";
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setAccessToken, removeAccessToken } = tokenSlice.actions;
export const tokenReducer = tokenSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: "",
    id: 0,
    status: false,
  },
  reducers: {
    login(state, action) {
      state.username = action.payload.username;
      state.id = action.payload.id;
      state.status = true;
    },
    logout(state) {
      state.username = "";
      state.id = 0;
      state.status = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

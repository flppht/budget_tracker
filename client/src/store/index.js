import { configureStore } from "@reduxjs/toolkit";
import { authReducer, login, logout } from "./slices/authSlice";
import {
  tokenReducer,
  setAccessToken,
  removeAccessToken,
} from "./slices/tokenSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    accessToken: tokenReducer,
  },
});

export { login, logout, setAccessToken, removeAccessToken };
export { store };

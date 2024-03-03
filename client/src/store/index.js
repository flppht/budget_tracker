import { configureStore } from "@reduxjs/toolkit";
import { authReducer, login, logout } from "./slices/authSlice";
import {
  tokenReducer,
  setAccessToken,
  removeAccessToken,
} from "./slices/tokenSlice";
import {
  themeReducer,
  lightTheme,
  darkTheme,
  onRefresh,
  removeTheme,
} from "./slices/themeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    accessToken: tokenReducer,
    theme: themeReducer,
  },
});

export {
  login,
  logout,
  setAccessToken,
  removeAccessToken,
  lightTheme,
  darkTheme,
  onRefresh,
  removeTheme,
};
export { store };

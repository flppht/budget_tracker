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
import { dateReducer, setDate } from "./slices/dateSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    accessToken: tokenReducer,
    theme: themeReducer,
    date: dateReducer,
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
  setDate,
};
export { store };

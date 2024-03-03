import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: localStorage.getItem("theme"),
  },
  reducers: {
    lightTheme(state) {
      state.theme = "light";
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    },
    darkTheme(state) {
      state.theme = "dark";
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    },
    onRefresh(state) {
      state.theme = localStorage.getItem("theme");
      if (state.theme === "dark") {
        document.documentElement.classList.add("dark");
      }
    },
    removeTheme(state) {
      state.theme = "";
      localStorage.removeItem("theme", "light");
      document.documentElement.classList.remove("dark");
    },
  },
});

export const { lightTheme, darkTheme, onRefresh, removeTheme } =
  themeSlice.actions;
export const themeReducer = themeSlice.reducer;

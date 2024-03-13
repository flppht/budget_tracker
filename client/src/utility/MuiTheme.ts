import { createTheme } from "@mui/material";

export const darkMuiTheme = (theme) =>
  createTheme({
    ...theme,
    components: {
      MuiDateCalendar: {
        styleOverrides: {
          root: {
            backgroundColor: "#c7c9d1",
          },
        },
      },
      MuiPickersLayout: {
        styleOverrides: {
          root: {
            backgroundColor: "#c7c9d1",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 550,
            color: "black",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            paddingRight: "0px",
            fontWeight: 500,
            fontSize: "15px",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            paddingRight: "0px",
            fontFamily:
              "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
          },
          input: {
            padding: "7px 4px",
            textAlign: "center",
            cursor: "pointer",
          },
        },
      },
    },
  });

export const lightMuiTheme = (theme) =>
  createTheme({
    ...theme,
    components: {
      MuiDateCalendar: {
        styleOverrides: {
          root: {
            backgroundColor: "#fcfdff",
          },
        },
      },
      MuiPickersLayout: {
        styleOverrides: {
          root: {
            backgroundColor: "#fcfdff",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 550,
            color: "#454545",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            paddingRight: "0px",
            fontWeight: 500,
            fontSize: "15px",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            paddingRight: "0px",
            fontFamily:
              "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
          },
          input: {
            padding: "7px 4px",
            textAlign: "center",
            cursor: "pointer",
          },
        },
      },
    },
  });

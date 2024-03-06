import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { ThemeProvider } from "@mui/material";
import { lightMuiTheme, darkMuiTheme } from "../utility/MuiTheme";
import { useSelector } from "react-redux";

export default function DatePickerViews({ month, setMonth, year, setYear }) {
  const theme = useSelector((state) => state.theme.theme);
  const handleChange = (value) => {
    setMonth(dayjs(value.$d).month());
    setYear(dayjs(value.$d).year());
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightMuiTheme : darkMuiTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ width: "135px" }}
          views={["month", "year"]}
          defaultValue={dayjs(year + "-" + (parseInt(month, 10) + 1))}
          onAccept={handleChange}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

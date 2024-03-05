import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function DatePickerViews({ month, setMonth, year, setYear }) {
  const handleChange = (value) => {
    setMonth(dayjs(value.$d).month());
    setYear(dayjs(value.$d).year());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className="w-40 p-0"
        views={["month", "year"]}
        defaultValue={dayjs(year + "-" + (parseInt(month, 10) + 1))}
        onAccept={handleChange}
      />
    </LocalizationProvider>
  );
}

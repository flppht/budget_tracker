import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setDate } from "../store";

export default function DatePickerViews() {
  const date = useSelector((state: RootState) => state.date);
  const dispatch = useDispatch();

  const handleChange = (value) => {
    dispatch(
      setDate({ month: dayjs(value.$d).month(), year: dayjs(value.$d).year() })
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{ width: "135px" }}
        views={["month", "year"]}
        defaultValue={dayjs(date.year + "-" + (date.month + 1))}
        onAccept={handleChange}
      />
    </LocalizationProvider>
  );
}

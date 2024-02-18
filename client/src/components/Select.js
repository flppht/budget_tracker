import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectComponent({ month, setMonth, year, setYear }) {
  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  let listOfYears = [];
  for (let y = 2020; y <= new Date().getFullYear(); y++) {
    listOfYears.push(y);
  }

  return (
    <div className="flex flex-row">
      <div className="w-1/2">
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 65 }}
          size="small"
        >
          <InputLabel id="demo-simple-select-autowidth-label">Month</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={month}
            onChange={handleChangeMonth}
            label="Month"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={0}>Jan</MenuItem>
            <MenuItem value={1}>Feb</MenuItem>
            <MenuItem value={2}>Mar</MenuItem>
            <MenuItem value={3}>Apr</MenuItem>
            <MenuItem value={4}>May</MenuItem>
            <MenuItem value={5}>Jun</MenuItem>
            <MenuItem value={6}>Jul</MenuItem>
            <MenuItem value={7}>Aug</MenuItem>
            <MenuItem value={8}>Sep</MenuItem>
            <MenuItem value={9}>Oct</MenuItem>
            <MenuItem value={10}>Nov</MenuItem>
            <MenuItem value={11}>Dec</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="w-1/2">
        <FormControl
          variant="standard"
          className="w-1/2 text-red-500"
          sx={{ m: 1, minWidth: 65 }}
          size="small"
        >
          <InputLabel id="demo-simple-select-autowidth-label">Year</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={year}
            onChange={handleChangeYear}
            label="Year"
          >
            {listOfYears.map((y, key) => {
              return (
                <MenuItem value={y} key={key}>
                  {y}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

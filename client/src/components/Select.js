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
  for (
    let y = new Date().getFullYear() - 3;
    y <= new Date().getFullYear();
    y++
  ) {
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
            <MenuItem value="" sx={{ fontSize: 14 }}>
              <em>None</em>
            </MenuItem>
            <MenuItem value={0} sx={{ fontSize: 14 }}>
              Jan
            </MenuItem>
            <MenuItem value={1} sx={{ fontSize: 14 }}>
              Feb
            </MenuItem>
            <MenuItem value={2} sx={{ fontSize: 14 }}>
              Mar
            </MenuItem>
            <MenuItem value={3} sx={{ fontSize: 14 }}>
              Apr
            </MenuItem>
            <MenuItem value={4} sx={{ fontSize: 14 }}>
              May
            </MenuItem>
            <MenuItem value={5} sx={{ fontSize: 14 }}>
              Jun
            </MenuItem>
            <MenuItem value={6} sx={{ fontSize: 14 }}>
              Jul
            </MenuItem>
            <MenuItem value={7} sx={{ fontSize: 14 }}>
              Aug
            </MenuItem>
            <MenuItem value={8} sx={{ fontSize: 14 }}>
              Sep
            </MenuItem>
            <MenuItem value={9} sx={{ fontSize: 14 }}>
              Oct
            </MenuItem>
            <MenuItem value={10} sx={{ fontSize: 14 }}>
              Nov
            </MenuItem>
            <MenuItem value={11} sx={{ fontSize: 14 }}>
              Dec
            </MenuItem>
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
                <MenuItem value={y} key={key} sx={{ fontSize: 14 }}>
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

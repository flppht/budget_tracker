import React, { useState, useEffect } from "react";
import dateExtractor from "../utility/DateExtractor";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import sortData from "../utility/SortData";
import calculateTotalAmount from "../utility/CalculateTotalAmount";
import DatePicker from "./DatePicker";
import { useSelector } from "react-redux";

const Income = () => {
  const [listOfIncome, setListOfIncome] = useState([]);
  const [sort, setSort] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.accessToken.token);

  useEffect(() => {
    const properties = {
      month,
      year,
    };

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/income`, {
        headers: { accessToken },
        params: properties,
      })
      .then((response) => {
        setListOfIncome(
          response.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      });
  }, [month, year]);

  return (
    <div>
      <div className="flex flex-col items-center mt-2">
        <div className="mb-4">
          <DatePicker
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
          />
        </div>
        <div className="grid grid-cols-3 w-72">
          <label className="text-lg mb-2 font-semibold justify-self-start col-span-2">
            Income: {calculateTotalAmount(listOfIncome)} KM
          </label>
          <div className="justify-self-end font-bold">
            <ImportExportIcon
              onClick={() =>
                setListOfIncome(sortData(listOfIncome, sort, setSort))
              }
              className="mr-1 text-cyan-600/80 cursor-pointer dark:text-slate-800"
            />
            <Link to="/createincome">
              <AddCircleOutlineIcon className="rounded-full text-cyan-600/80 dark:text-slate-800" />
            </Link>
          </div>
        </div>
        <div className="container flex flex-col overflow-auto">
          {listOfIncome.map((income, key) => {
            return (
              <div className="itemContainer shadow-md" key={key}>
                <div
                  className="item flex justify-center"
                  onClick={() => navigate(`/income/${income.id}`)}
                >
                  <div className="titleContainer w-3/5">
                    <div className="itemDate text-sm font-normal text-gray-500">
                      {dateExtractor(new Date(income.createdAt))}
                    </div>
                    <div className="font-mono mt-1 font-semibold">
                      {income.title}
                    </div>
                    <div className="itemLocation text-sm font-normal text-gray-500 italic">
                      {income.location}
                    </div>
                  </div>
                  <div className="itemValue w-2/5 font-semibold align-bottom text-green-700">
                    +{income.value} KM
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Income;

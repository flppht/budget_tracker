import React, { useState, useEffect } from "react";
import dateExtractor from "../utility/DateExtractor";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import sortData from "../utility/SortData";
import calculateTotalAmount from "../utility/CalculateTotalAmount";
import Select from "./Select";

const Expense = () => {
  const [listOfExpenses, setListOfExpenses] = useState([]);
  const [sort, setSort] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();

  useEffect(() => {
    const properties = {
      month,
      year,
    };

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/expenses`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
        params: properties,
      })
      .then((response) => {
        setListOfExpenses(
          response.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      });
  }, [month, year]);

  return (
    <div>
      <div className="flex flex-col items-center mt-2">
        <div className=" mb-4">
          <Select
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
          />
        </div>
        <div className="grid grid-cols-3 w-72">
          <label className="text-lg mb-2 font-semibold justify-self-start col-span-2">
            Expenses: {calculateTotalAmount(listOfExpenses)} KM
          </label>
          <div className="justify-self-end font-bold">
            <ImportExportIcon
              onClick={() =>
                setListOfExpenses(sortData(listOfExpenses, sort, setSort))
              }
              className="mr-1 text-cyan-600/80 cursor-pointer"
            />
            <Link to="/createexpense">
              <AddCircleOutlineIcon className="rounded-full text-cyan-600/80" />
            </Link>
          </div>
        </div>
        <div className="container flex flex-col overflow-auto">
          {listOfExpenses.map((expense, key) => {
            return (
              <div className="expenseContainer shadow-md" key={key}>
                <div
                  className="expense flex justify-center"
                  onClick={() => navigate(`/expenses/${expense.id}`)}
                >
                  <div className="titleContainer w-3/5">
                    <div className="expenseDate text-sm font-normal text-gray-500">
                      {dateExtractor(new Date(expense.createdAt))}
                    </div>
                    <div className="font-mono mt-1 font-semibold">
                      {expense.expenseTitle}
                    </div>
                    <div className="expenseLocation text-sm font-normal text-gray-500 italic">
                      {expense.expenseLocation}
                    </div>
                  </div>
                  <div className="expenseValue w-2/5 font-semibold align-bottom text-red-700">
                    -{expense.expenseValue} KM
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

export default Expense;

import React, { useState } from "react";
import dateExtractor from "../utility/DateExtractor";
import { Link, useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import sortData from "../utility/SortData";
import calculateTotalAmount from "../utility/CalculateTotalAmount";
import DatePicker from "./DatePicker";
import SkeletonItems from "./SkeletonItems";
import { useTransactions } from "../hooks/useTransactions";
import Notify from "./Notify";

const Expense = () => {
  const { expenses, setExpenses, isLoading, error } = useTransactions();
  const [sort, setSort] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const navigate = useNavigate();

  if (error.length > 0) {
    return (
      showNotification && (
        <Notify onClose={() => setShowNotification(false)} message={error} />
      )
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center mt-2">
        <div className="mb-4">
          <DatePicker />
        </div>
        <div className="flex flex-row w-72">
          <label className="text-lg mb-2 font-semibold w-full">
            Expenses: {calculateTotalAmount(expenses)} KM
          </label>
          <div className="w-16">
            <ImportExportIcon
              onClick={() => setExpenses(sortData(expenses, sort, setSort))}
              className="mr-1 text-cyan-600/80 cursor-pointer dark:text-slate-800"
            />
            <Link to="/createexpense">
              <AddCircleOutlineIcon className="rounded-full text-cyan-600/80 dark:text-slate-800" />
            </Link>
          </div>
        </div>
        <div className="container flex flex-col overflow-auto">
          {isLoading ? (
            <SkeletonItems />
          ) : (
            expenses.map((expense, key) => {
              return (
                <div className="itemContainer shadow-md" key={key}>
                  <div
                    className="item flex justify-center"
                    onClick={() => navigate(`/expenses/${expense.id}`)}
                  >
                    <div className="titleContainer w-3/5">
                      <div className="itemDate text-sm font-normal text-gray-500">
                        {dateExtractor(new Date(expense.createdAt))}
                      </div>
                      <div className="font-mono mt-1 font-semibold">
                        {expense.title}
                      </div>
                      <div className="itemLocation text-sm font-normal text-gray-500 italic">
                        {expense.location}
                      </div>
                    </div>
                    <div className="itemValue w-2/5 font-semibold align-bottom text-red-700">
                      -{expense.value} KM
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Expense;

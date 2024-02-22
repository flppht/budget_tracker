import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dateExtractor from "../utility/DateExtractor";
import Button from "./Button";

const ExpensePage = () => {
  const [expense, setExpense] = useState({});
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/expenses/byId/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setExpense(response.data);
        }
      });
  }, []);

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/expenses/${id}`)
      .then(() => {
        navigate("/expenses");
      });
  };

  const handleUpdate = () => {
    console.log("update");
  };

  return (
    <div className="expenseContainerPage shadow-md mt-16">
      <div className="expense flex justify-center mb-4">
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
        <div className="expenseValue w-2/5 font-semibold align-bottom">
          -{expense.expenseValue} KM
        </div>
      </div>
      <hr />
      <div className="flex flex-row space-x-3 m-2 p-2">
        <Button
          type="button"
          className="bg-cyan-500 shadow-cyan-600/50"
          onClick={handleUpdate}
        >
          Update
        </Button>
        <Button
          type="button"
          className="bg-red-500 shadow-red-600/50"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ExpensePage;

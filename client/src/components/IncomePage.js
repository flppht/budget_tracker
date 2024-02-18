import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dateExtractor from "../utility/DateExtractor";
import Button from "./Button";

const IncomePage = () => {
  const [income, setIncome] = useState({});
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/incomes/byId/${id}`)
      .then((response) => {
        setIncome(response.data);
      });
  }, []);

  return (
    <div className="incomeContainerPage shadow-md mt-16">
      <div className="income flex justify-center mb-4">
        <div className="titleContainer w-3/5">
          <div className="incomeDate text-sm font-normal text-gray-500">
            {dateExtractor(new Date(income.createdAt))}
          </div>
          <div className="font-mono mt-1 font-semibold">
            {income.incomeTitle}
          </div>
          <div className="incomeLocation text-sm font-normal text-gray-500 italic">
            {income.incomeLocation}
          </div>
        </div>
        <div className="incomeValue w-2/5 font-semibold align-bottom">
          {income.incomeValue} KM
        </div>
      </div>
      <hr />
      <div className="flex flex-row space-x-3 m-2 p-2">
        <Button type="button" className="bg-cyan-500 shadow-cyan-600/50">
          Update
        </Button>
        <Button type="button" className="bg-red-500 shadow-red-600/50">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default IncomePage;

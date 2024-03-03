import React, { useState, useEffect } from "react";
import dateExtractor from "../utility/DateExtractor";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import sortData from "../utility/SortData";
import calculateTotalAmount from "../utility/CalculateTotalAmount";
import Select from "./Select";
import { useSelector } from "react-redux";

const TotalAmount = () => {
  const [totalAmount, setTotalAmount] = useState([]);
  const [sort, setSort] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const accessToken = useSelector((state) => state.accessToken.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const properties = {
          month,
          year,
        };

        const expenses = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/expenses`,
          {
            headers: { accessToken },
            params: properties,
          }
        );
        const income = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/income`,
          {
            headers: { accessToken },
            params: properties,
          }
        );
        const combined = [...expenses.data, ...income.data];

        setTotalAmount(
          combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [month, year]);

  return (
    <div>
      <div className="flex flex-col items-center mt-2 h-auto">
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
            In total: {calculateTotalAmount(totalAmount)} KM
          </label>
          <div className="justify-self-end font-bold cursor-pointer">
            <ImportExportIcon
              onClick={() =>
                setTotalAmount(sortData(totalAmount, sort, setSort))
              }
              className="text-cyan-600/80 dark:text-slate-800"
            />
          </div>
        </div>
      </div>

      <div className="container flex flex-col overflow-auto">
        {totalAmount.map((resource, key) => {
          return (
            <div className="itemContainer shadow-md" key={key}>
              <div
                className="item flex justify-center"
                onClick={() =>
                  navigate(
                    `/${resource.type === "expense" ? "expenses" : "income"}/${
                      resource.id
                    }`
                  )
                }
              >
                <div className="titleContainer w-3/5">
                  <div className="itemDate text-sm font-normal text-gray-500">
                    {dateExtractor(new Date(resource.createdAt))}
                  </div>
                  <div className="font-mono mt-1 font-semibold">
                    {resource.title}
                  </div>
                  <div className="itemLocation text-sm font-normal text-gray-500 italic">
                    {resource.location}
                  </div>
                </div>
                {resource.type === "expense" ? (
                  <div
                    className={`itemValue w-2/5 font-semibold align-bottom text-red-700`}
                  >
                    -{resource.value} KM
                  </div>
                ) : (
                  <div
                    className={`itemValue w-2/5 font-semibold align-bottom text-green-700`}
                  >
                    +{resource.value} KM
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TotalAmount;

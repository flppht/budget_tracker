import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useTransactions = () => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [combined, setCombined] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState([]);
  const accessToken = useSelector((state) => state.accessToken.token);
  const { month, year } = useSelector((state) => state.date);

  const sort = (array) => {
    return array.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const properties = {
          month,
          year,
        };

        const expensesData = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/expenses`,
          {
            headers: { accessToken },
            params: properties,
          }
        );

        const incomeData = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/income`,
          {
            headers: { accessToken },
            params: properties,
          }
        );

        const combined = [...incomeData.data, ...expensesData.data];

        setIncome(sort(incomeData.data));
        setExpenses(sort(expensesData.data));
        setCombined(sort(combined));
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [month, year]);

  return {
    income,
    setIncome,
    expenses,
    setExpenses,
    combined,
    setCombined,
    isLoading,
    error,
  };
};

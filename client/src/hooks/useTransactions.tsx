import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export interface TransactionType {
  id?: number;
  type?: string;
  title: string;
  value: number;
  location?: string;
  createdAt: string | number | Date;
}

export const useTransactions = (endpoint: string) => {
  const [income, setIncome] = useState<TransactionType[]>([]);
  const [expenses, setExpenses] = useState<TransactionType[]>([]);
  const [combined, setCombined] = useState<TransactionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const accessToken = useSelector(
    (state: RootState) => state.accessToken.token
  );
  const { month, year } = useSelector((state: RootState) => state.date);

  const sort = (array: TransactionType[]) => {
    return array.sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
    );
  };

  const fetchIncome = async () => {
    return await axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/income?month=${month}&year=${year}`,
        {
          headers: { accessToken },
        }
      )
      .then((response: { data: TransactionType[] }) => {
        return response.data;
      });
  };

  const fetchExpenses = async () => {
    return await axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/expenses?month=${month}&year=${year}`,
        {
          headers: { accessToken },
        }
      )
      .then((response: { data: TransactionType[] }) => {
        return response.data;
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (endpoint === "income") {
          setIncome(sort(await fetchIncome()));
        } else if (endpoint === "expenses") {
          setExpenses(sort(await fetchExpenses()));
        } else {
          const combined = [
            ...(await fetchIncome()),
            ...(await fetchExpenses()),
          ];
          setCombined(sort(combined));
        }
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

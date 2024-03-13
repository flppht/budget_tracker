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

export const useTransactions = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const properties = {
          month,
          year,
        };

        const expenses = await axios
          .get(`${process.env.REACT_APP_SERVER_URL}/expenses`, {
            headers: { accessToken },
            params: properties,
          })
          .then((response: { data: TransactionType[] }) => {
            return response.data;
          });

        const income = await axios
          .get(`${process.env.REACT_APP_SERVER_URL}/income`, {
            headers: { accessToken },
            params: properties,
          })
          .then((response: { data: TransactionType[] }) => {
            return response.data;
          });

        const combined = [...income, ...expenses];

        setIncome(sort(income));
        setExpenses(sort(expenses));
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

import { TransactionType } from "../hooks/useTransactions";

const sortData = (array: TransactionType[], sort: boolean, setSort: (value: boolean) => void) => {
  if (sort) {
    array.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  } else {
    array.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
  }

  setSort(!sort);
  return array;
};

export default sortData;

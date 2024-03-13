import { TransactionType } from "../hooks/useTransactions";

const CalculateTotalAmount = (array: TransactionType[]) => {
  let amount = 0;
  array.forEach((element) => {
    if (element.type === "expense") {
      amount += -element.value;
    } else {
      amount += element.value;
    }
  });

  return amount.toFixed(2);
};

export default CalculateTotalAmount;

const CalculateTotalAmount = (array) => {
  let amount = 0;
  array.forEach((element) => {
    amount += -element.expenseValue || element.incomeValue;
  });

  return amount.toFixed(2);
};

export default CalculateTotalAmount;
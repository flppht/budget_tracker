import MonthsEnum from "./MonthsEnum";

const monthExtractor = (date) => {
  let monthOfTheYear = MonthsEnum.getMonthName(date.getMonth());

  return date.getDate() + " " + monthOfTheYear + ", " + date.getFullYear();
};

export default monthExtractor;

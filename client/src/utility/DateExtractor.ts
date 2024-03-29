import MonthsEnum from "./MonthsEnum";

const dateExtractor = (date: Date) => {
  let monthOfTheYear = MonthsEnum.getMonthName(date.getMonth());

  return date.getDate() + " " + monthOfTheYear + ", " + date.getFullYear();
};

export default dateExtractor;

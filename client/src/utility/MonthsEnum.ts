const MonthsEnum = Object.freeze({
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
  getMonthName: function (monthNumber: number) {
    for (const monthName in this) {
      if (this.hasOwnProperty(monthName) && this[monthName] === monthNumber) {
        return monthName;
      }
    }
  },
});

export default MonthsEnum;

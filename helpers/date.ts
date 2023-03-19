const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const date = () => {
  let day = "";
  let month = "";
  let year = "";

  return {
    getFullDate: () => {
      return `${year}-${month + 1}-${day}`;
    },
    getCurrentMonthAndYear: () => {
      return `${months[month]} ${year}`;
    },
    getDaysOfCurrentMonth: () => {
      let days = [];
      const numOfDays = new Date(year, month + 1, 0).getDate();

      for (let i = 0; i < numOfDays; i++) {
        days.push(i + 1);
      }

      return days;
    },
    getDay: () => {
      return day;
    },
    getMonth: () => {
      return month;
    },
    geyYear: () => {
      return year;
    },
    getTodaysDate: () => {
      const today = new Date();

      day = today.getDate();
      month = today.getMonth();
      year = today.getFullYear();

      return `${year}-${month + 1}-${day}`;
    },
    setDay: (d) => {
      day = d;
    },
    setMonth: (m) => {
      month = m;
    },
    setYear: (y) => {
      year = y;
    },
    setLastMonth: () => {
      if (month - 1 < 0) {
        month = 11;
        year -= 1;
      } else {
        month -= 1;
      }
    },
    setNextMonth: () => {
      if (month === 11) {
        month = 0;
        year = Number(year) + 1;
      } else {
        month = Number(month) + 1;
      }
    },
    setTodaysDate: () => {
      const today = new Date();

      day = today.getDate();
      month = today.getMonth();
      year = today.getFullYear();
    },
    setDate: (date) => {
      const newDate = date.split("-");
      day = newDate[2];
      month = newDate[1] - 1;
      year = newDate[0];
    },
  };
};

const calendar = date();

export default calendar;

exports.getDateRanges = (period) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // JavaScript months are 0-11

  const formatDate = (date) => {
    const year = date?.getFullYear();
    const month = String(date?.getMonth() + 1).padStart(2, "0"); // Months are 0-11
    const day = String(date?.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getLastDayOfMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const createDate = (year, month, day) => {
    return new Date(year, month - 1, day);
  };

  let firstRangeStart, firstRangeEnd, secondRangeStart, secondRangeEnd;

   if (period === "All Data") {
     return {
       currentStart: '',
       currentEnd: '',
       previousStart: '',
       previousEnd: '',
     };
   }

  if (period === "Past week") {
    // Find the most recent Sunday
    const lastSunday = new Date(today);
    lastSunday.setDate(today.getDate() - today.getDay());

    // Last week's Monday to Sunday
    const lastMonday = new Date(lastSunday);
    lastMonday.setDate(lastSunday.getDate() - 6);

    firstRangeStart = new Date(lastMonday);
    firstRangeEnd = new Date(lastSunday);

    // The week before last (Monday to Sunday)
    const prevSunday = new Date(lastMonday);
    prevSunday.setDate(lastMonday.getDate() - 1);

    const prevMonday = new Date(prevSunday);
    prevMonday.setDate(prevSunday.getDate() - 6);

    secondRangeStart = new Date(prevMonday);
    secondRangeEnd = new Date(prevSunday);
  } else if (period === "Past months") {
    // First range: Previous month
    const prevMonth = currentMonth - 1;
    firstRangeStart = createDate(currentYear, prevMonth, 1);
    firstRangeEnd = createDate(
      currentYear,
      prevMonth,
      new Date(currentYear, prevMonth, 0).getDate()
    );

    // Second range: Month before the previous month
    const prevPrevMonth = currentMonth - 2;
    secondRangeStart = createDate(currentYear, prevPrevMonth, 1);
    secondRangeEnd = createDate(
      currentYear,
      prevPrevMonth,
      new Date(currentYear, prevPrevMonth, 0).getDate()
    );
  } else if (period === "Past 3 months") {
    // First range: Last 3 months
    firstRangeStart = createDate(currentYear, currentMonth - 3, 1);
    firstRangeEnd = createDate(
      currentYear,
      currentMonth - 1,
      new Date(currentYear, currentMonth - 1, 0).getDate()
    );

    // Second range: The 3 months before that
    secondRangeStart = createDate(currentYear, currentMonth - 6, 1);
    secondRangeEnd = createDate(
      currentYear,
      currentMonth - 4,
      new Date(currentYear, currentMonth - 4, 0).getDate()
    );
  } else if (period === "Past 6 months") {
    // First range: Last 6 months
    firstRangeStart = createDate(currentYear, currentMonth - 6, 1);
    firstRangeEnd = createDate(
      currentYear,
      currentMonth - 1,
      new Date(currentYear, currentMonth - 1, 0).getDate()
    );

    // Second range: The 6 months before that
    secondRangeStart = createDate(currentYear, currentMonth - 12, 1);
    secondRangeEnd = createDate(
      currentYear,
      currentMonth - 7,
      new Date(currentYear, currentMonth - 7, 0).getDate()
    );
  } else if (period === "Past 12 months") {
    // First range: Last 12 months
    firstRangeStart = createDate(currentYear - 1, currentMonth, 1); // October 1st, last year
    firstRangeEnd = createDate(
      currentYear,
      currentMonth - 1,
      getLastDayOfMonth(currentYear, currentMonth - 1)
    ); // Last day of last month

    // Second range: The 12 months before that
    secondRangeStart = createDate(currentYear - 2, currentMonth, 1);
    secondRangeEnd = createDate(
      currentYear - 1,
      currentMonth - 1,
      getLastDayOfMonth(currentYear - 1, currentMonth - 1)
    );
  }

  return {
    currentStart: formatDate(firstRangeStart),
    currentEnd: formatDate(firstRangeEnd),
    previousStart: formatDate(secondRangeStart),
    previousEnd: formatDate(secondRangeEnd),
  };
};

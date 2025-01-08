import React from "react";
import BaseCalendar from "./BaseCalender";

const RangeCalendar = ({ show, hide, setDateRange, already, activeLink }) => {
  return (
    <BaseCalendar
      show={show}
      hide={hide}
      already={already}
      activeLink={activeLink}
      setDateRange={setDateRange}
      heading="Select Date Range"
      onConfirm={() => {}}
    />
  );
};

export default RangeCalendar;

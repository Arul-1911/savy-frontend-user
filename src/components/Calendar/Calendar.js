import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import ModalWindow from "../../components/modals/ModalWindow";
import { Card, CardBody } from "react-bootstrap";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

const Calendar = ({ show, hide, already, activeLink, setDate, heading }) => {
  const [value, setValue] = useState(null);

  const handleDateChange = (newDate) => {
    setValue(newDate);
    if (newDate) {
      const formattedDate = dayjs(newDate).format("YYYY-MM-DD");
      setDate(formattedDate);
      if (!already) {
        hide();
      }
      // activeLink(already);
    }
  };

  return (
    <>
      {!already ? (
        <ModalWindow show={show} onHide={hide}>
          <div className="d-flex align-items-center">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => hide(false)}
            />
            <div
              style={{
                margin: "auto",
                fontWeight: 600,
                fontSize: "18px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              {heading}
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <Card style={{ width: "100%", borderRadius: "10px" }}>
              <CardBody>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar value={value} onChange={handleDateChange} />
                </LocalizationProvider>
                <div className="d-flex justify-content-center">
                  <button
                    className="w-75"
                    style={{
                      backgroundColor: "var(--primary-color)",
                      color: "white",
                      padding: "10px",
                      borderRadius: "10px",
                      border: "none",
                      outline: "none",
                    }}
                    onClick={() => hide(false)}
                  >
                    Confirm
                  </button>
                </div>
              </CardBody>
            </Card>
          </div>
        </ModalWindow>
      ) : (
        <>
          <div className="d-flex align-items-center">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => activeLink(already)}
            />
            <div
              style={{
                margin: "auto 170px",
                fontWeight: 600,
                fontSize: "18px",
                color: "rgba(55, 73, 87, 1)",
              }}
              className="text-center"
            >
              {heading}
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <Card style={{ width: "100%", borderRadius: "10px" }}>
              <CardBody>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    value={value}
                    // slots={{
                    //   day: ServerDay,
                    // }}
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>
                <div className="d-flex justify-content-center">
                  <button
                    className="w-75"
                    style={{
                      backgroundColor: "var(--primary-color)",
                      color: "white",
                      padding: "10px",
                      borderRadius: "10px",
                      border: "none",
                      outline: "none",
                    }}
                    onClick={() => activeLink(already)}
                  >
                    Confirm
                  </button>
                </div>
              </CardBody>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default Calendar;

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  // console.log(props);

  const subDate = "2024-10-17";

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🌚" : subDate}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

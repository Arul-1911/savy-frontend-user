import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import ModalWindow from "../../components/modals/ModalWindow";
import { Card, CardBody } from "react-bootstrap";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const Calendar = ({ show, hide }) => {
  return (
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
          Calendar
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <Card style={{ width: "100%", borderRadius: "10px" }}>
          <CardBody>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
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
  );
};

export default Calendar;

import React, { useState, useRef } from "react";
import { Card, CardBody, Row, Col } from "react-bootstrap";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import ModalWindow from "../modals/ModalWindow";

const BaseCalendar = ({
  show,
  hide,
  setDateRange,
  heading,
  already,
  activeLink,
  onConfirm,
}) => {
  const [startDateValue, setStartDateValue] = useState(null);
  const [endDateValue, setEndDateValue] = useState(null);
  const [startDateError, setStartDateError] = useState(null);
  const [endDateError, setEndDateError] = useState(null);
  const [resetFlag, setResetFlag] = useState(false); // Add a reset flag

  const today = dayjs();
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const handleReset = () => {
    setStartDateValue(null);
    setEndDateValue(null);
    setStartDateError(null);
    setEndDateError(null);
    setResetFlag((prev) => !prev); // Toggle reset flag to force re-render
  };

  const handleStartDateChange = (newDate) => {
    if (newDate && newDate.isAfter(today, "day")) {
      setStartDateError("Start date cannot be in the future");
      setStartDateValue(null);
      if (startDateRef.current) {
        startDateRef.current.focus();
      }
      return;
    }
    setStartDateValue(newDate);
    setStartDateError(null);
    if (endDateValue && newDate > endDateValue) {
      setEndDateValue(null);
      setEndDateError("End date should be greater than start date");
    }
  };

  const handleEndDateChange = (newDate) => {
    if (newDate && newDate.isAfter(today, "day")) {
      setEndDateError("End date cannot be in the future");
      setEndDateValue(null);
      if (endDateRef.current) {
        endDateRef.current.focus();
      }
      return;
    }
    setEndDateValue(newDate);
    setEndDateError(null);
    if (startDateValue && startDateValue > newDate) {
      setEndDateError("End date should be greater than start date");
    }
  };

  const handleConfirm = () => {
    if (startDateValue && endDateValue) {
      if (endDateError) {
        return;
      }
      const formattedStartDate = dayjs(startDateValue).format("YYYY-MM-DD");
      const formattedEndDate = dayjs(endDateValue).format("YYYY-MM-DD");
      setDateRange({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
      onConfirm();
      if (!already) hide();
      if (already) activeLink(already);
    } 
    else {
      if (!startDateValue) {
        setStartDateError("Please select a start date");
        return;
      }
      if (!endDateValue) {
        setEndDateError("Please select an end date");
        return;
      }
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
                  <Row>
                    <Col>
                      <div
                        style={{
                          marginBottom: "15px",
                          textAlign: "center",
                        }}
                      >
                        <h6>Select Start Date</h6>
                        <DateCalendar
                          key={`start-date-calendar-${resetFlag}`}
                          ref={startDateRef}
                          value={startDateValue}
                          onChange={handleStartDateChange}
                          maxDate={today}
                        />
                        {startDateError && (
                          <div style={{ color: "red", fontSize: "12px" }}>
                            {startDateError}
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col>
                      <div
                        style={{
                          marginBottom: "15px",
                          textAlign: "center",
                        }}
                      >
                        <h6>Select End Date</h6>
                        <DateCalendar
                          key={`end-date-calendar-${resetFlag}`}
                          ref={endDateRef}
                          value={endDateValue}
                          onChange={handleEndDateChange}
                          minDate={startDateValue}
                          maxDate={today}
                        />
                        {endDateError && (
                          <div style={{ color: "red", fontSize: "12px" }}>
                            {endDateError}
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                </LocalizationProvider>
                <div className="d-flex justify-content-center mt-3">
                  <button
                    className="w-25"
                    style={{
                      backgroundColor: "white",
                      color: "var(--primary-color)",
                      padding: "10px",
                      borderRadius: "10px",
                      border: "1px solid var(--primary-color)",
                      outline: "none",
                    }}
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                  <button
                    className="w-50 ms-3"
                    style={{
                      backgroundColor: "var(--primary-color)",
                      color: "white",
                      padding: "10px",
                      borderRadius: "10px",
                      border: "none",
                      outline: "none",
                    }}
                    onClick={handleConfirm}
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
                  <Row>
                    <Col>
                      <div
                        style={{
                          marginBottom: "15px",
                          textAlign: "center",
                        }}
                      >
                        <h6>Select Start Date</h6>
                        <DateCalendar
                          key={`start-date-calendar-${resetFlag}`}
                          ref={startDateRef}
                          value={startDateValue}
                          onChange={handleStartDateChange}
                          maxDate={today}
                        />
                        {startDateError && (
                          <div style={{ color: "red", fontSize: "12px" }}>
                            {startDateError}
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col>
                      <div
                        style={{
                          marginBottom: "15px",
                          textAlign: "center",
                        }}
                      >
                        <h6>Select End Date</h6>
                        <DateCalendar
                          key={`end-date-calendar-${resetFlag}`}
                          ref={endDateRef}
                          value={endDateValue}
                          onChange={handleEndDateChange}
                          minDate={startDateValue}
                          maxDate={today}
                        />
                        {endDateError && (
                          <div style={{ color: "red", fontSize: "12px" }}>
                            {endDateError}
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                </LocalizationProvider>
                <div className="d-flex justify-content-center mt-3">
                  <button
                    className="w-25"
                    style={{
                      backgroundColor: "white",
                      color: "var(--primary-color)",
                      padding: "10px",
                      borderRadius: "10px",
                      border: "1px solid var(--primary-color)",
                      outline: "none",
                    }}
                    onClick={handleReset}
                  >
                    UnSelect
                  </button>
                  <button
                    className="w-50 ms-3"
                    style={{
                      backgroundColor: "var(--primary-color)",
                      color: "white",
                      padding: "10px",
                      borderRadius: "10px",
                      border: "none",
                      outline: "none",
                    }}
                    onClick={handleConfirm}
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

export default BaseCalendar;

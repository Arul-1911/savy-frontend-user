import React, { useState } from "react";
import ModalWindow from "../modals/ModalWindow";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import {
  Card,
  Col,
  Form,
  Image,
  InputGroup,
  ProgressBar,
  Row,
} from "react-bootstrap";
import FormField from "../layout/FormField";
import { CalendarSVG } from "../svg/CalendarSVG";
import { FilterSVG } from "../svg/FilterSVG";
import { Filter2SVG } from "../svg/Filter2SVG";
import { FaRegCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { FaRegCircleCheck } from "react-icons/fa6";

const FinancialPassport = ({ show, hide, active, activeLink }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    hide(false);
  };

  return (
    <>
      <ModalWindow show={show} onHide={hide}>
        {active === 1 && (
          <>
            <div className="d-flex justify-content-between align-items-center">
              <IoArrowBackCircleOutline
                color="rgba(92, 182, 249, 1)"
                cursor={"pointer"}
                size={28}
                onClick={() => hide(false)}
              />
              <Image
                height={"45px"}
                width={"45px"}
                src="/logo/LoginLogo.png"
                alt="..."
              />
              <RxCrossCircled
                color="rgba(92, 182, 249, 1)"
                cursor={"pointer"}
                size={26}
                onClick={() => hide(false)}
              />
            </div>
            <h4
              className="logo-txt text-center"
              style={{ color: "var(--primary-color)" }}
            >
              <span style={{ color: "rgba(92, 182, 249, 1)" }}>$ayv</span>{" "}
              Financial Report
            </h4>

            <h6
              style={{ color: "rgba(55, 73, 87, 1)", fontSize: "0.7rem" }}
              className="text-center"
            >
              View the full pictures of your finances in a report generated from
              data pulled from your linked accounts.
            </h6>

            <div className="px-5">
              {[
                "Create a report that includes your assets, liabilities, income, and expenses",
                "See your actual financial position at a glance",
                "Support your lending applications by arriving at conditional approval faster",
              ].map((text, i) => (
                <Row className="d-flex align-items-center gap-3 px-4">
                  <Col sm={1} className="pe-0">
                    <FaRegCircleCheck
                      color="rgba(0, 74, 173, 1)"
                      className=""
                      size={18}
                    />
                  </Col>
                  <Col className="px-0 mt-2">
                    <div
                      className=""
                      style={{
                        fontSize: "0.7rem",
                        color: "#374957",
                        fontWeight: 500,
                      }}
                    >
                      {text}
                    </div>
                  </Col>
                </Row>
              ))}
            </div>

            <div className="d-flex justify-content-center mt-3">
              <button
                onClick={() => activeLink(2)}
                className=" py-3 w-75"
                style={{
                  fontWeight: 600,
                  border: "1px solid rgba(228, 228, 228, 1)",
                  borderRadius: "10px",
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                }}
              >
                Continue
              </button>
            </div>
          </>
        )}
        {active === 2 && (
          <>
            <div className="d-flex align-items-center justify-content-between">
              <IoArrowBackCircleOutline
                color="rgba(92, 182, 249, 1)"
                cursor={"pointer"}
                size={28}
                onClick={() => activeLink(1)}
              />
              <Image
                height={"45px"}
                width={"45px"}
                src="/logo/LoginLogo.png"
                alt="..."
              />
              <RxCrossCircled
                color="rgba(92, 182, 249, 1)"
                cursor={"pointer"}
                size={23}
                onClick={() => hide(false)}
              />
            </div>
            <h4
              className="logo-txt text-center"
              style={{ color: "var(--primary-color)", fontSize: "18px" }}
            >
              <span style={{ color: "rgba(92, 182, 249, 1)" }}>$ayv</span>{" "}
              Financial Report
            </h4>

            <div className="px-5">
              <Image src="/images/report.png" fluid />
            </div>

            <div className="d-flex justify-content-center mt-3">
              <button
                onClick={() => hide(false)}
                className=" py-2 w-50"
                style={{
                  fontWeight: 600,
                  border: "1px solid rgba(228, 228, 228, 1)",
                  borderRadius: "10px",
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                }}
              >
                Share
              </button>
            </div>
          </>
        )}
      </ModalWindow>
    </>
  );
};

export default FinancialPassport;

import React from "react";
import { Col, Row } from "react-bootstrap";
import { MdDashboard } from "react-icons/md";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectOptions } from "../../features/optionSlice";

function DomainHeader() {
  const location = useLocation();
  const isAos = location.pathname.includes("all-specialties");
  const { domain } = useSelector(selectOptions);

  return (
    <Row>
      <Col
        className="d-flex justify-content-between rounded p-3"
        style={{ border: "2px solid rgba(0, 0, 139, 1)" }}
      >
        <div style={{ color: "rgba(0, 0, 139, 1)" }}>
          <MdDashboard /> Engineering
        </div>
        {isAos ? null : (
          <div>
            Area of Speciality:{" "}
            <span style={{ color: "rgba(0, 0, 139, 1)" }}>
              Mechanical Engineering
            </span>
          </div>
        )}
      </Col>
    </Row>
  );
}

export default DomainHeader;

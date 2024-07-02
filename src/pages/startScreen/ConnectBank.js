import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Image, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import LoginCard from "../../components/layout/LoginCard";

export default function ConnectBank() {
  const navigate = useNavigate();

  return (
    <LoginCard height={"500px"} width={"450px"}>
      <div className="d-flex align-items-center flex-column">
        <Image
          height={"35px"}
          width={"35px"}
          src="/images/AddAccount.png"
          alt="..."
        />
        <div
          className="my-2"
          style={{
            color: "var(--primary-color)",
            fontWeight: 800,
            fontSize: "16px",
          }}
        >
          Let’s connect your bank account
        </div>
        <Image
          height={"170px"}
          width={"300px"}
          src="/images/accountProtectionDetails.png"
          alt="..."
        />
        <p
          className="mt-3 px-5 text-center"
          style={{
            fontSize: "12px",
            fontWeight: 400,
            color: "rgba(55, 73, 87, 1)",
          }}
        >
          Powered by open data platform{" "}
          <span
            style={{
              textDecoration: "underline",
              color: "rgba(92, 182, 249, 1)",
            }}
          >
            basiq.io
          </span>{" "}
          to securely connect your bank account.
        </p>
      </div>

      <Row className="px-5">
        <Col>
          <Button
            className="float-sm-end w-100 "
            style={{
              background: "var(--primary-color)",
              fontWeight: 700,
              fontSize: "12px",
              padding: "10px",
            }}
            onClick={() => navigate("/user/financial-policy")}
          >
            Continue
          </Button>
        </Col>
      </Row>

      <Row className="mt-2 px-5">
        <Col>
          <Button
            className="float-sm-end w-100 "
            style={{
              background: "white",
              color: "var(--primary-color)",
              border: "none",
              fontWeight: 700,
              fontSize: "12px",
            }}
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
        </Col>
      </Row>

      <ToastContainer />
    </LoginCard>
  );
}

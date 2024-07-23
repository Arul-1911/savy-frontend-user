import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Form, Image, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import LoginCard from "../../components/layout/LoginCard";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import FormField from "../../components/layout/FormField";
import { getError } from "../../utils/error";

export default function AvailableBank({goBack,containerDiv,infoNext,next}) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      next?next(): navigate("/user/confirm-account");
    } catch (error) {
      getError(error);
    }
  };

  return (
    <LoginCard height={"500px"} width={"450px"} bankDetails={true} containerDiv={containerDiv} > 
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <IoArrowBackCircleOutline
            color="rgba(92, 182, 249, 1)"
            cursor={"pointer"}
            size={23}
            onClick={() => goBack?goBack():navigate("/user/one-time-password")}
          />
        </div>

        <div>
          <Image
            height={"35px"}
            width={"35px"}
            src="/logo/LoginLogo.png"
            alt="..."
          />
        </div>

        <div>
          <RxCrossCircled
            color="rgba(92, 182, 249, 1)"
            cursor={"pointer"}
            size={23}
            onClick={() => navigate("/")}
          />
        </div>
      </div>

      <Card className="mt-3">
        <CardBody>
          <div className="d-flex align-items-center flex-column mb-2">
            <div
              style={{
                color: "var(--primary-color)",
                fontWeight: 600,
                fontSize: "16px",
              }}
            >
              Select account to share
            </div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 500,
                color: "rgba(55, 73, 87, 1)",
                textAlign: "center",
              }}
            >
              Basiq Pty Ltd is requesting account details from you. Please
              select the account you would like to share data from.
            </div>
          </div>

          <Form className="px-5" onSubmit={handleSubmit}>
            <div
              style={{
                color: "var(--primary-color)",
                fontWeight: 600,
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              Available account
            </div>

            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center justify-content-between">
                <div
                  style={{
                    fontSize: "10px",
                    color: "rgba(55, 73, 87, 1)",
                    fontWeight: 600,
                  }}
                >
                  Select all available accounts
                </div>
                <div>
                  <Form.Check type="switch" />
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between">
                <div
                  style={{
                    fontSize: "10px",
                    color: "rgba(55, 73, 87, 1)",
                    fontWeight: 600,
                  }}
                >
                  HOME LOAN - VARIABLE P&I
                </div>
                <div>
                  <Form.Check type="switch" />
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between">
                <div
                  style={{
                    fontSize: "10px",
                    color: "rgba(55, 73, 87, 1)",
                    fontWeight: 600,
                  }}
                >
                  EVERYDAY MAIN ACCOUNT
                </div>
                <div>
                  <Form.Check type="switch" />
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between">
                <div
                  style={{
                    fontSize: "10px",
                    color: "rgba(55, 73, 87, 1)",
                    fontWeight: 600,
                  }}
                >
                  HOME LOAN - VARIABLE P&I
                </div>
                <div>
                  <Form.Check type="switch" />
                </div>
              </div>
            </div>

            <p
              className="my-4"
              style={{
                fontSize: "10px",
                fontWeight: 400,
                color: "rgba(55, 73, 87, 1)",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              You might have accounts that are not showing in this list.
              <span
                style={{
                  textDecoration: "underline",
                  color: "rgba(92, 182, 249, 1)",
                  cursor: "pointer",
                }}
                onClick={() =>infoNext?infoNext(): navigate("/user/all-my-account")}
              >
                Why i can’t see all my accounts?
              </span>
            </p>

            <Row>
              <Col>
                <Button
                  type="submit"
                  className="float-sm-end w-100 "
                  style={{
                    background: "var(--primary-color)",
                    fontWeight: 700,
                    fontSize: "12px",
                    padding: "10px",
                  }}
                >
                  Continue
                </Button>
              </Col>
            </Row>
          </Form>
          <Row>
            <Col>
              <Button
                className="float-sm-end w-100 "
                style={{
                  border: "none",
                  backgroundColor: "white",
                  color: "var(--primary-color)",
                  fontWeight: 700,
                  fontSize: "12px",
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <ToastContainer />
    </LoginCard>
  );
}

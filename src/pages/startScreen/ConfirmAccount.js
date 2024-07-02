import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  Button,
  Card,
  CardBody,
  Col,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import LoginCard from "../../components/layout/LoginCard";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { getError } from "../../utils/error";
import { FaRegCheckCircle } from "react-icons/fa";

export default function ConfirmAccount() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      navigate("/user/confirm-account-details");
    } catch (error) {
      getError(error);
    }
  };

  return (
    <LoginCard width={"450px"} bankDetails={true}>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <IoArrowBackCircleOutline
            color="rgba(92, 182, 249, 1)"
            cursor={"pointer"}
            size={23}
            onClick={() => navigate("/user/available-bank")}
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
              Confirm
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
            <Accordion className="p-0" defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <div
                    style={{
                      color: "rgba(92, 182, 249, 1)",
                      fontSize: "10px",
                      fontWeight: 600,
                    }}
                  >
                    Select accounts
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div
                    style={{
                      color: "rgba(55, 73, 87, 1)",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    <FaRegCheckCircle color="rgba(92, 182, 249, 1)" size={12} />{" "}
                    EVERYDAY MAIN ACCOUNT <br />{" "}
                    <span
                      style={{
                        color: "rgba(55, 73, 87, 1)",
                        fontSize: "12px",
                        fontWeight: 400,
                        marginLeft: "14px",
                      }}
                    >
                      xxx-xxx-xxxx-8416
                    </span>
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <div
                    style={{
                      color: "rgba(92, 182, 249, 1)",
                      fontSize: "10px",
                      fontWeight: 600,
                    }}
                  >
                    Data request
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div
                    style={{
                      color: "var(--primary-color)",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    Name, Occupation, Contact details
                  </div>
                  <div
                    style={{
                      color: "rgba(55, 73, 87, 1)",
                      fontSize: "12px",
                      fontWeight: 400,
                    }}
                  >
                    <FaRegCheckCircle color="rgba(92, 182, 249, 1)" size={12} />{" "}
                    Name
                  </div>
                  <div
                    style={{
                      color: "rgba(55, 73, 87, 1)",
                      fontSize: "12px",
                      fontWeight: 400,
                    }}
                  >
                    <FaRegCheckCircle color="rgba(92, 182, 249, 1)" size={12} />{" "}
                    Occupation
                  </div>
                  <div
                    style={{
                      color: "rgba(55, 73, 87, 1)",
                      fontSize: "12px",
                      fontWeight: 400,
                    }}
                  >
                    <FaRegCheckCircle color="rgba(92, 182, 249, 1)" size={12} />{" "}
                    Phone
                  </div>
                  <div
                    style={{
                      color: "rgba(55, 73, 87, 1)",
                      fontSize: "12px",
                      fontWeight: 400,
                    }}
                  >
                    <FaRegCheckCircle color="rgba(92, 182, 249, 1)" size={12} />{" "}
                    Email address
                  </div>
                  <div
                    style={{
                      color: "rgba(55, 73, 87, 1)",
                      fontSize: "12px",
                      fontWeight: 400,
                    }}
                  >
                    <FaRegCheckCircle color="rgba(92, 182, 249, 1)" size={12} />{" "}
                    Residential address
                  </div>

                  <div
                    style={{
                      color: "var(--primary-color)",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    Account Balance and details
                  </div>
                  <div
                    style={{
                      color: "rgba(55, 73, 87, 1)",
                      fontSize: "12px",
                      fontWeight: 400,
                    }}
                  >
                    <FaRegCheckCircle color="rgba(92, 182, 249, 1)" size={12} />{" "}
                    Name of Account
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <div
                    style={{
                      color: "rgba(92, 182, 249, 1)",
                      fontSize: "10px",
                      fontWeight: 600,
                    }}
                  >
                    Manage your data sharing
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div
                    style={{
                      color: "rgba(55, 73, 87, 1)",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  ></div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

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
              Do you confirm that we can share your banking details with Basiq
              Pty Ltd?
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

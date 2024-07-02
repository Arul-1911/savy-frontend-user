import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Form, Image, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import LoginCard from "../../components/layout/LoginCard";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { getError } from "../../utils/error";

export default function ConfirmDetails() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      navigate("/user/account-connected");
    } catch (error) {
      getError(error);
    }
  };

  return (
    <LoginCard height={"300px"} width={"400px"} bankDetails={true}>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <IoArrowBackCircleOutline
            color="rgba(92, 182, 249, 1)"
            cursor={"pointer"}
            size={23}
            onClick={() => navigate("/user/confirm-account")}
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

      <Card className="mt-3 ">
        <CardBody>
          <div className="d-flex align-items-center flex-column mb-2 mt-2">
            <div
              style={{
                color: "var(--primary-color)",
                fontWeight: 600,
                fontSize: "16px",
              }}
            >
              Are you sure you want to share your data?
            </div>
            <div
              className="mt-2"
              style={{
                fontSize: "10px",
                fontWeight: 500,
                color: "rgba(55, 73, 87, 1)",
                textAlign: "center",
              }}
            >
              Please confirm you wish to share your data. By confirming your
              data will be shared with Basiq Pty Ltd.
            </div>
          </div>

          <Form className="px-5 mt-2" onSubmit={handleSubmit}>
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
                  Yes Confirm
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

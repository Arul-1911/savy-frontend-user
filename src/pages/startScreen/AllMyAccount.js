import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Image, Row } from "react-bootstrap";
import LoginCard from "../../components/layout/LoginCard";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";

export default function AllMyAccount({goBack,containerDiv}) {
  const navigate = useNavigate();

  return (
    <LoginCard height={"350px"} width={"450px"} bankDetails={true} containerDiv={containerDiv}>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <IoArrowBackCircleOutline
            color="rgba(92, 182, 249, 1)"
            cursor={"pointer"}
            size={23}
            onClick={() =>goBack?goBack(): navigate("/user/available-bank")}
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
            onClick={() =>goBack?goBack(): navigate("/")}
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
              Why I can’t see all my accounts ?
            </div>
            <div
              className="mt-3"
              style={{
                fontSize: "10px",
                fontWeight: 500,
                color: "rgba(55, 73, 87, 1)",
                textAlign: "center",
              }}
            >
              The Consumer Data Right is implemented in a staged way which means
              that not all accounts are available for sharing from the
              beginning. Data cannot be shared from certain account types or,
              for example, accounts closed for more than 24 months and joint
              accounts.
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
            If you have accounts that you think should be shown but are not,
            please contact us at{" "}
            <span
              style={{
                textDecoration: "underline",
                color: "rgba(92, 182, 249, 1)",
                cursor: "pointer",
              }}
            >
              13 95 00.
            </span>
          </p>

          <Row className="px-5">
            <Col>
              <Button
                onClick={() => goBack?goBack() : navigate("/user/available-bank")}
                className="float-sm-end w-100 "
                style={{
                  background: "var(--primary-color)",
                  fontWeight: 700,
                  fontSize: "12px",
                  padding: "10px",
                }}
              >
                Close
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </LoginCard>
  );
}

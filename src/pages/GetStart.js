import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";

export default function GetStart() {
  const navigate = useNavigate();
  const { accessToken } = useSelector(selectAuth);

  useEffect(() => {
    if (accessToken) {
      navigate("/user/dashboard");
    }
  }, [accessToken]);

  return (
    <Container
      fluid
      className="p-0 vh-100 f-center flex-column login-page background-planet-img"
    >
      <Card className="login-box shadow px-4">
        <Card.Body>
          <div className="d-flex justify-content-center flex-column mt-4">
            <Link to="/" className="text-center">
              <Image src="logo/LoginLogo.png" height={"50px"} width={"50px"} />{" "}
            </Link>
            <b
              className="fs-3 fw-bold text-center logo-txt"
              style={{ color: "var(--primary-color)" }}
            >
              $ayv
            </b>
          </div>

          <p
            className="fs-5 fw-bold text-center mt-3"
            style={{ color: "white", fontWeight: 700 }}
          >
            Personal Finance Management
          </p>

          <div className="text-center mt-3 mb-4">
            <div
              style={{
                letterSpacing: "-0.17px",
                color: "var(--primary-color)",
                fontWeight: 700,
              }}
            >
              Save Smarter
            </div>
            <p
              style={{
                letterSpacing: "-0.17px",
                lineHeight: "18px",
                color: "white",
              }}
            >
              Sayv helps you track and optimise your savings while helping you
              to make even smarter savings with hundreds of tips, ideas and
              suggestions only a click away.
            </p>
          </div>

          <Row className="px-4 mt-1">
            <Col>
              <Link
                to="/user/signup"
                className="text-end "
                style={{ color: "rgba(0, 0, 139, 1)" }}
              >
                <Button
                  className="float-sm-end w-100 py-2"
                  style={{
                    background: "rgba(0, 0, 139, 1)",
                    fontWeight: 700,
                    fontSize: "12px",
                    border: "none",
                    padding: "10px",
                  }}
                >
                  Get Started
                </Button>
              </Link>
            </Col>
          </Row>

          <Row className="px-4 mt-1">
            <Col>
              <Link to="/user/login" className="text-end ">
                <Button
                  className="float-sm-end w-100 py-2"
                  style={{
                    background: "white",
                    color: "var(--primary-color)",
                    fontWeight: 700,
                    fontSize: "12px",
                    border: "none",
                    padding: "10px",
                  }}
                >
                  Sign in
                </Button>
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

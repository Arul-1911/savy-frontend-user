import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, Image, Row, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useTitle } from "../components";
import { getError } from "../utils/error";
import { useSelector } from "react-redux";
import { selectAuth, setAccessToken, setUser } from "../features/authSlice";
import FormField from "../components/layout/FormField";
import { useLoginAdminMutation } from "../features/apiSlice";
import LoginCard from "../components/layout/LoginCard";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginAdmin, { isLoading }] = useLoginAdminMutation();
  const { accessToken } = useSelector(selectAuth);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      navigate("/user/login");
    } catch (error) {
      console.log(error);
      getError(error);
    }
  };

  return (
    <LoginCard height={"450px"} width={"450px"}>
      <div className="d-flex align-items-center flex-column">
        <Image
          height={"50px"}
          width={"50px"}
          src="/images/UserPerspective.png"
          alt="..."
        />
        <div
          className="mt-2"
          style={{
            color: "var(--primary-color)",
            fontWeight: 800,
            fontSize: "16px",
          }}
        >
          Reset password
        </div>
      </div>
      <Form className="mt-1 px-5" onSubmit={handleLogin}>
        <p
          className="px-5 text-center"
          style={{
            fontSize: "10px",
            fontWeight: 400,
            color: "rgba(55, 73, 87, 1)",
          }}
        >
          Don’t worry! It happens. Please enter the email associated with your
          account.
        </p>

        <FormField
          placeholder={"Password"}
          type={"password"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <FormField
          type={"password"}
          placeholder={"Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Row className="mt-5">
          <Col>
            {isLoading ? (
              <Button type="submit" className="float-sm-end" disabled>
                <Spinner animation="border" size="sm" />
              </Button>
            ) : (
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
                Reset password
              </Button>
            )}
          </Col>
        </Row>
      </Form>
      <ToastContainer />
    </LoginCard>
  );
}

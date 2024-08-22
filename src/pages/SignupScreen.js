import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { getError } from "../utils/error";
import FormField from "../components/layout/FormField";
import LoginCard from "../components/layout/LoginCard";

export default function SignupScreen() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const user = {
      mobile_no: mobile,
      email,
      password,
      confirm_password: confirmPassword,
    };

    try {
      if (password !== confirmPassword) {
        throw new Error("Password and confirm password are not matched");
      } else {
        localStorage.setItem("userDetails", JSON.stringify(user));
        navigate("/user/passcode");
      }
    } catch (error) {
      getError(error);
    }
  };

  return (
    <LoginCard width={"450px"}>
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
          Sign up with your account to get started
        </div>
      </div>

      <Form className="mt-3 px-5" onSubmit={handleRegister}>
        <FormField
          placeholder={"E-mail"}
          type={"email"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <FormField
          placeholder={"Mobile"}
          type={"number"}
          onChange={(e) => setMobile(e.target.value)}
          value={mobile}
        />

        <FormField
          type={"password"}
          placeholder={"Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <FormField
          type={"password"}
          placeholder={"Confirm Password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <p
          className="px-5 text-center"
          style={{
            fontSize: "10px",
            fontWeight: 400,
            color: "rgba(55, 73, 87, 1)",
          }}
        >
          By continuing you agree to the Terms and Conditions and our Privacy
          Policy.
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
    </LoginCard>
  );
}

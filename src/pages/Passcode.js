import React, { useState } from "react";
import { Button, Col, Form, Image, Row, Spinner } from "react-bootstrap";
import { getError } from "../utils/error";
import FormField from "../components/layout/FormField";
import { useUserRegistrationMutation } from "../features/apiSlice";
import LoginCard from "../components/layout/LoginCard";

export default function Passcode() {
  const [userRegistration, { isLoading }] = useUserRegistrationMutation();
  const [code, setCode] = useState("");
  const [confirmCode, setConfirmCode] = useState("");

  const handlePasscode = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("userDetails"));

    try {
      if (user) {
        if (code !== confirmCode) {
          throw new Error("Code and confim code are not matched");
        } else {
          const updatedUser = {
            ...user,
            code: code,
            confirm_code: confirmCode,
          };
          const { data } = await userRegistration(updatedUser).unwrap();
          window.location.href = data?.links?.public;
        }
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      getError(error);
    }
  };

  return (
    <LoginCard height={"500px"} width={"450px"}>
      <div className="d-flex align-items-center flex-column px-5">
        <Image
          height={"50px"}
          width={"50px"}
          src="/images/UserPerspective.png"
          alt="..."
        />
        <div
          className="mt-2 text-center"
          style={{
            color: "var(--primary-color)",
            fontWeight: 800,
            fontSize: "16px",
          }}
        >
          Set up your 6-digit code for quick access to the application
        </div>
      </div>
      <Form className="mt-3 px-5" onSubmit={handlePasscode}>
        <FormField
          type={"password"}
          placeholder={"6 - digit code"}
          maxLength={6}
          onChange={(e) => setCode(e.target.value)}
          value={code}
          required
        />

        <FormField
          type={"password"}
          placeholder={"Repeat the 6 - digit code"}
          value={confirmCode}
          maxLength={6}
          onChange={(e) => setConfirmCode(e.target.value)}
          required
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
              {isLoading ? <Spinner size="sm" /> : "Continue"}
            </Button>
          </Col>
        </Row>
      </Form>
    </LoginCard>
  );
}

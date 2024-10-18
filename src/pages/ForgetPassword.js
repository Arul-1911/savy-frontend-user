import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Image, Row, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { getError } from "../utils/error";
import FormField from "../components/layout/FormField";
import { useForgetPasswordMutation } from "../features/apiSlice";
import LoginCard from "../components/layout/LoginCard";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPasswords, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [otpCheck, setOTPCheck] = useState(false);
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputs = useRef([]);
  const [otps, setOtps] = useState(0);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== "" && index < 6 - 1) {
      inputs.current[index + 1].focus();
    }
    // setPasscode(newOtp.join(""));
  };

  const handleKeyUp = (e, index) => {
    if (e.keyCode === 8 && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleForget = async (e) => {
    e.preventDefault();
    setCheck(true);
    navigate("/user/reset-password");
    // if (!check && !otpCheck) {
    //   try {
    //     await forgetPassword({ email }).unwrap();
    //     localStorage.setItem("email", email);
    //     setCheck(true);
    //     return;
    //   } catch (error) {
    //     getError(error);
    //     return;
    //   }
    // }

    // if (!otpCheck) {
    //   try {
    //     const mail = localStorage.getItem("email");
    //     await submitOTP({ email: mail, otp: otps }).unwrap();
    //     setOTPCheck(true);
    //     return;
    //   } catch (error) {
    //     getError(error);
    //     return;
    //   }
    // }

    // if (check && otpCheck) {
    //   try {
    //     const mail = localStorage.getItem("email");
    //     await newPassword({ email: mail, password: newPasswords }).unwrap();
    //     navigate("/");
    //   } catch (error) {
    //     getError(error);
    //   }
    // }
  };

  return (
    <LoginCard height={"400px"} width={"450px"}>
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
          Forget Password ?
        </div>

        <div
          className="px-5 text-center"
          style={{
            fontSize: "10px",
            fontWeight: 400,
            color: "rgba(55, 73, 87, 1)",
          }}
        >
          Don’t worry! It happens. Please enter the email associated with your
          account.
        </div>
      </div>
      <Form onSubmit={handleForget} className="mt-2 px-5 ">
        {!check ? (
          <FormField
            placeholder={"E-mail"}
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        ) : (
          <>
            {!otpCheck ? (
              <>
                <div className="otp-input mb-3">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      onKeyUp={(e) => handleKeyUp(e, index)}
                      ref={(el) => (inputs.current[index] = el)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <FormField
                  placeholder={"Enter your Password"}
                  type={"password"}
                  label={"New Password"}
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPasswords}
                />
                <FormField
                  placeholder={"Enter your Confirm Password"}
                  type={"password"}
                  label={"Confirm Password"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </>
            )}
          </>
        )}

        <Row className="mt-5">
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
              {!isLoading ? (
                "Continue"
              ) : (
                <Spinner animation="border" size="sm" />
              )}
            </Button>
          </Col>
        </Row>
      </Form>
      <ToastContainer />
    </LoginCard>
  );
}

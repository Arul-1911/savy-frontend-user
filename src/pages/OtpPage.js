import React, { useState, useEffect } from "react";
import { Button, Col, Row, Form, Spinner, Image } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoginCard from "../components/layout/LoginCard";
import { useLoginOtpMutation } from "../features/apiSlice";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "../features/authSlice";
import { getError } from "../utils/error";
import { getSuccess } from "../utils/success";

function OtpPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loginOtp, { isLoading }] = useLoginOtpMutation();
  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 4) {
      getError("Please enter a valid 4-digit OTP.");
      return;
    }

    try {
      const email = localStorage.getItem("email");
      if (!email) {
        getError("Session expired. Please log");
        navigate("/user/login");
        return;
      }
      const result = await loginOtp({ email, otp }).unwrap();

      const { user = {}, token = "" } = result;
      dispatch(setAccessToken(token));
      dispatch(setUser(user));

      getSuccess("OTP verified successfully!");
      navigate("/user/dashboard");
      setOtp("");
      localStorage.removeItem("email");
    } catch (error) {
      const errorMessage =
        error?.data?.message || "Failed to verify OTP. Please try again.";
      getError(errorMessage);
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      navigate("/user/login");
    }
  }, [navigate]);

  return (
    <LoginCard height={"auto"} width={"450px"}>
      <Row className="d-flex justify-content-center align-items-center py-1">
        <Col xl={8}>
          <div
            className="glass-card text-center p-1"
            style={{ width: "100%", maxWidth: "450px" }}
          >
            <div className="d-flex align-items-center flex-column">
              <Image
                height={"50px"}
                width={"50px"}
                src="/images/UserPerspective.png"
                alt="User Perspective"
              />
              <div
                className="mt-2"
                style={{
                  color: "var(--primary-color)",
                  fontWeight: 800,
                  fontSize: "16px",
                }}
              >
                Verify the OTP to proceed
              </div>
              <p
                className="mt-2"
                style={{
                  fontSize: "13px",
                  color: "rgba(55, 73, 87, 1)",
                }}
              >
                We sent a verification code to your email.
              </p>
            </div>

            <Form onSubmit={handleFormSubmit}>
              <Row>
                <OtpInput
                  value={otp}
                  onChange={(otpValue) => setOtp(otpValue)}
                  numInputs={4}
                  renderInput={(props) => <input {...props} aria-label="OTP" />}
                  containerStyle={{ display: "flex", justifyContent: "center" }}
                  inputStyle={{
                    margin: "15px 5px",
                    borderRadius: "10%",
                    width: "100%",
                    maxWidth: "60px",
                    aspectRatio: "1/1",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    background: "rgba(0, 0, 0, 0.1)",
                    border: "1px solid rgba(209, 255, 255, 0.18)",
                    backdropFilter: "blur(0px)",
                    color: "black",
                  }}
                />
              </Row>

              <div className="d-flex justify-content-center my-3">
                <Button
                  type="submit"
                  className="w-100"
                  style={{
                    background: "var(--primary-color)",
                    fontWeight: 700,
                    fontSize: "12px",
                    padding: "10px",
                  }}
                  disabled={isLoading}
                >
                  {!isLoading ? (
                    "Verify OTP"
                  ) : (
                    <Spinner animation="border" size="sm" />
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </LoginCard>
  );
}

export default OtpPage;

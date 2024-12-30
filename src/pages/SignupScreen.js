import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { getError } from "../utils/error";
import FormField from "../components/layout/FormField";
import LoginCard from "../components/layout/LoginCard";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function SignupScreen() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState({ mobile: "", dialCode: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError,setPasswordError] = useState('')
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const phone = `+${mobile.dialCode} ${mobile.mobile}`;
 
    const user = {
      mobile_no: phone,
      email,
      password,
      confirm_password: confirmPassword,
    };

  
    try {
      if (mobile.mobile.length !== 9) {
        throw new Error(
          "Mobile number should be 9 digits (excluding country code)."
        );
      }
      if (password !== confirmPassword) {
        throw new Error("Password and confirm password do not match.");
      } else {
        localStorage.setItem("userDetails", JSON.stringify(user));
        navigate("/user/passcode");
      }
    } catch (error) {
      getError(error);
    }
  };

  const validatePassword = (value) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
      if(value.length === 0){
        setPasswordError('Password is required')
      }else if(!strongPasswordRegex.test(value)){
        setPasswordError(
          "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character."
        );
      }else {
        setPasswordError('')
      }
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)
    validatePassword(value)
  }

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
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <PhoneInput
          containerClass="input-border rounded-md"
          inputClass="w-100"
          inputStyle={{
            height: "2.7rem",
            border: "1px solid rgba(217, 217, 217, 1)",
            borderRadius: "4px",
            width: "100%",
          }}
          country="au"
          onlyCountries={["au"]}
          enableSearch={true}
          countryCodeEditable={false}
          onChange={(phone, countryData) => {
            setMobile({
              mobile: phone.replace(countryData.dialCode, ""),
              dialCode: countryData.dialCode,
            });
          }}
          inputProps={{
            name: "phone",
            required: true,
          }}
          className="mb-3"
        />

        <FormField
          type={"password"}
          placeholder={"Password"}
          required
          value={password}
          onChange={handlePasswordChange}
        />

        {/* <div style={{color:'red', fontSize:'12px', marginBottom:'4px'}}>{passwordError}</div> */}
        <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
          {passwordError}
        </Form.Control.Feedback>

        <FormField
          type={"password"}
          placeholder={"Confirm Password"}
          value={confirmPassword}
          required
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
              className="float-sm-end w-100"
              style={{
                background: "var(--primary-color)",
                fontWeight: 700,
                fontSize: "12px",
                padding: "10px",
              }}
              disabled={passwordError.length > 0}
            >
              Continue
            </Button>
          </Col>
        </Row>
      </Form>
    </LoginCard>
  );
}

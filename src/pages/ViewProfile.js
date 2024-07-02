import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaRegEnvelope } from "react-icons/fa";
import { MotionDiv } from "../components";
import FormField from "../components/layout/FormField";

function ViewProfile() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);
  // console.log(user);

  const handlePassword = async (e) => {
    e.preventDefault();
  };

  return (
    <MotionDiv>
      <h3 className="text-center my-3">Admin Profile</h3>
      <Row
        className="p-2 "
        style={{ backgroundColor: "rgba(238, 244, 255, 1)" }}
      >
        <Col className="text-center">
          <h3>{user?.name && user.name}</h3>
          <p>
            <FaRegEnvelope /> {user?.email && user.email}
          </p>
        </Col>
      </Row>

      <Form onSubmit={handlePassword}>
        <Row className="p-2 ">
          <Col>
            <FormField
              type={"password"}
              placeholder={"********"}
              label={"Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
          <Col>
            <FormField
              type={"password"}
              placeholder={"********"}
              label={"Confirm Password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="p-2">
          <Col sm={4}>
            <Button
              type="submit"
              className="float-sm-end w-100 "
              style={{ background: "rgba(0, 0, 139, 1)" }}
            >
              Change Password
            </Button>
            {/* {isLoading ? (
                  <Button type="submit" className="float-sm-end" disabled>
                    <Spinner animation="border" size="sm" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="float-sm-end w-100 "
                    style={{ background: "rgba(0, 0, 139, 1)" }}
                  >
                    Sign In As Admin
                  </Button>
                )} */}
          </Col>
        </Row>
      </Form>
    </MotionDiv>
  );
}

export default ViewProfile;

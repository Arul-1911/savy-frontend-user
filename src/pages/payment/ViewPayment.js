import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { FaPhoneVolume, FaRegEnvelope } from "react-icons/fa";
import { MotionDiv } from "../../components";
import { imgAddr } from "../../features/apiSlice";

function ViewPayment() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("profDetails"));
    setUser(userData);
  }, []);

  const professorName = localStorage.getItem("professorName");
  const professorEmail = localStorage.getItem("professorEmail");

  //   console.log(user);

  return (
    <MotionDiv>
      <h3 className="text-center my-3">User Details</h3>
      <Row
        className="p-2"
        style={{ backgroundColor: "rgba(238, 244, 255, 1)" }}
      >
        <Col md={5} className="text-end">
          <Image
            src={user?.user?.profile_url && imgAddr + user.user.profile_url}
            style={{ aspectRatio: "1/1", height: "90px", borderRadius: "50%" }}
          />
          <br />
        </Col>
        <Col>
          <h3>
            {user?.user?.first_name &&
              user.user.first_name + " " + user.user.last_name}
          </h3>
          <p className="m-0">
            <FaPhoneVolume /> +{user?.user?.mobile && user.user.mobile.slice(2)}
          </p>
          <p>
            <FaRegEnvelope /> {user?.user?.email && user.user.email}
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center my-3">
        <Col lg={4}>
          <p className="my-3">
            <span className="fw-bold">Domain Selected:</span>{" "}
            {user?.domain && user.domain?.domain_name}
          </p>
          <p className="my-3">
            <span className="fw-bold">Prof Name:</span>{" "}
            {professorName && professorName}
          </p>
          <p className="my-3">
            <span className="fw-bold">Prof Email:</span>{" "}
            {professorEmail && professorEmail}
          </p>
          <p className="my-3">
            <span className="fw-bold">Area Of Speciality:</span>{" "}
            {user?.subdomain && user.subdomain?.sub_domain_name}
          </p>
        </Col>
        <Col lg={4}>
          <p className="my-3">
            <span className="fw-bold">Plan Selected:</span> £
            {user?.amount && user.amount}
          </p>
          <p className="my-3">
            <span className="fw-bold">Plan Start Date:</span>{" "}
            {user?.createdAt && user.createdAt.split("T")[0]}
          </p>
          <p className="my-3">
            <span className="fw-bold">Plan Validity:</span>{" "}
            {user?.validity && user.validity} days
          </p>
        </Col>
      </Row>
    </MotionDiv>
  );
}

export default ViewPayment;

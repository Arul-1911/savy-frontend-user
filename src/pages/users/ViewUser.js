import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { FaPhoneVolume, FaRegEnvelope } from "react-icons/fa";
import { MotionDiv } from "../../components";
import { imgAddr } from "../../features/apiSlice";

function ViewUser() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userDetails"));
    setUser(userData);
  }, []);

  const professorName = localStorage.getItem("professorName");
  const professorEmail = localStorage.getItem("professorEmail");

  return (
    <MotionDiv>
      <h3 className="text-center my-3">User Details</h3>
      <Row
        className="p-2"
        style={{ backgroundColor: "rgba(238, 244, 255, 1)" }}
      >
        <Col md={5} className="text-end">
          <Image
            src={user.profile_url && imgAddr + user.profile_url}
            style={{ aspectRatio: "1/1", height: "90px", borderRadius: "50%" }}
          />
          <br />
        </Col>
        <Col>
          <h3>{user.first_name && user.first_name + user.last_name}</h3>
          <p className="m-0">
            <FaPhoneVolume /> +{user.mobile && user.mobile.slice(2)}
          </p>
          <p>
            <FaRegEnvelope /> {user.email && user.email}
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center my-4">
        <Col lg={4}>
          <p className="my-3">
            <span className="fw-bold">Domain Selected:</span>{" "}
            {user.domain && user.domain?.domain_name}
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
            {user.subdomain && user.subdomain.sub_domain_name}
          </p>
        </Col>
        <Col lg={4}>
          <p className="my-3">
            <span className="fw-bold">Plan Selected:</span> £
            {user?.active_transactions && user.active_transactions[0]?.amount}
          </p>
          <p className="my-3">
            <span className="fw-bold">Plan Start Date:</span>{" "}
            {user?.active_transactions &&
              user?.active_transactions[0]?.createdAt.split("T")[0]}
          </p>
          <p className="my-3">
            <span className="fw-bold">Plan Validity:</span>{" "}
            {user?.active_transactions &&
              user?.active_transactions[0]?.validity}{" "}
            days
          </p>
        </Col>
      </Row>
    </MotionDiv>
  );
}

export default ViewUser;

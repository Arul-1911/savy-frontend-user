import React from "react";
import { Card, CardBody } from "react-bootstrap";

const DashboardCard = ({ children, height, width }) => {
  return (
    <Card
      style={{
        height: height,
        width: width,
        borderRadius: "20px",
        backgroundColor: "rgba(255, 255, 255, 1)",
        border: "none",
      }}
      className=""
    >
      <CardBody className="">{children}</CardBody>
    </Card>
  );
};

export default DashboardCard;

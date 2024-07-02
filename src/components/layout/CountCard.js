import React from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import FormField from "./FormField";
import { BsThreeDotsVertical } from "react-icons/bs";

function CountCard({
  title,
  count,
  viewDetails,
  textColor = "#000",
  report,
  loading = false,
}) {
  return (
    <Col md={!report && 3} className=" mb-2">
      <Card className="shadow border-0" style={{ height: "100%" }}>
        <Card.Body>
          <Row>
            <Col style={{ color: "#475467" }}>
              {" "}
              <p
                style={{
                  fontSize: "14px",
                }}
              >
                {title}
              </p>
            </Col>
            {viewDetails && (
              <Col className="text-end">
                <Button
                  variant="transparent"
                  className=" py-0 border text-nowrap"
                  onClick={viewDetails}
                >
                  View Details{" "}
                  <BsThreeDotsVertical className="mb-1" size={"0.9rem"} />{" "}
                </Button>
              </Col>
            )}
          </Row>
          <Row>
            <Col>
              {!loading ? (
                <h3 style={{ color: textColor }}>{count}</h3>
              ) : (
                <Spinner size="sm" />
              )}
            </Col>
            <Col lg={6} md={12}>
              {/* <FormField type={'dropdown'} options={[{label:'Week'},{label:'Month'},{label:'Year'}]} /> */}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default CountCard;

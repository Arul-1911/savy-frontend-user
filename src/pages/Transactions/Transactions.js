import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import DashboardCard from "../../components/layout/DasboardCard";
import SearchField from "../../components/layout/SearchField";
import { MotionDiv } from "../../components";

const Transactions = () => {
  return (
    <MotionDiv>
      <Container>
        <h3
          style={{
            fontWeight: 600,
          }}
        >
          Transactions
        </h3>

        <Row className="mt-4">
          <Col>
            <DashboardCard>
              <div className="d-flex align-items-cente gap-3">
                <div className="w-25">
                  <SearchField />
                </div>
                <Image
                  style={{
                    color: "rgba(92, 182, 249, 1)",
                    fontWeight: 600,
                    fontSize: "16px",
                    backgroundColor: "rgba(242, 249, 255, 1)",
                    padding: "10px",
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                  src="/icons/calendar.png"
                  alt="..."
                />
                <Image
                  style={{
                    color: "rgba(92, 182, 249, 1)",
                    fontWeight: 600,
                    fontSize: "16px",
                    backgroundColor: "rgba(242, 249, 255, 1)",
                    padding: "10px",
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                  src="/icons/Filter.png"
                  alt="..."
                />
              </div>

              <div
                className="mt-4"
                style={{
                  color: "var(--primary-color)",
                  fontWeight: 600,
                  fontSize: "16px",
                }}
              >
                Today
              </div>

              <ul className="market mt-2">
                <li className="d-flex justify-content-between align-items-center ">
                  <div className="d-flex align-items-center gap-2">
                    <Image
                      width={"50px"}
                      height={"50px"}
                      style={{ borderRadius: "50%" }}
                      src="/icons/Rectangle 116.png"
                      alt="..."
                    />
                    <div>
                      <div
                        style={{
                          fontSize: "rgba(55, 73, 87, 1)",
                          fontSize: "16px",
                        }}
                      >
                        Trader Jane’s market
                      </div>
                      <div
                        style={{
                          fontSize: "rgba(55, 73, 87, 0.7)",
                          fontSize: "12px",
                          fontWeight: 400,
                        }}
                      >
                        at 14:30
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      color: "var(--primary-color)",
                      fontSize: "20px",
                      fontWeight: 800,
                    }}
                  >
                    -20.00 $
                  </div>
                </li>

                <li className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <Image
                      width={"50px"}
                      height={"50px"}
                      style={{ borderRadius: "50%" }}
                      src="/icons/Airbnb.png"
                      alt="..."
                    />
                    <div>
                      <div
                        style={{
                          fontSize: "rgba(55, 73, 87, 1)",
                          fontSize: "16px",
                        }}
                      >
                        C&C partners
                      </div>
                      <div
                        style={{
                          fontSize: "rgba(55, 73, 87, 0.7)",
                          fontSize: "12px",
                          fontWeight: 400,
                        }}
                      >
                        at 14:30
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      color: "var(--primary-color)",
                      fontSize: "20px",
                      fontWeight: 800,
                    }}
                  >
                    -20.00 $
                  </div>
                </li>

                <li className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <Image
                      width={"50px"}
                      height={"50px"}
                      style={{ borderRadius: "50%" }}
                      src="/icons/Rectangle 117.png"
                      alt="..."
                    />
                    <div>
                      <div
                        style={{
                          fontSize: "rgba(55, 73, 87, 1)",
                          fontSize: "16px",
                        }}
                      >
                        OW finance office
                      </div>
                      <div
                        style={{
                          fontSize: "rgba(55, 73, 87, 0.7)",
                          fontSize: "12px",
                          fontWeight: 400,
                        }}
                      >
                        at 14:30
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      color: "var(--primary-color)",
                      fontSize: "20px",
                      fontWeight: 800,
                    }}
                  >
                    -20.00 $
                  </div>
                </li>

                <li className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <Image
                      width={"50px"}
                      height={"50px"}
                      style={{ borderRadius: "50%" }}
                      src="/icons/Better Stack.png"
                      alt="..."
                    />
                    <div>
                      <div
                        style={{
                          fontSize: "rgba(55, 73, 87, 1)",
                          fontSize: "16px",
                        }}
                      >
                        Artsy Coffee Shop
                      </div>
                      <div
                        style={{
                          fontSize: "rgba(55, 73, 87, 0.7)",
                          fontSize: "12px",
                          fontWeight: 400,
                        }}
                      >
                        at 14:30
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      color: "var(--primary-color)",
                      fontSize: "20px",
                      fontWeight: 800,
                    }}
                  >
                    -20.00 $
                  </div>
                </li>
              </ul>

              <div
                className="mt-4"
                style={{
                  color: "var(--primary-color)",
                  fontWeight: 600,
                  fontSize: "16px",
                }}
              >
                Yesterday
              </div>

              <ul className="market mt-2">
                <li className="d-flex justify-content-between align-items-center ">
                  <div className="d-flex align-items-center gap-2">
                    <Image
                      width={"50px"}
                      height={"50px"}
                      style={{ borderRadius: "50%" }}
                      src="/icons/Rectangle 116.png"
                      alt="..."
                    />
                    <div>
                      <div
                        style={{
                          fontSize: "rgba(55, 73, 87, 1)",
                          fontSize: "16px",
                        }}
                      >
                        Trader Jane’s market
                      </div>
                      <div
                        style={{
                          fontSize: "rgba(55, 73, 87, 0.7)",
                          fontSize: "12px",
                          fontWeight: 400,
                        }}
                      >
                        at 14:30
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      color: "var(--primary-color)",
                      fontSize: "20px",
                      fontWeight: 800,
                    }}
                  >
                    -20.00 $
                  </div>
                </li>

                <li className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <Image
                      width={"50px"}
                      height={"50px"}
                      style={{ borderRadius: "50%" }}
                      src="/icons/Airbnb.png"
                      alt="..."
                    />
                    <div>
                      <div
                        style={{
                          fontSize: "rgba(55, 73, 87, 1)",
                          fontSize: "16px",
                        }}
                      >
                        C&C partners
                      </div>
                      <div
                        style={{
                          fontSize: "rgba(55, 73, 87, 0.7)",
                          fontSize: "12px",
                          fontWeight: 400,
                        }}
                      >
                        at 14:30
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      color: "var(--primary-color)",
                      fontSize: "20px",
                      fontWeight: 800,
                    }}
                  >
                    -20.00 $
                  </div>
                </li>

                <li className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <Image
                      width={"50px"}
                      height={"50px"}
                      style={{ borderRadius: "50%" }}
                      src="/icons/Rectangle 117.png"
                      alt="..."
                    />
                    <div>
                      <div
                        style={{
                          fontSize: "rgba(55, 73, 87, 1)",
                          fontSize: "16px",
                        }}
                      >
                        OW finance office
                      </div>
                      <div
                        style={{
                          fontSize: "rgba(55, 73, 87, 0.7)",
                          fontSize: "12px",
                          fontWeight: 400,
                        }}
                      >
                        at 14:30
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      color: "var(--primary-color)",
                      fontSize: "20px",
                      fontWeight: 800,
                    }}
                  >
                    -20.00 $
                  </div>
                </li>

                <li className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <Image
                      width={"50px"}
                      height={"50px"}
                      style={{ borderRadius: "50%" }}
                      src="/icons/Better Stack.png"
                      alt="..."
                    />
                    <div>
                      <div
                        style={{
                          fontSize: "rgba(55, 73, 87, 1)",
                          fontSize: "16px",
                        }}
                      >
                        Artsy Coffee Shop
                      </div>
                      <div
                        style={{
                          fontSize: "rgba(55, 73, 87, 0.7)",
                          fontSize: "12px",
                          fontWeight: 400,
                        }}
                      >
                        at 14:30
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      color: "var(--primary-color)",
                      fontSize: "20px",
                      fontWeight: 800,
                    }}
                  >
                    -20.00 $
                  </div>
                </li>
              </ul>
            </DashboardCard>
          </Col>
        </Row>
      </Container>
    </MotionDiv>
  );
};

export default Transactions;

import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import { IoIosArrowForward } from "react-icons/io";
import DashboardCard from "../../../components/layout/DasboardCard";

const NetWorth = () => {
  const arr = [
    {
      icons: "/icons/image 3.png",
      text: "ING Australia Orange Bank Accounts",
      subText: "Updated 4 minutes ago",
    },
    {
      icons: "/icons/image 3.png",
      text: "ING Australia Orange Bank Accounts",
      subText: "Updated 4 minutes ago",
    },
    {
      icons: "/icons/image 3.png",
      text: "ING Australia Orange Bank Accounts",
      subText: "Updated 4 minutes ago",
    },
  ];

  return (
    <div>
      <div className="mt-3 d-flex align-items-center justify-content-between net_worth">
        <div>
          <p style={{ fontWeight: 600, color: "rgba(0, 39, 91, 1)" }}>
            Net worth
          </p>
          <h3 style={{ fontWeight: 600, color: "var(--primary-color)" }}>
            $1,220.00
          </h3>
        </div>
        <div
          className="d-flex align-items-center"
          style={{
            paddingLeft: "30px",
            backgroundColor: "var(--primary-color)",
            height: "40px",
            width: "180px",
            borderRadius: "22px",
            fontSize: "12px",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          See financial reports <IoIosArrowForward size={16} />
        </div>
      </div>

      <Row className="mt-3 g-3">
        <Col>
          <DashboardCard>
            <div className="d-flex align-items-center justify-content-between">
              <h5
                style={{
                  fontWeight: 600,
                  color: "rgba(0, 39, 91, 1)",
                  fontSize: "18px",
                }}
              >
                Assets
              </h5>
              <p
                style={{
                  color: "var(--primary-color)",
                  fontWeight: 600,
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                N / A
              </p>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between">
              <h5 style={{ fontWeight: 600, color: "rgba(0, 39, 91, 1)" }}>
                Bank
              </h5>
              <p
                style={{
                  color: "rgba(58, 195, 172, 1)",
                  fontWeight: 600,
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                $7,441.81
              </p>
            </div>
            <hr />
            {arr?.map((data, idx) => {
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "rgba(245, 247, 248, 1)",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                  className="mt-3 d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex gap-2 align-items-center">
                    <Image
                      style={{
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                      }}
                      src={data?.icons}
                      alt="..."
                    />
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          color: "rgba(55, 73, 87, 1)",
                          fontSize: "12px",
                        }}
                      >
                        {data?.text}
                      </div>
                      <div
                        style={{
                          fontWeight: 600,
                          color: "rgba(159, 175, 198, 1)",
                          fontSize: "12px",
                        }}
                      >
                        {data?.subText}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      color: "var(--primary-color)",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    $100,000.00 <IoIosArrowForward size={16} />
                  </div>
                </div>
              );
            })}
            <div className="mt-3 text-center">
              <button
                className="py-2"
                style={{
                  backgroundColor: "rgba(0, 74, 173, 0.08)",
                  color: "var(--primary-color)",
                  borderRadius: "20px",
                  border: "1px solid rgba(0, 74, 173, 0.08)",
                }}
              >
                + Add Assets
              </button>
            </div>
          </DashboardCard>
        </Col>

        <Col>
          <DashboardCard>
            <div className="d-flex align-items-center justify-content-between">
              <h4
                style={{
                  fontWeight: 600,
                  color: "rgba(0, 39, 91, 1)",
                  fontSize: "18px",
                }}
              >
                Liabilities
              </h4>
              <p
                style={{
                  color: "var(--primary-color)",
                  fontWeight: 600,
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                N / A
              </p>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-center">
              <button
                style={{
                  border: "none",
                  borderRadius: "20px",
                  padding: "10px",
                  color: "var(--primary-color)",
                  fontWeight: 600,
                  fontSize: "16px",
                  cursor: "pointer",
                  marginTop: "100px",
                }}
              >
                + Add Liabilities
              </button>
            </div>
          </DashboardCard>
        </Col>
      </Row>
    </div>
  );
};

export default NetWorth;

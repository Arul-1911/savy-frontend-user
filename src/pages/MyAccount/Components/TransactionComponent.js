import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import DashboardCard from "../../../components/layout/DasboardCard";
import SearchField from "../../../components/layout/SearchField";

const TransactionsComponent = () => {
  const todayyesterdayTransaction = [
    {
      text: "Trader Jane’s market",
      subText: "at 14:30",
      icons: "/icons/Rectangle 116.png",
      amount: "$-20.00",
    },
    {
      text: "C&C partners",
      subText: "at 14:30",
      icons: "/icons/Airbnb.png",
      amount: "$-20.00",
    },
    {
      text: "OW finance office",
      subText: "at 14:30",
      icons: "/icons/Rectangle 117.png",
      amount: "$-20.00",
    },
    {
      text: "Trader Jane’s market",
      subText: "at 14:30",
      icons: "/icons/Better Stack.png",
      amount: "$-20.00",
    },
  ];

  return (
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
            {todayyesterdayTransaction?.map((trans, idx) => {
              return (
                <li
                  key={idx}
                  className="d-flex justify-content-between align-items-center "
                >
                  <div className="d-flex align-items-center gap-2">
                    <Image
                      width={"50px"}
                      height={"50px"}
                      style={{ borderRadius: "50%" }}
                      src={trans?.icons}
                      alt="..."
                    />
                    <div>
                      <div
                        style={{
                          fontSize: "rgba(55, 73, 87, 1)",
                          fontSize: "16px",
                        }}
                      >
                        {trans?.text}
                      </div>
                      <div
                        style={{
                          fontSize: "rgba(55, 73, 87, 0.7)",
                          fontSize: "12px",
                          fontWeight: 400,
                        }}
                      >
                        {trans?.subText}
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
                    {trans?.amount}
                  </div>
                </li>
              );
            })}
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
            {todayyesterdayTransaction?.map((trans, idx) => {
              return (
                <li
                  key={idx}
                  className="d-flex justify-content-between align-items-center "
                >
                  <div className="d-flex align-items-center gap-2">
                    <Image
                      width={"50px"}
                      height={"50px"}
                      style={{ borderRadius: "50%" }}
                      src={trans?.icons}
                      alt="..."
                    />
                    <div>
                      <div
                        style={{
                          fontSize: "rgba(55, 73, 87, 1)",
                          fontSize: "16px",
                        }}
                      >
                        {trans?.text}
                      </div>
                      <div
                        style={{
                          fontSize: "rgba(55, 73, 87, 0.7)",
                          fontSize: "12px",
                          fontWeight: 400,
                        }}
                      >
                        {trans?.subText}
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
                    {trans?.amount}
                  </div>
                </li>
              );
            })}
          </ul>
        </DashboardCard>
      </Col>
    </Row>
  );
};

export default TransactionsComponent;

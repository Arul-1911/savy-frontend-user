import React from "react";
import DashboardCard from "../../../components/layout/DasboardCard";
import { IoIosArrowUp, IoMdArrowUp } from "react-icons/io";
import { Col, Row, Image } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa6";
import { IoArrowDownSharp } from "react-icons/io5";
import BarsChart from "../../../components/Charts/BarsChart";

const MoneyInvsOutData = [
  { name: "Money In", uv: 4000 },
  { name: "Money Out", uv: 3000 },
];

const MoneyOutData = [
  { name: "Money In", uv: 6200 },
  { name: "Money Out", uv: 7000 },
  { name: "Money", uv: 5000 },
];

const OverView = () => {
  const mostChangedCategory = [
    {
      icon: "/icons/Merchant 1.png",
      text: "Salary/Regular income",
      subTexet: "Income",
    },
    {
      icon: "/icons/Merchent 2.png",
      text: "Salary/Regular income",
      subTexet: "Living",
    },
    {
      icon: "/icons/Merchent 3.png",
      text: "Groceries",
      subTexet: "Living",
    },
    {
      icon: "/icons/Merchant 1.png",
      text: "Salary/Regular income",
      subTexet: "Income",
    },
  ];

  const topCategory = [
    {
      icon: "/icons/Merchant 1.png",
      text: "Salary/Regular income",
      subTexet: "Income",
    },
    {
      icon: "/icons/Merchent 2.png",
      text: "Salary/Regular income",
      subTexet: "Living",
    },
    {
      icon: "/icons/Merchent 3.png",
      text: "Groceries",
      subTexet: "Living",
    },
    {
      icon: "/icons/Merchant 1.png",
      text: "Salary/Regular income",
      subTexet: "Income",
    },
  ];

  const recentTransactions = [
    {
      icon: "/icons/Merchant 1.png",
      text: "Carlin & Gazzard polvere nom 33 receipt",
      subTexet: "Income: Salary/Regular Income",
    },
    {
      icon: "/icons/Merchant 1.png",
      text: "Carlin & Gazzard polvere nom 33 receipt",
      subTexet: "Income: Salary/Regular Income",
    },
    {
      icon: "/icons/Merchant 1.png",
      text: "Carlin & Gazzard polvere nom 33 receipt",
      subTexet: "Income: Salary/Regular Income",
    },
    {
      icon: "/icons/Merchant 1.png",
      text: "Carlin & Gazzard polvere nom 33 receipt",
      subTexet: "Income: Salary/Regular Income",
    },
  ];

  return (
    <div>
      <div className="mt-4">
        <DashboardCard>
          <div className="d-flex align-items-center gap-3">
            <h3
              style={{
                fontWeight: 600,
              }}
            >
              Statistics
            </h3>
            <button
              className="d-flex gap-2 align-items-center"
              style={{
                padding: "8px",
                backgroundColor: "rgba(242, 249, 255, 1)",
                borderRadius: "22px",
                fontSize: "12px",
                color: "rgba(92, 182, 249, 1)",
                fontWeight: 600,
                cursor: "pointer",
                border: "1px solid rgba(92, 182, 249, 1)",
              }}
            >
              Past month <IoIosArrowUp size={18} />
            </button>
          </div>

          <Row className="d-flex gap-4 px-2 mt-3">
            <Col
              style={{
                backgroundColor: "rgba(245, 247, 248, 1)",
                borderRadius: "10px",
                padding: "10px",
                height: "300px",
              }}
            >
              <div className="d-flex justify-content-between">
                <div
                  style={{
                    color: "rgba(55, 73, 87, 1)",
                    fontSize: "12px",
                  }}
                >
                  Overspent
                </div>
                <div
                  style={{
                    color: "rgba(55, 73, 87, 0.7)",
                    fontSize: "12px",
                  }}
                >
                  08 Dec - 07 Jan
                </div>
              </div>
              <h3 style={{ fontWeight: 600, color: "rgba(0, 74, 173, 1)" }}>
                $4,400
              </h3>
              <div className="d-flex justify-content-center">
                <BarsChart
                  data={MoneyInvsOutData}
                  width={200}
                  height={220}
                  barWidth={50}
                  gradient={true}
                  cashflow={true}
                  gradientNumber={2}
                  barGrad1={"#3AC3AC"}
                  barGrad2={"#3AC3AC"}
                  barGrad3={"#374957"}
                  barGrad4={"#374957"}
                />
              </div>
            </Col>

            <Col
              style={{
                backgroundColor: "rgba(245, 247, 248, 1)",
                borderRadius: "10px",
                padding: "10px",
                height: "300px",
              }}
            >
              <div className="d-flex justify-content-between flex-wrap">
                <div
                  style={{
                    color: "rgba(55, 73, 87, 1)",
                    fontSize: "12px",
                  }}
                >
                  Money In
                </div>
                <div
                  style={{
                    color: "rgba(55, 73, 87, 0.7)",
                    fontSize: "12px",
                  }}
                >
                  08 Dec - 07 Jan
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between">
                <h3 style={{ fontWeight: 600, color: "rgba(0, 74, 173, 1)" }}>
                  $1,900
                </h3>

                <div
                  style={{ color: "rgba(58, 195, 172, 1)", fontSize: "14px" }}
                >
                  <IoMdArrowUp /> 53.8%
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <BarsChart
                  data={MoneyInvsOutData}
                  width={200}
                  height={220}
                  barWidth={50}
                  gradient={true}
                  cashflow={true}
                  gradientNumber={2}
                  barGrad1={"#3AC3AC"}
                  barGrad2={"#3AC3AC"}
                  barGrad3={"#374957"}
                  barGrad4={"#374957"}
                />
              </div>
            </Col>

            <Col
              style={{
                backgroundColor: "rgba(245, 247, 248, 1)",
                borderRadius: "10px",
                padding: "10px",
                height: "300px",
              }}
            >
              <div className="d-flex justify-content-between">
                <div
                  style={{
                    color: "rgba(55, 73, 87, 1)",
                    fontSize: "12px",
                  }}
                >
                  Money out
                </div>
                <div
                  style={{
                    color: "rgba(55, 73, 87, 0.7)",
                    fontSize: "12px",
                  }}
                >
                  08 Dec - 07 Jan
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <h3
                  style={{
                    fontWeight: 600,
                    color: "rgba(0, 74, 173, 1)",
                  }}
                >
                  $4,400
                </h3>

                <div
                  style={{ color: "rgba(255, 48, 55, 1)", fontSize: "14px" }}
                >
                  <IoArrowDownSharp /> 53.8%
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <BarsChart
                  data={MoneyOutData}
                  width={260}
                  height={220}
                  barWidth={50}
                  gradient={true}
                  cashflow={true}
                  gradientNumber={3}
                  barGrad1={"#004AAD"}
                  barGrad2={"#004AAD"}
                  barGrad3={"#004AAD"}
                  barGrad4={"#004AAD"}
                />
              </div>
            </Col>
          </Row>
        </DashboardCard>
      </div>
      <Row className="mt-4 g-3">
        <Col>
          <DashboardCard>
            <div className="d-flex align-items-center justify-content-between">
              <div
                style={{
                  color: "rgba(0, 39, 91, 1)",
                  fontWeight: 600,
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                Top categories
              </div>
              <p
                style={{
                  color: "rgba(92, 182, 249, 1)",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                View all
              </p>
            </div>

            <ul className="market mt-2">
              {topCategory?.map((data, idx) => {
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
                        src={data?.icon}
                        alt="..."
                      />
                      <div>
                        <div
                          style={{
                            fontSize: "rgba(55, 73, 87, 1)",
                            fontSize: "16px",
                          }}
                        >
                          {data?.text}
                        </div>
                        <div
                          style={{
                            fontSize: "rgba(55, 73, 87, 0.7)",
                            fontSize: "12px",
                            fontWeight: 400,
                          }}
                        >
                          {data?.subTexet}
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
                );
              })}
            </ul>
          </DashboardCard>
        </Col>

        <Col>
          <DashboardCard>
            <div className="d-flex align-items-center justify-content-between">
              <div
                style={{
                  color: "rgba(0, 39, 91, 1)",
                  fontWeight: 600,
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                categories with most changes
              </div>
              <p
                style={{
                  color: "rgba(92, 182, 249, 1)",
                  fontWeight: 600,
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                View all
              </p>
            </div>

            <ul className="market mt-2">
              {mostChangedCategory?.map((data, idx) => {
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
                        src={data?.icon}
                        alt="..."
                      />
                      <div>
                        <div
                          style={{
                            fontSize: "rgba(55, 73, 87, 1)",
                            fontSize: "16px",
                          }}
                        >
                          {data?.text}
                        </div>
                        <div
                          style={{
                            fontSize: "rgba(55, 73, 87, 0.7)",
                            fontSize: "12px",
                            fontWeight: 400,
                          }}
                        >
                          {data?.subTexet}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "20px",
                          fontWeight: 800,
                        }}
                      >
                        -20.00 $
                      </div>
                      <div
                        style={{
                          color: "rgba(58, 195, 172, 1)",
                          fontWeight: 400,
                          fontSize: "12px",
                          cursor: "pointer",
                          marginLeft: "20px",
                        }}
                      >
                        <FaArrowUp /> 231.25%
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </DashboardCard>
        </Col>
      </Row>

      <Row className="mt-4 g-3">
        <Col>
          <DashboardCard>
            <div className="d-flex align-items-center justify-content-between">
              <div
                style={{
                  color: "rgba(0, 39, 91, 1)",
                  fontWeight: 600,
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                Recent largest transactions
              </div>
              <p
                style={{
                  color: "rgba(92, 182, 249, 1)",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                View all
              </p>
            </div>

            <ul className="market mt-2">
              {recentTransactions?.map((data, idx) => {
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
                        src={data?.icon}
                        alt="..."
                      />
                      <div>
                        <div
                          style={{
                            fontSize: "rgba(55, 73, 87, 1)",
                            fontSize: "16px",
                          }}
                        >
                          {data?.text}
                        </div>
                        <div
                          style={{
                            fontSize: "rgba(55, 73, 87, 0.7)",
                            fontSize: "12px",
                            fontWeight: 400,
                          }}
                        >
                          {data?.subTexet}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "20px",
                          fontWeight: 800,
                        }}
                      >
                        -20.00 $
                      </div>
                      <div
                        style={{
                          color: "rgba(55, 73, 87, 0.7)",
                          fontWeight: 400,
                          fontSize: "12px",
                          cursor: "pointer",
                          marginLeft: "15px",
                        }}
                      >
                        26 Feb 2024
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </DashboardCard>
        </Col>

        <Col>
          <DashboardCard>
            <div className="d-flex align-items-center justify-content-between">
              <div
                style={{
                  color: "rgba(0, 39, 91, 1)",
                  fontWeight: 600,
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                Top merchents
              </div>
              <p
                style={{
                  color: "rgba(92, 182, 249, 1)",
                  fontWeight: 600,
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                View all
              </p>
            </div>

            <ul className="market mt-2">
              {mostChangedCategory?.map((data, idx) => {
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
                        src={data?.icon}
                        alt="..."
                      />
                      <div>
                        <div
                          style={{
                            fontSize: "rgba(55, 73, 87, 1)",
                            fontSize: "16px",
                          }}
                        >
                          {data?.text}
                        </div>
                        <div
                          style={{
                            fontSize: "rgba(55, 73, 87, 0.7)",
                            fontSize: "12px",
                            fontWeight: 400,
                          }}
                        >
                          {data?.subTexet}
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
                );
              })}
            </ul>
          </DashboardCard>
        </Col>
      </Row>
    </div>
  );
};

export default OverView;

import React, { useState } from "react";
import { MotionDiv } from "../../components";
import { Col, Container, Image, Row } from "react-bootstrap";
import DashboardCard from "../../components/layout/DasboardCard";
import { FaArrowUp } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { BarPlot } from "@mui/x-charts/BarChart";

const uData = [4000, 3000];
const xLabels = ["Page A", "Page B"];

const CashFlow = () => {
  const [accountPortfolioActive, setAccountPortfolioActive] = useState(1);

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
    <MotionDiv>
      <Container>
        <div className="d-flex justify-content-between flex-wrap">
          <h3
            style={{
              fontWeight: 600,
            }}
          >
            Cashflow
          </h3>
          <button
            className="d-flex align-items-center"
            style={{
              paddingLeft: "30px",
              backgroundColor: "rgba(242, 249, 255, 1)",
              height: "40px",
              width: "10%",
              borderRadius: "22px",
              fontSize: "12px",
              color: "var(--primary-color)",
              fontWeight: 600,
              cursor: "pointer",
              border: "1px solid rgba(224, 234, 255, 1)",
            }}
          >
            <IoSettingsOutline size={18} /> Settings
          </button>
        </div>

        <ul className="my_account_portfolio mt-2">
          <li
            onClick={() => setAccountPortfolioActive(1)}
            style={{
              borderBottom:
                accountPortfolioActive === 1
                  ? "2px solid rgba(0, 74, 173, 1)"
                  : "none",
              color:
                accountPortfolioActive === 1
                  ? "rgba(0, 74, 173, 1)"
                  : "rgba(55, 73, 87, 0.7)",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Overview
          </li>
          <li
            onClick={() => setAccountPortfolioActive(2)}
            style={{
              borderBottom:
                accountPortfolioActive === 2
                  ? "2px solid rgba(0, 74, 173, 1)"
                  : "none",
              color:
                accountPortfolioActive === 2
                  ? "rgba(0, 74, 173, 1)"
                  : "rgba(55, 73, 87, 0.7)",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            In
          </li>
          <li
            onClick={() => setAccountPortfolioActive(3)}
            style={{
              borderBottom:
                accountPortfolioActive === 3
                  ? "2px solid rgba(0, 74, 173, 1)"
                  : "none",
              color:
                accountPortfolioActive === 3
                  ? "rgba(0, 74, 173, 1)"
                  : "rgba(55, 73, 87, 0.7)",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Out
          </li>
          <li
            onClick={() => setAccountPortfolioActive(4)}
            style={{
              borderBottom:
                accountPortfolioActive === 4
                  ? "2px solid rgba(0, 74, 173, 1)"
                  : "none",
              color:
                accountPortfolioActive === 4
                  ? "rgba(0, 74, 173, 1)"
                  : "rgba(55, 73, 87, 0.7)",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Net
          </li>
        </ul>

        <div className="mt-4">
          <DashboardCard height="400px">
            <div className="d-flex align-items-center gap-3">
              <h3
                style={{
                  fontWeight: 600,
                }}
              >
                Cashflow
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
                    style={{ color: "rgba(55, 73, 87, 1)", fontSize: "12px" }}
                  >
                    Overspent
                  </div>
                  <div
                    style={{ color: "rgba(55, 73, 87, 0.7)", fontSize: "12px" }}
                  >
                    08 Dec - 07 Jan
                  </div>
                </div>
                <h3 style={{ fontWeight: 600, color: "rgba(0, 74, 173, 1)" }}>
                  $4,400
                </h3>
                <div className="d-flex justify-content-center">
                  <ChartContainer
                    width={200}
                    height={250}
                    series={[{ data: uData, label: "uv", type: "bar" }]}
                    xAxis={[{ scaleType: "band", data: xLabels }]}
                  >
                    <BarPlot />
                  </ChartContainer>
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
                    style={{ color: "rgba(55, 73, 87, 1)", fontSize: "12px" }}
                  >
                    Money In
                  </div>
                  <div
                    style={{ color: "rgba(55, 73, 87, 0.7)", fontSize: "12px" }}
                  >
                    08 Dec - 07 Jan
                  </div>
                </div>
                <h3 style={{ fontWeight: 600, color: "rgba(0, 74, 173, 1)" }}>
                  $1,900
                </h3>
                <div className="d-flex justify-content-center">
                  <ChartContainer
                    width={200}
                    height={250}
                    series={[{ data: uData, label: "uv", type: "bar" }]}
                    xAxis={[{ scaleType: "band", data: xLabels }]}
                  >
                    <BarPlot />
                  </ChartContainer>
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
                    style={{ color: "rgba(55, 73, 87, 1)", fontSize: "12px" }}
                  >
                    Money out
                  </div>
                  <div
                    style={{ color: "rgba(55, 73, 87, 0.7)", fontSize: "12px" }}
                  >
                    08 Dec - 07 Jan
                  </div>
                </div>
                <div className="">
                  <h3 style={{ fontWeight: 600, color: "rgba(0, 74, 173, 1)" }}>
                    $4,400
                  </h3>
                </div>

                <div className="d-flex justify-content-center">
                  <ChartContainer
                    width={200}
                    height={250}
                    colors={"#8884d8"}
                    series={[{ data: uData, label: "uv", type: "bar" }]}
                    xAxis={[{ scaleType: "band", data: xLabels }]}
                  >
                    <BarPlot />
                  </ChartContainer>
                </div>
              </Col>
            </Row>
          </DashboardCard>
        </div>

        <Row className="mt-4">
          <Col>
            <DashboardCard height="350px">
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
            <DashboardCard height="350px">
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
        <Row className="mt-4">
          <Col>
            <DashboardCard height="350px">
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
            <DashboardCard height="350px">
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
      </Container>
    </MotionDiv>
  );
};

export default CashFlow;

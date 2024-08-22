import React, { useState } from "react";
import {
  Carousel,
  Col,
  Container,
  Image,
  ProgressBar,
  Row,
} from "react-bootstrap";
// import Skeleton from "react-loading-skeleton";
// import { getError, toastOptions } from "../utils/error";
import { MotionDiv } from "../components";
import DashboardCard from "../components/layout/DasboardCard";
import "./Dashboard.css";
import SearchField from "../components/layout/SearchField";
import { Link } from "react-router-dom";
import BudgetComponents from "./DashboardComponents/BudgetComponents";
import UpcomingBillComponents from "./DashboardComponents/UpcomingBillComponent";
import PieCharts from "../components/Charts/PieChart";
import BarsChart from "../components/Charts/BarsChart";

const MoneyInvsOutData = [
  { name: "Money In", uv: 4000 },
  { name: "Money Out", uv: 3000 },
];

const MonthlyMoneyOutData = [
  { name: "Jan", uv: 4000 },
  { name: "Feb", uv: 3000 },
  { name: "Mar", uv: 8000 },
  { name: "Apr", uv: 6000 },
  { name: "May", uv: 3000 },
  { name: "Jun", uv: 11000 },
  { name: "July", uv: 9000 },
  { name: "Aug", uv: 2000 },
  { name: "Sep", uv: 3500 },
  { name: "Oct", uv: 4500 },
  { name: "Nov", uv: 5500 },
  { name: "Dec", uv: 2000 },
];

const data = [
  {
    name: "Shopping",
    value: 7000,
  },
  {
    name: "Food",
    value: 4567,
  },
  {
    name: "Bills",
    value: 2398,
  },
  {
    name: "Benzin",
    value: 3908,
  },
  {
    name: "Others",
    value: 4800,
  },
];

const COLORS = [
  { start: "rgba(36, 204, 167, 1)", end: "rgba(74, 86, 226, 1)" },
  { start: "rgba(36, 204, 167, 1)", end: "rgba(36, 204, 167, 1)" },
  { start: "rgba(36, 204, 167, 0.7)", end: "rgba(36, 204, 167, 0.7)" },
  { start: "rgba(36, 204, 167, 0.4)", end: "rgba(36, 204, 167, 0.4)" },
  { start: "rgba(36, 204, 167, 0.2)", end: "rgba(36, 204, 167, 0.2)" },
];

export default function Dashboard() {
  const [accountPortfolioActive, setAccountPortfolioActive] = useState(1);
  const [expenseActive, setExpenseActive] = useState(1);

  const [showBudget, setShowBudget] = useState(false);
  const [showActiveBudget, setShowActiveBudget] = useState(1);

  const [showBills, setShowBills] = useState(false);
  const [showActiveBills, setShowActiveBills] = useState(1);

  const upcomingPayments = [
    {
      icons: "/icons/disnep.png",
      text: "Disney+",
      subText: "5th of every month",
      amount: "-$30.00",
    },
    {
      icons: "/icons/spotify.png",
      text: "Spotify",
      subText: "18th of every month",
      amount: "-$30.00",
    },
    {
      icons: "/icons/amazon.png",
      text: "Amazon",
      subText: "10th of May, every year",
      amount: "-$30.00",
    },
  ];

  return (
    <MotionDiv>
      <Container fluid>
        <h2
          style={{
            fontWeight: 600,
          }}
          className="my-2"
        >
          Hello! <span style={{ color: "rgba(55, 73, 87, 0.6)" }}>Krishna</span>
        </h2>
        <Row className="g-3">
          <Col>
            <DashboardCard height={"380px"}>
              <h4 style={{ fontWeight: 600, color: "rgba(0, 39, 91, 1)" }}>
                Account Portfolio
              </h4>
              <ul className="account_portfolio_active">
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
                  Saving account
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
                  Credit Cards
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
                  Money In vs Out
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
                  Monthly Money Out
                </li>
              </ul>

              {accountPortfolioActive === 1 && (
                <div
                  className="mt-3"
                  style={{
                    backgroundColor: "rgba(245, 247, 248, 1)",
                    height: "260px",
                    borderRadius: "10px",
                    padding: "20px",
                  }}
                >
                  <div
                    className="mt-5"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          color: "rgba(0, 74, 173, 0.7)",
                          fontSize: "12px",
                        }}
                      >
                        Total amount
                      </div>
                      <div
                        style={{
                          color: "var(--primary-color",
                          fontWeight: 700,
                          fontSize: "30px",
                        }}
                      >
                        $ 4000
                      </div>
                    </div>

                    <Image
                      width={"100px"}
                      height={"100px"}
                      src="/images/money.png"
                      alt="..."
                    />
                  </div>
                  <div className="w-75">
                    <ProgressBar now={60} label={`${60}%`} visuallyHidden />
                  </div>
                </div>
              )}

              {accountPortfolioActive === 2 && (
                <div
                  className="mt-3"
                  style={{
                    backgroundColor: "rgba(245, 247, 248, 1)",
                    height: "260px",
                    borderRadius: "10px",
                    padding: "20px",
                  }}
                >
                  <div
                    className="mt-5"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          color: "rgba(0, 74, 173, 0.7)",
                          fontSize: "12px",
                        }}
                      >
                        Total amount
                      </div>
                      <div
                        style={{
                          color: "var(--primary-color",
                          fontWeight: 700,
                          fontSize: "30px",
                        }}
                      >
                        $6,770
                      </div>
                    </div>

                    <Image
                      width={"100px"}
                      height={"100px"}
                      src="/images/money.png"
                      alt="..."
                    />
                  </div>
                </div>
              )}

              {accountPortfolioActive === 3 && (
                <div
                  className="mt-3"
                  style={{
                    backgroundColor: "rgba(245, 247, 248, 1)",
                    height: "260px",
                    borderRadius: "10px",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          color: "var(--primary-color)",
                          fontWeight: 600,
                          fontSize: "16px",
                        }}
                      >
                        This month
                      </div>
                      <BarsChart
                        data={MoneyInvsOutData}
                        width={200}
                        height={220}
                        cashFlow={true}
                        barWidth={45}
                        gradient={true}
                        gradientNumber={12}
                        barGrad1={"#004AAD"}
                        barGrad2={"#3AC3AC"}
                        barGrad3={"#004AAD"}
                        barGrad4={"#DC5A5A"}
                      />
                    </div>
                    <div>
                      <div
                        className="px-4 py-2 mb-3"
                        style={{
                          backgroundColor: "rgba(249, 252, 255, 1)",
                          border: "2px solid rgba(226, 242, 255, 1)",
                          borderRadius: "10px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "10px",
                            color: "var(--primary-color)",
                            textAlign: "end",
                          }}
                        >
                          Total Money In:
                        </div>
                        <div
                          style={{
                            backgroundImage:
                              "linear-gradient(270deg, #5CB6F9 0%, #004AAD 100%)",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                            fontSize: "20px",
                            fontWeight: 600,
                          }}
                        >
                          30.000,00$
                        </div>
                      </div>

                      <div
                        className="px-4 py-2 mb-3"
                        style={{
                          backgroundColor: "rgba(249, 252, 255, 1)",
                          border: "2px solid rgba(226, 242, 255, 1)",
                          borderRadius: "10px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "10px",
                            color: "var(--primary-color)",
                            textAlign: "end",
                          }}
                        >
                          Money Out:
                        </div>
                        <div
                          style={{
                            backgroundImage:
                              "linear-gradient(270deg, #DC5A5B -4.02%, #004AAD 105.17%)",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                            fontSize: "20px",
                            fontWeight: 600,
                          }}
                        >
                          20.000,00$
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {accountPortfolioActive === 4 && (
                <div
                  className="mt-3"
                  style={{
                    backgroundColor: "rgba(245, 247, 248, 1)",
                    height: "260px",
                    borderRadius: "10px",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      color: "var(--primary-color)",
                      fontWeight: 600,
                      fontSize: "16px",
                    }}
                  >
                    This Year
                  </div>

                  <div className="d-flex justify-content-center">
                    <BarsChart
                      data={MonthlyMoneyOutData}
                      barWidth={30}
                      width={"100%"}
                      height={220}
                      cashFlow={true}
                      gradient={true}
                      gradientNumber={12}
                      barGrad1={"#5CB6F9"}
                      barGrad2={"#004AAD"}
                      barGrad3={"#5CB6F9"}
                      barGrad4={"#004AAD"}
                    />
                  </div>
                </div>
              )}
            </DashboardCard>
          </Col>

          <Col>
            <DashboardCard height={"380px"}>
              <div className="d-flex align-items-center justify-content-between">
                <h4 style={{ fontWeight: 600, color: "rgba(0, 39, 91, 1)" }}>
                  Expenses
                </h4>
                <p
                  style={{
                    color: "rgba(92, 182, 249, 1)",
                    fontWeight: 600,
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  See more
                </p>
              </div>
              <ul className="account_portfolio_active px-5">
                <li
                  onClick={() => setExpenseActive(1)}
                  style={{
                    borderBottom:
                      expenseActive === 1
                        ? "2px solid rgba(0, 74, 173, 1)"
                        : "none",
                    color:
                      expenseActive === 1
                        ? "rgba(0, 74, 173, 1)"
                        : "rgba(55, 73, 87, 0.7)",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Money out
                </li>
                <li
                  onClick={() => setExpenseActive(2)}
                  style={{
                    borderBottom:
                      expenseActive === 2
                        ? "2px solid rgba(0, 74, 173, 1)"
                        : "none",
                    color:
                      expenseActive === 2
                        ? "rgba(0, 74, 173, 1)"
                        : "rgba(55, 73, 87, 0.7)",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Upcoming payments
                </li>
                <li
                  onClick={() => setExpenseActive(3)}
                  style={{
                    borderBottom:
                      expenseActive === 3
                        ? "2px solid rgba(0, 74, 173, 1)"
                        : "none",
                    color:
                      expenseActive === 3
                        ? "rgba(0, 74, 173, 1)"
                        : "rgba(55, 73, 87, 0.7)",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Money In
                </li>
              </ul>

              <div className="mt-2">
                {expenseActive === 1 && (
                  <div className="d-flex justify-content-end">
                    <PieCharts
                      COLORS={COLORS}
                      data={data}
                      cornerRadius={10}
                      height={280}
                      width={500}
                    />
                  </div>
                )}

                {expenseActive === 2 && (
                  <>
                    {upcomingPayments.map((paymt) => {
                      return (
                        <div
                          className="d-flex align-items-center justify-content-between mt-2"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(245, 247, 248, 1)",
                            padding: "10px",
                          }}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <Image
                              style={{
                                objectFit: "contain",
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                              }}
                              src={paymt?.icons}
                              alt="..."
                            />
                            <div>
                              <div
                                style={{
                                  fontSize: "12px",
                                  color: "rgba(55, 73, 87, 1)",
                                  fontWeight: 600,
                                }}
                              >
                                {paymt?.text}
                              </div>
                              <div
                                style={{
                                  fontSize: "10px",
                                  color: "rgba(55, 73, 87, 0.8)",
                                }}
                              >
                                {paymt?.subText}
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              fontSize: "14px",
                              color: "var(--primary-color)",
                              fontWeight: 600,
                            }}
                          >
                            {paymt?.amount}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}

                {expenseActive === 3 && (
                  <Carousel>
                    <Carousel.Item>
                      <div className="d-flex flex-column justify-content-center mt-5">
                        <BarsChart
                          data={MonthlyMoneyOutData}
                          barWidth={30}
                          width={"100%"}
                          height={220}
                          cashFlow={true}
                          gradient={true}
                          gradientNumber={12}
                          moneyIn={true}
                          barGrad1={"#5CB6F9"}
                          barGrad2={"#004AAD"}
                          barGrad3={" #5CB6F9"}
                          barGrad4={"#004AAD"}
                        />
                      </div>
                    </Carousel.Item>
                    <Carousel.Item>
                      <Row className="d-flex justify-content-between gap-3 px-3 mt-2">
                        <Col
                          className="p-3"
                          style={{
                            backgroundColor: "rgba(245, 247, 248, 1)",
                            borderRadius: "10px",
                          }}
                        >
                          <div
                            style={{
                              color: "#4A7EC4",
                              fontSize: "12px",
                              fontWeight: 700,
                            }}
                          >
                            Bank
                          </div>
                          <div
                            style={{
                              color: "var(--primary-color)",
                              fontSize: "18px",
                              fontWeight: 700,
                            }}
                          >
                            $20,000.00
                          </div>
                        </Col>

                        <Col
                          className="p-3"
                          style={{
                            backgroundColor: "rgba(245, 247, 248, 1)",
                            borderRadius: "10px",
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: "#F5F7F8",
                              color: "rgba(92, 182, 249, 0.8)",
                              fontSize: "12px",
                              fontWeight: 700,
                            }}
                          >
                            Net worth
                          </div>
                          <div
                            style={{
                              backgroundColor: "#F5F7F8",
                              color: "#5CB6F9",
                              fontSize: "18px",
                              fontWeight: 700,
                            }}
                          >
                            $20,000.00
                          </div>
                        </Col>
                      </Row>

                      <Row className="d-flex justify-content-between gap-3 mt-4 px-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <div
                            style={{
                              fontWeight: 600,
                              fontSize: "14px",
                              color: "var(--primary-color)",
                            }}
                          >
                            Cashflow
                          </div>
                          <div
                            style={{
                              fontWeight: 600,
                              fontSize: "12px",
                              color: "rgba(92, 182, 249, 1)",
                            }}
                          >
                            View
                          </div>
                        </div>

                        <div
                          style={{
                            backgroundColor: "#F5F7F8",
                            borderRadius: "10px",
                          }}
                          className="d-flex justify-content-around align-items-center p-2"
                        >
                          <div style={{ color: "#3AC3AC" }}>
                            <div style={{ fontSize: "12px", fontWeight: 400 }}>
                              Money in
                            </div>
                            <div style={{ fontSize: "14px", fontWeight: 600 }}>
                              $1,900
                            </div>
                            <div style={{ fontSize: "12px", fontWeight: 400 }}>
                              53.8%
                            </div>
                          </div>

                          <div>
                            <div style={{ fontSize: "12px", fontWeight: 400 }}>
                              Money out
                            </div>
                            <div style={{ fontSize: "14px", fontWeight: 600 }}>
                              -$3,286
                            </div>
                            <div style={{ fontSize: "12px", fontWeight: 400 }}>
                              53.8%
                            </div>
                          </div>

                          <div
                            style={{
                              color: "var(--primary-color)",
                            }}
                          >
                            <div style={{ fontSize: "12px", fontWeight: 400 }}>
                              Over spent
                            </div>
                            <div style={{ fontSize: "14px", fontWeight: 600 }}>
                              $1,386
                            </div>
                          </div>
                        </div>
                      </Row>
                    </Carousel.Item>
                  </Carousel>
                )}
              </div>
            </DashboardCard>
          </Col>
        </Row>

        <Row className="g-3 mt-2">
          <Col>
            <DashboardCard>
              <div className="d-flex align-items-center justify-content-between">
                <h4 style={{ fontWeight: 600, color: "rgba(0, 39, 91, 1)" }}>
                  Net worth
                </h4>
                <p
                  style={{
                    color: "var(--primary-color)",
                    fontWeight: 600,
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  View
                </p>
              </div>

              <div className="mt-4">
                <div
                  style={{
                    color: "rgba(116, 141, 174, 1)",
                    fontWeight: 600,
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Net Worth
                </div>

                <div
                  className="mt-2"
                  style={{
                    color: "var(--primary-color)",
                    fontWeight: 600,
                    fontSize: "30px",
                    cursor: "pointer",
                  }}
                >
                  $ 1,220.00
                </div>
              </div>

              <div className="mt-5 d-flex justify-content-between">
                <div
                  style={{
                    color: "rgba(121, 144, 176, 1)",
                    fontSize: "16px",
                  }}
                >
                  Assets
                </div>{" "}
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "16px",
                  }}
                >
                  $1219.92
                </div>
              </div>

              <div className="mt-4 d-flex justify-content-between">
                <div
                  style={{
                    color: "rgba(121, 144, 176, 1)",
                    fontSize: "16px",
                  }}
                >
                  Liabilities
                </div>{" "}
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "16px",
                  }}
                >
                  $0.8
                </div>
              </div>
            </DashboardCard>
          </Col>

          <Col>
            <DashboardCard>
              <h4 style={{ fontWeight: 600, color: "rgba(0, 39, 91, 1)" }}>
                Budget
              </h4>

              <div className="mt-5 d-flex justify-content-between align-items-center">
                <div>
                  <h3
                    style={{
                      fontWeight: 600,
                      color: "var(--primary-color)",
                      borderRadius: "20px",
                    }}
                  >
                    5 days
                  </h3>
                  <p
                    style={{
                      fontWeight: 600,
                      color: "rgba(159, 175, 198, 1)",
                      fontSize: "12px",
                    }}
                  >
                    Left for this week’s budget
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: "rgba(92, 182, 249, 0.08)",
                    color: "rgba(92, 182, 249, 1)",
                    fontSize: "12px",
                    padding: "8px",
                    borderRadius: "20px",
                  }}
                >
                  1 active budget
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(245, 247, 248, 1)",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <div className=" d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <Image src="/images/Rectangle 116.png" alt="..." />
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          color: "rgba(55, 73, 87, 1)",
                          fontSize: "12px",
                        }}
                      >
                        Cafes & Coffee
                      </div>
                      <div
                        style={{
                          fontWeight: 600,
                          color: "rgba(159, 175, 198, 1)",
                          fontSize: "12px",
                        }}
                      >
                        $20 spent of 50
                      </div>
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        color: "rgba(92, 182, 249, 1)",
                        fontSize: "12px",
                      }}
                    >
                      $30.00
                    </div>

                    <div
                      style={{
                        color: "rgba(55, 73, 87, 0.8)",
                        fontSize: "12px",
                      }}
                    >
                      remaining
                    </div>
                  </div>
                </div>
                <div className="mt-1">
                  <ProgressBar now={60} label={`${60}%`} visuallyHidden />
                </div>
              </div>

              <div className="mt-3 text-center">
                <Link
                  onClick={() => setShowBudget(true)}
                  style={{
                    color: "var(--primary-color)",
                    fontSize: "14px",
                    fontWeight: 400,
                    textDecoration: "underline",
                  }}
                  to=""
                >
                  View budget
                </Link>
              </div>
            </DashboardCard>
          </Col>

          <Col style={{ cursor: "pointer" }} onClick={() => setShowBills(true)}>
            <DashboardCard>
              <h4 style={{ fontWeight: 600, color: "rgba(0, 39, 91, 1)" }}>
                Upcoming Bills
              </h4>

              <div className="d-flex align-items-center flex-column mt-4">
                <div
                  style={{
                    backgroundColor: "rgba(224, 234, 255, 1)",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    padding: "10px",
                  }}
                >
                  <Image src="/icons/Bills.png" alt="..." />
                </div>

                <h3
                  className="text-center mt-4"
                  style={{
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "var(--primary-color)",
                  }}
                >
                  Don’t miss a bill
                </h3>

                <div
                  className="text-center px-5 mt-4"
                  style={{
                    fontWeight: 400,
                    fontSize: "16px",
                  }}
                >
                  Track your bills and other known recurring expenses - We’ll
                  remind you before they’re due.
                </div>
              </div>
            </DashboardCard>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <DashboardCard>
              <div className="d-flex align-items-center justify-content-between">
                <div className="w-25">
                  <SearchField />
                </div>
                <p
                  style={{
                    color: "rgba(92, 182, 249, 1)",
                    fontWeight: 600,
                    fontSize: "16px",
                    backgroundColor: "rgba(242, 249, 255, 1)",
                    padding: "10px",
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                >
                  View all
                </p>
              </div>

              <div
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
            </DashboardCard>
          </Col>
        </Row>
      </Container>

      {/* Budget */}
      <BudgetComponents
        show={showBudget}
        hide={setShowBudget}
        active={showActiveBudget}
        activeLink={setShowActiveBudget}
      />

      {/* Upcoming bills */}
      <UpcomingBillComponents
        show={showBills}
        hide={setShowBills}
        active={showActiveBills}
        activeLink={setShowActiveBills}
      />
    </MotionDiv>
  );
}

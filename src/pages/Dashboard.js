import React, { useState } from "react";
import { Col, Container, Image, ProgressBar, Row } from "react-bootstrap";
// import Skeleton from "react-loading-skeleton";
// import { getError, toastOptions } from "../utils/error";
import { MotionDiv } from "../components";
import DashboardCard from "../components/layout/DasboardCard";
import "./Dashboard.css";
import SearchField from "../components/layout/SearchField";
import Stack from "@mui/material/Stack";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarPlot, ChartContainer } from "@mui/x-charts";
import { Link } from "react-router-dom";
import BudgetComponents from "./DashboardComponents/BudgetComponents";
import UpcomingBillComponents from "./DashboardComponents/UpcomingBillComponent";

const data = [
  { label: "Group A", value: 550, color: "rgba(74, 86, 226, 1)" },
  { label: "Group B", value: 450, color: "rgba(36, 204, 167, 1)" },
  { label: "Group C", value: 350, color: "rgba(36, 204, 167, 0.7)" },
  { label: "Group D", value: 350, color: "rgba(36, 204, 167, 0.4)" },
  { label: "Group E", value: 250, color: "rgba(36, 204, 167, 0.2)" },
];

const uData = [4000, 3000];
const xLabels = ["Page A", "Page B"];

const Data = [
  82000, 30000, 44545, 78344, 93885, 64587, 54589, 47477, 34393, 56409, 84934,
];
const Labels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
  "Page H",
  "Page I",
  "Page J",
  "Page K",
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
            <DashboardCard>
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
                  Monthly money out
                </li>
              </ul>

              {accountPortfolioActive === 1 && (
                <div
                  className="mt-2"
                  style={{
                    backgroundColor: "rgba(245, 247, 248, 1)",
                    height: "200px",
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
                  className="mt-2"
                  style={{
                    backgroundColor: "rgba(245, 247, 248, 1)",
                    height: "200px",
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
                  className="mt-2"
                  style={{
                    backgroundColor: "rgba(245, 247, 248, 1)",
                    height: "200px",
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
                        This time
                      </div>
                      <ChartContainer
                        width={200}
                        height={200}
                        colors={["rgba(0, 74, 173, 1)"]}
                        series={[{ data: uData, label: "uv", type: "bar" }]}
                        xAxis={[{ scaleType: "band", data: xLabels }]}
                      >
                        <BarPlot borderRadius={10} />
                      </ChartContainer>
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
                  className="mt-2"
                  style={{
                    backgroundColor: "rgba(245, 247, 248, 1)",
                    height: "200px",
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
                    <ChartContainer
                      width={500}
                      height={200}
                      colors={["rgba(74, 86, 226, 1)"]}
                      series={[{ data: Data, label: "uv", type: "bar" }]}
                      xAxis={[{ scaleType: "band", data: Labels }]}
                    >
                      <BarPlot borderRadius={10} />
                    </ChartContainer>
                  </div>
                </div>
              )}
            </DashboardCard>
          </Col>

          <Col>
            <DashboardCard>
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
                  <Stack direction="row">
                    <PieChart
                      series={[
                        {
                          paddingAngle: 2,
                          innerRadius: 45,
                          outerRadius: 100,
                          cornerRadius: 10,
                          data,
                        },
                      ]}
                      margin={{ right: 5 }}
                      width={200}
                      height={200}
                      legend={{ hidden: true }}
                    />
                  </Stack>
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
                  <div className="d-flex justify-content-center ">
                    <ChartContainer
                      width={500}
                      height={250}
                      colors={["rgba(74, 86, 226, 1)"]}
                      series={[{ data: Data, label: "uv", type: "bar" }]}
                      xAxis={[{ scaleType: "band", data: Labels }]}
                    >
                      <BarPlot borderRadius={10} />
                    </ChartContainer>
                  </div>
                )}
              </div>
            </DashboardCard>
          </Col>
        </Row>

        <Row className="g-3 mt-2">
          <Col>
            <DashboardCard height="300px">
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
                    color: "var(--primary-color)",
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
            <DashboardCard height="300px">
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
            <DashboardCard height="300px">
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
                  className="text-center mt-3"
                  style={{
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "var(--primary-color)",
                  }}
                >
                  Don’t miss a bill
                </h3>

                <div
                  className="text-center px-5"
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

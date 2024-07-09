import React, { useState } from "react";
import {
  Card,
  CardBody,
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
import Stack from "@mui/material/Stack";
import { PieChart } from "@mui/x-charts/PieChart";

const data = [
  { label: "Group A", value: 400, color: "#0088FE" },
  { label: "Group B", value: 300, color: "#00C49F" },
  { label: "Group C", value: 300, color: "#FFBB28" },
  { label: "Group D", value: 200, color: "#FF8042" },
];

export default function Dashboard() {
  const [accountPortfolioActive, setAccountPortfolioActive] = useState(1);
  const [expenseActive, setExpenseActive] = useState(1);

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
        <Row>
          <Col>
            <DashboardCard height="300px">
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
            </DashboardCard>
          </Col>

          <Col>
            <DashboardCard height="300px">
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
              </div>
            </DashboardCard>
          </Col>
        </Row>

        <Row className="mt-4">
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
            </DashboardCard>
          </Col>

          <Col>
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
            <DashboardCard height="350px">
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
    </MotionDiv>
  );
}

import React, { useEffect, useState } from "react";
import {
  Carousel,
  Col,
  Container,
  Image,
  ProgressBar,
  Row,
} from "react-bootstrap";
import { MotionDiv } from "../components";
import DashboardCard from "../components/layout/DasboardCard";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import BudgetComponents from "./DashboardComponents/BudgetComponents";
import UpcomingBillComponents from "./DashboardComponents/UpcomingBillComponent";
import PieCharts from "../components/Charts/PieChart";
import BarsChart from "../components/Charts/BarsChart";
import {
  imgAddr,
  useDashboardDataMutation,
  useGetAssetsLiabilitiesMutation,
  useGetBillsMutation,
  useGetCustomizeDashboardQuery,
} from "../features/apiSlice";
import { getError } from "../utils/error";
import { formatDate } from "../components/FormateDateTime/FormatDateTime";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDisabled } from "../features/dashBoardSlice";
import { getDateRanges } from "../components/DateRange/DateRange";

const COLORS = [
  { start: "rgba(36, 204, 167, 1)", end: "rgba(74, 86, 226, 1)" },
  { start: "rgba(36, 204, 167, 1)", end: "rgba(36, 204, 167, 1)" },
  { start: "rgba(36, 204, 167, 0.7)", end: "rgba(36, 204, 167, 0.7)" },
  { start: "rgba(36, 204, 167, 0.4)", end: "rgba(36, 204, 167, 0.4)" },
  { start: "rgba(36, 204, 167, 0.2)", end: "rgba(36, 204, 167, 0.2)" },
];

export default function Dashboard() {
   const {period} = useSelector((state) => state.period )
  const [dashboardData, { isLoading }] = useDashboardDataMutation();
  const { data: dashBoardSettings, isLoading: getCustomDashboardLoading } =
    useGetCustomizeDashboardQuery();

  const [getBills, { isLoading: billLoading }] = useGetBillsMutation();
  const [getAssetsLiabilities, { isLoading: assetsLoading }] =
    useGetAssetsLiabilitiesMutation();
  const [accountPortfolioActive, setAccountPortfolioActive] = useState(1);
  const [expenseActive, setExpenseActive] = useState(1);

  const [showBudget, setShowBudget] = useState(false);
  const [showActiveBudget, setShowActiveBudget] = useState(1);

  const [showBills, setShowBills] = useState(false);
  const [showActiveBills, setShowActiveBills] = useState(1);

  const [dashboard, setDashboard] = useState({});
  const [bills, setBills] = useState();
  const [totalNetWorth, setTotalNetWorth] = useState(0);
  const [totalAssetsAmount, setTotalAssestAmount] = useState(0);
  const [totalLiabilitiesAmount, setTotalLiabilitiesAmount] = useState(0);
  const [currNetWorth, setCurrNetWorth] = useState(0);

  const dispatch = useDispatch();

  
  const disabled = useSelector((state) => state?.dashBoard?.disabled);

  useEffect(() => {
    if (dashBoardSettings) {
      dispatch(setDisabled(dashBoardSettings?.dashboard?.disabled || []));
    }
  }, [dashBoardSettings, dispatch]);

  // console.log(disabled, "disabled");

    const dateRange = getDateRanges(period)

  useEffect(() => {
    getDashboardData();
    getAllAssetsLibilities();
  }, [period]);

  useEffect(() => {
    if (expenseActive === 2) {
      getUpcomingBills();
    }
  }, [expenseActive]);

  const getUpcomingBills = async () => {
    try {
      const { bills } = await getBills({
        currentStart: dateRange?.currentStart,
        currentEnd: dateRange?.currentEnd,
      }).unwrap();
      setBills(bills);
    } catch (error) {
      getError(error);
    }
  };

  const getDashboardData = async () => {
    try {
      const { data } = await dashboardData({
        currentStart: dateRange?.currentStart,
        currentEnd: dateRange?.currentEnd,
      });
      setDashboard(data?.dashboardData);
      setTotalNetWorth(data?.dashboardData?.card1?.["Total amount"] || 0);
    } catch (error) {
      getError(error);
    }
  };

  const getAllAssetsLibilities = async () => {
    try {
      const data = await getAssetsLiabilities().unwrap();
      setTotalAssestAmount(data?.totalAssetsAmount || 0);
      setTotalLiabilitiesAmount(data?.totalLiabilitiesAmount || 0);
    } catch (error) {
      getError(error);
    }
  };

  useEffect(() => {
    setCurrNetWorth(totalNetWorth + totalAssetsAmount - totalLiabilitiesAmount);
  }, [totalNetWorth, totalAssetsAmount, totalLiabilitiesAmount]);

  const isCardDisabled = (cardname) => {
    return disabled?.includes(cardname)
  }

  return (
    <MotionDiv>
      <Container fluid>
        {!isLoading ? (
          <h2
            style={{
              fontWeight: 600,
            }}
            className="my-2"
          >
            Hello!{" "}
            <span style={{ color: "rgba(55, 73, 87, 0.6)" }}>
              {dashboard?.userName}
            </span>
          </h2>
        ) : (
          <Skeleton className="rounded-2 mb-2" height={"40px"} width={"100%"} />
        )}
        <Row className="g-3">
          {!isLoading ? (
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
                    <div className="mt-5 d-flex align-items-center justify-content-between">
                      <div>
                        <div
                          style={{
                            color: "rgba(0, 74, 173, 0.7)",
                            fontSize: "16px",
                            fontWeight: 600,
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
                          ${dashboard?.card1?.["Total amount"]}
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
                    <div className="mt-5 d-flex align-items-center justify-content-between">
                      <div>
                        <div
                          style={{
                            color: "rgba(0, 74, 173, 0.7)",
                            fontSize: "16px",
                            fontWeight: 600,
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
                          ${dashboard?.card1?.["Credit Card"]}
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
                      height: "270px",
                      borderRadius: "10px",
                      padding: "20px",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
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
                          data={dashboard?.card1?.moneyInVsMoneyOut}
                          width={200}
                          height={220}
                          moneyInvsOut={true}
                          color={COLORS}
                          barWidth={50}
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
                              fontWeight: 600,
                            }}
                          >
                            Total Money In:
                          </div>
                          <div
                            className="text-end"
                            style={{
                              backgroundImage:
                                "linear-gradient(270deg, #5CB6F9 0%, #004AAD 100%)",
                              WebkitBackgroundClip: "text",
                              color: "transparent",
                              fontSize: "20px",
                              fontWeight: 600,
                            }}
                          >
                            {dashboard?.card1?.moneyInVsMoneyOut[0].uv}$
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
                              fontWeight: 600,
                            }}
                          >
                            Money Out:
                          </div>
                          <div
                            className="text-end"
                            style={{
                              backgroundImage:
                                "linear-gradient(270deg, #DC5A5B -4.02%, #004AAD 105.17%)",
                              WebkitBackgroundClip: "text",
                              color: "transparent",
                              fontSize: "20px",
                              fontWeight: 600,
                            }}
                          >
                            {dashboard?.card1?.moneyInVsMoneyOut[1].uv}$
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
                      height: "270px",
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
                        data={dashboard?.card1?.monthlyMoneyOut}
                        barWidth={30}
                        width={"100%"}
                        height={220}
                        moneyInvsOut={true}
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
          ) : (
            <Col className={`p-2`}>
              <Skeleton className="rounded-4" height={"350px"} width={"100%"} />
            </Col>
          )}

          {!isLoading ? (
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
                    <Link to={"/user/cashflow"}>See more</Link>
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
                        data={dashboard?.moneyOutGraph}
                        cornerRadius={10}
                        height={280}
                        width={500}
                      />
                    </div>
                  )}

                  {expenseActive === 2 && (
                    <>
                      {!billLoading ? (
                        bills?.slice(0, 4)?.map((paymt) => {
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
                                    objectFit: "cover",
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                  }}
                                  src={imgAddr + paymt?.category?.image}
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
                                    {paymt?.category?.name}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: "10px",
                                      color: "rgba(55, 73, 87, 0.8)",
                                    }}
                                  >
                                    {/* {paymt?.category} */}
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
                                ${paymt?.budget_amount}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <Col className={`p-2`}>
                          <Skeleton
                            className="rounded-2"
                            height={"250px"}
                            width={"100%"}
                          />
                        </Col>
                      )}
                    </>
                  )}

                  {expenseActive === 3 && (
                    <Carousel
                      prevIcon={false}
                      nextIcon={false}
                      touch={true}
                      interval={3000}
                      controls={false}
                    >
                      <Carousel.Item>
                        <div className="d-flex flex-column justify-content-center mt-5">
                          <BarsChart
                            data={dashboard?.card2?.monthlyMoneyIn}
                            barWidth={30}
                            width={"100%"}
                            height={220}
                            moneyInvsOut={true}
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
                      {/* <Carousel.Item>
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
                              ${dashboard?.card1?.["Total amount"]}
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
                              ${dashboard?.card1?.["Total amount"]}
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
                                cursor: "pointer",
                                fontWeight: 600,
                                fontSize: "14px",
                                color: "rgba(92, 182, 249, 1)",
                              }}
                            >
                              <Link to={"/user/cashflow"}>View</Link>
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
                              <div
                                style={{ fontSize: "12px", fontWeight: 400 }}
                              >
                                Money in
                              </div>
                              <div
                                style={{ fontSize: "14px", fontWeight: 600 }}
                              >
                                ${dashboard?.card1?.moneyInVsMoneyOut[0].uv}
                              </div>
                              <div
                                style={{ fontSize: "12px", fontWeight: 400 }}
                              >
                                53.8%
                              </div>
                            </div>

                            <div>
                              <div
                                style={{ fontSize: "12px", fontWeight: 400 }}
                              >
                                Money out
                              </div>
                              <div
                                style={{ fontSize: "14px", fontWeight: 600 }}
                              >
                                ${dashboard?.card1?.moneyInVsMoneyOut[1].uv}
                              </div>
                              <div
                                style={{ fontSize: "12px", fontWeight: 400 }}
                              >
                                53.8%
                              </div>
                            </div>

                            <div
                              style={{
                                color: "var(--primary-color)",
                              }}
                            >
                              <div
                                style={{ fontSize: "12px", fontWeight: 400 }}
                              >
                                Over spent
                              </div>
                              <div
                                style={{ fontSize: "14px", fontWeight: 600 }}
                              >
                                $1,386
                              </div>
                            </div>
                          </div>
                        </Row>
                      </Carousel.Item> */}
                    </Carousel>
                  )}
                </div>
              </DashboardCard>
            </Col>
          ) : (
            <Col className={`p-2`}>
              <Skeleton className="rounded-4" height={"350px"} width={"100%"} />
            </Col>
          )}
        </Row>

        <Row className="g-3 mt-2">
          {!isLoading ? (
            <>
              <Col>
                <DashboardCard>
                  <div className="d-flex align-items-center justify-content-between">
                    <h4
                      style={{ fontWeight: 600, color: "rgba(0, 39, 91, 1)" }}
                    >
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
                      <Link to={"/user/my-account"}>View</Link>
                    </p>
                  </div>

                  <div className="mt-2">
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
                      {/* ${dashboard?.card1?.["Total amount"]} */}
                      {`$${currNetWorth}`}
                    </div>
                  </div>

                  <div className="mt-3 d-flex justify-content-between">
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
                      {/* ${dashboard?.card1?.["Total amount"]} */}
                      {`$${totalAssetsAmount}`}
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
                      {`$${totalLiabilitiesAmount}`}
                    </div>
                  </div>
                </DashboardCard>
              </Col>

              {!isCardDisabled("My Budget") && (
                <Col>
                  <DashboardCard>
                    <h4
                      style={{ fontWeight: 600, color: "rgba(0, 39, 91, 1)" }}
                    >
                      Budget
                    </h4>

                    {dashboard?.budgets?.length > 0 ? (
                      !isLoading ? (
                        dashboard?.budgets?.map((data) => {
                          return (
                            <div
                              className="mt-3"
                              style={{
                                backgroundColor: "rgba(245, 247, 248, 1)",
                                padding: "10px",
                                borderRadius: "10px",
                              }}
                            >
                              <div className=" d-flex justify-content-between align-items-center">
                                <div className="d-flex gap-2 align-items-center">
                                  <Image
                                    style={{
                                      width: "35px",
                                      height: "35px",
                                      objectFit: "cover",
                                      borderRadius: "50%",
                                    }}
                                    src={
                                      data?.category?.image
                                        ? imgAddr + data?.category?.image
                                        : "/images/Rectangle 116.png"
                                    }
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
                                      {data?.category?.name}
                                    </div>
                                    <div
                                      style={{
                                        fontWeight: 600,
                                        color: "rgba(159, 175, 198, 1)",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {/* $20 spent of {data?.budget_amount} */}
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <div
                                    className="text-end"
                                    style={{
                                      color: "rgba(92, 182, 249, 1)",
                                      fontSize: "12px",
                                    }}
                                  >
                                    $ {data?.budget_amount}
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
                            </div>
                          );
                        })
                      ) : (
                        [1, 2].map((_, i) => (
                          <Col key={i} className={`p-2`}>
                            <Skeleton
                              className="rounded-2"
                              height={"40px"}
                              width={"100%"}
                            />
                          </Col>
                        ))
                      )
                    ) : (
                      <div
                        className="mt-3"
                        style={{ fontSize: "16px", fontWeight: 600 }}
                      >
                        No Budget Added!
                      </div>
                    )}

                    <div className="mt-3 text-center">
                      <Link
                        onClick={() => setShowBudget(true)}
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "16px",
                          fontWeight: 600,
                          textDecoration: "underline",
                        }}
                        to=""
                      >
                        View budget
                      </Link>
                    </div>
                  </DashboardCard>
                </Col>
              )}

              {!isCardDisabled("Upcoming Bills") && (
                <Col>
                  <DashboardCard>
                    <h4
                      style={{ fontWeight: 600, color: "rgba(0, 39, 91, 1)" }}
                    >
                      Upcoming Bills
                    </h4>

                    {dashboard?.bills?.length > 0 ? (
                      !isLoading ? (
                        dashboard?.bills?.map((data) => {
                          return (
                            <div
                              className="mt-3"
                              style={{
                                backgroundColor: "rgba(245, 247, 248, 1)",
                                padding: "10px",
                                borderRadius: "10px",
                              }}
                            >
                              <div className=" d-flex justify-content-between align-items-center">
                                <div className="d-flex gap-2 align-items-center">
                                  <Image
                                    style={{
                                      width: "35px",
                                      height: "35px",
                                      objectFit: "cover",
                                      borderRadius: "50%",
                                    }}
                                    src={
                                      data?.category?.image
                                        ? imgAddr + data?.category?.image
                                        : "/images/Rectangle 116.png"
                                    }
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
                                      {data?.category?.name}
                                    </div>
                                    <div
                                      style={{
                                        fontWeight: 600,
                                        color: "rgba(159, 175, 198, 1)",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {/* $20 spent of {data?.budget_amount} */}
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <div
                                    className="text-end"
                                    style={{
                                      color: "rgba(92, 182, 249, 1)",
                                      fontSize: "12px",
                                    }}
                                  >
                                    $ {data?.budget_amount}
                                  </div>

                                  <div
                                    style={{
                                      color: "rgba(55, 73, 87, 0.8)",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {/* remaining */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        [1, 2].map((_, i) => (
                          <Col key={i} className={`p-2`}>
                            <Skeleton
                              className="rounded-2"
                              height={"40px"}
                              width={"100%"}
                            />
                          </Col>
                        ))
                      )
                    ) : (
                      <div
                        className="mt-3"
                        style={{ fontSize: "16px", fontWeight: 600 }}
                      >
                        No Bills Added!
                      </div>
                    )}

                    <div className="mt-3 text-center">
                      <Link
                        onClick={() => setShowBills(true)}
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "16px",
                          fontWeight: 600,
                          textDecoration: "underline",
                        }}
                        to=""
                      >
                        View bills
                      </Link>
                    </div>
                  </DashboardCard>
                </Col>
              )}
            </>
          ) : (
            [1, 2, 3].map((_, i) => (
              <Col key={i} className={`p-2`}>
                <Skeleton
                  className="rounded-2"
                  height={"300px"}
                  width={"100%"}
                />
              </Col>
            ))
          )}
        </Row>

        {!isCardDisabled("Recent Transactions") && (
          <Row className="mt-4">
            <Col>
              <DashboardCard>
                <div className="d-flex align-items-center justify-content-between">
                  <h4 style={{ fontWeight: 600, color: "rgba(0, 39, 91, 1)" }}>
                    Transactions
                  </h4>
                  <div
                    className="px-3 py-1"
                    style={{
                      color: "rgba(92, 182, 249, 1)",
                      fontWeight: 600,
                      fontSize: "12px",
                      backgroundColor: "rgba(242, 249, 255, 1)",
                      borderRadius: "20px",
                      cursor: "pointer",
                    }}
                  >
                    <Link to={"/user/transactions"}>View all</Link>
                  </div>
                </div>

                <ul className="market mt-2">
                  {!isLoading ? (
                    dashboard?.transactions?.length > 0 ? (
                      dashboard?.transactions?.map((data, idx) => {
                        return (
                          <li
                            key={idx}
                            className="d-flex justify-content-between align-items-center "
                          >
                            <div className="d-flex align-items-center gap-2">
                              <Image
                                width={"35px"}
                                height={"35px"}
                                style={{
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                                src={
                                  data?.category?.image
                                    ? imgAddr + data?.category?.image
                                    : "/icons/Rectangle 116.png"
                                }
                                alt="..."
                              />
                              <div>
                                <div
                                  style={{
                                    fontSize: "16px",
                                  }}
                                >
                                  {data?.description}
                                </div>
                                <div
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: 400,
                                  }}
                                >
                                  at {formatDate(data?.date)}
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
                              {data?.amount} $
                            </div>
                          </li>
                        );
                      })
                    ) : (
                      <li className="text-center">No transactions found</li>
                    )
                  ) : (
                    [1, 2, 3, 4, 5].map((_, i) => (
                      <Col key={i} className={`p-2`}>
                        <Skeleton
                          className="rounded-2"
                          height={"40px"}
                          width={"100%"}
                        />
                      </Col>
                    ))
                  )}
                </ul>
              </DashboardCard>
            </Col>
          </Row>
        )}
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

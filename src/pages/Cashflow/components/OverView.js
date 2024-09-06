import React from "react";
import DashboardCard from "../../../components/layout/DasboardCard";
import { IoIosArrowUp, IoMdArrowUp } from "react-icons/io";
import { Col, Row, Image } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa6";
import { IoArrowDownSharp } from "react-icons/io5";
import BarsChart from "../../../components/Charts/BarsChart";
import Skeleton from "react-loading-skeleton";

const MoneyInvsOutData = [
  { name: "Money In", uv: 4000 },
  { name: "Money Out", uv: 3000 },
];

const OverView = ({ data, loading }) => {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

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
            {!loading ? (
              <>
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
                      width={340}
                      height={220}
                      barWidth={50}
                      gradient={true}
                      cashFlow={true}
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
                      This month
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between">
                    <h3
                      style={{ fontWeight: 600, color: "rgba(0, 74, 173, 1)" }}
                    >
                      ${data?.moneyIn?.graphData[1]?.uv}
                    </h3>

                    <div
                      style={
                        data?.moneyIn?.percent && data?.moneyIn?.percent > 0
                          ? { color: "rgba(58, 195, 172, 1)", fontSize: "14px" }
                          : { color: "rgba(255, 48, 55, 1)", fontSize: "14px" }
                      }
                    >
                      {data?.moneyIn?.percent && data?.moneyIn?.percent > 0 ? (
                        <>
                          <IoMdArrowUp /> {data?.moneyIn?.percent}%
                        </>
                      ) : (
                        <>
                          <IoArrowDownSharp /> {data?.moneyIn?.percent}%
                        </>
                      )}
                    </div>
                  </div>

                  <div className="d-flex justify-content-center">
                    <BarsChart
                      data={data?.moneyIn?.graphData}
                      width={340}
                      height={220}
                      barWidth={50}
                      gradient={true}
                      cashFlow={true}
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
                      ${data?.moneyOut?.graphData[1]?.uv}
                    </h3>

                    <div
                      style={
                        data?.moneyOut?.percent && data?.moneyOut?.percent > 0
                          ? { color: "rgba(58, 195, 172, 1)", fontSize: "14px" }
                          : { color: "rgba(255, 48, 55, 1)", fontSize: "14px" }
                      }
                    >
                      {data?.moneyOut?.percent &&
                        (data?.moneyOut?.percent > 0 ? (
                          <>
                            <IoMdArrowUp /> {data?.moneyOut?.percent}%
                          </>
                        ) : (
                          <>
                            <IoArrowDownSharp /> {data?.moneyOut?.percent}%
                          </>
                        ))}
                    </div>
                  </div>

                  <div className="d-flex justify-content-center">
                    <BarsChart
                      data={data?.moneyOut?.graphData}
                      width={340}
                      height={220}
                      barWidth={50}
                      gradient={true}
                      cashFlow={true}
                      gradientNumber={2}
                      barGrad1={"#3AC3AC"}
                      barGrad2={"#3AC3AC"}
                      barGrad3={"#374957"}
                      barGrad4={"#374957"}
                    />
                  </div>
                </Col>
              </>
            ) : (
              [1, 2, 3].map((_, i) => (
                <Col key={i} className={`p-2 `}>
                  <Skeleton
                    className="rounded-4"
                    height={"350px"}
                    width={"100%"}
                  />
                </Col>
              ))
            )}
          </Row>
        </DashboardCard>
      </div>
      <Row className="mt-2 g-2">
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
              <div
                style={{
                  color: "rgba(92, 182, 249, 1)",
                  fontWeight: 500,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                View all
              </div>
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
              <div
                style={{
                  color: "rgba(92, 182, 249, 1)",
                  fontWeight: 500,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                View all
              </div>
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

      <Row className="mt-2 g-2">
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
              <div
                style={{
                  color: "rgba(92, 182, 249, 1)",
                  fontWeight: 500,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                View all
              </div>
            </div>

            <ul className="market mt-2">
              {data?.largeTransaction?.map((data, idx) => {
                return (
                  <li
                    key={idx}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center gap-2 w-75">
                      <Image
                        width={"50px"}
                        height={"50px"}
                        style={{ borderRadius: "50%" }}
                        src="/icons/Merchant 1.png"
                        alt="..."
                      />
                      <div>
                        <div
                          className="w-75 text-truncate"
                          style={{
                            fontSize: "rgba(55, 73, 87, 1)",
                            fontSize: "16px",
                          }}
                        >
                          {data?.description}
                        </div>
                        <div
                          style={{
                            fontSize: "rgba(55, 73, 87, 0.7)",
                            fontSize: "12px",
                            fontWeight: 400,
                          }}
                        >
                          {data?.direction}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex flex-column align-items-end">
                      <div
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "20px",
                          fontWeight: 800,
                        }}
                      >
                        {data?.amount} $
                      </div>
                      <div
                        style={{
                          color: "rgba(55, 73, 87, 0.7)",
                          fontWeight: 400,
                          fontSize: "12px",
                        }}
                      >
                        {formatDate(data?.time)}
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
              <div
                style={{
                  color: "rgba(92, 182, 249, 1)",
                  fontWeight: 500,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                View all
              </div>
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

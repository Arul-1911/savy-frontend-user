import React from "react";
import DashboardCard from "../../../components/layout/DasboardCard";
import { IoIosArrowUp } from "react-icons/io";
import { Col, Row, Image } from "react-bootstrap";
import { CiCalendar } from "react-icons/ci";
import { IoInformationCircleOutline } from "react-icons/io5";
import SearchField from "../../../components/layout/SearchField";
import { BarChart } from "@mui/x-charts/BarChart";

// const pData = [2400, 1398, -9800, 3908, 4800, -3800, 4300];
const uData = [4000, -3000, -2000, 2780, -1890, 2390, 3490];

const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

const NetWorth = () => {
  const recentTransactions = [
    {
      icon: "/icons/Merchant 1.png",
      text: "Carlin & Gazzard polvere nom 33 receipt",
      parcentage: "99.69%",
    },
    {
      icon: "/icons/Merchant 1.png",
      text: "Carlin & Gazzard polvere nom 33 receipt",
      parcentage: "99.69%",
    },
    {
      icon: "/icons/Merchant 1.png",
      text: "Carlin & Gazzard polvere nom 33 receipt",
      parcentage: "99.69%",
    },
  ];

  return (
    <div>
      <div className="mt-4">
        <DashboardCard>
          <div className="d-flex align-items-center flex-wrap gap-3">
            <h3
              style={{
                fontWeight: 600,
              }}
            >
              Statistics /{" "}
              <span style={{ color: "rgba(0, 39, 91, 0.6)" }}>Bucket</span>
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
              Bucket <IoIosArrowUp size={18} />
            </button>

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
            <Col>
              <div
                style={{
                  color: "rgba(55, 73, 87, 1)",
                  fontSize: "12px",
                }}
              >
                Total
              </div>
              <h3
                className="mt-2"
                style={{ fontWeight: 600, color: "rgba(0, 74, 173, 1)" }}
              >
                $1,820.00
              </h3>
              <hr />

              <div className="d-flex justify-content-between align-items-center">
                <div
                  style={{
                    color: "rgba(55, 73, 87, 0.7)",
                    fontSize: "12px",
                  }}
                >
                  More than last period
                </div>
                <div
                  style={{
                    color: "rgba(55, 73, 87, 1)",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  $5,459.75
                </div>
              </div>

              <div className="mt-3 d-flex justify-content-between align-items-center">
                <div
                  style={{
                    color: "rgba(55, 73, 87, 0.7)",
                    fontSize: "12px",
                  }}
                >
                  Last period
                </div>
                <div
                  style={{
                    color: "rgba(55, 73, 87, 1)",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  $5,459.75
                </div>
              </div>
            </Col>

            <Col>
              <BarChart
                width={500}
                height={300}
                series={[
                  // { data: pData, label: "pv", id: "pvId", stack: "stack1" },
                  { data: uData, label: "uv", id: "uvId", stack: "stack1" },
                ]}
                xAxis={[{ data: xLabels, scaleType: "band" }]}
              />
            </Col>
          </Row>
        </DashboardCard>
      </div>

      <Row className="mt-3 ">
        <Col>
          <DashboardCard>
            <div
              style={{
                color: "rgba(0, 39, 91, 1)",
                fontWeight: 600,
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              Buckets
            </div>

            <div className="d-flex align-items-center  gap-3">
              <div className="w-25">
                <SearchField />
              </div>
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
                <CiCalendar size={18} /> 8 feb today
              </button>

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
                Amount <IoIosArrowUp size={18} />
              </button>
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

                      <div
                        style={{
                          fontSize: "rgba(55, 73, 87, 1)",
                          fontSize: "16px",
                        }}
                      >
                        {data?.text}
                      </div>
                    </div>

                    <div>{data?.parcentage}</div>

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

      <Row className="mt-3">
        <Col>
          <DashboardCard>
            <div className="text-center">
              <div
                style={{
                  color: "rgba(0, 39, 91, 1)",
                  fontWeight: 600,
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                All internal transfers between your accounts have been excluded
                from your Cashflow.
              </div>
              <div
                className="mt-4"
                style={{
                  color: "rgba(92, 182, 249, 1)",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                <IoInformationCircleOutline
                  color="rgba(0, 74, 173, 1)"
                  cursor={"pointer"}
                />{" "}
                How do excluded transactions work?
              </div>
            </div>
          </DashboardCard>
        </Col>
      </Row>
    </div>
  );
};

export default NetWorth;

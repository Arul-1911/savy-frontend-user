import React, { useState } from "react";
import DashboardCard from "../../../components/layout/DasboardCard";
import { IoIosArrowUp } from "react-icons/io";
import { Col, Row, Image } from "react-bootstrap";
import { CiCalendar } from "react-icons/ci";
import Stack from "@mui/material/Stack";
import { PieChart } from "@mui/x-charts/PieChart";
import { IoInformationCircleOutline } from "react-icons/io5";
import SearchField from "../../../components/layout/SearchField";
import BucketComponet from "./SubComponents/BucketComponet";
import { BarPlot, ChartContainer } from "@mui/x-charts";
import ExcludeTransaction from "./SubComponents/ExcludeTransaction";
import PieCharts from "../../../components/Charts/PieChart";
import BarsChart from "../../../components/Charts/BarsChart";

const Data = [82000, 30000, 44545, 78344];
const Labels = ["Page A", "Page B", "Page C", "Page D"];

const data1 = [
  {
    name: "More than last period",
    value: 7000,
  },
  {
    name: "Last period",
    value: 4567,
  },
];

const data3 = [
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

const COLORS1 = [
  { start: "rgba(36, 204, 167, 1)", end: "rgba(74, 86, 226, 1)" },
  { start: "rgba(36, 204, 167, 1)", end: "rgba(36, 204, 167, 1)" },
  { start: "rgba(36, 204, 167, 0.7)", end: "rgba(36, 204, 167, 0.7)" },
  { start: "rgba(36, 204, 167, 0.4)", end: "rgba(36, 204, 167, 0.4)" },
  { start: "rgba(36, 204, 167, 0.2)", end: "rgba(36, 204, 167, 0.2)" },
];

const COLORS = [
  { start: "rgba(92, 182, 249, 1)", end: "rgba(0, 74, 173, 1)" },
  { start: "rgba(58, 195, 172, 1)", end: "rgba(58, 195, 172, 1)" },
];

const MoneyInvsOutData = [
  { name: "Money In", uv: 4000 },
  { name: "Money Out", uv: 3000 },
  { name: "Money Out", uv: 2000 },
  { name: "Money Out", uv: 1000 },
];

const MoneyIn = () => {
  const [bucketOpen, setBucketOpen] = useState(false);
  const [selectBucketName, setSelectBucketName] = useState("Bucket");
  const [excludeTransactionModal, setExcludeTransactionModal] = useState(false);

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
              <span style={{ color: "rgba(0, 39, 91, 0.6)" }}>
                {selectBucketName}
              </span>
            </h3>
            <button
              className="d-flex gap-2 align-items-center"
              onClick={() => setBucketOpen(true)}
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
                {selectBucketName === "Tags" ? 0 : "$4,400"}
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
                  {selectBucketName === "Tags" ? 0 : "$5,459.75"}
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
                  {selectBucketName === "Tags" ? 0 : "$5,459.75"}
                </div>
              </div>
            </Col>

            <Col>
              {selectBucketName !== "Tags" ? (
                <>
                  {selectBucketName === "Bucket" && (
                    <div className="d-flex justify-content-center mt-2">
                      <PieCharts
                        COLORS={COLORS}
                        data={data1}
                        cornerRadius={2}
                        In={true}
                        width={420}
                        height={200}
                      />
                    </div>
                  )}

                  {selectBucketName === "Categories" && (
                    <div className="d-flex justify-content-center mt-2">
                      <PieCharts
                        COLORS={COLORS1}
                        data={data3}
                        cornerRadius={2}
                        In={true}
                        width={420}
                        height={200}
                      />
                    </div>
                  )}

                  {selectBucketName === "Transactions" && (
                    <div className="d-flex justify-content-center">
                      <BarsChart
                        data={MoneyInvsOutData}
                        width={450}
                        height={220}
                        barWidth={70}
                        gradient={true}
                        gradientNumber={4}
                        barGrad1={"rgba(226, 242, 255, 1)"}
                        barGrad2={"rgba(226, 242, 255, 1)"}
                        barGrad3={"rgba(226, 242, 255, 1)"}
                        barGrad4={"rgba(0, 74, 173, 1)"}
                      />
                    </div>
                  )}

                  {selectBucketName === "Merchant" && (
                    <div className="d-flex justify-content-center mt-2">
                      <PieCharts
                        COLORS={COLORS1}
                        data={data3}
                        cornerRadius={2}
                        In={true}
                        width={420}
                        height={200}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div
                  style={{
                    color: "rgba(55, 73, 87, 1)",
                    fontSize: "14px",
                    fontWeight: 400,
                  }}
                  className="text-center"
                >
                  No tags have been tracked for this period
                </div>
              )}
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
              {selectBucketName}
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

            {selectBucketName !== "Tags" ? (
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
            ) : (
              <div
                style={{
                  color: "rgba(55, 73, 87, 1)",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "20px",
                }}
                className="text-center"
              >
                No tags have been tracked for this period
              </div>
            )}
          </DashboardCard>
        </Col>
      </Row>

      {selectBucketName !== "Tags" && (
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
                  All internal transfers between your accounts have been
                  excluded from your Cashflow.
                </div>
                <div
                  className="mt-4"
                  onClick={() => setExcludeTransactionModal(true)}
                  style={{
                    color: "rgba(92, 182, 249, 1)",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
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
      )}

      {/* Bucket  */}
      <BucketComponet
        onChange={setSelectBucketName}
        show={bucketOpen}
        hide={setBucketOpen}
      />

      {/* Bucket  */}
      <ExcludeTransaction
        show={excludeTransactionModal}
        hide={setExcludeTransactionModal}
      />
    </div>
  );
};

export default MoneyIn;

import React, { useEffect, useState } from "react";
import DashboardCard from "../../../components/layout/DasboardCard";
import { IoIosArrowUp } from "react-icons/io";
import { Col, Row, Image } from "react-bootstrap";
import { CiCalendar } from "react-icons/ci";
import { IoInformationCircleOutline } from "react-icons/io5";
import SearchField from "../../../components/layout/SearchField";
import ExcludeTransaction from "./SubComponents/ExcludeTransaction";
import { ResponsiveContainer } from "recharts";
import BarsChart from "../../../components/Charts/BarsChart";
import { getError } from "../../../utils/error";
import { useGetCashflowNetMutation } from "../../../features/apiSlice";
import BucketComponet from "./SubComponents/BucketComponet";

const data = [
  {
    name: "02 Dec - 01 Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "02 Jan - 01 Feb",
    uv: -3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "02 Feb - 01 Mar",
    uv: -2000,
    pv: -9800,
    amt: 2290,
  },
  {
    name: "02 Mar - Today",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
];

const NetWorth = ({ accountPortfolioActive }) => {
  const [getCashflowNet, { isLoading }] = useGetCashflowNetMutation();
  const [excludeTransactionModal, setExcludeTransactionModal] = useState(false);
  const [selectBucketName, setSelectBucketName] = useState("Merchent");
  const [bucketOpen, setBucketOpen] = useState(false);

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

  useEffect(() => {
    if (accountPortfolioActive) {
      getNetData();
    }
  }, [accountPortfolioActive]);

  const getNetData = async () => {
    try {
      const data = await getCashflowNet({
        date: "last_month",
        filter: selectBucketName.toLowerCase(),
      }).unwrap();
      console.log(data);
    } catch (error) {
      getError(error);
    }
  };

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
              {selectBucketName} <IoIosArrowUp size={18} />
            </button>

            {/* <button
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
            </button> */}
          </div>

          <Row className="d-flex flex-wrap gap-4 px-2 mt-3">
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
              <ResponsiveContainer width="100%" height="100%">
                <BarsChart
                  data={data}
                  barWidth={50}
                  width={"100%"}
                  height={220}
                  gradient={true}
                  gradientNumber={12}
                  cashFlowBar={true}
                  netWorth={true}
                  barGrad1={"#E2F2FF"}
                  barGrad2={"#E2F2FF"}
                  barGrad3={"#E2F2FF"}
                  barGrad4={"#004AAD"}
                />
              </ResponsiveContainer>
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
                onClick={() => setExcludeTransactionModal(true)}
                className="mt-4"
                style={{
                  cursor: "pointer",
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

export default NetWorth;
